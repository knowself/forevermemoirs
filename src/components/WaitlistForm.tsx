"use client";

import { useState } from "react";

export type WaitlistSource = "homepage" | "waitlist-page" | "instagram";

/**
 * Email capture for the holiday gift-certificate waitlist.
 * Posts to /api/waitlist; shows an inline success or error state.
 */
export function WaitlistForm({ source }: { source: WaitlistSource }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          source,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-gold-500/30 bg-gold-500/10 px-6 py-5 text-center"
      >
        <p className="font-serif text-lg font-bold text-gold-300">
          You&apos;re on the list &mdash; we&apos;ll email you first.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 rounded-xl border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-xl sm:rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-6 py-3 text-sm font-bold text-ink-950 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 whitespace-nowrap"
        >
          {status === "sending" ? "Joining…" : "Notify Me"}
        </button>
      </div>
      <input
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your name (optional)"
        aria-label="Your name (optional)"
        className="w-full rounded-xl border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
      />
      {status === "error" && (
        <p role="alert" className="text-center text-xs text-red-400">
          Something went wrong &mdash; please check your email and try again.
        </p>
      )}
      <p className="text-center text-[11px] text-parchment-200/40">
        One email when gift certificates open. No spam, ever.
      </p>
    </form>
  );
}
