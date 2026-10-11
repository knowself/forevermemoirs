/* Storykeepers DB integration test (PGlite in-memory Postgres).
 * Runs the EXACT query sequences from the two API routes against a real
 * database: request -> verify, wrong codes, attempts cap, expiry, cooldown,
 * hourly caps, single-use, upsert.  npx tsx scripts/test-storykeepers-db.ts
 */
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { and, count, desc, eq, gt } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  storykeeperCodes,
  storykeeperVerifiedEmails,
} from "../drizzle/schema";
import {
  SK_MAX_CODES_PER_HOUR,
  SK_MAX_CODE_ATTEMPTS,
  codeMatches,
  generateCode,
  hashCode,
} from "../src/lib/storykeepers";

let pass = 0, fail = 0;
function ok(name: string, cond: boolean) {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}`); }
}

async function main() {
  const client = new PGlite();
  const db = drizzle(client);

  // Create tables from raw DDL mirroring the drizzle schema.
  await client.exec(`
    CREATE TABLE storykeeper_codes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      ip TEXT,
      expires_at TIMESTAMPTZ NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE storykeeper_verified_emails (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      verified_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      consented_at TIMESTAMPTZ NOT NULL,
      source TEXT NOT NULL DEFAULT 'storykeepers-corner',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("tables created");

  const EMAIL = "tester@example.com";
  const now = () => new Date();

  // ---- Simulate request-code: insert a code row ----
  const code = generateCode();
  await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  await db.insert(storykeeperCodes).values({
    email: EMAIL,
    codeHash: hashCode(code),
    ip: "1.2.3.4",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    attempts: 0,
  });
  let rows = await db.select().from(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  ok("code row inserted", rows.length === 1 && rows[0].attempts === 0);

  // ---- Cooldown check: latest row is fresh -> would 429 ----
  const latest = await db.select().from(storykeeperCodes)
    .where(eq(storykeeperCodes.email, EMAIL))
    .orderBy(desc(storykeeperCodes.createdAt)).limit(1);
  ok("cooldown detects fresh row",
    now().getTime() - latest[0].createdAt!.getTime() < 60_000);

  // ---- Simulate verify-code: wrong code increments attempts ----
  const live = await db.select().from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.email, EMAIL), gt(storykeeperCodes.expiresAt, now())))
    .orderBy(desc(storykeeperCodes.createdAt)).limit(1);
  ok("live code found", live.length === 1);
  ok("wrong code rejected", !codeMatches("000000", live[0].codeHash));
  await db.update(storykeeperCodes).set({ attempts: 1 }).where(eq(storykeeperCodes.id, live[0].id));
  rows = await db.select().from(storykeeperCodes).where(eq(storykeeperCodes.id, live[0].id));
  ok("attempts incremented", rows[0].attempts === 1);

  // ---- Attempts cap: set to max, route would 429 ----
  await db.update(storykeeperCodes).set({ attempts: SK_MAX_CODE_ATTEMPTS })
    .where(eq(storykeeperCodes.id, live[0].id));
  rows = await db.select().from(storykeeperCodes).where(eq(storykeeperCodes.id, live[0].id));
  ok("attempts cap reached", (rows[0].attempts ?? 0) >= SK_MAX_CODE_ATTEMPTS);

  // ---- Fresh code, correct verify ----
  await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  const code2 = generateCode();
  await db.insert(storykeeperCodes).values({
    email: EMAIL, codeHash: hashCode(code2), ip: "1.2.3.4",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), attempts: 0,
  });
  const live2 = (await db.select().from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.email, EMAIL), gt(storykeeperCodes.expiresAt, now())))
    .orderBy(desc(storykeeperCodes.createdAt)).limit(1))[0];
  ok("correct code matches", codeMatches(code2, live2.codeHash));

  // success path: burn codes + upsert verified
  await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  const vnow = new Date();
  await db.insert(storykeeperVerifiedEmails)
    .values({ email: EMAIL, verifiedAt: vnow, consentedAt: vnow, source: "storykeepers-corner" })
    .onConflictDoUpdate({
      target: storykeeperVerifiedEmails.email,
      set: { verifiedAt: vnow, consentedAt: vnow },
    });
  rows = await db.select().from(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  ok("codes burned (single-use)", rows.length === 0);
  const vem = await db.select().from(storykeeperVerifiedEmails).where(eq(storykeeperVerifiedEmails.email, EMAIL));
  ok("verified row created", vem.length === 1);
  ok("consentedAt recorded", vem[0].consentedAt instanceof Date);
  ok("source recorded", vem[0].source === "storykeepers-corner");

  // upsert again (returning visitor): no duplicate
  const vnow2 = new Date(vnow.getTime() + 1000);
  await db.insert(storykeeperVerifiedEmails)
    .values({ email: EMAIL, verifiedAt: vnow2, consentedAt: vnow2, source: "storykeepers-corner" })
    .onConflictDoUpdate({
      target: storykeeperVerifiedEmails.email,
      set: { verifiedAt: vnow2, consentedAt: vnow2 },
    });
  const vem2 = await db.select().from(storykeeperVerifiedEmails).where(eq(storykeeperVerifiedEmails.email, EMAIL));
  ok("upsert dedupes", vem2.length === 1 && vem2[0].verifiedAt.getTime() === vnow2.getTime());

  // ---- Expired code is invisible to the live-code query ----
  await db.insert(storykeeperCodes).values({
    email: EMAIL, codeHash: hashCode("999999"), ip: "1.2.3.4",
    expiresAt: new Date(Date.now() - 1000), attempts: 0,
  });
  const liveExpired = await db.select().from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.email, EMAIL), gt(storykeeperCodes.expiresAt, now())));
  ok("expired code excluded", liveExpired.length === 0);

  // ---- Hourly cap counting ----
  await db.delete(storykeeperCodes).where(eq(storykeeperCodes.email, EMAIL));
  for (let i = 0; i < SK_MAX_CODES_PER_HOUR; i++) {
    await db.insert(storykeeperCodes).values({
      email: EMAIL, codeHash: hashCode("11111" + i), ip: "9.9.9.9",
      expiresAt: new Date(Date.now() + 900000), attempts: 0,
    });
  }
  const hourAgo = new Date(Date.now() - 3600_000);
  const [{ n: emailCount }] = await db.select({ n: count() }).from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.email, EMAIL), gt(storykeeperCodes.createdAt, hourAgo)));
  ok("hourly email cap counts 5", emailCount === SK_MAX_CODES_PER_HOUR);
  const [{ n: ipCount }] = await db.select({ n: count() }).from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.ip, "9.9.9.9"), gt(storykeeperCodes.createdAt, hourAgo)));
  ok("hourly ip cap counts 5", ipCount === SK_MAX_CODES_PER_HOUR);

  // ---- Old codes outside the hour don't count ----
  await client.exec(
    `UPDATE storykeeper_codes SET created_at = now() - interval '2 hours' WHERE email = '${EMAIL}'`
  );
  const [{ n: emailCount2 }] = await db.select({ n: count() }).from(storykeeperCodes)
    .where(and(eq(storykeeperCodes.email, EMAIL), gt(storykeeperCodes.createdAt, hourAgo)));
  void sql;
  ok("2-hour-old codes excluded", emailCount2 === 0);

  await client.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}
main();
