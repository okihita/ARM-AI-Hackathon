# G-CAV-RN: Technical Specification Document
## GCP-Accelerated Civic Advocate - React Native Edition

**Project**: ARM AI Hackathon Submission  
**Target Platforms**: iOS (without Apple Intelligence), Android  
**Core Objective**: Demonstrate ARM processor optimization for on-device AI inference  
**Architecture**: Hybrid Cloud-to-Edge AI System

---

## 1. EXECUTIVE SUMMARY

### 1.1 Project Vision
G-CAV-RN is a privacy-first, hybrid AI system that implements a "Private Cloud Compute" architecture for civic information access. The system demonstrates state-of-the-art ARM processor optimization by running AI inference entirely on-device while leveraging cloud infrastructure for data processing and distribution.

### 1.2 ARM Optimization Focus
The project's primary technical achievement is **GPU-accelerated on-device AI inference** optimized for ARM processors:
- **iOS**: Leverages Apple Metal API for GPU acceleration on ARM-based Apple Silicon
- **Android**: Utilizes OpenCL backend for Qualcomm Adreno GPU acceleration on ARM SoCs
- **Target**: Achieve 3-5x inference speedup compared to CPU-only execution

### 1.3 On-Device AI Emphasis
All AI inference runs **100% locally on the mobile device**:
- No API calls to cloud LLM services during query processing
- Complete functionality in airplane mode
- Privacy-preserving: user queries never leave the device
- Demonstrates true edge AI capabilities on ARM hardware

---

## 2. SYSTEM ARCHITECTURE

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUD (GCP Backend)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Data Factory │→ │ AI Processing│→ │ CDN Package  │      │
│  │  (Ingest)    │  │ (Gemini/Vec) │  │ Distribution │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ (One-time sync)
┌─────────────────────────────────────────────────────────────┐
│                  EDGE (Mobile Device - ARM)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Native Application                            │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │ sqlite-vec │  │ llama.cpp  │  │ ARM GPU    │    │   │
│  │  │ (Vector DB)│→ │ (Phi-3)    │→ │ (Metal/CL) │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Two-Workstream Development Model

**P1 Workstream (Days 1-7): GCP Data Factory**
- Serverless cloud infrastructure for data processing
- Multi-modal AI processing (text + vision)
- Vector embedding generation
- Package building and CDN distribution

**P0 Workstream (Days 8-14): React Native ARM Client**
- Cross-platform mobile application
- On-device AI inference with ARM optimization
- Offline-first RAG (Retrieval-Augmented Generation)
- Hybrid cloud-edge synchronization

---

## 3. TECHNOLOGY STACK

### 3.1 Mobile Application Stack

| Component | Technology | ARM Optimization |
|-----------|-----------|------------------|
| **Framework** | React Native | Native ARM compilation |
| **LLM Engine** | llama.cpp | Metal (iOS), OpenCL (Android) |
| **RN Binding** | llama.rn | JSI bridge, zero-copy buffers |
| **Model** | Phi-3-mini (3.8B, Q4 GGUF) | Quantized for ARM efficiency |
| **Vector DB** | sqlite-vec | Pure C, ARM-native |
| **RN DB Binding** | @op-engineering/op-sqlite | Turbo modules, JSI |
| **Embeddings** | llama.cpp embedding mode | Unified inference pipeline |
| **File Handling** | react-native-blob-util | Native file I/O |
| **Auth** | Firebase Anonymous Auth | JWT-based API security |

### 3.2 Cloud Infrastructure Stack (GCP)

