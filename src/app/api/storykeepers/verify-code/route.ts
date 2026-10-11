/* ============================================================================
 * FOREVERMEMOIRS — POST /api/storykeepers/verify-code
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS:
 *
 * Step 2 of the Storykeepers' Corner email gate. The visitor types the 6-digit
 * code back; on match we mark the email verified (recording the opt-in
 * consent timestamp) and set a signed, httpOnly, 1-year session cookie.
 *
 * SECURITY NOTES:
 *   - Wrong-code, missing-code, and expired-code responses are IDENTICAL, so
 *     the endpoint never reveals which emails have live codes.
 *   - Max 5 guesses per code; codes are single-use (deleted on success).
 *   - Comparison is timing-safe (see lib/storykeepers codeMatches).
 * ========================================================================== */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { and, desc, eq, gt } from "drizzle-orm";
import { db, storykeeperCodes, storykeeperVerifiedEmails } from "@/lib/db";
import {
  SK_COOKIE_NAME,
  SK_MAX_CODE_ATTEMPTS,
  SK_SESSION_TTL_MS,
  codeMatches,
  isValidEmail,
  normalizeEmail,
  sessionSecret,
  signSession,
} from "@/lib/storykeepers";

const GENERIC_ERROR =
  "That code didn't work. Check the email and try again — or ask for a fresh code.";
const CODE_RE = /^\d{6}$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    const email = normalizeEmail(body?.email);
    const code = typeof body?.code === "string" ? body.code.trim() : "";

    if (!isValidEmail(email) || !CODE_RE.test(code)) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }
    if (!db) {
      return NextResponse.json(
        { error: "The Corner is not configured yet. Please try again later." },
        { status: 503 }
      );
    }
    const secret = sessionSecret();
    if (!secret) {
      return NextResponse.json(
        { error: "The Corner is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    // Latest live code for this email, if any.
    const rows = await db
      .select()
      .from(storykeeperCodes)
      .where(
        and(
          eq(storykeeperCodes.email, email),
          gt(storykeeperCodes.expiresAt, new Date())
        )
      )
      .orderBy(desc(storykeeperCodes.createdAt))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }
    const row = rows[0];

    if ((row.attempts ?? 0) >= SK_MAX_CODE_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many wrong guesses. Please ask for a fresh code." },
        { status: 429 }
      );
    }

    if (!codeMatches(code, row.codeHash)) {
      await db
        .update(storykeeperCodes)
        .set({ attempts: (row.attempts ?? 0) + 1 })
        .where(eq(storykeeperCodes.id, row.id));
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    // Success: burn all codes for this email, record verification + consent.
    const now = new Date();
    await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, email));
    await db
      .insert(storykeeperVerifiedEmails)
      .values({ email, verifiedAt: now, consentedAt: now, source: "storykeepers-corner" })
      .onConflictDoUpdate({
        target: storykeeperVerifiedEmails.email,
        set: { verifiedAt: now, consentedAt: now },
      });

    const jar = await cookies();
    jar.set(SK_COOKIE_NAME, signSession(email, secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SK_SESSION_TTL_MS / 1000),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("verify-code failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Security rule: state-changing endpoints never answer GET
  // (same policy that removed the public GET /api/order).
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
