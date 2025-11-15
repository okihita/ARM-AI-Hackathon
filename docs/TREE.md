# Project Tree

```
ARM-AI-Hackathon/
│
├── 📱 MOBILE APP
│   └── GCAVRN/
│       ├── App.tsx                    # Test UI
│       ├── SETUP.md                   # Setup guide
│       ├── package.json
│       ├── src/
│       │   └── services/
│       │       ├── DatabaseService.ts # SQLite wrapper
│       │       ├── LlamaService.ts    # LLM inference
│       │       └── RAGService.ts      # RAG orchestration
│       ├── ios/                       # iOS native (79 pods)
│       └── android/                   # Android native
│
├── ☁️ BACKEND
│   └── gcp-data-factory/
│       ├── main.tf                    # Infrastructure (15 resources)
│       ├── iam.tf                     # IAM roles
│       ├── variables.tf
│       ├── data-processor-job/
│       │   ├── main.py                # Process docs → SQLite
│       │   ├── Dockerfile
│       │   └── requirements.txt
│       └── package-builder-service/
│           ├── main.py                # Build + compress packages
│           ├── Dockerfile
│           └── requirements.txt
│
├── 📚 DOCUMENTATION
│   ├── README.md                      # ⭐ START HERE
│   ├── PROJECT_MAP.md                 # Navigation guide
│   ├── STATUS.md                      # Current progress
│   ├── DOCS_INDEX.md                  # This file
│   ├── TREE.md                        # Visual structure
│   ├── CHANGELOG.md                   # Development log
│   ├── MVP_STATUS.md                  # Implementation details
│   ├── SPECIFICATION_FINAL.md         # Technical spec
│   ├── DOCS_AUDIT.md                  # Issues & risks
│   ├── DOWNLOAD_OPTIMIZATION.md       # Size analysis
│   └── docs/
│       └── archive/                   # Old planning docs
│
└── 🧪 TESTING
    ├── test_integration.sh            # Backend tests
    └── VALIDATION_REPORT.md           # Test results
```

## 📊 File Statistics

| Category | Files | Lines | Status |
|----------|-------|-------|--------|
| Mobile | 4 | ~200 | 15% ✅ |
| Backend | 6 | ~500 | 70% ✅ |
| Docs | 11 | ~2000 | 90% ✅ |
| Tests | 2 | ~300 | 60% ⚠️ |

## 🎯 Key Files

1. **README.md** - Start here
2. **GCAVRN/App.tsx** - Mobile test app
3. **gcp-data-factory/main.tf** - Infrastructure
4. **STATUS.md** - Current progress
5. **GCAVRN/SETUP.md** - Next steps

## 🔗 Quick Links

- Mobile setup: `GCAVRN/SETUP.md`
- Backend deploy: `gcp-data-factory/main.tf`
- Current status: `STATUS.md`
- Full history: `CHANGELOG.md`
- Issues: `DOCS_AUDIT.md`
