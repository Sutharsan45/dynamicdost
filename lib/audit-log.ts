import fs from "node:fs/promises";
import path from "node:path";

const LOG_FILE = path.join(process.cwd(), "data", "audit.log");

interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  resourceId?: string;
  ip?: string;
  userAgent?: string;
  result: "success" | "failure";
  details?: string;
}

export async function logAudit(event: Omit<AuditEvent, "timestamp">) {
  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      ...event,
    });
    await fs.appendFile(LOG_FILE, line + "\n", "utf-8");
  } catch (err) {
    console.error("Audit log write failed:", err);
  }
}