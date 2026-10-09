import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// TEMPORARY migration route — runs the FM Door item 4 consent-columns
// migration once, then this file is deleted before merge. Protected by a
// one-time token in the query string.
const TOKEN = "";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return NextResponse.json({ error: "no db" }, { status: 500 });
  const sql = neon(dbUrl);
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS agreed_to_terms boolean NOT NULL DEFAULT false`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS agreed_to_terms_at timestamp`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS terms_version text`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_photo_rights boolean NOT NULL DEFAULT false`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_photo_rights_at timestamp`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS photo_rights_version text`;
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position`;
  return NextResponse.json({
    ok: true,
    columns: (cols as Array<{ column_name: string }>).map((c) => c.column_name),
  });
}
