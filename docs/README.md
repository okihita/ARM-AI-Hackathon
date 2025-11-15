# G-CAV-RN: ARM-Optimized On-Device AI

**Government Civic Assistant with Vector RAG on React Native**

Proving 3-5x ARM GPU acceleration for on-device AI through a privacy-first hybrid system.

---

## 🎯 Goal

Run sophisticated AI models efficiently on mobile devices using ARM GPU acceleration. 100% offline, privacy-first.

---

## 🏗️ Architecture

```
CLOUD (GCP)                          MOBILE (React Native)
┌─────────────────┐                 ┌─────────────────┐
│ Raw Documents   │                 │   sqlite-vec    │
│       ↓         │    1.22GB       │   (Vector DB)   │
│ Data Processor  │   Download      │        ↓        │
│       ↓         │   ────────→     │   RAG Service   │
│ Package Builder │                 │        ↓        │
│       ↓         │                 │    llama.rn     │
│   GCS + CDN     │                 │   (LLM Engine)  │
└─────────────────┘                 └─────────────────┘
                                             ↓
                                    ARM GPU (Metal/OpenCL)
                                    3-5x faster than CPU
```

---

## 📊 Status (2025-11-15 19:00)

**Overall: 40% Complete**

| Component | Progress | Status |
|-----------|----------|--------|
| Backend | 70% | ✅ Deployed & tested |
| Mobile | 15% | 🔴 App initialized, needs device testing |
| Docs | 90% | ✅ Complete |

### What Works ✅
- GCP infrastructure (15 resources)
- Package builder service
- Data processor job
- React Native app with native modules
- RAG services (mock)

### What's Missing ❌
- Real device testing
- Model download (Phi-3-mini Q2_K)
- GPU acceleration validation
- End-to-end RAG integration

---

## 🚀 Quick Start

### Mobile App
```bash
cd GCAVRN
npm install
cd ios && pod install
xed .  # Open Xcode, run on device
```

See `GCAVRN/SETUP.md` for detailed instructions.

### Backend
```bash
cd gcp-data-factory
terraform apply
gcloud run deploy package-builder --source ./package-builder-service
```

---

## 📁 Project Structure

```
ARM-AI-Hackathon/
├── GCAVRN/                    # Mobile app
│   ├── App.tsx                # Test UI
│   └── src/services/          # RAG logic
├── gcp-data-factory/          # Backend
│   ├── main.tf                # Infrastructure
│   ├── data-processor-job/    # Doc processing
│   └── package-builder-service/
└── docs/
    ├── README.md              # This file
    ├── PROJECT_MAP.md         # Navigation guide
    ├── CHANGELOG.md           # Development log
    └── SETUP.md               # Mobile setup
```

See `PROJECT_MAP.md` for complete navigation.

---

## 🎬 Demo Flow (5 min)

1. **Architecture** (1 min) - Hybrid cloud-edge pattern
2. **Backend** (1 min) - Upload doc → build package
3. **Mobile** (2 min) - Load package → RAG queries → streaming
4. **Performance** (1 min) - GPU vs CPU benchmark

---

## 🔑 Key Features

**Cloud**: Multi-modal processing, vector embeddings, CDN distribution  
**Mobile**: 100% offline, GPU accelerated, privacy-first, 1.2GB model

---

## 📈 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Inference (iOS) | 15-25 tok/s | ⏳ Not tested |
| GPU speedup | 3-5x vs CPU | ⏳ Not tested |
| Memory | < 3GB | ⏳ Not tested |
| Download | 1.22GB | ✅ Optimized |
| Offline | 100% | ⏳ Not tested |

---

## 🔧 Tech Stack

**Backend**: Terraform, GCP Cloud Run, Vertex AI  
**Mobile**: React Native, llama.cpp, sqlite-vec  
**Model**: Phi-3-mini Q2_K (1.2GB)

---

## 🎯 Next Steps

**P0 (Critical)**
1. Test on real iOS device
2. Download Phi-3-mini Q2_K model
3. Validate GPU acceleration
4. Integrate RAG pipeline

See `GCAVRN/SETUP.md` for instructions.

---

## 📚 Documentation

- `PROJECT_MAP.md` - Navigation guide
- `SPECIFICATION_FINAL.md` - Technical spec
- `MVP_STATUS.md` - Implementation status
- `CHANGELOG.md` - Development history
- `DOCS_AUDIT.md` - Issues & risks

---

## 💰 Cost

**Production**: ~$45-100/month  
**Development**: ~$10-20/month

---

**Status**: 🚧 40% Complete  
**Last Updated**: 2025-11-15 19:00  
**Next**: Mobile device testing
