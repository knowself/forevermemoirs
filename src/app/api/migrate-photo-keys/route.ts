import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// TEMPORARY migration route — adds the photo_keys column. Hit once from the
// preview deployment, verify, then delete this file before PR review.
export async function POST() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS photo_keys text[]`;
  const cols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'photo_keys'`;
  return NextResponse.json({ ok: true, photo_keys: cols.length > 0 });
}
