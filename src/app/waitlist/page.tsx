import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Holiday Gift List — ForeverMemoirs",
  description:
    "Gift certificates are coming this holiday season. Join the list and be the first to know — no spam, just one email when they open.",
};

export default function WaitlistPage() {
  return (
    <div className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28 text-center film-grain">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-72 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <img
          src="/images/logo-full.png"
          alt="ForeverMemoirs"
          className="mx-auto h-16 w-16 rounded-xl object-contain shadow-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        />
        <span className="inline-block rounded-full border border-gold-500/30 bg-ink-900/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          Coming This Holiday Season
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment-100 tracking-tight leading-tight">
          Give the gift of{" "}
          <span className="gold-text-gradient italic font-normal">memory.</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm sm:text-base text-parchment-200/70 leading-relaxed">
          ForeverMemoirs gift certificates are coming. Join the list and
          you&apos;ll get first access the moment they open — the easiest
          meaningful gift you&apos;ll give this year, for the people whose
          stories matter most.
        </p>
        <p className="text-[11px] text-parchment-200/40">
          One email when certificates open. No spam, ever. No payment due today.
        </p>

        <div className="mx-auto max-w-md pt-4">
          <WaitlistForm source="waitlist-page" />
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="text-xs text-gold-300/80 hover:text-gold-300 hover:underline"
          >
            ← Back to ForeverMemoirs
          </Link>
        </div>
      </div>
    </div>
  );
}