| Component | Service | Purpose |
|-----------|---------|---------|
| **Storage** | Cloud Storage (GCS) | Raw data + package distribution |
| **Messaging** | Pub/Sub | Event-driven pipeline triggers |
| **Database** | Cloud SQL (PostgreSQL) | Metadata storage |
| **AI Processing** | Vertex AI (Gemini 1.5 Pro Vision) | Multi-modal data extraction |
| **Embeddings** | Vertex AI Embeddings API | Cloud-side vector generation |
| **Vector Search** | Vertex AI Vector Search | Cloud RAG validation |
| **Compute** | Cloud Run (Jobs + Services) | Serverless data processing |
| **Registry** | Artifact Registry | Docker image storage |
| **CI/CD** | Cloud Build | Automated deployments |
| **CDN** | Cloud CDN | Global package distribution |
| **Security** | API Gateway + IAP | Authenticated access |

### 3.3 Critical Dependencies

**React Native Modules:**
```json
{
  "@op-engineering/op-sqlite": "^8.x",
  "llama.rn": "^0.4.x",
  "react-native-blob-util": "^0.19.x",
  "@react-native-firebase/app": "^20.x",
  "@react-native-firebase/auth": "^20.x",
  "react-native-vision-camera": "^4.x"
}
```

**Native Configuration:**
- `op-sqlite`: Requires `sqliteVec: true` in package.json
- `llama.rn`: Requires OpenCL enablement for Android
- iOS: Minimum deployment target iOS 14.0
- Android: ARM64-v8a ABI filter (64-bit ARM only)

---

## 4. ARM PROCESSOR OPTIMIZATION STRATEGY

### 4.1 iOS ARM Optimization (Apple Silicon)

**Metal GPU Acceleration:**
```typescript
// LlamaService initialization
const context = await initLlama({
  model: 'file:///path/to/phi-3-mini-q4.gguf',
  n_gpu_layers: 35,  // Offload layers to Metal GPU
  use_mlock: true,
  embedding: true
});
```

**Key Optimizations:**
- Metal API automatically utilized by llama.cpp on iOS
- 35 transformer layers offloaded to GPU (out of 40 total)
- Increased memory limit capability in Xcode for 3.8B model
- Target devices: iPhone 12+ (A14 Bionic or newer)
- Expected performance: 15-25 tokens/second on A14+

**Build Configuration:**
```ruby
# ios/Podfile
platform :ios, '14.0'
```

### 4.2 Android ARM Optimization (Qualcomm Adreno)

**OpenCL GPU Acceleration:**
```javascript
// app.json (Expo) or gradle.properties (bare RN)
{
  "plugins": [
    ["llama.rn", {
      "enableOpenCL": true
    }]
  ]
}
```

**Key Optimizations:**
- OpenCL backend for Qualcomm Adreno GPUs
- GPU layer offloading: 30-35 layers
- Native library loading: `libOpenCL.so`
- Target devices: Snapdragon 8 Gen 1+ (Adreno 730+)
- Expected performance: 10-20 tokens/second on SD8G1+

**Build Configuration:**
```properties
# android/gradle.properties
rnllamaBuildFromSource=true
rnllamaEnableOpenCL=true
```

```groovy
// android/app/build.gradle
android {
  defaultConfig {
    ndk {
      abiFilters "arm64-v8a"  // ARM 64-bit only
    }
  }
}
```

```xml
<!-- AndroidManifest.xml -->
<application>
  <uses-native-library 
    android:name="libOpenCL.so" 
    android:required="false" />
</application>
```

### 4.3 Model Optimization for ARM

**Phi-3-mini Configuration:**
- Base model: microsoft/Phi-3-mini-4k-instruct
- Quantization: Q4_K_M (4-bit quantized)
- Size: ~2.3GB (vs 7.6GB FP16)
- Context window: 4096 tokens
- ARM-specific optimizations:
  - NEON SIMD instructions (CPU fallback)
  - FP16 arithmetic on GPU
  - Quantized matrix multiplication

**Memory Layout:**
- Model weights: ~2.3GB
- KV cache (4K context): ~400MB
- Runtime overhead: ~200MB
- Total: ~3GB peak memory usage

---

## 5. ON-DEVICE AI ARCHITECTURE

### 5.1 Unified RAG Stack

The application implements a complete RAG pipeline running entirely on-device:

