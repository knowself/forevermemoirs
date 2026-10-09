import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, giftCertificates } from "@/lib/db";
import { giftTierById, generateGiftCode, GIFT_POLICY_VERSION } from "@/lib/gifts";

// POST /api/gift — create a gift certificate (reservation).
//
// PAYMENT SEAM: Stripe is not wired yet (FM Door: DBA -> Columbia Bank ->
// Stripe). This endpoint records the buyer's committed intent with status
// "pending_payment" and returns the certificate immediately so the buyer can
// preview/print it. When Stripe checkout lands:
//   1. Create the checkout session here (or on the client) for amountCents.
//   2. A Stripe webhook flips the certificate to "issued" on payment success.
// Until then, treat this table as the committed-buyer lead list.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      tier,
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      message,
      deliverAt,
      agreedToTerms,
    } = body ?? {};

    if (!tier || !buyerName || !buyerEmail || !recipientName || !recipientEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const giftTier = giftTierById(String(tier));
    if (!giftTier) {
      return NextResponse.json({ error: "Unknown gift tier" }, { status: 400 });
    }
    if (!agreedToTerms) {
      return NextResponse.json(
        { error: "Terms agreement is required" },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(String(buyerEmail)) || !emailRe.test(String(recipientEmail))) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    let parsedDeliverAt: Date | null = null;
    if (deliverAt) {
      parsedDeliverAt = new Date(String(deliverAt));
      if (isNaN(parsedDeliverAt.getTime())) {
        return NextResponse.json({ error: "Invalid delivery date" }, { status: 400 });
      }
    }

    if (!db) {
      return NextResponse.json(
        { error: "Gift service is not configured yet" },
        { status: 503 }
      );
    }

    // Generate a unique code; retry once on the (astronomically unlikely)
    // unique collision.
    let code = generateGiftCode();
    const consentAt = new Date();
    const values = {
      code,
      tier: giftTier.id,
      amountCents: giftTier.amountCents,
      buyerName: String(buyerName).trim(),
      buyerEmail: String(buyerEmail).trim(),
      recipientName: String(recipientName).trim(),
      recipientEmail: String(recipientEmail).trim(),
      message: message ? String(message).trim().slice(0, 500) : null,
      deliverAt: parsedDeliverAt,
      status: "pending_payment",
      agreedToTerms: true,
      agreedToTermsAt: consentAt,
      termsVersion: GIFT_POLICY_VERSION,
    };

    let inserted;
    try {
      inserted = await db.insert(giftCertificates).values(values).returning();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("gift_certificates_code_key") || msg.includes("duplicate key")) {
        code = generateGiftCode();
        inserted = await db
          .insert(giftCertificates)
          .values({ ...values, code })
          .returning();
      } else {
        throw e;
      }
    }

    const cert = inserted[0];
    console.log("New ForeverMemoirs gift certificate:", {
      code: cert.code,
      tier: cert.tier,
      buyerEmail: cert.buyerEmail,
    });

    // EMAIL SEAM: when buyer-email sending is configured (Postmark/Resend via
    // joe@forevermemoirs.com), send the buyer their receipt here and schedule
    // the recipient's certificate for deliverAt. Until then the buyer prints
    // or forwards the certificate from /gift/success.
    console.log(
      `[gift-email-seam] Would email receipt to ${cert.buyerEmail} and ` +
        `certificate to ${cert.recipientEmail} ` +
        (cert.deliverAt ? `scheduled for ${cert.deliverAt.toISOString()}` : "immediately")
    );

    return NextResponse.json({
      ok: true,
      code: cert.code,
      tier: giftTier.id,
      tierName: giftTier.name,
      price: giftTier.price,
      recipientName: cert.recipientName,
      message: cert.message,
      status: cert.status,
      paymentNote:
        "Gift reserved. Online payment opens soon — we'll email your payment link before the holidays.",
    });
  } catch (error) {
    console.error("Failed to create gift certificate:", error);
    return NextResponse.json(
      { error: "Internal server error creating gift certificate" },
      { status: 500 }
    );
  }
}

// GET /api/gift?code=FM-XXXXXX — public certificate lookup (for the
// certificate page and the redeem flow). Returns only what a recipient
// needs to see: no buyer email, no internal status details beyond
// redeemability.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim().toUpperCase();
    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }
    if (!db) {
      return NextResponse.json({ error: "Gift service is not configured yet" }, { status: 503 });
    }
    const rows = await db
      .select()
      .from(giftCertificates)
      .where(eq(giftCertificates.code, code))
      .limit(1);
    const cert = rows[0];
    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    const giftTier = giftTierById(cert.tier);
    return NextResponse.json({
      ok: true,
      code: cert.code,
      tier: cert.tier,
      tierName: giftTier?.name ?? cert.tier,
      price: giftTier?.price ?? "",
      giftBlurb: giftTier?.giftBlurb ?? "",
      recipientName: cert.recipientName,
      message: cert.message,
      redeemable: cert.status === "issued",
      redeemed: cert.status === "redeemed",
      status: cert.status,
    });
  } catch (error) {
    console.error("Failed to look up gift certificate:", error);
    return NextResponse.json(
      { error: "Internal server error looking up gift certificate" },
      { status: 500 }
    );
  }
}
