# Download Size Optimization for Live Demo

**Current**: 2.5GB initial download  
**Goal**: Minimize for live demo (installation → working app)

---

## Current Breakdown

| Component | Size | Required? | Notes |
|-----------|------|-----------|-------|
| **Phi-3-mini Q4_K_M** | 2.3GB | ✅ Yes | LLM model |
| **SQLite database** | ~50-200MB | ✅ Yes | Civic data + vectors |
| **Total** | **~2.5GB** | | |

---

## Optimization Strategies

### Option 1: Smaller Model (Fastest Demo)
**Use**: Phi-3-mini Q2_K (1.2GB instead of 2.3GB)

**Pros**:
- 50% smaller download (1.2GB + 50MB = **1.25GB total**)
- Still demonstrates ARM GPU acceleration
- Faster download for live demo

**Cons**:
- Lower quality responses
- Less impressive for judges

**Recommendation**: ✅ **Best for live demo**

---

### Option 2: Minimal Dataset
**Use**: 10-20 civic documents instead of full dataset

**Pros**:
- Database: 200MB → **10-20MB**
- Total: 2.3GB + 20MB = **2.32GB**
- Still functional RAG demo

**Cons**:
- Limited query coverage
- Minimal size savings

**Recommendation**: ⚠️ Do this anyway (faster processing)

---

### Option 3: Progressive Download
**Use**: Two-stage download

**Stage 1 (Immediate)**: Tiny model + minimal data (~300MB)
- Phi-2 Q4_K_M (1.6B params, ~900MB) OR
- TinyLlama Q4_K_M (1.1B params, ~600MB)
- 10 sample documents (~5MB)

**Stage 2 (Background)**: Full model + dataset
- Downloads while user explores
- Seamless upgrade

**Pros**:
- App usable in 1-2 minutes
- Better demo experience
- Shows progressive enhancement

**Cons**:
- More complex implementation
- Need 2 models

**Recommendation**: ⚠️ Good but complex for hackathon

---

### Option 4: Pre-installed Demo Mode
**Use**: Bundle minimal data in app, download model only

**Included in app bundle**:
- 5-10 sample civic Q&A pairs (~1MB)
- Hardcoded responses for demo queries

**Download on first run**:
- Model only (2.3GB)

**Pros**:
- App works immediately (demo mode)
- Clear "downloading AI model" progress
- Judges can see UI instantly

**Cons**:
- Not true RAG until download completes
- Feels like smoke & mirrors

**Recommendation**: ⚠️ Backup plan if download fails

---

## Recommended Approach for Live Demo

### **Hybrid: Smaller Model + Minimal Dataset**

**Download**: 1.2GB + 20MB = **1.22GB total**

**Components**:
1. **Phi-3-mini Q2_K** (1.2GB)
   - Still 3.8B parameters
   - 2-bit quantization
   - GPU acceleration still works
   - Quality: Good enough for demo

2. **Minimal civic dataset** (20MB)
   - 20-30 documents
   - ~500-1000 text chunks
   - Covers common queries:
     - City hall hours
     - Permit applications
     - Emergency services
     - Public transportation
     - Library services

**Demo flow**:
1. Install app (30 seconds)
2. Download package (1-2 minutes on good WiFi)
3. Extract and load (30 seconds)
4. **Ready to demo** (3-4 minutes total)

---

## Size Comparison

| Approach | Download | Time (50 Mbps) | Demo Ready |
|----------|----------|----------------|------------|
| Current (Q4_K_M + full) | 2.5GB | 6-7 min | ⚠️ Too slow |
| **Recommended (Q2_K + minimal)** | **1.22GB** | **3-4 min** | ✅ **Acceptable** |
| Progressive (TinyLlama first) | 300MB + 2.2GB | 1 min + bg | ✅ Good UX |
| Pre-installed demo | 2.3GB | 5-6 min | ⚠️ Fake demo |

---

## Implementation Changes

### 1. Use Q2_K Model
```bash
# Download smaller quantization
wget https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q2_k.gguf
```

### 2. Limit Dataset
Update package builder to use only 20-30 documents:
```python
# In package-builder-service/main.py
MAX_DOCUMENTS = 30  # Limit for demo
```

### 3. Show Progress
Add download progress UI:
```typescript
// In mobile app
<ProgressBar 
  progress={downloadProgress} 
  label="Downloading AI model (1.2GB)..."
/>
```

---

## Alternative: On-Site Pre-load

**If demo venue has WiFi issues**:

1. **Pre-download on device** before demo day
2. **Use demo device** with package already loaded
3. **Show installation video** for judges
4. **Focus on** ARM GPU performance metrics

---

## Recommendation

✅ **Use Q2_K model + minimal dataset (1.22GB)**

**Why**:
- 50% faster download than current
- Still demonstrates ARM optimization
- Functional RAG pipeline
- Acceptable for 5-minute demo
- Fallback: Pre-load on demo device

**Next steps**:
1. Download Phi-3-mini Q2_K model
2. Limit package builder to 30 documents
3. Test download time on typical WiFi
4. Prepare pre-loaded backup device
