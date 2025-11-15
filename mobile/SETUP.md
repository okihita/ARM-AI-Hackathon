# GCAVRN Setup & Testing

## ✅ Completed (2025-11-15 19:00)

- React Native 0.82.1 initialized
- Native modules installed:
  - `@op-engineering/op-sqlite` v15.0.7
  - `llama.rn` v0.8.2  
  - `react-native-fs` v2.20.0
- iOS pods installed (79 dependencies)
- Test app created (App.tsx)
- RAG services copied to src/services/

## 🎯 Next Steps

### 1. Test on Real Device (P0)

**iOS:**
```bash
cd ios
xed .
# In Xcode: Select device → Build & Run
```

**Android:** (Recommended for now)
```bash
npx react-native run-android
```

See **ANDROID_TESTING.md** for complete manual testing guide with 8 test flows.

### 2. Download Model (P0)

Download Phi-3-mini Q2_K (1.2GB):
```bash
# From Hugging Face
curl -L -o ~/Downloads/phi-3-mini-q2_k.gguf \
  https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q2_k.gguf
```

Then copy to app:
```bash
# Add to Xcode project as resource
# Or use react-native-fs to download at runtime
```

### 3. Test GPU Acceleration (P0)

Modify App.tsx to:
```typescript
const context = await initLlama({
  model: 'path/to/phi-3-mini-q2_k.gguf',
  use_mlock: true,
  n_ctx: 2048,
  n_gpu_layers: 99, // Full GPU
});

// Test inference
const result = await context.completion({
  prompt: 'Hello, how are you?',
  n_predict: 50,
});
```

Measure tokens/second with GPU vs CPU (n_gpu_layers: 0).

### 4. Integrate RAG (P1)

```typescript
import {RAGService} from './src/services/RAGService';

const rag = new RAGService(dbPath, modelPath);
await rag.initialize();

const answer = await rag.query('What is the zoning law?');
```

## 📊 Expected Performance

| Device | GPU | Tokens/sec |
|--------|-----|------------|
| iPhone 15 Pro | Metal | 15-25 |
| iPhone 14 | Metal | 12-20 |
| Android (Snapdragon) | OpenCL | 10-20 |

## 🐛 Troubleshooting

**SQLite fails**: Check file permissions
**Llama fails**: Verify model path and format (.gguf)
**GPU not used**: Check n_gpu_layers > 0
**Slow inference**: Verify Metal/OpenCL enabled

## 📝 Files

- `App.tsx` - Test UI
- `src/services/DatabaseService.ts` - SQLite wrapper
- `src/services/LlamaService.ts` - LLM wrapper
- `src/services/RAGService.ts` - RAG orchestration
