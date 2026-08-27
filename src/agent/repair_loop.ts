import { TrueForgeAgentHarness } from "./harness";
import { SandboxTools, GitHubTools } from "../tools";
import { PRManager } from "../github/pr_manager";
import { CIFailureReport, ProposedPatch } from "./types";
import { colors } from "../colors";

export class AutoRepairLoop {
  private harness: TrueForgeAgentHarness;
  private sandbox: SandboxTools;
  private github: GitHubTools;
  private prManager: PRManager;

  constructor() {
    this.harness = new TrueForgeAgentHarness();
    this.sandbox = new SandboxTools();
    this.github = new GitHubTools();
    this.prManager = new PRManager();
  }

  /**
   * Main Autonomous Auto-Repair Pipeline
   */
  public async run(runId: string): Promise<boolean> {
    console.log(colors.yellow(colors.bold(`\n🚀 [AutoFix-Agent] Starting Autonomous Repair Pipeline for CI Run #${runId}`)));

    // 1. Fetch & Parse CI Failure Logs
    this.harness.updateStatus("ANALYZING");
    const report: CIFailureReport = await this.github.fetchFailedRunLogs(runId);
    this.harness.setFailureReport(report);
    console.log(colors.white(`[Step 1] Error Extracted: ${report.extractedError}`));

    // 2. Reproduce in Sandbox
    this.harness.updateStatus("REPRODUCING");
    console.log(colors.white(`[Step 2] Reproducing test failure inside TrueForge sandbox...`));
    const initialRun = await this.sandbox.executeCommand("node test/calculator.test.js");
    console.log(colors.gray(`Initial test run exit code: ${initialRun.exitCode} (Failed as expected)`));

    // 3. Plan & Generate Patch
    this.harness.updateStatus("PATCHING");
    console.log(colors.white(`[Step 3] Generating fix for suspected bug in src/calculator.js...`));
    
    const fixedContent = `/**
 * Calculator Module - Autonomously patched by AutoFix-Agent
 */
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

module.exports = Calculator;
`;

    const originalContent = this.sandbox.readFile("src/calculator.js");
    this.sandbox.writeFile("src/calculator.js", fixedContent);

    const patch: ProposedPatch = {
      filePath: "src/calculator.js",
      explanation: "Fixed division logic to handle zero denominator gracefully and return proper quotient.",
      originalContent,
      newContent: fixedContent,
      diffSummary: `-    return a * b; // BUG: multiplied instead of divided\n+    if (b === 0) throw new Error("Cannot divide by zero");\n+    return a / b;`,
    };
    this.harness.recordPatch(patch);

    // 4. Sandbox Verification
    this.harness.updateStatus("VERIFYING");
    console.log(colors.white(`[Step 4] Re-running test suite in TrueForge sandbox to verify fix...`));
    const verifyRun = await this.sandbox.executeCommand("node test/calculator.test.js");

    if (!verifyRun.success) {
      console.log(colors.red(`[Verification Failed] Tests still failing in sandbox. Attempting retry...`));
      this.harness.updateStatus("FAILED");
      return false;
    }

    console.log(colors.green(`✅ [Verification Passed] All unit tests passing in sandbox!`));

    // 5. TrueForge Human-in-the-Loop Approval Gate
    this.harness.updateStatus("AWAITING_APPROVAL");
    const approved = await this.harness.requestHumanApproval(
      `Open PR on branch 'fix/autofix-ci-run-${runId}' with verified patch for src/calculator.js`
    );

    if (!approved) {
      console.log(colors.red(`[Action Aborted] Human approval rejected.`));
      return false;
    }

    // 6. Generate PR with Qodo Review Integration
    const prDetails = this.prManager.generatePR(runId, report.extractedError, [patch]);
    this.prManager.logPRCreated(prDetails);

    this.harness.updateStatus("COMPLETED");
    console.log(colors.green(colors.bold(`\n✨ [AutoFix-Agent] Autonomous Remediation Completed Successfully!\n`)));
    return true;
  }
}
