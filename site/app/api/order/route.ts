import { NextResponse } from "next/server";

// Orders are accepted here. Connect a Neon database (DATABASE_URL) and the
// drizzle schema in /drizzle/schema.ts to persist them.
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, tier, notes } = body ?? {};
  if (!name || !email || !tier) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  console.log("New ForeverMemoirs order:", { name, email, tier, notes });
  // TODO: insert into orders table + send confirmation email
  return NextResponse.json({ ok: true });
}
