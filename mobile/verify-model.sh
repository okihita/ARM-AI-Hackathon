#!/bin/bash

MODEL_PATH="./assets/models/phi-3-mini-q4.gguf"

echo "🔍 Verifying Phi-3 Model..."
echo ""

if [ -f "$MODEL_PATH" ]; then
    SIZE=$(du -h "$MODEL_PATH" | cut -f1)
    echo "✅ Model found: $MODEL_PATH"
    echo "📦 Size: $SIZE"
    echo ""
    echo "Model details:"
    echo "  - Name: Phi-3-mini-4k-instruct"
    echo "  - Quantization: Q4_K_M"
    echo "  - Context: 4096 tokens"
    echo "  - Parameters: ~3.8B"
    echo ""
    echo "Ready for testing! 🚀"
else
    echo "❌ Model not found at $MODEL_PATH"
    echo ""
    echo "Download with:"
    echo "  curl -L -o $MODEL_PATH https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf"
fi
