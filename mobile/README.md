# Mobile App (React Native)

**G-CAV-RN: ARM-Optimized On-Device AI**

---

## 🚀 Quick Start

### Android
```bash
npm install
npx react-native run-android
```

### iOS
```bash
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

Or open in Xcode:
```bash
cd ios
open GCAVRN.xcworkspace
```

---

## 📊 Status

**Progress: 25% Complete**

- ✅ App initialized (React Native 0.82.1)
- ✅ Native modules installed (op-sqlite, llama.rn)
- ✅ Android tested (emulator)
- ⏳ iOS tested (pending)
- ❌ Model not downloaded
- ❌ GPU not tested

---

## 🧪 Testing

**Quick test (3 min):**
See `QUICK_TEST.md`

**Full testing guide:**
See `TESTING.md`

**Latest results:**
See `ANDROID_TEST_RESULTS.md`

---

## 📦 Native Modules

- **@op-engineering/op-sqlite** v15.0.7 - SQLite with vector support
- **llama.rn** v0.8.2 - LLM inference with Metal/OpenCL GPU
- **react-native-fs** v2.20.0 - File system access

---

## 🎯 Next Steps

1. Download Phi-3-mini Q2_K model (1.2GB)
2. Test GPU acceleration
3. Benchmark performance
4. Integrate RAG pipeline

---

## 📚 Documentation

- `TESTING.md` - Complete testing guide
- `QUICK_TEST.md` - 3-minute validation
- `ANDROID_TEST_RESULTS.md` - Latest test results
- `../docs/` - Project documentation
