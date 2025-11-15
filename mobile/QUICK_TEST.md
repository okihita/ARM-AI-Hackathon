# Quick Test Reference Card

**Print this or keep it open while testing**

---

## 🚀 Install App

```bash
cd GCAVRN
npx react-native run-android
```

Wait 2-3 minutes.

---

## ✅ 3-Minute Quick Test

### 1. Launch App (30 sec)
- Open "GCAVRN" app
- See "G-CAV-RN Test" title
- ✅ Pass if app opens

### 2. Test SQLite (1 min)
- Tap "Test SQLite"
- Wait for logs
- ✅ Pass if status shows "✅ SQLite working!"

### 3. Test Llama (30 sec)
- Tap "Test Llama"
- ✅ Pass if status shows "⚠️ Need model file"

### 4. Stress Test (1 min)
- Tap "Test SQLite" 5 times fast
- ✅ Pass if no crash

---

## 🎯 Expected Results

| Test | Expected Status | Time |
|------|----------------|------|
| Launch | "Ready" | 5s |
| SQLite | "✅ SQLite working!" | 10s |
| Llama | "⚠️ Need model file" | 5s |
| Stress | No crash | 30s |

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| App crashes | `adb uninstall com.gcavrn` then reinstall |
| White screen | Shake phone → Reload |
| Buttons don't work | Force close → Reopen |
| SQLite fails | Reinstall app |

---

## 📋 Report Template

```
Device: _____________
Android: _____________
Date: _____________

[ ] Launch - Pass/Fail
[ ] SQLite - Pass/Fail  
[ ] Llama - Pass/Fail
[ ] Stress - Pass/Fail

Notes: _____________
```

---

## 🔍 Debug

```bash
# View logs
adb logcat | grep ReactNative

# Reinstall
adb uninstall com.gcavrn
npx react-native run-android
```

---

**Full guide:** See `ANDROID_TESTING.md`
