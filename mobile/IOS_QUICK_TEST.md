# iOS Quick Test Card

**Device:** Okihita's iPhone (iOS 26.2)

---

## 🚀 Setup (First Time Only)

1. Open Xcode:
   ```bash
   cd ios
   open GCAVRN.xcworkspace
   ```

2. Configure signing:
   - Select GCAVRN target
   - Signing & Capabilities tab
   - Check "Automatically manage signing"
   - Select your Team

3. Run:
   - Select "Okihita's iPhone" from device dropdown
   - Press ▶️ or `Cmd+R`
   - Wait 2-3 minutes

---

## ✅ 3-Minute Test

### 1. Launch (30s)
- App opens
- See "G-CAV-RN Test"
- ✅ Pass if no crash

### 2. SQLite (1m)
- Tap "Test SQLite"
- See logs appear
- ✅ Pass if "✅ SQLite working!"

### 3. Llama (30s)
- Tap "Test Llama"
- ✅ Pass if "⚠️ Need model file"

### 4. Stress (1m)
- Tap "Test SQLite" 5x fast
- ✅ Pass if no crash

---

## 🎯 Expected

| Test | Status | Time |
|------|--------|------|
| Launch | "Ready" | 5s |
| SQLite | "✅ SQLite working!" | 10s |
| Llama | "⚠️ Need model file" | 5s |
| Stress | No crash | 30s |

---

## 🐛 Quick Fixes

| Problem | Fix |
|---------|-----|
| Signing error | Select Team in Xcode |
| Crash | Clean build: `Cmd+Shift+K` |
| Won't install | Delete app, rebuild |
| Metro error | Kill Metro, restart |

---

## 📋 Report

```
Device: Okihita's iPhone
iOS: 26.2

[ ] Launch - Pass/Fail
[ ] SQLite - Pass/Fail
[ ] Llama - Pass/Fail
[ ] Stress - Pass/Fail
```

---

**Full guide:** See `IOS_TESTING.md`
