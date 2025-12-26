# GPU Benchmark Plan

## Goal
Prove 3-5x ARM GPU acceleration for on-device AI inference.

## Test Configuration

### Model
- **Name**: Phi-3-mini-4k-instruct
- **Size**: 2.2GB (Q4_K_M quantization)
- **Parameters**: ~3.8B
- **Context**: 4096 tokens

### Test Scenarios

#### 1. CPU-Only Baseline
```typescript
{
  n_gpu_layers: 0,  // CPU only
  n_ctx: 2048,
  use_mlock: true
}
```

#### 2. Partial GPU Offload
```typescript
{
  n_gpu_layers: 16,  // Half GPU
  n_ctx: 2048,
  use_mlock: true
}
```

#### 3. Full GPU Offload
```typescript
{
  n_gpu_layers: 32,  // Full GPU
  n_ctx: 2048,
  use_mlock: true
}
```

## Metrics to Measure

1. **Tokens/Second** (primary metric)
2. **Time to First Token** (TTFT)
3. **Memory Usage**
4. **Power Consumption** (if available)
5. **Model Load Time**

## Test Prompts

### Short (50 tokens)
```
"What is React Native? Answer in 50 words."
```

### Medium (200 tokens)
```
"Explain how ARM processors differ from x86 processors. Include details about architecture, power efficiency, and mobile computing."
```

### Long (500 tokens)
```
"Write a comprehensive guide on building mobile AI applications with React Native. Cover model selection, optimization techniques, and deployment strategies."
```

## Expected Results

| Configuration | Tokens/Sec | Speedup |
|--------------|------------|---------|
| CPU Only     | 5-8        | 1x      |
| Half GPU     | 15-20      | 2-3x    |
| Full GPU     | 25-40      | 3-5x    |

## Success Criteria

✅ Full GPU achieves **3x or better** speedup vs CPU-only
✅ Inference runs **100% offline**
✅ Memory usage stays **under 3GB**
✅ No crashes or thermal throttling

## Next Steps

1. ✅ Model downloaded (2.2GB)
2. ⏳ Run iOS app on simulator
3. ⏳ Test CPU-only baseline
4. ⏳ Test GPU acceleration
5. ⏳ Benchmark and record results
6. ⏳ Test on physical device (real ARM GPU)
