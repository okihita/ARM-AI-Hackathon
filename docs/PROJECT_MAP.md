# G-CAV-RN Project Map

```
ARM-AI-Hackathon/
│
├── 📱 mobile/                         # React Native app
│   ├── App.tsx                        # Test UI (SQLite + Llama validation)
│   ├── src/
│   │   ├── DatabaseService.ts         # SQLite wrapper
│   │   ├── LlamaService.ts            # LLM inference
│   │   └── RAGService.ts              # RAG orchestration
│   ├── ios/                           # iOS native (79 pods)
│   ├── android/                       # Android native
│   ├── TESTING.md                     # Manual test guide
│   └── ANDROID_TEST_RESULTS.md        # Test results
│
├── ☁️ backend/                        # GCP infrastructure
│   ├── main.tf                        # Infrastructure (15 resources)
│   ├── iam.tf                         # Permissions
│   ├── data-processor-job/
│   │   ├── main.py                    # Process docs → SQLite
│   │   └── Dockerfile
│   └── package-builder-service/
│       ├── main.py                    # Build + compress packages
│       └── Dockerfile
│
└── 📚 docs/                           # Documentation
    ├── README.md                      # Quick overview
    ├── PROJECT_MAP.md                 # This file (navigation)
    ├── SPECIFICATION.md               # Technical spec
    ├── STATUS.md                      # Implementation status
    └── CHANGELOG.md                   # Development log
```

## 🎯 Quick Navigation

**Want to...**
- **Understand the project?** → `/README.md` (root)
- **See current status?** → `docs/STATUS.md`
- **Run mobile app?** → `mobile/TESTING.md`
- **Deploy backend?** → `backend/main.tf`
- **Check test results?** → `mobile/ANDROID_TEST_RESULTS.md`

## 📊 Status (2025-11-16 02:20)

| Component | Status | Path |
|-----------|--------|------|
| Backend | 70% ✅ | backend/ |
| Mobile | 25% ✅ | mobile/ |
| Docs | 90% ✅ | docs/ |

## 🔑 Key Files

1. **/README.md** - Start here
2. **mobile/App.tsx** - Mobile test app
3. **backend/main.tf** - Infrastructure
4. **docs/CHANGELOG.md** - Development history
5. **docs/PROJECT_MAP.md** - You are here