```
User Query → Embedding → Vector Search → Context Retrieval → LLM Generation
     ↓           ↓              ↓                ↓                  ↓
  llama.rn   llama.rn      sqlite-vec       sqlite-vec         llama.rn
              (embed)      (vec_distance)    (SELECT)          (completion)
```

### 5.2 Vector Search Implementation

**Database Schema:**
```sql
CREATE VIRTUAL TABLE vss_index USING vec0(
  text_chunk TEXT,
  source_doc TEXT,
  agency_name TEXT,
  embedding FLOAT[768]  -- Dimension matches embedding model
);
```

**Query Flow:**
```typescript
// 1. Generate query embedding
const queryVector = await LlamaService.embedding(userQuery);

// 2. Vector similarity search
const sql = `
  SELECT text_chunk, source_doc, agency_name,
         vec_distance(embedding, ?) as distance
  FROM vss_index
  ORDER BY distance ASC
  LIMIT 5
`;
const results = await db.execute(sql, [queryVector]);

// 3. Construct context
const context = results.map(r => r.text_chunk).join('\n\n');

// 4. Generate response
const prompt = `<|system|>You are a civic assistant. 
Answer based only on: ${context}<|end|>
<|user|>${userQuery}<|end|>
<|assistant|>`;

const response = await LlamaService.completion(prompt, {
  stream: true,
  n_predict: 512
});
```

### 5.3 Streaming Response Architecture

**Token-by-Token UI Updates:**
```typescript
const stream = await LlamaService.completion(prompt, { 
  stream: true 
});

stream.on('data', (token) => {
  // Update UI immediately with each token
  updateChatMessage(messageId, (prev) => prev + token);
});
```

**Benefits:**
- Perceived latency: <100ms (first token)
- Smooth user experience
- GPU utilization visible to user
- Demonstrates real-time ARM performance

---

## 6. CLOUD-TO-EDGE SYNCHRONIZATION

### 6.1 Data Package Architecture

**Package Contents:**
- `data.sqlite`: Vector database with embeddings
- `phi-3-mini-q4.gguf`: Quantized LLM model
- Total size: ~2.5GB compressed

**Distribution:**
```
GCS Bucket → Cloud CDN → Mobile Device
(g-cav-data-packages-prod)
```

### 6.2 Sync Protocol

**Authentication Flow:**
```typescript
// 1. Anonymous Firebase Auth
await auth().signInAnonymously();
const jwt = await auth().currentUser.getIdToken();

// 2. Check for updates
const response = await fetch('https://api.g-cav.com/check-update', {
  headers: { 'Authorization': `Bearer ${jwt}` }
});
const { latest_version, download_url } = await response.json();

// 3. Download if needed
if (latest_version > currentVersion) {
  await downloadAndExtract(download_url);
}
```

**Download Implementation:**
```typescript
import RNFetchBlob from 'react-native-blob-util';
import { unzip } from 'react-native-zip-archive';

const downloadPath = `${RNFetchBlob.fs.dirs.DocumentDir}/data.sqlite.gz`;

await RNFetchBlob.config({ path: downloadPath })
  .fetch('GET', download_url)
  .progress((received, total) => {
    updateProgress(received / total);
  });

await unzip(downloadPath, RNFetchBlob.fs.dirs.DocumentDir);
```

---

## 7. HYBRID CLOUD-EDGE FEATURES

### 7.1 Multi-Modal Vision RAG

**Workflow:**
```
1. User takes photo on device
2. Upload to GCS bucket (g-cav-raw-data-prod)
3. Cloud trigger: Pub/Sub → Cloud Run Job
4. Gemini 1.5 Pro Vision extracts description
5. Description vectorized and added to package
6. User syncs app
7. User can query about their photo offline
```

