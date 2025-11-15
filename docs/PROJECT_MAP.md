# G-CAV-RN Project Map

```
ARM-AI-Hackathon/
│
├── 📱 MOBILE APP (React Native)
│   └── GCAVRN/
│       ├── App.tsx                    # Test UI (SQLite + Llama validation)
│       ├── src/services/
│       │   ├── DatabaseService.ts     # SQLite wrapper
│       │   ├── LlamaService.ts        # LLM inference
│       │   └── RAGService.ts          # RAG orchestration
│       ├── ios/                       # iOS native (79 pods)
│       ├── android/                   # Android native
│       └── SETUP.md                   # Next steps guide
│
├── ☁️ BACKEND (GCP)
│   └── gcp-data-factory/
│       ├── main.tf                    # Infrastructure (15 resources)
│       ├── iam.tf                     # Permissions
│       ├── data-processor-job/
│       │   ├── main.py                # Process docs → SQLite
│       │   └── Dockerfile
│       └── package-builder-service/
│           ├── main.py                # Build + compress packages
│           └── Dockerfile
│
├── 📚 DOCUMENTATION
│   ├── README.md                      # Project overview ⭐ START HERE
│   ├── PROJECT_MAP.md                 # This file (navigation)
│   ├── SPECIFICATION_FINAL.md         # Technical spec
│   ├── MVP_STATUS.md                  # Implementation status
│   ├── CHANGELOG.md                   # Development log
│   └── DOCS_AUDIT.md                  # Issues & risks
│
└── 🧪 TESTING
    ├── test_integration.sh            # Backend tests
    └── VALIDATION_REPORT.md           # Test results
```

## 🎯 Quick Navigation

**Want to...**
- **Understand the project?** → `README.md`
- **See current status?** → `MVP_STATUS.md` or `CHANGELOG.md`
- **Run mobile app?** → `GCAVRN/SETUP.md`
- **Deploy backend?** → `gcp-data-factory/main.tf`
- **Check what works?** → `VALIDATION_REPORT.md`
- **Find issues?** → `DOCS_AUDIT.md`

## 📊 Status (2025-11-15 19:00)

| Component | Status | Files |
|-----------|--------|-------|
| Backend | 70% ✅ | gcp-data-factory/ |
| Mobile | 15% 🔴 | GCAVRN/ |
| Docs | 90% ✅ | *.md |
| Tests | 60% ⚠️ | test_integration.sh |

## 🔑 Key Files

1. **README.md** - Start here
2. **GCAVRN/App.tsx** - Mobile test app
3. **gcp-data-factory/main.tf** - Infrastructure
4. **CHANGELOG.md** - What happened when
5. **PROJECT_MAP.md** - You are here

## 🚀 Next Steps

See `GCAVRN/SETUP.md` for mobile testing instructions.
