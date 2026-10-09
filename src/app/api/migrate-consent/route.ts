import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// TEMPORARY migration route — runs the FM Door item 4 consent-columns
// migration once, then this file is deleted before merge. Protected by a
// one-time token in the query string.
const TOKEN = "a91cdd64a1aef437f941fe888a81569a";

const STATEMENTS = [
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS agreed_to_terms boolean NOT NULL DEFAULT false",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS agreed_to_terms_at timestamp",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS terms_version text",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_photo_rights boolean NOT NULL DEFAULT false",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_photo_rights_at timestamp",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS photo_rights_version text",
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return NextResponse.json({ error: "no db" }, { status: 500 });
  const sql = neon(dbUrl);
  const ran = [];
  for (const s of STATEMENTS) {
    await sql(s);
    ran.push(s.split("ADD COLUMN IF NOT EXISTS ")[1].split(" ")[0]);
  }
  const cols = await sql(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position"
  );
  return NextResponse.json({ ok: true, added: ran, columns: cols.map((c) => c.column_name) });
}
