/* ============================================================================
 * Storykeepers' Corner — server-side gate helper.
 *
 * Every Corner page except the front door calls requireStorykeeper() at the
 * top. Unverified visitors (no cookie, bad signature, expired token) are
 * redirected to /storykeepers. Verified visitors get their email back.
 * ========================================================================== */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SK_COOKIE_NAME,
  sessionSecret,
  verifySession,
} from "@/lib/storykeepers";

export async function requireStorykeeper(): Promise<string> {
  const secret = sessionSecret();
  const jar = await cookies();
  const email = verifySession(jar.get(SK_COOKIE_NAME)?.value, secret ?? "");
  if (!email) redirect("/storykeepers");
  return email;
}

/** True when the visitor already holds a valid Corner session. */
export async function hasStorykeeperSession(): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret) return false;
  const jar = await cookies();
  return verifySession(jar.get(SK_COOKIE_NAME)?.value, secret) !== null;
}
