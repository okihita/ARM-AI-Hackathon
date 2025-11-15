# Android Device Testing Guide

**Simple manual testing flows for non-technical users**

---

## 📱 Prerequisites

- Android phone (Android 8.0+)
- USB cable
- Computer with Android Studio or `adb` installed

---

## 🚀 Setup (One-time)

### 1. Enable Developer Mode on Phone

1. Open **Settings** → **About Phone**
2. Tap **Build Number** 7 times
3. Go back → **Developer Options** → Enable **USB Debugging**

### 2. Connect Phone to Computer

```bash
# Check device connected
adb devices

# Should show:
# List of devices attached
# ABC123XYZ    device
```

### 3. Install App

```bash
cd GCAVRN
npm install
npx react-native run-android
```

Wait 2-3 minutes for build and install.

---

## ✅ Test Flows

### Test 1: App Launch (Happy Path)

**Steps:**
1. Open "GCAVRN" app on phone
2. See title "G-CAV-RN Test"
3. See status "Ready"
4. See two buttons: "Test SQLite" and "Test Llama"

**Expected:**
- ✅ App opens without crash
- ✅ UI displays correctly
- ✅ Buttons are clickable

**If fails:**
- ❌ App crashes → Check logs: `adb logcat | grep ReactNative`
- ❌ White screen → Wait 30s, shake phone, tap "Reload"

---

### Test 2: SQLite Database (Happy Path)

**Steps:**
1. Tap **"Test SQLite"** button
2. Watch status change to "Testing SQLite..."
3. See logs appear:
   - "Opening database..."
   - "Creating table..."
   - "Inserting data..."
   - "Querying data..."
   - "Result: [...]"
4. Status changes to "✅ SQLite working!"

**Expected:**
- ✅ Status updates in real-time
- ✅ Logs show each step
- ✅ Final status is green checkmark
- ✅ Result shows: `{"id":1,"text":"Hello ARM!"}`

**If fails:**
- ❌ Status shows "❌ SQLite failed"
- ❌ Check logs for error message
- ❌ Common issue: File permissions → Reinstall app

---

### Test 3: Llama Initialization (Expected Failure)

**Steps:**
1. Tap **"Test Llama"** button
2. Watch status change to "Testing Llama..."
3. See log: "Initializing llama.rn..."
4. Status changes to "⚠️ Need model file"

**Expected:**
- ✅ Status shows warning (not error)
- ✅ Log shows initialization attempt
- ✅ App doesn't crash

**Why it fails:**
- No model file downloaded yet (this is expected)
- We'll add model in next test

---

### Test 4: Multiple SQLite Operations (Happy Path)

**Steps:**
1. Tap **"Test SQLite"** 3 times quickly
2. Watch logs accumulate
3. Each tap should add new entries

**Expected:**
- ✅ Each tap creates new log entries
- ✅ Database handles multiple operations
- ✅ No crashes or freezes

**If fails:**
- ❌ App freezes → Database locked
- ❌ Restart app and try again

---

### Test 5: App Backgrounding (Happy Path)

**Steps:**
1. Tap **"Test SQLite"** button
2. While logs are appearing, press **Home** button
3. Wait 5 seconds
4. Open app again from recent apps

**Expected:**
- ✅ App resumes where you left off
- ✅ Logs are still visible
- ✅ Status is preserved

**If fails:**
- ❌ App restarts → Memory issue
- ❌ Check device RAM (need 2GB+ free)

---

### Test 6: Rapid Button Tapping (Stress Test)

**Steps:**
1. Tap **"Test SQLite"** 10 times rapidly
2. Watch logs scroll
3. Wait for all operations to complete

**Expected:**
- ✅ All operations complete
- ✅ No crashes
- ✅ Logs show all 10 operations

**If fails:**
- ❌ App crashes → Memory leak
- ❌ Some operations missing → Race condition

---

### Test 7: App Rotation (Happy Path)

**Steps:**
1. Tap **"Test SQLite"** button
2. While logs are showing, rotate phone
3. Rotate back to portrait

**Expected:**
- ✅ UI adjusts to landscape/portrait
- ✅ Logs remain visible
- ✅ Status is preserved

**If fails:**
- ❌ Logs disappear → State not preserved
- ❌ App crashes → Layout issue

---

### Test 8: Clear Logs (Manual)

**Steps:**
1. Tap **"Test SQLite"** multiple times
2. Close app completely (swipe away from recent apps)
3. Reopen app

**Expected:**
- ✅ Logs are cleared
- ✅ Status back to "Ready"
- ✅ Fresh start

---

## 🐛 Error Scenarios

### Error 1: Database Permission Denied

**Trigger:**
- First time running app on some devices

**Symptoms:**
- Status: "❌ SQLite failed"
- Log: "Error: unable to open database file"

**Fix:**
```bash
# Reinstall app
adb uninstall com.gcavrn
npx react-native run-android
```

---

### Error 2: Native Module Not Found

**Trigger:**
- Incomplete installation

**Symptoms:**
- Status: "❌ SQLite failed"
- Log: "Error: Cannot find module 'op-sqlite'"

**Fix:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

---

### Error 3: App Crashes on Launch

**Trigger:**
- Build issues

**Symptoms:**
- App opens then immediately closes

**Fix:**
```bash
# Check logs
adb logcat | grep -i error

# Rebuild
cd android
./gradlew clean
cd ..
npx react-native run-android
```

---

### Error 4: Buttons Don't Respond

**Trigger:**
- UI thread blocked

**Symptoms:**
- Tapping buttons does nothing
- App seems frozen

**Fix:**
1. Shake phone
2. Tap "Reload"
3. If still frozen, force close and reopen

---

## 📊 Test Results Template

Copy this and fill in your results:

```
ANDROID DEVICE TESTING RESULTS
Date: ___________
Device: ___________
Android Version: ___________

Test 1 - App Launch:           [ ] Pass  [ ] Fail
Test 2 - SQLite Database:      [ ] Pass  [ ] Fail
Test 3 - Llama Init:           [ ] Pass  [ ] Fail
Test 4 - Multiple Operations:  [ ] Pass  [ ] Fail
Test 5 - Backgrounding:        [ ] Pass  [ ] Fail
Test 6 - Rapid Tapping:        [ ] Pass  [ ] Fail
Test 7 - App Rotation:         [ ] Pass  [ ] Fail
Test 8 - Clear Logs:           [ ] Pass  [ ] Fail

Errors encountered:
_________________________________
_________________________________

Notes:
_________________________________
_________________________________
```

---

## 🎯 Success Criteria

**Minimum to pass:**
- ✅ Test 1: App Launch
- ✅ Test 2: SQLite Database
- ✅ Test 3: Llama Init (warning is OK)

**Full pass:**
- ✅ All 8 tests pass
- ✅ No crashes
- ✅ All features work as expected

---

## 📸 Screenshots to Capture

1. App launch screen
2. SQLite test success
3. Llama test warning
4. Logs scrolling
5. Any errors encountered

---

## 🔍 Debug Commands

```bash
# View real-time logs
adb logcat | grep ReactNative

# View app info
adb shell dumpsys package com.gcavrn

# Clear app data
adb shell pm clear com.gcavrn

# Uninstall app
adb uninstall com.gcavrn

# Reinstall app
npx react-native run-android
```

---

## 📝 Next Steps After Testing

If all tests pass:
1. Document device specs (model, Android version, RAM)
2. Take screenshots
3. Move to model download testing
4. Test GPU acceleration

See `SETUP.md` for next phase.