**Implementation:**
```typescript
// Camera capture
const photo = await camera.current.takePhoto();

// Upload to cloud
const uploadUrl = await getSignedUploadUrl();
await RNFetchBlob.fetch('PUT', uploadUrl, {
  'Content-Type': 'image/jpeg'
}, RNFetchBlob.wrap(photo.path));

// Trigger sync
await syncDataPackage();
```

### 7.2 Offline-First Design

**Capabilities Without Network:**
- Full RAG query processing
- Vector similarity search
- LLM inference
- Chat history
- All UI interactions

**Network Required Only For:**
- Initial data package download
- Package updates
- Photo upload (hybrid feature)

---

## 8. PERFORMANCE TARGETS

### 8.1 ARM Inference Benchmarks

| Metric | CPU (ARM Cortex) | GPU (Metal/OpenCL) | Target Improvement |
|--------|------------------|--------------------|--------------------|
| **Tokens/sec** | 3-5 | 15-25 | 3-5x |
| **First token** | 2-3s | 200-500ms | 4-6x |
| **Query latency** | 8-12s | 2-4s | 3-4x |
| **Power efficiency** | Baseline | 1.5-2x better | GPU idle states |

### 8.2 User Experience Targets

- **Sync time**: <3 minutes for full 2.5GB package
- **App launch**: <2 seconds cold start
- **Query response**: First token <500ms
- **UI frame rate**: 60 FPS during inference
- **Memory usage**: <3.5GB peak

---

## 9. DEVELOPMENT TIMELINE

### 9.1 Phase 1: GCP Data Factory (Days 1-7)

**Day 1**: Terraform infrastructure (GCS, Pub/Sub, Cloud SQL)  
**Day 2**: CI/CD pipeline (Cloud Build, event-driven triggers)  
**Day 3**: Multi-modal processing (PDF parsing, Gemini Vision)  
**Day 4**: Vector pipeline (Vertex AI embeddings, Vector Search)  
**Day 5**: Package builder (sqlite-vec database generation)  
**Day 6**: CDN distribution (Cloud CDN, Firebase Auth, API Gateway)  
**Day 7**: Admin portal (IAP-secured management interface)

### 9.2 Phase 2: React Native ARM Client (Days 8-14)

**Day 8**: Critical spike (de-risk op-sqlite + llama.rn integration)  
**Day 9**: Cloud-to-edge sync (download, unzip, Firebase auth)  
**Day 10**: Unified RAG stack (embedding + vector search + generation)  
**Day 11**: ARM optimization (Metal/OpenCL, streaming UI)  
**Day 12**: Hybrid vision RAG (camera, upload, cloud processing)  
**Day 13**: Demo preparation (narrative, video, documentation)  
**Day 14**: Final submission (buffer, polish, submit)

---

## 10. SECURITY & PRIVACY

### 10.1 Privacy Architecture

**On-Device Privacy:**
- Zero telemetry during inference
- No query logging
- No network calls during RAG
- Local-only chat history

**Cloud Privacy:**
- Anonymous authentication only
- No PII in data packages
- Public civic data only
- JWT-based API access

### 10.2 Security Measures

**Mobile:**
- Sandboxed file storage
- Encrypted data at rest (OS-level)
- No root/jailbreak detection needed (public data)

**Cloud:**
- IAM least-privilege roles
- API Gateway authentication
- IAP for admin portal
- Cloud Build service accounts

---

## 11. JUDGING CRITERIA ALIGNMENT

### 11.1 Technological Implementation (40%)

**Deliverable**: GPU-accelerated on-device AI on ARM processors
- Metal (iOS) and OpenCL (Android) backends
- 3-5x performance improvement over CPU
- Complete offline RAG pipeline
- Unified llama.cpp + sqlite-vec stack

### 11.2 User Experience (20%)

**Deliverable**: Streaming, responsive UI
- Token-by-token response rendering
- <500ms first token latency
- 60 FPS during inference
- Progress indicators for sync

### 11.3 Potential Impact (20%)

