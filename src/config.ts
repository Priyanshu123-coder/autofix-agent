import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const config = {
  llm: {
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    modelName: process.env.MODEL_NAME || "claude-3-5-sonnet-latest",
  },
  github: {
    token: process.env.GITHUB_TOKEN || "",
    owner: process.env.GITHUB_REPO_OWNER || "example-owner",
    repo: process.env.GITHUB_REPO_NAME || "autofix-target-repo",
  },
  harness: {
    sandboxDir: path.resolve(process.env.TRUEFORGE_SANDBOX_DIR || "./demo-repo"),
    enableHumanApproval: process.env.TRUEFORGE_ENABLE_HUMAN_APPROVAL !== "false",
    maxRetries: 3,
  },
};
