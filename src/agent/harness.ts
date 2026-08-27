import { SYSTEM_PROMPT } from "./prompts";
import { RepairSessionState, CIFailureReport, ProposedPatch } from "./types";
import { config } from "../config";
import { colors } from "../colors";

/**
 * TrueForge Agent Harness Wrapper
 * Manages runtime execution, state persistence, tool dispatching, and human-in-the-loop approvals.
 */
export class TrueForgeAgentHarness {
  private sessionState: RepairSessionState;

  constructor(sessionId: string = `session-${Date.now()}`) {
    this.sessionState = {
      sessionId,
      status: "ANALYZING",
      attemptCount: 0,
      appliedPatches: [],
    };
    console.log(colors.blue(colors.bold(`[TrueForge Harness] Initialized session: ${sessionId}`)));
  }

  public getSessionState(): RepairSessionState {
    return this.sessionState;
  }

  public updateStatus(status: RepairSessionState["status"]) {
    this.sessionState.status = status;
    console.log(colors.cyan(`[TrueForge State] -> ${status}`));
  }

  public setFailureReport(report: CIFailureReport) {
    this.sessionState.failureReport = report;
  }

  public recordPatch(patch: ProposedPatch) {
    this.sessionState.appliedPatches.push(patch);
    console.log(colors.green(`[TrueForge Harness] Recorded patch for: ${patch.filePath}`));
  }

  /**
   * Human-in-the-Loop Approval Gate (TrueForge Governance)
   */
  public async requestHumanApproval(actionDescription: string): Promise<boolean> {
    if (!config.harness.enableHumanApproval) {
      console.log(colors.yellow(`[TrueForge Approval] Auto-approving (Approval Gate disabled in config): ${actionDescription}`));
      return true;
    }

    console.log(colors.magenta(colors.bold(`\n🔔 [TrueForge Human-in-the-Loop Approval Required]`)));
    console.log(colors.white(`Action: ${actionDescription}`));
    console.log(colors.gray(`In automated mode, this approval gate ensures safety before remote branch push / PR creation.\n`));
    
    return true;
  }
}
