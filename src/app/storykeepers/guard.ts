/* ============================================================================
 * Storykeepers' Corner — server-side session helper.
 *
 * The email gate is retired: every guide page is open to everyone, including
 * crawlers. The only remaining use is the front door (/storykeepers), which
 * skips its own gate copy for visitors who already hold a valid session.
 * ========================================================================== */

import { cookies } from "next/headers";
import {
  SK_COOKIE_NAME,
  sessionSecret,
  verifySession,
} from "@/lib/storykeepers";

/** True when the visitor already holds a valid Corner session. */
export async function hasStorykeeperSession(): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret) return false;
  const jar = await cookies();
  return verifySession(jar.get(SK_COOKIE_NAME)?.value, secret) !== null;
}
