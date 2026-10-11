/* ============================================================================
 * FOREVERMEMOIRS — POST /api/storykeepers/request-code
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS:
 *
 * Step 1 of the Storykeepers' Corner email gate. The visitor submits their
 * email + an explicit opt-in checkbox; we generate a 6-digit code, store only
 * its hash (15-minute expiry, single-use), and email the code via Postmark.
 *
 * RATE LIMITS (abuse gates, all enforced here):
 *   - 1 code per email per 60 seconds (resend cooldown)
 *   - max 5 codes per email per hour
 *   - max 5 codes per IP per hour
 *
 * PRIVACY: the success response never reveals whether an address was already
 * known. Consent is REQUIRED — the checkbox must be checked to get a code.
 * ========================================================================== */

import { NextResponse } from "next/server";
import { and, count, desc, eq, gt } from "drizzle-orm";
import { db, storykeeperCodes } from "@/lib/db";
import {
  SK_CODE_TTL_MS,
  SK_CODE_RESEND_COOLDOWN_MS,
  SK_MAX_CODES_PER_HOUR,
  generateCode,
  getClientIp,
  hashCode,
  isValidEmail,
  normalizeEmail,
} from "@/lib/storykeepers";
import { mailConfigured, sendCodeEmail } from "@/lib/postmark";

const COOLDOWN_MSG =
  "We just sent you a code — check your inbox (and spam folder). You can ask for another in a minute.";
const HOURLY_MSG =
  "Too many codes requested. Please wait a while and try again.";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    const email = normalizeEmail(body?.email);
    const consent = body?.consent === true;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        {
          error:
            "Please check the box to hear from us — it's required to enter the Corner.",
        },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "The Corner is not configured yet. Please try again later." },
        { status: 503 }
      );
    }
    if (!mailConfigured()) {
      return NextResponse.json(
        { error: "Email sending is not configured yet. Please try again later." },
        { status: 503 }
      );
    }

    const now = new Date();
    const ip = getClientIp(req);

    // 60-second resend cooldown per email.
    const latest = await db
      .select()
      .from(storykeeperCodes)
      .where(eq(storykeeperCodes.email, email))
      .orderBy(desc(storykeeperCodes.createdAt))
      .limit(1);
    if (
      latest.length > 0 &&
      latest[0].createdAt &&
      now.getTime() - latest[0].createdAt.getTime() < SK_CODE_RESEND_COOLDOWN_MS
    ) {
      return NextResponse.json({ error: COOLDOWN_MSG }, { status: 429 });
    }

    // Hourly caps: per email and per IP.
    const hourAgo = new Date(now.getTime() - 3600_000);
    const [{ n: emailCount }] = await db
      .select({ n: count() })
      .from(storykeeperCodes)
      .where(
        and(
          eq(storykeeperCodes.email, email),
          gt(storykeeperCodes.createdAt, hourAgo)
        )
      );
    if (emailCount >= SK_MAX_CODES_PER_HOUR) {
      return NextResponse.json({ error: HOURLY_MSG }, { status: 429 });
    }
    if (ip) {
      const [{ n: ipCount }] = await db
        .select({ n: count() })
        .from(storykeeperCodes)
        .where(
          and(eq(storykeeperCodes.ip, ip), gt(storykeeperCodes.createdAt, hourAgo))
        );
      if (ipCount >= SK_MAX_CODES_PER_HOUR) {
        return NextResponse.json({ error: HOURLY_MSG }, { status: 429 });
      }
    }

    // Replace any older codes for this email, then store the new hash.
    const code = generateCode();
    await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, email));
    await db.insert(storykeeperCodes).values({
      email,
      codeHash: hashCode(code),
      ip,
      expiresAt: new Date(now.getTime() + SK_CODE_TTL_MS),
      attempts: 0,
    });

    try {
      await sendCodeEmail(email, code);
    } catch (mailError) {
      // Don't leave a code the visitor can never receive: roll it back so a
      // retry isn't stuck behind the cooldown.
      await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, email));
      console.error("Storykeepers code email failed:", mailError);
      return NextResponse.json(
        { error: "We couldn't send the email. Please try again in a minute." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("request-code failed:", error);
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
