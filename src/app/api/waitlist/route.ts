import { NextResponse } from "next/server";
import { db, waitlist } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = ["homepage", "waitlist-page", "instagram"] as const;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const name =
      typeof body?.name === "string" && body.name.trim()
        ? body.name.trim().slice(0, 120)
        : null;
    const source =
      typeof body?.source === "string" &&
      (VALID_SOURCES as readonly string[]).includes(body.source)
        ? body.source
        : "unknown";

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (db) {
      // Dedupe silently: an already-subscribed address gets the same success
      // response, so the endpoint never reveals whether an email exists.
      await db
        .insert(waitlist)
        .values({ email, name, source })
        .onConflictDoNothing({ target: waitlist.email });
    } else {
      console.warn("DATABASE_URL not configured. Waitlist signup was only logged:", email);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process waitlist signup:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Security rule: never expose an unauthenticated list endpoint
  // (same policy that removed the public GET /api/order).
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
