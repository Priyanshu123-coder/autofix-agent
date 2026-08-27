# 🎬 3-Minute Demo Video Script: AutoFix-Agent

> **Submission for:** The Agent Harness Hackathon (WeMakeDevs × TrueFoundry × Qodo)  
> **Target Duration:** ~3 Minutes

---

### ⏱️ Timeline & Scene Breakdown

#### [0:00 - 0:40] Scene 1: The Problem & The Need for an Agent Harness
* **Visual:** Show a failed CI/CD pipeline on GitHub Actions with red test errors.
* **Speaker:**
  > *"Every software team loses hours every week triaging broken CI pipelines, reading cryptic test failures, and writing regression tests. Chatbots can write snippets, but they can't reach our systems, can't run code safely, and can't be stopped before making broken commits.*
  > 
  > *Meet **AutoFix-Agent**: an autonomous engineering agent built on **TrueForge**, TrueFoundry's open-source agent harness, and reviewed by **Qodo**."*

---

#### [0:40 - 1:45] Scene 2: Live Autonomous Execution & TrueForge Sandboxing
* **Visual:** Open VS Code terminal and run `node dist/demo_runner.js`.
* **Speaker:**
  > *"Here we have a broken build from CI run #4829. Watch how TrueForge's runtime harness handles the entire lifecycle:*
  > 
  > *1. **Error Extraction:** It extracts the exact failing assertion from CI logs.*
  > *2. **TrueForge Sandbox:** It reproduces the failure inside an isolated sandbox without touching our main branch.*
  > *3. **Patch Synthesis:** It diagnoses the root cause and writes a clean, minimal fix.*
  > *4. **Verification Test:** It re-runs the entire test suite in the sandbox to verify 100% test pass rate with zero regressions."*

---

#### [1:45 - 2:30] Scene 3: Control & Safety (Human-in-the-Loop Approval)
* **Visual:** Highlight the TrueForge Human-in-the-Loop prompt in the terminal.
* **Speaker:**
  > *"Control and safety is central to TrueForge. Before performing any irreversible action—like pushing a remote branch or opening a pull request—TrueForge halts at the **Human-in-the-Loop Approval Gate**.*
  > 
  > *Once the engineer approves, the agent pushes the branch and creates the Pull Request."*

---

#### [2:30 - 3:00] Scene 4: Qodo Code Review & Summary
* **Visual:** Show the generated GitHub Pull Request and the Qodo `/agentic_review` comments.
* **Speaker:**
  > *"Every change goes through a GitHub Pull Request reviewed by **Qodo**. Qodo analyzes the whole repository context, flags potential edge cases, and verifies code quality.*
  > 
  > *With TrueForge managing the runtime, sandbox, and approval gates, and Qodo safeguarding code quality, AutoFix-Agent turns raw models into reliable autonomous engineers. Thank you!"*
