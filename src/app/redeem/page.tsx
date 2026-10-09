"use client";

import { useState } from "react";
import Link from "next/link";

interface Lookup {
  code: string;
  tierName: string;
  price: string;
  giftBlurb: string;
  recipientName: string;
  message: string | null;
  redeemable: boolean;
  redeemed: boolean;
  status: string;
}

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [looking, setLooking] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [redeemError, setRedeemError] = useState("");
  const [orderTier, setOrderTier] = useState("");

  async function onLookup(e: React.FormEvent) {
    e.preventDefault();
    setLooking(true);
    setLookupError("");
    setLookup(null);
    const res = await fetch(`/api/gift?code=${encodeURIComponent(code.trim())}`);
    setLooking(false);
    if (!res.ok) {
      setLookupError("We couldn't find that code. Check it and try again.");
      return;
    }
    const data = await res.json();
    setLookup(data);
    setName(data.recipientName || "");
  }

  async function onRedeem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRedeemStatus("sending");
    setRedeemError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/gift/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: lookup?.code,
        name: fd.get("name"),
        email: fd.get("email"),
        agreedToTerms: fd.get("agreedToTerms") === "on",
        confirmedPhotoRights: fd.get("confirmedPhotoRights") === "on",
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setRedeemStatus("error");
      setRedeemError(data.error || "Redemption failed. Please try again.");
      return;
    }
    const data = await res.json();
    setOrderTier(data.tier);
    setRedeemStatus("done");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          🎁 Redeem a Gift
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-100">
          Someone thinks your story should be told.
        </h1>
        <p className="text-sm text-parchment-200/70">
          Enter the redemption code from your gift certificate.
        </p>
      </div>

      {redeemStatus === "done" ? (
        <div className="rounded-3xl border border-gold-500/40 bg-ink-950/70 p-8 text-center space-y-4">
          <div className="text-4xl">✨</div>
          <h2 className="font-serif text-2xl font-bold text-parchment-100">
            Your gift is redeemed!
          </h2>
          <p className="text-sm text-parchment-200/70 leading-relaxed">
            Your {lookup?.tierName} is ready. The next step is uploading your
            photos so our studio can begin.
          </p>
          <Link
            href={`/order?tier=${orderTier}`}
            className="inline-block rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-sm font-semibold text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/25"
          >
            Upload my photos →
          </Link>
        </div>
      ) : !lookup ? (
        <form
          onSubmit={onLookup}
          className="rounded-3xl border border-white/10 bg-ink-950/70 p-8 space-y-4"
        >
          <label className="block">
            <span className="text-xs font-medium text-parchment-200/70">
              Redemption code
            </span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="FM-XXXXXX"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 font-mono text-lg tracking-widest text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-500/60 focus:outline-none text-center"
            />
          </label>
          {lookupError && <p className="text-sm text-red-400">{lookupError}</p>}
          <button
            type="submit"
            disabled={looking}
            className="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-3.5 text-sm font-semibold text-ink-950 hover:brightness-110 disabled:opacity-60"
          >
            {looking ? "Looking it up…" : "Look up my gift"}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl border border-gold-500/40 bg-ink-950/70 p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-parchment-200/50">
              A gift for
            </p>
            <p className="mt-1 font-serif text-2xl font-bold text-parchment-100">
              {lookup.recipientName}
            </p>
            <p className="mt-3 font-serif text-xl font-bold text-gold-300">
              {lookup.tierName} — {lookup.price}
            </p>
            <p className="mt-2 text-xs text-parchment-200/60 max-w-md mx-auto leading-relaxed">
              {lookup.giftBlurb}
            </p>
            {lookup.message && (
              <p className="mt-4 font-serif italic text-parchment-100/90 text-sm">
                “{lookup.message}”
              </p>
            )}
          </div>

          {lookup.redeemed ? (
            <p className="text-center text-sm text-parchment-200/70">
              This gift has already been redeemed. If that wasn&apos;t you,{" "}
              <a href="mailto:joe@forevermemoirs.com" className="text-gold-300 underline">
                contact us
              </a>
              .
            </p>
          ) : !lookup.redeemable ? (
            <p className="text-center text-sm text-parchment-200/70">
              This gift isn&apos;t active quite yet — the giver&apos;s payment is
              still processing. Check back soon.
            </p>
          ) : (
            <form
              onSubmit={onRedeem}
              className="rounded-3xl border border-white/10 bg-ink-950/70 p-8 space-y-4"
            >
              <h2 className="font-serif text-lg font-bold text-parchment-100">
                Redeem it — tell us where to reach you
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-parchment-200/70">Your name</span>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 focus:border-gold-500/60 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-parchment-200/70">Your email</span>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-parchment-100 focus:border-gold-500/60 focus:outline-none"
                  />
                </label>
              </div>
              <label className="flex items-start gap-3 text-xs text-parchment-200/80 leading-relaxed cursor-pointer">
                <input type="checkbox" name="agreedToTerms" required className="mt-0.5 h-4 w-4 accent-yellow-600" />
                <span>
                  I agree to the ForeverMemoirs{" "}
                  <a href="/terms" target="_blank" className="text-gold-300 underline">Terms of Service</a>.
                </span>
              </label>
              <label className="flex items-start gap-3 text-xs text-parchment-200/80 leading-relaxed cursor-pointer">
                <input type="checkbox" name="confirmedPhotoRights" required className="mt-0.5 h-4 w-4 accent-yellow-600" />
                <span>
                  I confirm I have the right to share the photos I upload and agree to the{" "}
                  <a href="/release" target="_blank" className="text-gold-300 underline">photo release</a>.
                </span>
              </label>
              {redeemStatus === "error" && (
                <p className="text-sm text-red-400">{redeemError}</p>
              )}
              <button
                type="submit"
                disabled={redeemStatus === "sending"}
                className="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-3.5 text-sm font-semibold text-ink-950 hover:brightness-110 disabled:opacity-60"
              >
                {redeemStatus === "sending" ? "Redeeming…" : "Redeem my gift"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
