/* ============================================================================
 * FOREVERMEMOIRS — STORYKEEPERS' CORNER helpers (src/lib/storykeepers.ts)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS:
 *
 * The Storykeepers' Corner (/storykeepers) is gated by verified email — never
 * payment. A visitor enters their email, checks an explicit opt-in box, gets a
 * 6-digit code by email, and types it back. This module holds the shared,
 * framework-free pieces of that flow so the API routes and pages stay thin:
 *
 *   - email validation + normalization
 *   - 6-digit code generation and SHA-256 hashing (only hashes hit the DB)
 *   - HMAC-SHA256 signed session tokens (email|expiry|signature), verified
 *     without a database lookup on every page view
 *   - client IP extraction for the per-IP rate limit
 *
 * SECURITY NOTES (read before changing):
 *   - Codes are single-use, 15-minute expiry, max 5 guesses. The DB stores
 *     only the hash — a leaked table reveals no usable codes.
 *   - Code comparison MUST stay timing-safe (timingSafeEqual below).
 *   - The session secret (STORYKEEPERS_SESSION_SECRET) must be long and
 *     random in production. If it is missing, verification refuses to run.
 *   - Wrong-code and missing/expired-code responses are deliberately
 *     identical so the endpoint never reveals which emails have codes.
 * ========================================================================== */

import { createHash, createHmac, randomInt, timingSafeEqual } from "crypto";

export const SK_COOKIE_NAME = "sk_session";
export const SK_CODE_TTL_MS = 15 * 60 * 1000; // 15 minutes
export const SK_SESSION_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year
export const SK_CODE_RESEND_COOLDOWN_MS = 60 * 1000; // 1 per email per 60s
export const SK_MAX_CODES_PER_HOUR = 5; // per email, and per IP
export const SK_MAX_CODE_ATTEMPTS = 5; // wrong guesses per code

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Normalize for storage/comparison: trimmed + lowercased. */
export function normalizeEmail(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().toLowerCase() : "";
}

/** True for plausibly-shaped addresses; also caps length. */
export function isValidEmail(email: string): boolean {
  return email.length > 0 && email.length <= 254 && EMAIL_RE.test(email);
}

/** A random 6-digit code, as a zero-padded string. */
export function generateCode(): string {
  return String(randomInt(0, 1000000)).padStart(6, "0");
}

/** SHA-256 hex of a code. Only this value is stored. */
export function hashCode(code: string): string {
  return createHash("sha256").update(code, "utf8").digest("hex");
}

/**
 * Timing-safe comparison of a candidate code against a stored hash.
 * Returns false (never throws) on any mismatch, including length mismatch.
 */
export function codeMatches(candidate: string, storedHash: string): boolean {
  const candidateHash = hashCode(candidate);
  const a = Buffer.from(candidateHash, "hex");
  const b = Buffer.from(storedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Sign a session token: "<email>|<expiryMs>|<hmac>".
 * The HMAC covers email+expiry so neither can be altered client-side.
 */
export function signSession(email: string, secret: string): string {
  const expiry = Date.now() + SK_SESSION_TTL_MS;
  const payload = `${email}|${expiry}`;
  const sig = createHmac("sha256", secret).update(payload, "utf8").digest("hex");
  return `${payload}|${sig}`;
}

/**
 * Verify a session token. Returns the email if the signature is valid and
 * the token has not expired, otherwise null. Never throws.
 */
export function verifySession(token: string | undefined, secret: string): string | null {
  if (!token || !secret) return null;
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [email, expiryStr, sig] = parts;
  const expiry = Number(expiryStr);
  if (!email || !Number.isFinite(expiry) || expiry < Date.now()) return null;
  const expected = createHmac("sha256", secret)
    .update(`${email}|${expiry}`, "utf8")
    .digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return email;
}

/** Best-effort client IP for rate limiting (Vercel sits behind proxies). */
export function getClientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = req.headers.get("x-real-ip");
  return real ? real.trim().slice(0, 64) : null;
}

/** The session-signing secret. Missing secret = verification refuses to run. */
export function sessionSecret(): string | null {
  const s = process.env.STORYKEEPERS_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}
