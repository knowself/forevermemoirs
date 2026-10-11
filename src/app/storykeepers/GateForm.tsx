/* ============================================================================
 * Storykeepers' Corner — the email gate form (client component).
 *
 * Two steps on one page:
 *   1. Email + explicit opt-in checkbox (UNCHECKED by default, REQUIRED) →
 *      "Send my code" → POST /api/storykeepers/request-code
 *   2. 6-digit code field → "Enter" → POST /api/storykeepers/verify-code →
 *      redirect to /storykeepers/library on success.
 *
 * The checkbox label is Joe-approved copy and must stay verbatim:
 *   "Yes — send me word when new journals and guides arrive"
 * ========================================================================== */

"use client";

import { useState } from "react";

type Phase = "email" | "code";

export default function GateForm() {
  const [phase, setPhase] = useState<Phase>("email");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!consent) {
      setError(
        "Please check the box to hear from us — it's required to enter the Corner."
      );
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/storykeepers/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setPhase("code");
      setNotice("Code sent — check your inbox (and the spam folder, just in case).");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      const res = await fetch("/api/storykeepers/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !data?.ok) {
        setError(
          data?.error ??
            "That code didn't work. Check the email and try again — or ask for a fresh code."
        );
        return;
      }
      window.location.href = "/storykeepers/library";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      const res = await fetch("/api/storykeepers/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setCode("");
      setNotice("Fresh code sent — check your inbox.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-white/15 bg-ink-950/80 px-5 py-4 text-lg text-parchment-100 placeholder:text-parchment-200/40 focus:border-gold-500/60 focus:outline-none";
  const btnCls =
    "w-full rounded-2xl bg-gold-gradient px-6 py-4 text-lg font-bold text-ink-950 hover:opacity-90 transition-opacity disabled:opacity-50";

  return (
    <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-6 sm:p-8">
      {phase === "email" ? (
        <form onSubmit={requestCode} className="space-y-5">
          <div>
            <label
              htmlFor="sk-email"
              className="block text-sm font-semibold text-parchment-200/80 pb-2"
            >
              Email address
            </label>
            <input
              id="sk-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputCls}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-white/10 bg-ink-900/60 p-4">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-gold-500"
            />
            <span className="text-parchment-200/85 leading-relaxed">
              Yes — send me word when new journals and guides arrive{" "}
              <span className="text-parchment-200/50">(required to enter)</span>
            </span>
          </label>

          <button type="submit" disabled={busy} className={btnCls}>
            {busy ? "Sending…" : "Send my code"}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="space-y-5">
          <div>
            <label
              htmlFor="sk-code"
              className="block text-sm font-semibold text-parchment-200/80 pb-2"
            >
              6-digit code <span className="font-normal text-parchment-200/50">(sent to {email})</span>
            </label>
            <input
              id="sk-code"
              type="text"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="••••••"
              className={`${inputCls} text-center tracking-[0.5em] font-mono`}
            />
          </div>

          <button type="submit" disabled={busy} className={btnCls}>
            {busy ? "Checking…" : "Enter"}
          </button>

          <button
            type="button"
            onClick={resend}
            disabled={busy}
            className="w-full text-sm text-gold-300 hover:text-gold-200 transition-colors disabled:opacity-50"
          >
            Didn&apos;t get it? Send a fresh code
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-5 rounded-2xl border border-red-400/30 bg-red-950/40 px-5 py-3 text-red-200">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mt-5 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-5 py-3 text-gold-200">
          {notice}
        </p>
      )}

      <p className="mt-5 text-center text-sm text-parchment-200/50">
        That&apos;s all we ever send. We never sell your email. Unsubscribe anytime.
      </p>
    </div>
  );
}
