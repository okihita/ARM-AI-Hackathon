# Model: Phi-3-mini-4k-instruct (Q4_K_M)

**Downloaded:** 2025-11-16  
**Size:** 2.2GB  
**Format:** GGUF (GPT-Generated Unified Format)

---

## 📊 Model Specs

| Property | Value |
|----------|-------|
| Base Model | Microsoft Phi-3-mini (3.8B params) |
| Quantization | Q4_K_M (4-bit mixed) |
| Context Length | 4096 tokens |
| Original Size | ~7.6GB (FP16) |
| Compressed Size | 2.2GB (71% reduction) |
| Memory Usage | ~3-4GB runtime |

---

## 🔧 How It Works

### 1. Quantization (Q4_K_M)
**What:** Reduces model precision from 16-bit floats to 4-bit integers.

**How:**
- **Q4** = 4-bit quantization (16 possible values per weight)
- **K_M** = K-quant Mixed (important layers stay higher precision)
- Weights grouped into blocks, quantized with shared scale factors
- Attention layers use 6-bit, feed-forward uses 4-bit

**Trade-off:**
- ✅ 80% size reduction (7.6GB → 1.5GB)
- ✅ 3-4x faster inference (less memory bandwidth)
- ⚠️ ~2-5% accuracy loss (acceptable for most tasks)

### 2. GGUF Format
**What:** Binary format optimized for CPU/GPU inference.

**Structure:**
```
[Header: GGUF magic bytes]
[Metadata: architecture, vocab, hyperparams]
[Tensor Info: shapes, types, offsets]
[Tensor Data: quantized weights]
```

**Why GGUF:**
- Memory-mapped loading (no full RAM load)
- Cross-platform (iOS, Android, desktop)
- Supports mixed quantization
- Fast random access to layers

### 3. llama.rn Integration
**What:** React Native bindings to llama.cpp (C++ inference engine).

**Flow:**
```
JavaScript (App.tsx)
    ↓
React Native Bridge
    ↓
llama.rn (Native Module)
    ↓
llama.cpp (C++ engine)
    ↓
ARM GPU (Metal/OpenCL)
```

**Inference Pipeline:**
1. **Tokenization:** Text → token IDs (vocab lookup)
2. **Embedding:** Token IDs → vectors (lookup table)
3. **Transformer Layers:** 32 layers of attention + FFN
4. **Sampling:** Logits → next token (top-k/top-p)
5. **Detokenization:** Token ID → text

---

## ⚡ ARM GPU Acceleration

### Metal (iOS)
- Uses Apple's Metal Performance Shaders (MPS)
- Matrix operations offloaded to GPU
- Unified memory (CPU/GPU share RAM)
- Expected: 3-5x speedup vs CPU

### OpenCL (Android)
- Uses ARM Mali GPU compute units
- Kernel-based parallel execution
- Separate GPU memory (copy overhead)
- Expected: 2-4x speedup vs CPU

### Bottlenecks
1. **Memory Bandwidth:** Moving 1.5GB weights
2. **Quantization Overhead:** Dequantizing 4-bit → 16-bit on-the-fly
3. **Context Length:** 4K tokens = large KV cache

---

## 🚫 Limitations

### Model Limitations
- **Context:** 4096 tokens (~3000 words) max
- **Knowledge Cutoff:** Training data up to Oct 2023
- **Hallucinations:** Can generate plausible but false info
- **Bias:** Inherits biases from training data

### Quantization Limitations
- **Accuracy Loss:** 2-5% worse than FP16
- **Math Tasks:** Struggles with precise calculations
- **Rare Tokens:** Less accurate for uncommon words
- **Fine-tuning:** Can't fine-tune quantized models

### Hardware Limitations
- **RAM:** Needs 2-3GB free (may crash on 4GB devices)
- **Battery:** GPU inference drains 2-3x faster than CPU
- **Heat:** Sustained inference causes thermal throttling
- **Storage:** 1.5GB model file (not suitable for all apps)

### llama.rn Limitations
- **iOS:** Requires iOS 14+ for Metal support
- **Android:** Requires ARM64 (no x86 support)
- **Streaming:** Token-by-token generation (not batch)
- **Concurrency:** Single inference at a time

---

## 📈 Expected Performance

### iPhone (A15+ with Metal)
- **Speed:** 15-25 tokens/sec
- **Latency:** ~50ms first token
- **Memory:** 2.5GB peak
- **Battery:** ~1% per 100 tokens

### Android (Snapdragon 8 Gen 2)
- **Speed:** 10-20 tokens/sec
- **Latency:** ~80ms first token
- **Memory:** 2.8GB peak
- **Battery:** ~1.5% per 100 tokens

### Emulator (ARM64)
- **Speed:** 5-10 tokens/sec (no GPU)
- **Latency:** ~200ms first token
- **Memory:** 3GB peak

---

## 🎯 Use Cases

### ✅ Good For
- Short Q&A (< 500 tokens response)
- Text classification/extraction
- Summarization (< 1000 words)
- Code completion (< 100 lines)
- Offline chatbots

### ❌ Not Good For
- Long-form generation (> 2000 tokens)
- Real-time streaming (< 10ms latency)
- Multi-turn conversations (> 10 turns)
- Precise math/calculations
- Multi-modal (images, audio)

---

## 🔄 Alternatives Considered

| Model | Size | Speed | Accuracy | Why Not? |
|-------|------|-------|----------|----------|
| Phi-3-mini Q2_K | 800MB | Faster | Lower | Too inaccurate |
| Phi-3-mini Q8 | 3.8GB | Slower | Higher | Too large |
| Llama-3.2-1B | 600MB | Faster | Lower | Worse quality |
| Gemma-2B | 1.2GB | Similar | Similar | Less optimized |

**Q4_K_M = Best balance** of size, speed, and accuracy for mobile.

---

## 📝 Next Steps

1. Test model loading in LlamaService.ts
2. Benchmark inference speed (CPU vs GPU)
3. Measure memory usage under load
4. Validate output quality vs cloud API
5. Optimize context window usage
