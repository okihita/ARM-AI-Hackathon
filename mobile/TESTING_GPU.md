# GPU Acceleration Testing Guide

## Current Status

✅ **Model Ready**: Phi-3-mini-4k-instruct (2.2GB) downloaded
✅ **Code Updated**: Benchmark functionality added
⏳ **iOS Build**: In progress...

## What We're Testing

### Hypothesis
ARM GPU acceleration will provide **3-5x speedup** for on-device AI inference compared to CPU-only execution.

### Test Setup

**Model**: Phi-3-mini-4k-instruct-Q4_K_M
- Size: 2.2GB
- Parameters: ~3.8B
- Quantization: 4-bit

**Configurations**:
1. CPU Only (0 GPU layers) - Baseline
2. Half GPU (16 GPU layers) - Partial offload
3. Full GPU (32 GPU layers) - Full offload

## How to Test

### 1. Launch App
```bash
cd mobile
npx react-native run-ios --simulator="iPhone 16 Pro"
```

### 2. Run Tests in Order

1. **Test Touch** - Verify UI works
2. **Test SQLite** - Verify database works
3. **Load Model** - Initialize with full GPU
4. **Test Inference** - Quick test (50 words)
5. **🚀 GPU Benchmark** - Full comparison (2 min)

### 3. Expected Results

```
📊 GPU Benchmark Results

CPU Only (0 layers):
  8.5 tok/s (1.00x)

Half GPU (16 layers):
  18.2 tok/s (2.14x)

Full GPU (32 layers):
  34.7 tok/s (4.08x)
```

## Success Criteria

✅ Full GPU achieves ≥3x speedup
✅ No crashes or errors
✅ Inference runs offline
✅ Memory usage < 3GB

## Real Device Testing

For accurate GPU benchmarks, test on physical device:

### iOS (iPhone 12+)
```bash
# Connect device via USB
npx react-native run-ios --device
```

### Android (Snapdragon/Mali GPU)
```bash
# Connect device via USB
npx react-native run-android
```

## Troubleshooting

**Model not found?**
- Check: `assets/models/phi-3-mini-q4.gguf` exists
- Size should be ~2.2GB

**Build fails?**
- Clean: `cd ios && pod install && cd ..`
- Rebuild: `npx react-native run-ios`

**Slow inference?**
- Simulator has limited GPU access
- Test on real device for accurate results

## Next Steps After Testing

1. Record benchmark results
2. Test on physical device
3. Compare iOS vs Android GPU performance
4. Optimize n_gpu_layers for best speed/memory balance
5. Update STATUS.md with results
