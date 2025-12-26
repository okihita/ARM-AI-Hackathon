#!/bin/bash

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

echo "📱 G-CAV-RN Test Runner"
echo "======================="
echo ""
echo "App is running on Android emulator."
echo "Please tap buttons in this order:"
echo ""
echo "1. TEST TOUCH"
echo "2. Test SQLite"
echo "3. Load Model (wait ~10 sec)"
echo "4. Test Inference (wait ~30 sec)"
echo "5. 🚀 GPU Benchmark (wait ~2 min)"
echo ""
echo "Monitoring logs..."
echo "======================="
echo ""

adb logcat -c
adb logcat | grep -E "(testSQLite|testTouch|Model loaded|Inference|Benchmark|tok/s|✅|❌)" --line-buffered
