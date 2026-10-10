"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Cert {
  code: string;
  tierName: string;
  price: string;
  giftBlurb: string;
  recipientName: string;
  message: string | null;
  status: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const [cert, setCert] = useState<Cert | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!code) {
      setFailed(true);
      return;
    }
    fetch(`/api/gift?code=${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCert)
      .catch(() => setFailed(true));
  }, [code]);

  if (failed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-parchment-200/70">
          We couldn&apos;t find that gift certificate. Check the link and try again.
        </p>
        <Link href="/gift" className="mt-4 inline-block text-gold-300 underline">
          Back to gifts
        </Link>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-parchment-200/60">
        Loading your certificate…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center space-y-3 mb-10">
        <div className="text-4xl">🎁</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-100">
          Gift reserved for {cert.recipientName}
        </h1>
        <p className="text-sm text-parchment-200/70 max-w-xl mx-auto leading-relaxed">
          Your certificate is below. Print it, or forward it — and watch for our
          email with your secure payment link when checkout opens.
        </p>
      </div>

      {/* The certificate */}
      <div className="rounded-3xl border-2 border-gold-500/60 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 p-8 sm:p-12 text-center shadow-2xl shadow-gold-500/10 print:text-black">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
          ForeverMemoirs
        </div>
        <div className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-parchment-100">
          Gift Certificate
        </div>
        <div className="mx-auto mt-4 h-px w-24 bg-gold-500/50" />
        <p className="mt-6 text-sm text-parchment-200/70">
          This certificate entitles
        </p>
        <p className="mt-1 font-serif text-2xl font-bold text-parchment-100">
          {cert.recipientName}
        </p>
        <p className="mt-1 text-sm text-parchment-200/70">to</p>
        <p className="mt-1 font-serif text-xl font-bold text-gold-300">
          {cert.tierName} — {cert.price}
        </p>
        <p className="mt-3 text-xs text-parchment-200/60 max-w-md mx-auto leading-relaxed">
          {cert.giftBlurb}
        </p>
        {cert.message && (
          <blockquote className="mt-6 border-l-2 border-gold-500/50 pl-4 text-left max-w-md mx-auto">
            <p className="font-serif italic text-parchment-100/90 text-sm leading-relaxed">
              “{cert.message}”
            </p>
          </blockquote>
        )}
        <div className="mt-8 inline-block rounded-2xl border border-dashed border-gold-500/50 bg-ink-950 px-8 py-4">
          <div className="text-[10px] uppercase tracking-widest text-parchment-200/50">
            Redemption code
          </div>
          <div className="mt-1 font-mono text-3xl font-bold tracking-widest text-parchment-100">
            {cert.code}
          </div>
        </div>
        <p className="mt-6 text-xs text-parchment-200/60">
          Redeem anytime at{" "}
          <span className="text-gold-300 font-medium">
            forevermemoirs.com/redeem
          </span>
          <br />
          No life story should go untold.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => window.print()}
          className="rounded-full border border-gold-500/40 px-6 py-3 text-sm font-semibold text-parchment-100 hover:bg-gold-500 hover:text-ink-950 transition-all"
        >
          🖨 Print certificate
        </button>
        <Link
          href="/"
          className="rounded-full bg-ink-900 border border-white/10 px-6 py-3 text-sm font-semibold text-parchment-100 hover:border-gold-500/40 text-center transition-all"
        >
          Back to ForeverMemoirs
        </Link>
      </div>
    </div>
  );
}

export default function GiftSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
