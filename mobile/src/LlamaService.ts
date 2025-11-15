import { initLlama, LlamaContext } from 'llama.rn';
import RNFS from 'react-native-fs';

class LlamaService {
  private context: LlamaContext | null = null;
  private modelPath: string = '';
  private modelUrl = 'https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf';

  async initialize(): Promise<string> {
    try {
      const modelName = 'phi-3-mini-q4.gguf';
      this.modelPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      // Download model if not exists (first run only)
      const exists = await RNFS.exists(this.modelPath);
      if (!exists) {
        return `⬇️ Model not found. Download required (2.2GB).\nUse "Download Model" button.`;
      }

      // Initialize with GPU acceleration
      this.context = await initLlama({
        model: this.modelPath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 32, // Full GPU offload
      });

      const fileSize = (await RNFS.stat(this.modelPath)).size;
      const sizeMB = (fileSize / 1024 / 1024).toFixed(0);

      return `✅ Model loaded\n📦 Size: ${sizeMB}MB\n⚡ GPU layers: 32/32`;
    } catch (error) {
      return `❌ Error: ${error}`;
    }
  }

  async downloadModel(onProgress: (progress: number) => void): Promise<string> {
    try {
      const modelName = 'phi-3-mini-q4.gguf';
      this.modelPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;

      const download = RNFS.downloadFile({
        fromUrl: this.modelUrl,
        toFile: this.modelPath,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          onProgress(progress);
        },
      });

      const result = await download.promise;
      if (result.statusCode === 200) {
        return `✅ Download complete\n📍 ${this.modelPath}`;
      } else {
        return `❌ Download failed: ${result.statusCode}`;
      }
    } catch (error) {
      return `❌ Download error: ${error}`;
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
        n_predict: 100,
        temperature: 0.7,
        top_p: 0.9,
      });
      const elapsed = Date.now() - start;
      const tokensPerSec = (100 / elapsed * 1000).toFixed(1);

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
}

export default new LlamaService();
