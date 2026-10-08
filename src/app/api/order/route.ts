import { NextResponse } from "next/server";
import { db, orders } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, tier, notes } = body ?? {};

    if (!name || !email || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO (Launch Document Section B items 8 & 9): the order form now sends
    // `agreedToTerms` and `confirmedPhotoRights` flags — explicit clickwrap
    // consent to the Terms of Service and the photo-rights warranty. They are
    // logged below, but a future migration should add them as real columns on
    // the orders table (drizzle schema) so consent is provable per order, not
    // just in server logs. Do not launch paid uploads without this.
    const { agreedToTerms, confirmedPhotoRights } = body ?? {};
    if (!agreedToTerms || !confirmedPhotoRights) {
      return NextResponse.json(
        { error: "Terms agreement and photo-rights confirmation are required" },
        { status: 400 }
      );
    }

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
