import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { SandboxExecutionResult } from "../agent/types";
import { config } from "../config";

/**
 * TrueForge Sandbox Execution Layer
 * Safely runs test commands and patches files inside the isolated project sandbox.
 */
export class SandboxTools {
  private sandboxDir: string;

  constructor(sandboxDir: string = config.harness.sandboxDir) {
    this.sandboxDir = path.resolve(sandboxDir);
  }

  /**
   * Run a test or verification command inside the sandbox directory
   */
  public async executeCommand(command: string): Promise<SandboxExecutionResult> {
    return new Promise((resolve) => {
      exec(command, { cwd: this.sandboxDir }, (error, stdout, stderr) => {
        const exitCode = error ? (error.code ?? 1) : 0;
        resolve({
          command,
          exitCode,
          stdout: stdout.toString(),
          stderr: stderr.toString(),
          success: exitCode === 0,
        });
      });
    });
  }

  /**
   * Read file content from the sandbox
   */
  public readFile(relativePath: string): string {
    const fullPath = path.join(this.sandboxDir, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found in sandbox: ${relativePath}`);
    }
    return fs.readFileSync(fullPath, "utf-8");
  }

  /**
   * Safely apply a patch / write file inside the sandbox
   */
  public writeFile(relativePath: string, content: string): void {
    const fullPath = path.join(this.sandboxDir, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  }

  /**
   * List all code files in the sandbox workspace
   */
  public listFiles(): string[] {
    const results: string[] = [];
    const scan = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scan(full);
        } else {
          results.push(path.relative(this.sandboxDir, full).replace(/\\/g, "/"));
        }
      }
    };
    if (fs.existsSync(this.sandboxDir)) {
      scan(this.sandboxDir);
    }
    return results;
  }
}
