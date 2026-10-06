import { cookies } from "next/headers";
import { ADMIN_SECRETS } from "@/config/admin-secret";

const COOKIE_NAME = "dd_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours

/* ============================
   HELPERS
   ============================ */

function getSecret(): string {
  const secret = ADMIN_SECRETS.sessionSecret;
  if (!secret || secret.length < 32) {
    throw new Error(
      "sessionSecret must be at least 32 characters long"
    );
  }
  return secret;
}
function base64UrlEncode(input: string | ArrayBuffer): string {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);

  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const fixed =
    pad === 0 ? padded : padded + "=".repeat(4 - pad);

  const binary = atob(fixed);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/* ============================
   HMAC via Web Crypto
   ============================ */
async function importKey(): Promise<CryptoKey> {
  const secretBytes = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(payload: string): Promise<string> {
  const key = await importKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return base64UrlEncode(signature);
}

async function verifySignature(
  payload: string,
  signature: string
): Promise<boolean> {
  const expected = await sign(payload);
  /* Constant-time string comparison */
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

/* ============================
   SESSION
   ============================ */
export interface SessionData {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

export async function createSessionToken(email: string): Promise<string> {
  const now = Date.now();
  const session: SessionData = {
    email,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS * 1000,
  };

  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<SessionData | null> {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const valid = await verifySignature(payload, signature);
  if (!valid) return null;

  try {
    const json = base64UrlDecode(payload);
    const session = JSON.parse(json) as SessionData;

    if (session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

/* ============================
   COOKIES
   ============================ */
export async function setSessionCookie(email: string) {
  const token = await createSessionToken(email);
  const store = await cookies();

  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;