import fs from "fs";
import path from "path";
import { RepairSessionState } from "./types";
import { colors } from "../colors";

/**
 * TrueForge Persistent Session Store
 * Persists session state across reconnects, restarts, and multi-step agent resumes.
 */
export class TrueForgeSessionStore {
  private storagePath: string;

  constructor(storageDir: string = path.resolve(__dirname, "../../.trueforge")) {
    this.storagePath = path.join(storageDir, "sessions.json");
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    if (!fs.existsSync(this.storagePath)) {
      fs.writeFileSync(this.storagePath, JSON.stringify({}, null, 2), "utf-8");
    }
  }

  public saveSession(state: RepairSessionState): void {
    const data = this.loadAllSessions();
    data[state.sessionId] = {
      ...state,
      lastUpdatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(colors.gray(`[Session Store] State persisted to SQLite/JSON store (${state.sessionId})`));
  }

  public getSession(sessionId: string): RepairSessionState | null {
    const data = this.loadAllSessions();
    return data[sessionId] || null;
  }

  public listSessions(): Array<{ sessionId: string; status: string; updatedAt: string }> {
    const data = this.loadAllSessions();
    return Object.keys(data).map((k) => ({
      sessionId: k,
      status: data[k].status,
      updatedAt: data[k].lastUpdatedAt || "N/A",
    }));
  }

  private loadAllSessions(): Record<string, any> {
    try {
      const raw = fs.readFileSync(this.storagePath, "utf-8");
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
}
