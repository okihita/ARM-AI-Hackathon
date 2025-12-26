import { initLlama, LlamaContext } from 'llama.rn';
import RNFS from 'react-native-fs';

type BenchmarkConfig = {
  n_gpu_layers: number;
  label: string;
};

class LlamaService {
  private context: LlamaContext | null = null;
  private modelPath: string = '';
  private modelUrl = 'https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf';
  private currentGpuLayers: number = 32;
  private expectedSize = 2393231360; // Exact size in bytes

  async checkModel(): Promise<{ status: string; message: string }> {
    try {
      const modelName = 'phi-3-mini-q4.gguf';
      const modelPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      if (!(await RNFS.exists(modelPath))) {
        return {
          status: 'missing',
          message: '❌ No model found\n\n📥 Tap "Download Model" to get started\n',
        };
      }

      const fileSize = (await RNFS.stat(modelPath)).size;
      const sizeMB = (fileSize / 1024 / 1024).toFixed(0);

      if (Math.abs(fileSize - this.expectedSize) > 1000000) {
        await RNFS.unlink(modelPath);
        return {
          status: 'corrupted',
          message: `❌ Model corrupted (${sizeMB}MB)\n\n🗑️ Deleted automatically\n📥 Tap "Download Model" to re-download\n`,
        };
      }

      return {
        status: 'ready',
        message: `✅ Model ready (${sizeMB}MB)\n\n🚀 Tap "Load Model" to start\n`,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `❌ Error checking model: ${error}\n`,
      };
    }
  }

  async initialize(): Promise<string> {
    try {
      const modelName = 'phi-3-mini-q4.gguf';
      this.modelPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      // Check if model exists
      if (!(await RNFS.exists(this.modelPath))) {
        return `⬇️ Model not found.\n\n📥 Tap "Download Model" to get it (2.2GB)`;
      }

      // Validate file size
      const fileSize = (await RNFS.stat(this.modelPath)).size;
      const sizeMB = (fileSize / 1024 / 1024).toFixed(0);
      
      if (Math.abs(fileSize - this.expectedSize) > 1000000) {
        // Corrupted - auto delete
        await RNFS.unlink(this.modelPath);
        return `❌ Model was corrupted (${sizeMB}MB, expected 2283MB)\n\n🗑️ Deleted automatically\n📥 Tap "Download Model" to re-download`;
      }

      // Initialize with GPU acceleration
      this.context = await initLlama({
        model: this.modelPath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: this.currentGpuLayers,
      });

      return `✅ Model loaded\n📦 Size: ${sizeMB}MB\n⚡ GPU layers: ${this.currentGpuLayers}/32`;
    } catch (error) {
      // If load fails, delete corrupted file
      if (await RNFS.exists(this.modelPath)) {
        await RNFS.unlink(this.modelPath);
        return `❌ Model corrupted during load\n\n🗑️ Deleted automatically\n📥 Tap "Download Model" to re-download`;
      }
      return `❌ Error: ${error}`;
    }
  }

  async downloadModel(onProgress: (progress: number) => void): Promise<string> {
    try {
      const modelName = 'phi-3-mini-q4.gguf';
      this.modelPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      // Check if already downloaded and valid
      if (await RNFS.exists(this.modelPath)) {
        const fileSize = (await RNFS.stat(this.modelPath)).size;
        const sizeMB = (fileSize / 1024 / 1024).toFixed(0);
        
        if (Math.abs(fileSize - this.expectedSize) < 1000000) {
          return `✅ Model already exists\n📦 Size: ${sizeMB}MB\n📍 ${this.modelPath}`;
        }
        
        await RNFS.unlink(this.modelPath);
        onProgress(0);
      }

      // Use RNFS with better error handling
      let downloadJob = RNFS.downloadFile({
        fromUrl: this.modelUrl,
        toFile: this.modelPath,
        progressDivider: 10,
        begin: (res) => {
          console.log('Download started:', res);
        },
        progress: (res) => {
          try {
            if (res.contentLength > 0) {
              const progress = (res.bytesWritten / res.contentLength) * 100;
              onProgress(progress);
            }
          } catch (e) {
            // Ignore progress errors
          }
        },
      });

      const result = await downloadJob.promise;
      
      if (result.statusCode === 200) {
        const fileSize = (await RNFS.stat(this.modelPath)).size;
        if (Math.abs(fileSize - this.expectedSize) > 1000000) {
          await RNFS.unlink(this.modelPath);
          return `❌ Download corrupted\n\nTry again`;
        }
        return `✅ Download complete\n📍 ${this.modelPath}`;
      } else {
        return `❌ Download failed: HTTP ${result.statusCode}\n\nCheck internet connection`;
      }
    } catch (error: any) {
      console.error('Download error:', error);
      try {
        if (await RNFS.exists(this.modelPath)) {
          await RNFS.unlink(this.modelPath);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      
      const errorMsg = error?.message || String(error);
      if (errorMsg.includes('Network')) {
        return `❌ Network error\n\n• Check WiFi connection\n• Try again\n• Large file (2.2GB) needs stable connection`;
      }
      return `❌ Download failed\n\n${errorMsg}\n\nTry again`;
    }
  }

  async inference(prompt: string): Promise<string> {
    if (!this.context) {
      return '❌ Model not loaded. Initialize first.';
    }

    try {
      const start = Date.now();
      const response = await this.context.completion({
        prompt,
        n_predict: 30,  // Reduced for faster response
        temperature: 0.7,
        top_p: 0.9,
      });
      const elapsed = Date.now() - start;
      const tokensPerSec = (30 / elapsed * 1000).toFixed(1);

      return `${response.text}\n\n⏱️ ${elapsed}ms (${tokensPerSec} tok/s)`;
    } catch (error) {
      return `❌ Inference error: ${error}`;
    }
  }

  async release(): Promise<void> {
    if (this.context) {
      await this.context.release();
      this.context = null;
    }
  }

  async benchmark(prompt: string): Promise<string> {
    const configs: BenchmarkConfig[] = [
      { n_gpu_layers: 0, label: 'CPU Only' },
      { n_gpu_layers: 16, label: 'Half GPU' },
      { n_gpu_layers: 32, label: 'Full GPU' },
    ];

    let results = '📊 GPU Benchmark Results\n\n';
    const baselineSpeed = { value: 0 };

    for (const config of configs) {
      await this.release();
      this.currentGpuLayers = config.n_gpu_layers;
      
      const initResult = await this.initialize();
      if (initResult.includes('❌')) {
        results += `${config.label}: Failed to load\n`;
        continue;
      }

      const start = Date.now();
      const response = await this.context!.completion({
        prompt,
        n_predict: 30,  // Reduced for faster benchmark
        temperature: 0.7,
      });
      const elapsed = Date.now() - start;
      const tokensPerSec = (30 / elapsed * 1000);

      if (config.n_gpu_layers === 0) {
        baselineSpeed.value = tokensPerSec;
      }

      const speedup = baselineSpeed.value > 0 
        ? (tokensPerSec / baselineSpeed.value).toFixed(2) 
        : '1.00';

      results += `${config.label} (${config.n_gpu_layers} layers):\n`;
      results += `  ${tokensPerSec.toFixed(1)} tok/s (${speedup}x)\n\n`;
    }

    return results;
  }
}

export default new LlamaService();
