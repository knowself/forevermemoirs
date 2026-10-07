import { NextResponse } from "next/server";
import { db, orders } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, tier, notes } = body ?? {};

    if (!name || !email || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("New ForeverMemoirs order received:", { name, email, tier, notes });

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

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ orders: [], message: "Database not connected" });
    }
    const allOrders = await db.select().from(orders);
    return NextResponse.json({ orders: allOrders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
