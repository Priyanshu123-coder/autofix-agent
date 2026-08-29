/**
 * AutoFix-Agent Main Entrypoint
 * Autonomous CI/CD Failure Auto-Remediation & Governance Studio
 * Built on TrueForge Agent Harness and verified by Qodo AI.
 */

export * from "./agent/harness";
export * from "./agent/repair_loop";
export * from "./agent/subagents";
export * from "./agent/session_store";
export * from "./agent/types";
export * from "./agent/prompts";
export * from "./tools/sandbox_tools";
export * from "./tools/github_tools";
export * from "./tools/mcp_server";
export * from "./github/pr_manager";
export * from "./config";
export * from "./colors";

import { AutoRepairLoop } from "./agent/repair_loop";

// CLI execution helper
if (require.main === module) {
  const runId = process.argv[2] || "4829";
  const repairLoop = new AutoRepairLoop();
  repairLoop.run(runId).catch((err) => {
    console.error("AutoFix-Agent execution failed:", err);
    process.exit(1);
  });
}
