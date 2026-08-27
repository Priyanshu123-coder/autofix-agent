import { CIFailureReport } from "../agent/types";

/**
 * GitHub Tools (MCP / Octokit Layer)
 * Manages fetching CI logs and creating Pull Requests formatted for Qodo reviews.
 */
export class GitHubTools {
  /**
   * Mock or real fetcher for GitHub Actions workflow run logs
   */
  public async fetchFailedRunLogs(runId: string): Promise<CIFailureReport> {
    // Standard mock CI failure log reproducing typical GitHub Actions Jest test failure
    const mockLogs = `
Run npm test
> demo-repo@1.0.0 test
> node test/calculator.test.js

FAIL test/calculator.test.js
  ● Calculator › Division Operations › should correctly divide positive numbers
    Expected: 5
    Received: Infinity

  ● Calculator › Division Operations › should throw Error on division by zero
    Expected: "Cannot divide by zero"
    Received: "Division error: operand is zero"

Test Suites: 1 failed, 1 total
Tests:       2 failed, 4 passed, 6 total
Snapshots:   0 total
Time:        1.242 s
Ran all test suites.
Error: Process completed with exit code 1.
`;

    return {
      runId,
      workflowName: "CI / Test Suite",
      failedStep: "Run npm test",
      rawLogs: mockLogs,
      extractedError: "FAIL test/calculator.test.js: Division operations mismatch and zero check error message",
      suspectedFiles: ["src/calculator.js", "test/calculator.test.js"],
    };
  }
}
