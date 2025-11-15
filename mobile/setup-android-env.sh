#!/bin/bash

# Android Environment Setup Script
# Run this before testing: source setup-android-env.sh

echo "🔧 Setting up Android environment..."

# Set Android SDK paths
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/tools"
export PATH="$PATH:$ANDROID_HOME/tools/bin"

echo "✅ ANDROID_HOME: $ANDROID_HOME"
echo "✅ PATH updated"

# Check adb
if command -v adb &> /dev/null; then
    echo "✅ adb found: $(which adb)"
    echo ""
    echo "📱 Connected devices:"
    adb devices
else
    echo "❌ adb not found"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Connect Android device via USB"
echo "2. Enable USB debugging on device"
echo "3. Run: adb devices"
echo "4. Run: npx react-native run-android"
