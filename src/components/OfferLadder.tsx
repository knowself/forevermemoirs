"use client";

import { useState } from "react";
import Link from "next/link";

interface Tier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period?: string;
  badge?: string;
  isPopular?: boolean;
  turnaround: string;
  description: string;
  features: string[];
  cta: string;
}

const TIERS_DATA: Tier[] = [
  {
    id: "rescue",
    name: "Memory Rescue",
    subtitle: "Single Photo Archival Restoration",
    price: "$49",
    period: "per photo",
    badge: "The Front Door",
    turnaround: "48 Hours",
    description: "One cherished family photo brought back from fading, scratches, cracks, or water stains with museum fidelity.",
    features: [
      "1 physical photo or scan restored",
      "CodeFormer facial fidelity preservation",
      "Real-ESRGAN 4K background enhancement",
      "Human Master QC check on facial structure",
      "Full digital print-ready archival master",
      "100% satisfaction guarantee or $0",
    ],
    cta: "Restore a Photo ($49)",
  },
  {
    id: "shoebox",
    name: "The Shoebox",
    subtitle: "5 Restorations + 60s Musical Video Tribute",
    price: "$149",
    period: "package",
    badge: "Most Popular Gift",
    isPopular: true,
    turnaround: "3 to 4 Days",
    description: "The classic family shoebox unpacked: 5 restored master photos woven into a moving 60-second video tribute with original music.",
    features: [
      "5 photographs fully restored & remastered",
      "60-second video tribute in 4K UHD",
      "Original licensed musical acoustic score",
      "Ken Burns documentary camera motion",
      "Shareable streaming link for extended family",
      "Gift-ready digital presentation card",
    ],
    cta: "Order The Shoebox ($149)",
  },
  {
    id: "memoir",
    name: "The Memoir Film",
    subtitle: "Remote Documentary Film & Archival Weave",
    price: "$997",
    period: "one-time",
    badge: "Signature Documentary",
    turnaround: "2 Weeks",
    description: "A broadcast-quality personal documentary. Intimate remote interviews, AI-assisted narrative editing, and your restored photos woven in.",
    features: [
      "Guided 60-minute remote Zoom oral history session",
      "Professional documentary narrative producer",
      "Up to 25 archival photos scanned & restored",
      "10–15 minute finished documentary film",
      "Sound design & cinematic color grading",
      "Digital heirloom vault with permanent streaming",
    ],
    cta: "Commission The Memoir ($997)",
  },
  {
    id: "biography",
    name: "The Biography",
    subtitle: "Multi-Session Definitive Life Chronicle",
    price: "$2,997",
    period: "one-time",
    badge: "Full Archival Legacy",
    turnaround: "3 to 4 Weeks",
    description: "The definitive biography of an extraordinary life. Multi-session family interviews, genealogical records, and complete archival treatment.",
    features: [
      "Multiple guided interview sessions across family generations",
      "Up to 60 historical photos & home videos remastered",
      "25–35 minute comprehensive biography film",
      "Transcript booklet & chapterized memory archive",
      "Executive documentary producer curation",
      "Custom engraved archival USB master drive",
    ],
    cta: "Commission The Biography ($2,997)",
  },
  {
    id: "lifecharts",
    name: "LifeCharts 2.0",
    subtitle: "Annual Family Video Diary & Year-End Film",
    price: "$297",
    period: "per year",
    badge: "Living Memory Vault",
    turnaround: "Continuous + Annual Cut",
    description: "Families send brief videos and milestones throughout the year; our studio weaves them into an annual heirloom cinematic film.",
    features: [
      "Drop clips & phone videos into your private vault all year",
      "Quarterly milestone highlight reels",
      "Year-end cinematic family documentary (10–12 mins)",
      "Growth tracking & chronological milestone indexing",
      "Cancel anytime, all archives remain yours forever",
    ],
    cta: "Join LifeCharts 2.0 ($297/yr)",
  },
];

