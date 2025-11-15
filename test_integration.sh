#!/bin/bash
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           INTEGRATION TEST SUITE                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

PASS=0
FAIL=0

# Test 1: Data Processor
echo "Test 1: Data Processor Job"
cd ~/ArcaneSanctum/ARM-AI-Hackathon/gcp-data-factory/data-processor-job
if python3 test_local.py 2>&1 | grep -q "TEST COMPLETE"; then
    echo "✅ PASS"
    ((PASS++))
else
    echo "❌ FAIL"
    ((FAIL++))
fi

# Test 2: Package Builder
echo "Test 2: Package Builder Service"
cd ~/ArcaneSanctum/ARM-AI-Hackathon/gcp-data-factory/package-builder-service
if python3 main.py 2>&1 | grep -q "Database contains 5 records"; then
    echo "✅ PASS"
    ((PASS++))
else
    echo "❌ FAIL"
    ((FAIL++))
fi

# Test 3: Database integrity
echo "Test 3: Database Integrity"
if sqlite3 /tmp/data.sqlite "SELECT COUNT(*) FROM civic_data;" 2>&1 | grep -q "5"; then
    echo "✅ PASS"
    ((PASS++))
else
    echo "❌ FAIL"
    ((FAIL++))
fi

# Test 4: Compression
echo "Test 4: Compression & Extraction"
LATEST_GZ=$(ls -t /tmp/data.sqlite.v*.gz 2>/dev/null | head -1)
if [ -n "$LATEST_GZ" ] && gunzip -c "$LATEST_GZ" > /tmp/test_extract.db 2>/dev/null && sqlite3 /tmp/test_extract.db "SELECT COUNT(*) FROM civic_data;" 2>&1 | grep -q "5"; then
    echo "✅ PASS"
    ((PASS++))
    rm -f /tmp/test_extract.db
else
    echo "❌ FAIL"
    ((FAIL++))
fi

# Test 5: RAG Pipeline
echo "Test 5: RAG Pipeline Logic"
cd ~/ArcaneSanctum/ARM-AI-Hackathon/gcav-rn
if node src/test.js 2>&1 | grep -q "Test Complete"; then
    echo "✅ PASS"
    ((PASS++))
else
    echo "❌ FAIL"
    ((FAIL++))
fi

# Test 6: Terraform state
echo "Test 6: Infrastructure State"
cd ~/ArcaneSanctum/ARM-AI-Hackathon/gcp-data-factory
RESOURCES=$(terraform show -json 2>/dev/null | jq -r '.values.root_module.resources | length' 2>&1)
if [ "$RESOURCES" = "18" ]; then
    echo "✅ PASS"
    ((PASS++))
else
    echo "❌ FAIL (found $RESOURCES resources)"
    ((FAIL++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "RESULTS: $PASS/6 passed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -eq 0 ]; then
    echo "✅ ALL TESTS PASSED"
    exit 0
else
    echo "❌ $FAIL TEST(S) FAILED"
    exit 1
fi
