<div align="center">

<img src="https://img.shields.io/badge/AegisOS-Multi--Agent%20AI%20OS-6366f1?style=for-the-badge&logo=openai&logoColor=white" />

# AegisOS — Enterprise Multi-Agent AI Operating System

**A real-time AI OS where a CEO, COO, and AI Workers collaborate live to complete any task you give them.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47a248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Gemini AI](https://img.shields.io/badge/Gemini-1.5%20Pro-4285f4?style=flat-square&logo=google)](https://ai.google.dev)

[📖 API Docs](#api-documentation) · [🐳 Docker](#docker-deployment) · [🧪 QA Suite](#running-the-qa-suite)

---

![Status](https://img.shields.io/badge/Status-Production%20Ready-22c55e?style=for-the-badge)
![QA](https://img.shields.io/badge/QA%20Suite-8%2F8%20Passing-22c55e?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge)

</div>

---

## 🧠 What is AegisOS?

**AegisOS** is a production-grade **Real-Time Multi-Agent AI Operating System** — a full-stack platform where autonomous AI agents behave like a real corporate hierarchy: a **CEO (Boss Agent)**, a **COO (Supervisor AI)**, and a dynamic **pool of Worker Agents** — all working together live to complete any task you submit.

You watch every decision, every delegation, every execution — in real time — through a cinematic, premium dashboard.

```
User Request (Text / Voice)
        ↓
  Boss Agent (CEO)          → Analyzes intent · Plans strategy · Discovers departments
        ↓
  Supervisor AI (COO)       → Breaks plan into tasks · Builds DAG · Spawns worker agents
        ↓
  Worker Agents (Team)      → Execute tasks in parallel · 5-step runtime engine
        ↓
  Supervisor AI             → Collects results · Handles retries · Validates output
        ↓
  Boss Agent                → Reviews every result · Scores quality · Approves
        ↓
  Gemini AI Report Engine   → Generates Executive Report (streamed live)
        ↓
  Frontend Dashboard        → You see everything. Live. Instantly.
```

---

## ✨ Key Features

### 🤖 Multi-Agent Hierarchy
- **Boss Agent (CEO)** — Parses user intent, analyzes complexity, discovers relevant departments, builds a full execution blueprint, and validates it across 7 self-check dimensions before delegating
- **Supervisor AI (COO)** — Decomposes the blueprint into a Directed Acyclic Graph (DAG) of tasks, spawns dynamic worker agents, manages parallelism, and handles failure retries
- **Worker Agents (Team)** — Each worker runs a deterministic **5-step execution pipeline**: Context Loading → Resource Loading → Logic Execution → Quality Validation → Output Synthesis

### 🌐 Real-Time Live Canvas
- **React Flow v12** interactive graph — visualizes the entire agent network with animated flowing edges
- Every node updates live as agents progress — watch Boss → Supervisor → Workers → Report happen before your eyes
- **Agent Inspector** — click any node for a full detail panel: logs, timing, output, status
- **Workflow Replay Player** — replay any completed workflow at 1×, 2×, or 4× speed

### 📊 Executive Report Engine
- After all agents complete work, Boss Agent reviews each department result and scores quality (0–100)
- Gemini 1.5 Pro generates a full boardroom-quality **Executive Report** streamed word-by-word
- Download in **PDF**, **JSON**, or **CSV** format
- Full report history — browse and re-read any past report

### ⚡ Real-Time Infrastructure
- **Socket.IO** — every agent event streams to the frontend instantly, zero polling
- **Central Event Bus** — all agents communicate via typed async pub/sub events, never directly
- **Workflow Kernel** — state machine with checkpoint save/recovery; interrupted workflows automatically resume
- **BullMQ + Redis** queues for job scheduling (gracefully degrades to in-memory if Redis is offline)

### 🔐 Enterprise Security
- JWT access tokens + refresh token rotation
- Role-based access control (Admin / Manager / Operator / Viewer / Guest)
- Helmet HTTP security headers, CORS protection, rate limiting (200 req/15 min)

### 📡 Observability
- Prometheus metrics endpoint (`/api/v1/platform/metrics`)
- Real-time CPU %, RAM %, uptime, active connections monitoring
- Winston structured logging with log levels (info, debug, warn, error, http)

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router + Turbopack) | Full-stack React framework |
| **React 19** | UI rendering with concurrent features |
| **TypeScript 5.9** | Type safety across the entire codebase |
| **React Flow v12** | Live multi-agent workflow canvas |
| **Framer Motion** | Smooth micro-animations and page transitions |
| **Zustand** | Global state management |
| **Socket.IO Client** | Real-time event streaming from backend |
| **Vanilla CSS + CSS Variables** | Glassmorphism design system, dark/light theme |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js 20 + Express 4** | REST API server |
| **TypeScript 5.9** | Type-safe backend services |
| **Socket.IO 4** | Real-time WebSocket gateway |
| **MongoDB 7 + Mongoose 8** | Primary database with schema validation |
| **Redis 7 + ioredis** | Job queues and session caching (optional) |
| **BullMQ** | Background job queue for agent tasks |
| **Gemini 1.5 Pro** | AI completions and report generation |
| **JWT + bcryptjs** | Authentication and password security |
| **Swagger UI** | Interactive API documentation |
| **Prometheus** | Metrics and telemetry |

### Infrastructure

| Technology | Purpose |
|---|---|
| **Docker + Docker Compose** | Container orchestration |
| **Kubernetes** | Production deployment manifests |
| **Nginx** | Reverse proxy + SSL termination |
| **GitHub Actions** | CI/CD pipeline |

---

## 📁 Project Structure

```
Hexafalls-2/
├── src/                          # Next.js Frontend Application
│   ├── app/
│   │   ├── (auth)/               # Login / Register pages
│   │   └── (platform)/           # Protected app pages
│   │       ├── dashboard/        # Main chat & input page
│   │       ├── workflow/         # Live React Flow canvas
│   │       ├── agents/           # Boss / Supervisor / Worker pages
│   │       ├── reports/          # Executive report center
│   │       ├── analytics/        # System monitoring
│   │       ├── history/          # Workflow history
│   │       ├── notifications/    # Push notification center
│   │       ├── profile/          # User profile
│   │       └── settings/         # Platform settings
│   ├── features/                 # Feature-specific React components
│   │   ├── boss/                 # Boss CEO workspace components
│   │   ├── supervisor/           # Supervisor COO components
│   │   ├── workers/              # Worker pool components
│   │   ├── workflow/             # Canvas, nodes, edges, replay
│   │   ├── reports/              # Report viewer, download, review
│   │   ├── analytics/            # Charts, monitors, telemetry
│   │   └── chat/                 # Input, voice, chat thread
│   ├── services/                 # API client, Socket.IO client
│   ├── store/                    # Zustand global state stores
│   └── hooks/                    # Custom React hooks
│
└── server/                       # Node.js Backend
    └── src/
        ├── agents/
        │   ├── boss/             # Boss CEO engine (planner, validator, blueprinter)
        │   ├── supervisor/       # Supervisor COO (DAG engine, retry, worker creator)
        │   └── worker/           # Worker 5-step runtime engine
        ├── workflow/             # Workflow kernel, checkpoint, recovery
        ├── communication/        # Central event bus, socket router
        ├── ai/                   # Gemini AI service, report synthesizer, prompt engine
        ├── database/             # Mongoose schemas, base repository, transactions
        ├── platform/             # Prometheus metrics, audit, backup, QA suite
        ├── middleware/           # JWT auth, RBAC guard, rate limiter, error handler
        └── config/               # App, database, Redis, Swagger config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **MongoDB** — [MongoDB Atlas](https://cloud.mongodb.com) free tier or local installation
- **Gemini API Key** — [Get one free at Google AI Studio](https://aistudio.google.com)
- **Redis** (optional) — platform works fully without it

---

### 1. Clone the Repository

```bash
git clone https://github.com/ankush-shaw/Hexafalls-2.git
cd Hexafalls-2
```

---

### 2. Configure Environment Variables

#### Frontend — create `/.env.local` at the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

#### Backend — create `/server/.env`:
```env
NODE_ENV=development
PORT=5000

# MongoDB (get a free URI from MongoDB Atlas)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hexafalls_multiagent

# JWT Secrets (use long random strings)
JWT_SECRET=your_super_secret_jwt_access_key_here_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key_here_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Gemini AI (get your key from https://aistudio.google.com)
GEMINI_API_KEY=your_gemini_api_key_here

# Redis (optional — leave as-is to run without Redis)
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api/v1
```

---

### 3. Install Dependencies

```bash
# Frontend (from project root)
npm install

# Backend
cd server && npm install && cd ..
```

---

### 4. Run the Development Servers

Open **two terminal windows**:

**Terminal 1 — Backend** (port 5000):
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend** (port 3000):
```bash
npm run dev
```

---

### 5. Open the Platform

| URL | Description |
|---|---|
| `http://localhost:3000` | Frontend Dashboard |
| `http://localhost:5000` | Backend API |
| `http://localhost:5000/api/docs` | Swagger Docs |
| `http://localhost:5000/health` | Health Check |
| `http://localhost:5000/api/v1/platform/metrics` | Prometheus Metrics |

---

## 🐳 Docker Deployment

Run the complete stack (MongoDB + Redis + Backend) with one command:

```bash
docker compose up -d
```

Stop everything:
```bash
docker compose down
```

---

## 🧪 Running the QA Suite

```bash
cd server
npm run build
node dist/platform/tests/qa.smoke.test.js
```

```
================================================================
                 PHASE 11 QA & REGRESSION SUMMARY               
================================================================
1. [Auth & Security] JWT Authorization & Role Validation     -> ✅ PASS
2. [Boss Agent CEO] Intent & Department Discovery            -> ✅ PASS
3. [Supervisor COO] DAG Task Graph & Worker Spawning         -> ✅ PASS
4. [Worker Runtime] 5-Step Execution Engine & Telemetry      -> ✅ PASS
5. [Workflow Engine] State Machine & Checkpoint Saving       -> ✅ PASS
6. [Communication Bus] Typed Event Pub/Sub & Socket Router   -> ✅ PASS
7. [Gemini AI Service] Executive Report & Score Synthesizer  -> ✅ PASS
8. [Observability] Prometheus Metrics & Hardware Telemetry   -> ✅ PASS
================================================================
TOTAL RESULT: 8/8 PASSED (100% SUCCESS RATE)
================================================================
```

---

## 📡 API Documentation

Full interactive Swagger docs: `http://localhost:5000/api/docs`

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/auth/register` | POST | Register a new user |
| `/api/v1/auth/login` | POST | Login and receive JWT tokens |
| `/api/v1/boss/analyze` | POST | Submit a request to the Boss Agent |
| `/api/v1/supervisor/start` | POST | Start Supervisor orchestration |
| `/api/v1/workers/create` | POST | Spawn a dynamic Worker Agent |
| `/api/v1/workflows` | GET | List all workflows |
| `/api/v1/ai/report` | POST | Generate an Executive Report via Gemini |
| `/api/v1/events` | GET | Query the agent event log |
| `/api/v1/platform/metrics` | GET | Prometheus telemetry |
| `/health` | GET | Server health check |

---

## 🔌 Socket.IO Events

| Event | Description |
|---|---|
| `boss:analysis_start` | Boss Agent started analyzing the request |
| `boss:blueprint_ready` | Boss completed the workflow blueprint |
| `supervisor:orchestration_start` | Supervisor started breaking down tasks |
| `worker:task_step` | A worker completed one of its 5 execution steps |
| `worker:task_complete` | A worker finished its task |
| `report:stream_chunk` | A chunk of the Gemini report being streamed |
| `report:complete` | Executive Report fully generated |
| `system:health_update` | CPU, RAM, connection count telemetry update |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Next.js Frontend                   │
│  Dashboard · Workflow Canvas · Boss · Supervisor    │
│  Workers · Reports · Analytics · Settings           │
└────────────────────┬────────────────────────────────┘
                     │  REST API + Socket.IO
┌────────────────────▼────────────────────────────────┐
│              Express API Server (port 5000)          │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │   Boss   │ │Supervisor│ │   Worker Runtime     │ │
│  │  Agent   │ │  Agent   │ │  5-Step Engine       │ │
│  └────┬─────┘ └────┬─────┘ └──────────┬───────────┘ │
│       └────────────┼──────────────────┘             │
│              ┌─────▼──────┐                         │
│              │  Event Bus │  (Typed Pub/Sub)         │
│              └─────┬──────┘                         │
│  ┌──────────┐ ┌────▼──────┐ ┌──────────────────────┐│
│  │ Workflow │ │  Gemini   │ │ Prometheus Telemetry ││
│  │  Kernel  │ │ AI Layer  │ │      + Audit         ││
│  └──────────┘ └───────────┘ └──────────────────────┘│
└──────────────────────┬──────────────────────────────┘
         ┌─────────────┼──────────────┐
    ┌────▼────┐    ┌───▼───┐    ┌────▼────┐
    │ MongoDB │    │ Redis │    │ BullMQ  │
    │  (DB)   │    │(Cache)│    │(Queues) │
    └─────────┘    └───────┘    └─────────┘
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Ankush Shaw**

[![GitHub](https://img.shields.io/badge/GitHub-ankush--shaw-181717?style=flat-square&logo=github)](https://github.com/ankush-shaw)

---

<div align="center">

**Built with ❤️ using Next.js · Node.js · MongoDB · Socket.IO · Gemini AI**

⭐ Star this repo if you found it useful!

</div>