export function OfferLadder() {
  const [filter, setFilter] = useState<"all" | "photos" | "films">("all");

  const filteredTiers = TIERS_DATA.filter((tier) => {
    if (filter === "photos") return tier.id === "rescue" || tier.id === "shoebox";
    if (filter === "films") return tier.id === "memoir" || tier.id === "biography" || tier.id === "lifecharts";
    return true;
  });

  return (
    <div id="tiers" className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          The Offer Ladder
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-parchment-100">
          Choose how your family&apos;s story is remembered.
        </h2>
        <p className="text-base text-parchment-200/70 leading-relaxed">
          From a single $49 damaged photograph rescue to a multi-generational biographical film,
          every tier is crafted with museum-grade preservation standards and remote simplicity.
        </p>

        {/* Filter Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 min-h-[44px] inline-flex items-center text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-gold-500 text-ink-950 font-semibold shadow-md shadow-gold-500/20"
                : "border border-white/10 text-parchment-200/60 hover:text-parchment-100 hover:border-white/20"
            }`}
          >
            All Packages (5)
          </button>
          <button
            onClick={() => setFilter("photos")}
            className={`rounded-full px-4 min-h-[44px] inline-flex items-center text-xs font-medium transition-all ${
              filter === "photos"
                ? "bg-gold-500 text-ink-950 font-semibold shadow-md shadow-gold-500/20"
                : "border border-white/10 text-parchment-200/60 hover:text-parchment-100 hover:border-white/20"
            }`}
          >
            Photo Restoration ($49 – $149)
          </button>
          <button
            onClick={() => setFilter("films")}
            className={`rounded-full px-4 min-h-[44px] inline-flex items-center text-xs font-medium transition-all ${
              filter === "films"
                ? "bg-gold-500 text-ink-950 font-semibold shadow-md shadow-gold-500/20"
                : "border border-white/10 text-parchment-200/60 hover:text-parchment-100 hover:border-white/20"
            }`}
          >
            Documentaries &amp; Vaults ($297 – $2,997)
          </button>
        </div>
      </div>

      {/* Grid of Tiers */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-3xl border transition-all duration-300 ${
              tier.isPopular
                ? "border-gold-500/70 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 shadow-2xl shadow-gold-500/10 scale-[1.02] lg:-translate-y-2"
                : "border-white/10 bg-ink-950/70 hover:border-gold-500/30 hover:bg-ink-900/60"
            } p-7`}
          >
            {/* Badges */}
            {tier.badge && (
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
                    tier.isPopular
                      ? "bg-gold-500 text-ink-950 shadow-sm"
                      : "bg-white/10 text-gold-300 border border-gold-500/30"
                  }`}
                >
                  {tier.badge}
                </span>
                <span className="text-[11px] text-parchment-200/50 font-mono">
                  ⏱ {tier.turnaround}
                </span>
              </div>
            )}

            <div>
              <h3 className="font-serif text-2xl font-bold text-parchment-100">{tier.name}</h3>
              <p className="mt-1 text-xs text-parchment-200/60">{tier.subtitle}</p>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-parchment-100">
                {tier.price}
              </span>
              {tier.period && (
                <span className="text-xs text-parchment-200/50 font-medium">/{tier.period}</span>
              )}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-parchment-200/75 leading-relaxed">
              {tier.description}
            </p>

            {/* Feature Checklist */}
            <div className="my-6 flex-1 space-y-2.5 border-t border-white/5 pt-6 text-xs text-parchment-200/80">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <svg
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      tier.isPopular ? "text-gold-400" : "text-gold-500/70"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={`/order?tier=${tier.id}`}
              className={`mt-4 w-full rounded-full py-3.5 text-center text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                tier.isPopular
                  ? "bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/25 active:scale-95"
                  : "bg-ink-900 border border-gold-500/40 text-parchment-100 hover:bg-gold-500 hover:text-ink-950 active:scale-95"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Shoebox Spotlight Callout */}
      <div className="mt-16 rounded-3xl border border-gold-500/20 bg-gradient-to-r from-ink-900/80 via-ink-950 to-ink-900 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <img
            src="/images/shoebox-memories.jpg"
            alt="The Shoebox of Family Memories"
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border border-gold-500/30 shadow-xl shrink-0"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              The Shoebox Ritual ($149)
            </span>
            <h4 className="mt-1 font-serif text-xl sm:text-2xl text-parchment-100 font-bold">
              Have a box of old prints in the closet?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-parchment-200/70 max-w-xl">
              Don&apos;t let them fade to dust. Snap photos of 5 prints with your smartphone camera.
              We restore each photo to high-resolution master quality and create an emotional 60-second video tribute set to original music.
            </p>
          </div>
        </div>
        <Link
          href="/order?tier=shoebox"
          className="shrink-0 rounded-full bg-gold-500 px-6 py-3 text-xs sm:text-sm font-semibold text-ink-950 hover:brightness-110 shadow-md shadow-gold-500/20"
        >
          Unpack The Shoebox ($149) →
        </Link>
      </div>
    </div>
  );
}
