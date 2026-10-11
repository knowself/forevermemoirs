/* Storykeepers unit tests — run with: npx tsx scripts/test-storykeepers-unit.ts */
import {
  normalizeEmail,
  isValidEmail,
  generateCode,
  hashCode,
  codeMatches,
  signSession,
  verifySession,
  getClientIp,
} from "../src/lib/storykeepers";

let pass = 0;
let fail = 0;
function ok(name: string, cond: boolean) {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}`); }
}

console.log("email validation");
ok("trims + lowercases", normalizeEmail("  JoE@Example.COM ") === "joe@example.com");
ok("non-string -> empty", normalizeEmail(null) === "");
ok("valid simple", isValidEmail("a@b.co"));
ok("valid complex", isValidEmail("first.last+tag@sub.example.com"));
ok("rejects no @", !isValidEmail("notanemail"));
ok("rejects no tld", !isValidEmail("a@b"));
ok("rejects spaces", !isValidEmail("a @b.co"));
ok("rejects empty", !isValidEmail(""));
ok("rejects >254 chars", !isValidEmail("a@b.co".padEnd(255, "x")));

console.log("code generation + hashing");
const seen = new Set<string>();
for (let i = 0; i < 200; i++) {
  const c = generateCode();
  if (!/^\d{6}$/.test(c)) { ok(`code shape ${c}`, false); break; }
  seen.add(c);
}
ok("200 codes all 6-digit", seen.size > 190); // randomness sanity
ok("hash is sha256 hex", /^[0-9a-f]{64}$/.test(hashCode("123456")));
ok("hash deterministic", hashCode("123456") === hashCode("123456"));
ok("hash differs per code", hashCode("123456") !== hashCode("123457"));
ok("codeMatches true", codeMatches("123456", hashCode("123456")));
ok("codeMatches false on wrong", !codeMatches("123457", hashCode("123456")));
ok("codeMatches false on garbage hash", !codeMatches("123456", "zz"));

console.log("session sign/verify");
const secret = "test-secret-at-least-16-chars";
const tok = signSession("user@example.com", secret);
ok("token has 3 parts", tok.split("|").length === 3);
ok("verify returns email", verifySession(tok, secret) === "user@example.com");
ok("wrong secret -> null", verifySession(tok, "other-secret-12345678") === null);
ok("tampered email -> null", verifySession(tok.replace("user@", "evil@"), secret) === null);
ok("tampered expiry -> null", (() => {
  const p = tok.split("|"); p[1] = String(Date.now() + 99999999999); return verifySession(p.join("|"), secret) === null;
})());
ok("tampered sig -> null", verifySession(tok.slice(0, -1) + "0", secret) === null);
ok("garbage -> null", verifySession("garbage", secret) === null);
ok("undefined -> null", verifySession(undefined, secret) === null);
ok("empty secret -> null", verifySession(tok, "") === null);
// expired token: craft one manually
import { createHmac } from "crypto";
const past = Date.now() - 1000;
const payload = `old@example.com|${past}`;
const sig = createHmac("sha256", secret).update(payload, "utf8").digest("hex");
ok("expired -> null", verifySession(`${payload}|${sig}`, secret) === null);

console.log("client ip");
const req1 = new Request("http://x/", { headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" } });
ok("x-forwarded-for first", getClientIp(req1) === "1.2.3.4");
const req2 = new Request("http://x/", { headers: { "x-real-ip": "9.9.9.9" } });
ok("x-real-ip fallback", getClientIp(req2) === "9.9.9.9");
ok("no headers -> null", getClientIp(new Request("http://x/")) === null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
