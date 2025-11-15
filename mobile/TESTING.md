# Testing Guide

**Quick validation: 3 minutes**  
**Full testing: 15 minutes**

---

## 🚀 Quick Test (3 min)

### Setup
```bash
# Android
cd mobile
npx react-native run-android

# iOS
cd mobile/ios
open GCAVRN.xcworkspace
# Select device → Run
```

### Tests
1. **Launch** (30s) - App opens, no crash
2. **SQLite** (1m) - Tap "Test SQLite" → "✅ SQLite working!"
3. **Llama** (30s) - Tap "Test Llama" → "⚠️ Need model file"
4. **Stress** (1m) - Tap SQLite 5x → No crash

---

## 📱 Android Testing

### Prerequisites
- Android device or emulator
- USB debugging enabled (device)
- JDK 17 installed

### Setup
```bash
# Set environment
export JAVA_HOME="/opt/homebrew/opt/openjdk@17"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"

# Build and install
cd mobile
npx react-native run-android
```

### Common Issues
| Problem | Solution |
|---------|----------|
| JDK version | Install JDK 17: `brew install openjdk@17` |
| SDK not found | Create `android/local.properties` with `sdk.dir` |
| Build fails | `cd android && ./gradlew clean` |
| App crashes | `adb uninstall com.gcavrn` then reinstall |

---

## 🍎 iOS Testing

### Prerequisites
- Mac with Xcode
- iPhone/iPad or simulator
- Apple Developer account (for device)

### Setup
```bash
cd mobile/ios
open GCAVRN.xcworkspace
```

**In Xcode:**
1. Select device from dropdown
2. Signing & Capabilities → Select Team
3. Press Run (▶️)

### Common Issues
| Problem | Solution |
|---------|----------|
| Signing error | Select Team in Xcode |
| Build fails | Clean: `Cmd+Shift+K` |
| Metro error | Kill Metro: `pkill -f metro` |
| Won't install | Delete app, rebuild |

---

## ✅ Expected Results

### Test 1: App Launch
- Title: "G-CAV-RN Test"
- Status: "Ready"
- Two buttons visible

### Test 2: SQLite
**Logs:**
```
Opening database...
✅ Database opened
Creating table...
✅ Table created
Testing SELECT 1...
✅ Query works
```
**Status:** "✅ SQLite working!"

### Test 3: Llama
**Logs:**
```
Initializing llama.rn...
⚠️ Expected: Failed to initialize context
✅ Llama module loaded (needs model file)
```
**Status:** "⚠️ Need model file"

---

## 🐛 Debug Commands

**Android:**
```bash
# View logs
adb logcat | grep ReactNative

# Reinstall
adb uninstall com.gcavrn
npx react-native run-android

# Check device
adb devices
```

**iOS:**
```bash
# View logs
# Xcode → View → Debug Area (Cmd+Shift+Y)

# Clean build
cd ios
rm -rf build
pod install
```

---

## 📊 Test Results Template

```
Device: _____________
OS: _____________
Date: _____________

[ ] Launch - Pass/Fail
[ ] SQLite - Pass/Fail
[ ] Llama - Pass/Fail
[ ] Stress - Pass/Fail

Notes: _____________
```

---

## 🎯 Success Criteria

**Minimum:**
- ✅ App launches
- ✅ SQLite works
- ✅ Llama loads (warning OK)

**Full Pass:**
- ✅ All 4 tests pass
- ✅ No crashes
- ✅ Smooth performance

---

## 📝 Latest Results

See `ANDROID_TEST_RESULTS.md` for latest test execution.

**Last Test:** 2025-11-16 01:13  
**Device:** Pixel 8 Pro ARM64 Emulator  
**Result:** All tests PASSED ✅
