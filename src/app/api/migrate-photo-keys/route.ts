import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// TEMPORARY migration route — adds the photo_keys column. Hit once from the
// preview deployment, verify, then delete this file before PR review.
export async function GET() {
  return run();
}

export async function POST() {
  return run();
}

async function run() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ ok: false, error: "DATABASE_URL is not set on this deployment" }, { status: 500 });
    }
    const sql = neon(process.env.DATABASE_URL);
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS photo_keys text[]`;
    const cols = await sql`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'orders' AND column_name = 'photo_keys'`;
    return NextResponse.json({ ok: true, photo_keys: cols.length > 0 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
