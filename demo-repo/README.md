# 🧪 TrueForge Isolated Sandbox Workspace

This directory (`demo-repo/`) serves as the isolated execution environment for **AutoFix-Agent**.

## Purpose:
- **Zero Host Side-Effects:** The TrueForge agent harness mounts this workspace in isolation to reproduce test failures, apply AST patches, and run multi-pass verification suites.
- **Cross-Platform Execution:** Tests are executed via `SandboxTools` utilizing `execFile` with `process.execPath`, preventing any host environment pollution or permission conflicts.

## Contents:
- `src/calculator.js`: Sandboxed target module containing the buggy arithmetic/division logic.
- `test/calculator.test.js`: Sandboxed unit test suite containing 5 regression assertions.