**Deliverable**: "Private Cloud Compute" architecture
- Mirrors Apple Intelligence design
- Scalable GCP backend
- Privacy-first hybrid model
- Industry-standard patterns

### 11.4 WOW Factor (20%)

**Deliverable**: Dual demonstrations
1. **Airplane Mode Demo**: 100% offline RAG
2. **Hybrid Vision RAG**: Photo → Cloud AI → On-device query

---

## 12. RISK MITIGATION

### 12.1 Technical Risks

| Risk | Mitigation | Day |
|------|-----------|-----|
| Native module linking fails | Day 8 spike to validate | 8 |
| GPU acceleration unavailable | CPU fallback, still functional | 11 |
| Model too large for device | Q4 quantization, 2.3GB target | 8 |
| Sync too slow | CDN + compression, <3min target | 9 |
| Vector search slow | sqlite-vec optimized for mobile | 10 |

### 12.2 Schedule Risks

- **Buffer day**: Day 14 for overruns
- **Parallel workstreams**: P1 and P0 independent until Day 9
- **Critical path**: Day 8 spike validates all assumptions
- **MVP by Day 10**: Core functionality complete, Days 11-14 polish

---

## 13. SUCCESS METRICS

### 13.1 Technical Success

- ✅ App runs 100% offline after initial sync
- ✅ GPU acceleration active on both platforms
- ✅ 3x+ speedup vs CPU-only inference
- ✅ <500ms first token latency
- ✅ Complete RAG pipeline on-device

### 13.2 Demonstration Success

- ✅ 2-minute demo video recorded
- ✅ Airplane mode demo successful
- ✅ Hybrid vision RAG working
- ✅ GCP infrastructure deployed
- ✅ Code repository published

### 13.3 Hackathon Success

- ✅ Submission before deadline
- ✅ All judging criteria addressed
- ✅ ARM optimization clearly demonstrated
- ✅ Unique "Private Cloud Compute" narrative
- ✅ Production-grade architecture

---

## 14. FUTURE ENHANCEMENTS

### 14.1 Post-Hackathon Roadmap

**Performance:**
- Model distillation for smaller footprint
- Dynamic layer offloading based on device
- Speculative decoding for faster inference

**Features:**
- Voice input/output
- Multi-language support
- Offline map integration
- Push notifications for updates

**Infrastructure:**
- Multi-region CDN
- Differential package updates
- A/B testing framework
- Analytics (privacy-preserving)

---

## APPENDIX A: DEVICE COMPATIBILITY

### iOS Requirements
- **Minimum**: iOS 14.0
- **Recommended**: iOS 16.0+
- **Processor**: A14 Bionic or newer (iPhone 12+)
- **RAM**: 4GB minimum, 6GB recommended
- **Storage**: 4GB free space

### Android Requirements
- **Minimum**: Android 10 (API 29)
- **Recommended**: Android 12+
- **Processor**: Snapdragon 8 Gen 1+ or equivalent
- **GPU**: Adreno 730+ with OpenCL support
- **RAM**: 6GB minimum, 8GB recommended
- **Storage**: 4GB free space
- **Architecture**: ARM64-v8a only

---

## APPENDIX B: REFERENCE ARCHITECTURE

This project implements the "Private Cloud Compute" architecture pattern:

**Apple Intelligence Model:**
- On-device: ~3B parameter model for privacy
- Cloud: Secure compute for heavy tasks
- Hybrid: Seamless handoff between edge and cloud

**G-CAV-RN Implementation:**
- On-device: Phi-3-mini (3.8B) for private inference
- Cloud: GCP Data Factory for data processing
- Hybrid: Sync protocol for intelligence distribution

**Key Difference:**
- Apple: Real-time cloud offload for complex queries
- G-CAV-RN: Batch cloud processing, full offline capability

This demonstrates the same architectural principles while optimizing for the hackathon's offline-first requirement.

---

**Document Version**: 1.0  
**Last Updated**: 2025-11-15  
**Status**: Ready for Implementation
