/* Storykeepers route tests (no-DB paths) — npx tsx scripts/test-storykeepers-routes.ts */
import { POST as requestCodePOST, GET as requestCodeGET } from "../src/app/api/storykeepers/request-code/route";
import { POST as verifyCodePOST, GET as verifyCodeGET } from "../src/app/api/storykeepers/verify-code/route";

let pass = 0, fail = 0;
function ok(name: string, cond: boolean) {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}`); }
}
const post = (fn: (r: Request) => Promise<Response>, body: unknown) =>
  fn(new Request("http://localhost/api/x", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));

async function main() {
console.log("request-code");
// NOTE: no DATABASE_URL in this env -> db is null -> 503 AFTER validation
let r = await post(requestCodePOST, { email: "not-an-email", consent: true });
ok("invalid email -> 400", r.status === 400);
r = await post(requestCodePOST, { email: "test@example.com", consent: false });
ok("missing consent -> 400", r.status === 400);
r = await post(requestCodePOST, { email: "test@example.com" });
ok("absent consent -> 400", r.status === 400);
r = await post(requestCodePOST, { email: " TEST@Example.COM ", consent: true });
ok("valid+consent, no db -> 503", r.status === 503);
r = await requestCodeGET();
ok("GET -> 405", r.status === 405);

console.log("verify-code");
r = await post(verifyCodePOST, { email: "bad", code: "123456" });
ok("bad email shape -> 400 generic", r.status === 400 &&
  ((await r.json()) as { error: string }).error.includes("didn't work"));
r = await post(verifyCodePOST, { email: "test@example.com", code: "12" });
ok("bad code shape -> 400 generic", r.status === 400);
r = await post(verifyCodePOST, { email: "test@example.com", code: "123456" });
ok("valid shape, no db -> 503", r.status === 503);
r = await verifyCodeGET();
ok("GET -> 405", r.status === 405);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
}
main();
