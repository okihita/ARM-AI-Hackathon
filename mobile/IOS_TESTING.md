# iOS Device Testing Guide

**iPhone detected: Okihita's iPhone (iOS 26.2)**

---

## 🚀 Setup (One-time)

### 1. Configure Signing in Xcode

```bash
cd ios
open GCAVRN.xcworkspace
```

**In Xcode:**
1. Select **GCAVRN** project (blue icon)
2. Select **GCAVRN** target
3. Go to **Signing & Capabilities** tab
4. Check **"Automatically manage signing"**
5. Select your **Team** from dropdown
6. Wait for provisioning profile to generate

### 2. Build and Run

**Option A: From Xcode (Recommended)**
1. Select **Okihita's iPhone** from device dropdown (top bar)
2. Press **Run** button (▶️) or `Cmd+R`
3. Wait 2-3 minutes for build
4. App will install and launch on iPhone

**Option B: From Terminal**
```bash
cd /Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/GCAVRN
npx react-native run-ios --udid 00008120-0004686926E2601E
```

---

## ✅ Quick Test (3 min)

### Test 1: App Launch (30 sec)
**On iPhone:**
1. App should open automatically
2. See "G-CAV-RN Test" title
3. See status "Ready"
4. See two buttons

**Expected:**
- ✅ App opens without crash
- ✅ UI displays correctly

**If fails:**
- ❌ Check Xcode console for errors
- ❌ Shake iPhone → Reload

---

### Test 2: SQLite Database (1 min)
**On iPhone:**
1. Tap **"Test SQLite"** button
2. Watch status change to "Testing SQLite..."
3. See logs appear on screen
4. Status changes to "✅ SQLite working!"

**Expected:**
- ✅ Logs show:
  - "Opening database..."
  - "Creating table..."
  - "Inserting data..."
  - "Querying data..."
  - "Result: [{"id":1,"text":"Hello ARM!"}]"
- ✅ Final status: "✅ SQLite working!"

**If fails:**
- ❌ Status shows "❌ SQLite failed"
- ❌ Check Xcode console
- ❌ Reinstall app

---

### Test 3: Llama Initialization (30 sec)
**On iPhone:**
1. Tap **"Test Llama"** button
2. Watch status change to "Testing Llama..."
3. See log: "Initializing llama.rn..."
4. Status changes to "⚠️ Need model file"

**Expected:**
- ✅ Status shows warning (not error)
- ✅ App doesn't crash
- ⚠️ This is expected - no model downloaded yet

---

### Test 4: Stress Test (1 min)
**On iPhone:**
1. Tap **"Test SQLite"** 5 times quickly
2. Watch logs accumulate
3. All operations should complete

**Expected:**
- ✅ All 5 operations complete
- ✅ No crashes or freezes
- ✅ Logs show all operations

---

## 📊 Test Results

```
iOS DEVICE TESTING RESULTS
Date: 2025-11-15 22:54
Device: Okihita's iPhone
iOS Version: 26.2 (iOS 18 beta)

Test 1 - App Launch:           [ ] Pass  [ ] Fail
Test 2 - SQLite Database:      [ ] Pass  [ ] Fail
Test 3 - Llama Init:           [ ] Pass  [ ] Fail
Test 4 - Stress Test:          [ ] Pass  [ ] Fail

Notes:
_________________________________
```

---

## 🐛 Common Issues

### Issue 1: Signing Error
**Error:** "Signing for GCAVRN requires a development team"

**Fix:**
1. Open Xcode
2. Select GCAVRN target
3. Signing & Capabilities
4. Select your Team
5. Rebuild

---

### Issue 2: App Crashes on Launch
**Symptoms:** App opens then closes immediately

**Fix:**
1. Check Xcode console for errors
2. Clean build: `Cmd+Shift+K`
3. Rebuild: `Cmd+R`

---

### Issue 3: "Unable to install"
**Error:** Installation failed

**Fix:**
1. Delete app from iPhone
2. In Xcode: Product → Clean Build Folder
3. Rebuild and run

---

### Issue 4: Metro Bundler Error
**Error:** "Metro bundler has encountered an error"

**Fix:**
```bash
# Kill Metro
pkill -f metro

# Restart
cd GCAVRN
npx react-native start --reset-cache
```

Then rebuild in Xcode.

---

## 🔍 Debug Commands

**View Xcode logs:**
- Xcode → View → Debug Area → Show Debug Area
- Or press `Cmd+Shift+Y`

**View Metro bundler:**
```bash
cd GCAVRN
npx react-native start
```

**Clean build:**
```bash
cd ios
rm -rf build
pod install
```

---

## 📸 Screenshots to Capture

1. App launch screen
2. SQLite test success (with logs)
3. Llama test warning
4. Stress test (multiple logs)
5. Any errors

---

## 🎯 Success Criteria

**Minimum:**
- ✅ App launches
- ✅ SQLite test passes
- ✅ Llama shows warning (not crash)

**Full Pass:**
- ✅ All 4 tests pass
- ✅ No crashes
- ✅ Smooth performance

---

## 📱 Device Info

- **Device:** Okihita's iPhone
- **UDID:** 00008120-0004686926E2601E
- **iOS:** 26.2 (iOS 18 beta)
- **Architecture:** ARM64 (Apple Silicon)

---

## 🚀 Next Steps

After all tests pass:
1. Document performance (smooth/laggy)
2. Take screenshots
3. Download Phi-3-mini Q2_K model (1.2GB)
4. Test GPU acceleration
5. Benchmark tokens/second

See `SETUP.md` for model download instructions.
