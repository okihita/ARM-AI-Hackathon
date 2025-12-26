# Manual Test Guide

## ✅ App Status: RUNNING
- Platform: Android Pixel 8 Pro Emulator (ARM64)
- App: com.gcavrn
- Model: Phi-3-mini (2.2GB) bundled

---

## Test Each Button

### 1️⃣ TEST TOUCH (Green Button)
**Action**: Tap the green "TEST TOUCH" button  
**Expected**: Log shows "✅ Touch works!"  
**Result**: ✅ PASS / ❌ FAIL

---

### 2️⃣ Test SQLite
**Action**: Tap "Test SQLite"  
**Expected**: 
```
🔵 Testing SQLite...
✅ SQLite works!
SELECT result: [data]
```
**Result**: ✅ PASS / ❌ FAIL  
**Notes**: _____________________

---

### 3️⃣ Load Model
**Action**: Tap "Load Model"  
**Wait**: ~10-30 seconds (first load)  
**Expected**:
```
🔵 Loading model...
✅ Model loaded
📦 Size: 2283MB
⚡ GPU layers: 32/32
```
**Result**: ✅ PASS / ❌ FAIL  
**Load Time**: _____ seconds  
**Notes**: _____________________

---

### 4️⃣ Test Inference
**Action**: Tap "Test Inference"  
**Wait**: ~10-30 seconds  
**Expected**:
- Generates text about React Native
- Shows speed: "⏱️ XXXXms (XX.X tok/s)"
- Text is coherent

**Result**: ✅ PASS / ❌ FAIL  
**Speed**: _____ tok/s  
**Time**: _____ ms  
**Sample Output**:
```
[Paste first 100 chars of generated text]
```

---

### 5️⃣ 🚀 GPU Benchmark (Orange Button)
**Action**: Tap "🚀 GPU Benchmark"  
**Wait**: ~2-3 minutes (runs 3 tests)  
**Expected**:
```
📊 GPU Benchmark Results

CPU Only (0 layers):
  X.X tok/s (1.00x)

Half GPU (16 layers):
  XX.X tok/s (X.XXx)

Full GPU (32 layers):
  XX.X tok/s (X.XXx)
```

**Result**: ✅ PASS / ❌ FAIL

**Actual Results**:
- CPU: _____ tok/s (baseline)
- Half GPU: _____ tok/s (_____ x speedup)
- Full GPU: _____ tok/s (_____ x speedup)

**✅ 3x Speedup Achieved?**: YES / NO

---

## Quick Test Checklist

- [ ] App launches successfully
- [ ] Touch button works
- [ ] SQLite test passes
- [ ] Model loads without errors
- [ ] Inference generates text
- [ ] Benchmark completes all 3 tests
- [ ] GPU shows 3x+ speedup
- [ ] No crashes or freezes

---

## How to Monitor Logs

**Terminal 1** (Run this first):
```bash
cd /Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/mobile
./run-tests.sh
```

**Terminal 2** (App screen):
- Look at the Android emulator
- Tap buttons and watch log output

---

## Screenshot Current State

```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
adb exec-out screencap -p > ~/Desktop/gcavrn-test-$(date +%s).png
```

---

## If Something Fails

**Model not found?**
```bash
# Check model exists
ls -lh assets/models/phi-3-mini-q4.gguf
```

**App crashes?**
```bash
# View crash logs
adb logcat | grep -E "FATAL|AndroidRuntime"
```

**Slow performance?**
- Normal on emulator (limited GPU)
- Test on physical device for accurate results

---

## After Testing

1. Fill out `TEST_REPORT.md` with results
2. Take screenshots of benchmark results
3. Update `STATUS.md` with completion %
4. Document any issues found

---

**Ready to test!** Open the emulator and start tapping buttons. 🚀
