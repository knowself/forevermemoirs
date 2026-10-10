"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { GIFT_TIERS } from "@/lib/gifts";

type Status = "idle" | "sending" | "error";

function GiftContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTier = searchParams.get("tier") || "videopostcard";

  const [tierId, setTierId] = useState(
    GIFT_TIERS.some((t) => t.id === initialTier) ? initialTier : "videopostcard"
  );
  const [delivery, setDelivery] = useState<"now" | "christmas" | "custom">("christmas");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const active = GIFT_TIERS.find((t) => t.id === tierId) || GIFT_TIERS[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);

    let deliverAt: string | null = null;
    if (delivery === "christmas") deliverAt = "2026-12-25T08:00:00-08:00";
    else if (delivery === "custom") {
      const d = String(fd.get("customDate") || "");
      if (!d) {
        setStatus("idle");
        setErrorMsg("Please pick a delivery date.");
        return;
      }
      deliverAt = `${d}T08:00:00-08:00`;
    }

    const res = await fetch("/api/gift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tier: tierId,
        buyerName: fd.get("buyerName"),
        buyerEmail: fd.get("buyerEmail"),
        recipientName: fd.get("recipientName"),
        recipientEmail: fd.get("recipientEmail"),
        message: fd.get("message"),
        deliverAt,
        agreedToTerms: fd.get("agreedToTerms") === "on",
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setErrorMsg(data.error || "Something went wrong. Please try again.");
      return;
    }
    const data = await res.json();
    router.push(`/gift/success?code=${encodeURIComponent(data.code)}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          🎁 Give a Gift
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-parchment-100">
          The postcard is the hello. The memoir is the life.
        </h1>
        <p className="text-base text-parchment-200/70 leading-relaxed">
          Buy any tier as a gift. Your recipient gets a beautiful certificate
          instantly — and redeems it whenever they&apos;re ready, even after the holidays.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-12 space-y-10">
        {/* Tier picker */}
        <section>
          <h2 className="font-serif text-xl font-bold text-parchment-100 mb-4">
            1. Choose the gift
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GIFT_TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                className={`text-left rounded-2xl border p-5 transition-all ${
                  tierId === t.id
                    ? "border-gold-500/70 bg-gold-500/10 shadow-lg shadow-gold-500/10"
                    : "border-white/10 bg-ink-950/70 hover:border-gold-500/30"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-lg font-bold text-parchment-100">
                    {t.name}
                  </span>
                  <span className="font-serif text-2xl font-bold text-gold-300">
                    {t.price}
                  </span>
                </div>
                {t.badge && (
                  <span className="mt-1 inline-block rounded-full bg-white/10 border border-gold-500/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-300">
                    {t.badge}
                  </span>
                )}
                <p className="mt-2 text-xs text-parchment-200/70 leading-relaxed">
                  {t.giftBlurb}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Buyer + recipient */}
        <section>
          <h2 className="font-serif text-xl font-bold text-parchment-100 mb-4">
            2. Who it&apos;s from &amp; who it&apos;s for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-parchment-200/70">Your name</span>
              <input
                name="buyerName"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none"
                placeholder="Your full name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-parchment-200/70">Your email</span>
              <input
                name="buyerEmail"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-parchment-200/70">Recipient&apos;s name</span>
              <input
                name="recipientName"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none"
                placeholder="Their full name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-parchment-200/70">Recipient&apos;s email</span>
              <input
                name="recipientEmail"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none"
                placeholder="them@example.com"
              />
            </label>
          </div>
          <label className="block mt-4">
            <span className="text-xs font-medium text-parchment-200/70">
              A personal message on the certificate <span className="text-parchment-200/40">(optional)</span>
            </span>
            <textarea
              name="message"
              rows={3}
              maxLength={500}
              className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none"
              placeholder="Mom — your stories deserve more than a shoebox. Love, …"
            />
          </label>
        </section>

        {/* Delivery timing */}
        <section>
          <h2 className="font-serif text-xl font-bold text-parchment-100 mb-4">
            3. When should they receive it?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            {(
              [
                ["now", "Send now", "They get it right away"],
                ["christmas", "Christmas morning", "Delivered Dec 25 at 8am PT"],
                ["custom", "Pick a date", "You choose the moment"],
              ] as const
            ).map(([id, label, sub]) => (
              <button
                key={id}
                type="button"
                onClick={() => setDelivery(id)}
                className={`flex-1 rounded-2xl border p-4 text-left transition-all ${
                  delivery === id
                    ? "border-gold-500/70 bg-gold-500/10"
                    : "border-white/10 bg-ink-950/70 hover:border-gold-500/30"
                }`}
              >
                <div className="text-sm font-semibold text-parchment-100">{label}</div>
                <div className="mt-1 text-xs text-parchment-200/60">{sub}</div>
              </button>
            ))}
          </div>
          {delivery === "custom" && (
            <input
              name="customDate"
              type="date"
              min="2026-10-09"
              className="mt-3 rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 focus:border-gold-500/60 focus:outline-none"
            />
          )}
        </section>

        {/* Consent + submit */}
        <section className="rounded-2xl border border-white/10 bg-ink-950/70 p-6 space-y-4">
          <label className="flex items-start gap-3 text-xs text-parchment-200/80 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              name="agreedToTerms"
              required
              className="mt-0.5 h-4 w-4 accent-yellow-600"
            />
            <span>
              I agree to the ForeverMemoirs{" "}
              <a href="/terms" target="_blank" className="text-gold-300 underline">
                Terms of Service
              </a>
              . I understand online payment opens soon and my gift reservation
              holds my recipient&apos;s certificate until checkout is complete.
            </span>
          </label>

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-4 text-sm font-semibold text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/25 active:scale-[0.99] disabled:opacity-60"
          >
            {status === "sending"
              ? "Reserving your gift…"
              : `Reserve this gift — ${active.price} ${active.name}`}
          </button>
          <p className="text-center text-[11px] text-parchment-200/50">
            No payment due today. We&apos;ll email your secure payment link the moment
            checkout opens — your recipient&apos;s certificate is reserved now.
          </p>
        </section>
      </form>
    </div>
  );
}

export default function GiftPage() {
  return (
    <Suspense>
      <GiftContent />
    </Suspense>
  );
}
