export interface CIFailureReport {
  runId: string;
  workflowName: string;
  failedStep: string;
  rawLogs: string;
  extractedError: string;
  suspectedFiles: string[];
}

export interface SandboxExecutionResult {
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  success: boolean;
}

export interface ProposedPatch {
  filePath: string;
  explanation: string;
  originalContent: string;
  newContent: string;
  diffSummary: string;
}

export interface RepairSessionState {
  sessionId: string;
  status: "ANALYZING" | "REPRODUCING" | "PATCHING" | "VERIFYING" | "AWAITING_APPROVAL" | "COMPLETED" | "FAILED";
  attemptCount: number;
  failureReport?: CIFailureReport;
  appliedPatches: ProposedPatch[];
  verificationResult?: SandboxExecutionResult;
  prUrl?: string;
}
