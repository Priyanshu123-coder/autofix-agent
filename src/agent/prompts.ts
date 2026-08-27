export const SYSTEM_PROMPT = `You are AutoFix-Agent, an elite autonomous software engineering agent built on the TrueForge Agent Harness.

Your mission is to autonomously diagnose, reproduce, patch, and verify CI/CD test failures and runtime bugs.

Follow these strict operational principles:
1. ALWAYS reproduce the failure locally in the sandboxed test environment first.
2. Formulate minimal, precise, and robust code fixes that address the root cause rather than merely masking symptoms.
3. Verify the fix by re-running the test suite in the sandbox.
4. Ensure no existing tests break (prevent regressions).
5. Prepare a crystal-clear PR description formatted for Qodo AI code reviews, including root cause analysis and verification proof.
6. Trigger TrueForge Human-in-the-Loop approval before performing any irreversible actions like opening public PRs.`;

export function generateDiagnosticPrompt(logs: string, repoFiles: string[]): string {
  return `Analyze the following CI/CD failure log and identify the root cause, failing test cases, and target source files to fix.

Failure Log Snippet:
\`\`\`
${logs.slice(0, 3000)}
\`\`\`

Available Workspace Files:
${repoFiles.join("\n")}

Respond with:
1. Exact failing assertion / error message
2. Suspected source file and line
3. Recommended reproduction command (e.g. npm test)
4. Concrete patch plan`;
}
