# Build Fix for Sandbox Error

**Error:** `Sandbox: bash deny(1) file-write-create ip.txt`

This is a Metro bundler permission issue with CLI builds.

## ✅ Solution: Build from Xcode

### Steps:

1. **Start Metro bundler separately:**
```bash
cd /Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/GCAVRN
npx react-native start
```
Leave this terminal running.

2. **Open Xcode (in new terminal):**
```bash
cd ios
open GCAVRN.xcworkspace
```

3. **In Xcode:**
   - Select **"Okihita's iPhone"** from device dropdown (top bar)
   - Press **Run** button (▶️) or `Cmd+R`
   - Wait 2-3 minutes for build

4. **App should launch on iPhone**

## Alternative: Disable Metro IP file

If still fails, edit `node_modules/react-native/scripts/react-native-xcode.sh`:

Find line with `ip.txt` and comment it out. But try Xcode method first.

## Expected Result

App launches on iPhone with:
- Title: "G-CAV-RN Test"
- Status: "Ready"
- Two buttons: "Test SQLite" and "Test Llama"
