/**
 * Minimal password + signed-cookie auth for /admin.
 *
 * Uses Web Crypto (globalThis.crypto.subtle) instead of node:crypto so the
 * same code runs unmodified in both the Edge middleware and the Node.js
 * route handlers. Session "tokens" are just `${expiresAt}.${hmacHex}` —
 * no server-side session store needed, which keeps this dependency-free.
 */

const COOKIE_NAME = "husca_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): BufferSource {
  const bytes = hex.match(/.{1,2}/g) ?? [];
  // Cast: TS's DOM lib types Uint8Array's backing buffer as ArrayBufferLike
  // (which can include SharedArrayBuffer) and is stricter than the actual
  // Web Crypto BufferSource contract here — this is a plain, freshly
  // allocated Uint8Array, always safe to pass to subtle.verify.
  return new Uint8Array(bytes.map((b) => parseInt(b, 16))) as BufferSource;
}

export async function createSessionValue(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifySessionValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const [payload, signatureHex] = value.split(".");
  if (!payload || !signatureHex) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  try {
    const key = await getKey();
    return await crypto.subtle.verify(
      "HMAC",
      key,
      fromHex(signatureHex),
      new TextEncoder().encode(payload)
    );
  } catch {
    return false;
  }
}

/** Constant-time-ish comparison so a wrong-length guess doesn't short-circuit early. */
export function checkPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || candidate.length !== real.length) return false;
  let diff = 0;
  for (let i = 0; i < real.length; i++) {
    diff |= candidate.charCodeAt(i) ^ real.charCodeAt(i);
  }
  return diff === 0;
}
