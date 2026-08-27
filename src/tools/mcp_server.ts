/**
 * Model Context Protocol (MCP) Tool Definitions
 * Exposes standardized tools for TrueForge agent discovery and sandboxed invocation.
 */
export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

export const AUTOFIX_MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "github_fetch_ci_logs",
    description: "Fetches structured CI/CD failure logs for a given GitHub Actions workflow run ID.",
    parameters: {
      type: "object",
      properties: {
        runId: { type: "string", description: "The unique GitHub Actions run ID" },
        repo: { type: "string", description: "Target repository in owner/name format" },
      },
      required: ["runId"],
    },
  },
  {
    name: "sandbox_reproduce_test",
    description: "Executes a test script inside an isolated sandbox container to reproduce errors.",
    parameters: {
      type: "object",
      properties: {
        testPath: { type: "string", description: "Relative path to test script inside the sandbox" },
        timeoutMs: { type: "string", description: "Execution timeout in milliseconds" },
      },
      required: ["testPath"],
    },
  },
  {
    name: "sandbox_apply_patch",
    description: "Applies a code modification to a target source file in the isolated sandbox.",
    parameters: {
      type: "object",
      properties: {
        filePath: { type: "string", description: "Relative path to the source file to patch" },
        content: { type: "string", description: "Complete patched source code content" },
      },
      required: ["filePath", "content"],
    },
  },
  {
    name: "governance_request_human_approval",
    description: "Triggers TrueForge human-in-the-loop approval gate before irreversible git operations.",
    parameters: {
      type: "object",
      properties: {
        action: { type: "string", description: "Human-readable description of the pending action" },
        diff: { type: "string", description: "Unified diff summary for reviewer inspection" },
      },
      required: ["action", "diff"],
    },
  },
];
