# G-CAV-RN: ARM-Optimized On-Device AI

**Government Civic Assistant with Vector RAG on React Native**

Proving 3-5x ARM GPU acceleration for on-device AI through a privacy-first hybrid system.

---

## 📁 Monorepo Structure

```
ARM-AI-Hackathon/
├── backend/          # GCP infrastructure (Terraform, Cloud Run)
├── mobile/           # React Native app (iOS + Android)
└── docs/             # Documentation
```

---

## 🚀 Quick Start

### Backend (GCP)
```bash
cd backend
terraform init
terraform apply
```

### Mobile (React Native)
```bash
cd mobile
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

---

## 📊 Status

**Overall: 45% Complete**

- Backend: 70% ✅
- Mobile: 25% ✅
- Docs: 90% ✅

See `docs/STATUS.md` for details.

---

## 📚 Documentation

- [Project Map](docs/PROJECT_MAP.md) - Navigation guide
- [Status](docs/STATUS.md) - Current progress
- [Changelog](docs/CHANGELOG.md) - Development history
- [Specification](docs/SPECIFICATION.md) - Technical spec

---

## 🎯 Goal

Run sophisticated AI models efficiently on mobile devices using ARM GPU acceleration. 100% offline, privacy-first.

---

**Last Updated:** 2025-11-16  
**Next:** Model integration & GPU benchmarking
