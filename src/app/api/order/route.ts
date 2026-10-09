import { NextResponse } from "next/server";
import { db, orders } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, tier, notes } = body ?? {};

    if (!name || !email || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Policy version in effect — must match the "Effective" date on /terms
    // and /privacy. Bump this constant whenever either page is revised.
    const POLICY_VERSION = "2026-10-08";

    // Launch Document Section B items 8 & 9: the order form sends
    // `agreedToTerms` and `confirmedPhotoRights` flags — explicit clickwrap
    // consent to the Terms of Service and the photo-rights warranty. They are
    // enforced below and persisted per order (FM Door item 4) so consent is
    // provable from the database, not just server logs.
    const { agreedToTerms, confirmedPhotoRights } = body ?? {};
    if (!agreedToTerms || !confirmedPhotoRights) {
      return NextResponse.json(
        { error: "Terms agreement and photo-rights confirmation are required" },
        { status: 400 }
      );
    }
    const consentAt = new Date();

    console.log("New ForeverMemoirs order received:", { name, email, tier, notes, agreedToTerms, confirmedPhotoRights });

    let orderRecord = null;

    if (db) {
      const inserted = await db
        .insert(orders)
        .values({
          name: String(name).trim(),
          email: String(email).trim(),
          tier: String(tier),
          notes: notes ? String(notes).trim() : null,
          status: "new",
          agreedToTerms: true,
          agreedToTermsAt: consentAt,
          termsVersion: POLICY_VERSION,
          confirmedPhotoRights: true,
          confirmedPhotoRightsAt: consentAt,
          photoRightsVersion: POLICY_VERSION,
        })
        .returning();

      orderRecord = inserted[0];
      console.log("Order persisted to Neon PostgreSQL:", orderRecord?.id);
    } else {
      console.warn("DATABASE_URL not configured. Order was only logged.");
    }

    return NextResponse.json({
      ok: true,
      orderId: orderRecord?.id ?? null,
      message: "Order successfully created",
    });
  } catch (error) {
    console.error("Failed to process order:", error);
    return NextResponse.json(
      { error: "Internal server error processing order" },
      { status: 500 }
    );
  }
}
