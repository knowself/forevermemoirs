import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, giftCertificates, orders } from "@/lib/db";
import { GIFT_POLICY_VERSION } from "@/lib/gifts";

// POST /api/gift/redeem — redeem a gift certificate.
// Body: { code, name, email, agreedToTerms, confirmedPhotoRights }
//
// Only certificates with status "issued" can be redeemed. (Certificates sit
// in "pending_payment" until the Stripe webhook marks them paid — see
// POST /api/gift.) Redemption creates a normal order row for the recipient
// and marks the certificate redeemed, so fulfillment flows through the
// exact same pipeline as a direct order.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, name, email, agreedToTerms, confirmedPhotoRights } = body ?? {};

    if (!code || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!agreedToTerms || !confirmedPhotoRights) {
      return NextResponse.json(
        { error: "Terms agreement and photo-rights confirmation are required" },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "Gift service is not configured yet" },
        { status: 503 }
      );
    }

    const normalized = String(code).trim().toUpperCase();
    const rows = await db
      .select()
      .from(giftCertificates)
      .where(eq(giftCertificates.code, normalized))
      .limit(1);
    const cert = rows[0];
    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    if (cert.status === "redeemed") {
      return NextResponse.json(
        { error: "This gift has already been redeemed" },
        { status: 409 }
      );
    }
    if (cert.status !== "issued") {
      return NextResponse.json(
        { error: "This gift is not active yet" },
        { status: 409 }
      );
    }

    const consentAt = new Date();
    const inserted = await db
      .insert(orders)
      .values({
        name: String(name).trim(),
        email: String(email).trim(),
        tier: cert.tier,
        notes: `Redeemed gift certificate ${cert.code} (from ${cert.buyerName}).${
          cert.message ? ` Gift message: ${cert.message}` : ""
        }`,
        status: "gift_redeemed",
        photoKeys: [],
        agreedToTerms: true,
        agreedToTermsAt: consentAt,
        termsVersion: GIFT_POLICY_VERSION,
        confirmedPhotoRights: true,
        confirmedPhotoRightsAt: consentAt,
        photoRightsVersion: GIFT_POLICY_VERSION,
      })
      .returning();

    await db
      .update(giftCertificates)
      .set({ status: "redeemed", redeemedAt: consentAt })
      .where(eq(giftCertificates.id, cert.id));

    console.log("Gift certificate redeemed:", {
      code: cert.code,
      orderId: inserted[0]?.id,
    });

    return NextResponse.json({
      ok: true,
      orderId: inserted[0]?.id ?? null,
      tier: cert.tier,
    });
  } catch (error) {
    console.error("Failed to redeem gift certificate:", error);
    return NextResponse.json(
      { error: "Internal server error redeeming gift certificate" },
      { status: 500 }
    );
  }
}
