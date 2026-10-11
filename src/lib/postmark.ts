/* ============================================================================
 * FOREVERMEMOIRS — Postmark mail sender (src/lib/postmark.ts)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS:
 *
 * The Storykeepers' Corner emails 6-digit verification codes. This module
 * sends them through Postmark's API with a plain fetch — no SDK dependency.
 *
 * REQUIRED ENV (Vercel):
 *   POSTMARK_SERVER_TOKEN  — the Postmark server token (server, not account).
 *   STORYKEEPERS_FROM_EMAIL — the From address, e.g. hello@forevermemoirs.com.
 *     Defaults to hello@forevermemoirs.com; the domain must be a verified
 *     Postmark sender signature/domain or Postmark will reject the send.
 *
 * If POSTMARK_SERVER_TOKEN is missing, sendCodeEmail throws and the
 * request-code route surfaces a 503 — the gate degrades loudly, never
 * silently pretending a code was sent.
 * ========================================================================== */

const POSTMARK_API = "https://api.postmarkapp.com/email";
const DEFAULT_FROM = "hello@forevermemoirs.com";

export function mailConfigured(): boolean {
  return Boolean(process.env.POSTMARK_SERVER_TOKEN);
}

function fromAddress(): string {
  const v = process.env.STORYKEEPERS_FROM_EMAIL;
  return v && v.trim() ? v.trim() : DEFAULT_FROM;
}

/**
 * Email the 6-digit Corner code. Throws on missing config or Postmark error.
 * Never include the code anywhere except the email body.
 */
export async function sendCodeEmail(to: string, code: string): Promise<void> {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    throw new Error("POSTMARK_SERVER_TOKEN is not configured");
  }

  const subject = "Your Storykeepers' Corner code";
  const textBody = [
    `Your Storykeepers' Corner verification code is:`,
    ``,
    `    ${code}`,
    ``,
    `Type it into the form on forevermemoirs.com/storykeepers — it expires in 15 minutes.`,
    ``,
    `If you didn't ask for this code, just ignore this email. Nothing will happen.`,
    ``,
    `— ForeverMemoirs, Finley, California`,
  ].join("\n");

  const htmlBody = [
    `<p>Your Storykeepers&rsquo; Corner verification code is:</p>`,
    `<p style="font-size:28px;letter-spacing:6px;font-weight:bold;">${escapeHtml(code)}</p>`,
    `<p>Type it into the form on forevermemoirs.com/storykeepers &mdash; it expires in 15 minutes.</p>`,
    `<p>If you didn&rsquo;t ask for this code, just ignore this email. Nothing will happen.</p>`,
    `<p>&mdash; ForeverMemoirs, Finley, California</p>`,
  ].join("\n");

  const res = await fetch(POSTMARK_API, {
    method: "POST",
    headers: {
      "X-Postmark-Server-Token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      From: fromAddress(),
      To: to,
      Subject: subject,
      TextBody: textBody,
      HtmlBody: htmlBody,
      MessageStream: "outbound",
      Tag: "storykeepers-code",
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Postmark send failed (${res.status}): ${detail.slice(0, 200)}`
    );
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;"
  );
}
