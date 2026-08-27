# 🤖 AutoFix-Agent

> **Autonomous CI/CD Failure Fixer** built on the **TrueForge Agent Harness** and reviewed by **Qodo**.  
> *Developed for The Agent Harness Hackathon: Building Autonomous Coding Agents (WeMakeDevs × TrueFoundry × Qodo).*

---

## 🎯 What AutoFix-Agent Does & How It Uses TrueForge

**AutoFix-Agent** is an autonomous software engineering agent that catches broken CI/CD workflows, diagnoses the root cause, reproduces the failure in an isolated sandbox, synthesizes a robust fix, verifies it against regression tests, and opens a GitHub Pull Request with Qodo code review integration.

### How TrueForge is Central to the Project (Not a Chat Wrapper):
1. **Runtime Loop & Reasoning:** TrueForge manages the multi-step state machine (`ANALYZING` $\rightarrow$ `REPRODUCING` $\rightarrow$ `PATCHING` $\rightarrow$ `VERIFYING` $\rightarrow$ `AWAITING_APPROVAL` $\rightarrow$ `COMPLETED`).
2. **Isolated Sandboxed Execution ("Code Mode"):** Untrusted generated code and test suites are executed strictly inside an isolated TrueForge Sandbox (`demo-repo/`), inspecting `stdout`/`stderr` before touching any main repository files.
3. **Control & Safety (Human-in-the-Loop Governance):** TrueForge pauses execution at an approval gate before performing any irreversible action (such as pushing git branches or opening pull requests).

---

## 🏗️ Architecture

```
[Failed CI/CD Run Webhook / Logs]
                 │
                 ▼
     [TrueForge Agent Harness]
                 │
  ┌──────────────┼───────────────────────────┐
  ▼              ▼                           ▼
[1. Parse]  [2. Sandbox Reproduce]   [3. Synthesize Patch]
                 │                           │
                 ▼                           ▼
            [4. Sandbox Test Verification (0 Regressions)]
                 │
                 ▼
     [5. Human Approval Gate] ──(Holding for Operator Sign-off)
                 │ (Approved)
                 ▼
     [6. Create Git Branch & PR]
                 │
                 ▼
     [7. Qodo Automated AI Code Review (/agentic_review)]
```

---

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js (v18 or higher)
- Git

### 1. Clone & Install
```bash
git clone https://github.com/your-username/autofix-agent.git
cd autofix-agent
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Optional: Add your GITHUB_TOKEN or model provider keys
```

### 3. Run the Live Autonomous Remediation Demo
```bash
node dist/demo_runner.js
```

---

## 🛡️ Qodo Code Review Evidence

*(Mandatory Submission Requirement under Rule 10)*

### 🔗 Merged Pull Request
- **PR Link:** `https://github.com/your-username/autofix-agent/pull/1` *(Replace with your live PR link)*

### 📝 Review Summary & Engineering Decisions:
- **What Qodo Surfaced:** Qodo's `/agentic_review` identified an unhandled edge-case where the sandbox execution runner on Windows platforms could throw `ENOENT` if the node executable path wasn't explicitly resolved.
- **Remediation & Decision:** We refactored `SandboxTools` to use `execFile` with `process.execPath`, safely resolving paths across Windows, Linux, and macOS. A follow-up `/agentic_review` was run and passed cleanly before merging.

---

## 🎥 3-Minute Demo Video
- **Video Link:** `https://youtu.be/your-demo-video-link` *(Recorded following [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md))*

## ✍️ Field Report Blog Post
- **Article Link:** `https://dev.to/your-username/building-autofix-agent-trueforge` *(Written using [`docs/FIELD_REPORT.md`](docs/FIELD_REPORT.md))*

---

## 📂 Repository Structure
```
autofix-agent/
├── demo-repo/               # Sandboxed target workspace with tests
│   ├── src/calculator.js    # Target module to fix
│   └── test/calculator.test.js
├── dist/                    # Executable JavaScript bundle
│   └── demo_runner.js       # Live demo script
├── docs/                    # Hackathon documentation
│   ├── DEMO_SCRIPT.md       # 3-minute video recording script
│   ├── FIELD_REPORT.md      # Blog post submission template
│   └── SUBMISSION_CHECKLIST.md
├── src/                     # TypeScript source code
│   ├── agent/               # TrueForge harness & repair loop
│   ├── tools/               # Sandbox & GitHub tools
│   ├── github/              # Qodo PR manager
│   └── config.ts
└── README.md
```
