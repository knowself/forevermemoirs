/* ============================================================================
 * FOREVERMEMOIRS — STORYKEEPERS' CORNER LIBRARY (/storykeepers/library)
 * ----------------------------------------------------------------------------
 * The resource room. Verified visitors only (see ../guard.ts) — the gate
 * lives on /storykeepers. Copy below is Joe-approved.
 * ========================================================================== */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "The Library — The Storykeepers' Corner",
  description:
    "Everything in the Corner, free: gentle guides, interview help, printables, and answers.",
};

const CARDS = [
  {
    href: "/storykeepers/when-memories-hurt",
    title: "When Memories Hurt",
    body: "A gentle guide to the tender questions. Permission to skip, to pause, to write just one sentence. For the days the memories are heavy.",
  },
  {
    href: "/storykeepers/kitchen-table-interview",
    title: "The Kitchen Table Interview",
    body: "How to draw out your parent's or grandparent's stories: setting the scene, asking the follow-up that opens the door, and what to do when they go quiet.",
  },
  {
    href: "/storykeepers/printables",
    title: "Printables",
    body: "Worksheets for the kitchen table — journal prompts as loose sheets, a family-tree starter, and a photo-captioning page so nobody has to guess who's who ever again.",
  },
  {
    href: "/storykeepers/finished-journal",
    title: "What To Do With a Finished Journal",
    body: "Keep it safe, share it with family — and if you want, turn it into something that moves. Your options, plainly laid out.",
  },
  {
    href: "/storykeepers/faq",
    title: "Questions",
    body: "Is it really free? What do we do with your email? Short answers.",
  },
];

export default async function Library() {
  await requireStorykeeper();

  return (
    <div className="relative overflow-hidden film-grain py-12 sm:py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl max-w-3xl mx-auto">
          <Image
            src="/images/storykeepers/library.png"
            alt="A wooden bookshelf with well-loved books and a small framed photo in warm lamplight"
            width={1920}
            height={1280}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="text-center space-y-4 mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            The Storykeepers&apos; Corner
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            The Library
          </h1>
          <p className="text-lg text-parchment-200/70 max-w-2xl mx-auto">
            Welcome in. Everything here is free — made for families working
            through our journals, or just trying to hold onto the stories
            before they slip away.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-3xl border border-white/10 bg-ink-950/80 p-8 hover:border-gold-500/40 transition-colors"
            >
              <h2 className="font-serif text-2xl font-bold text-parchment-100 group-hover:text-gold-300 transition-colors">
                {c.title}
              </h2>
              <p className="mt-3 text-parchment-200/70 leading-relaxed">{c.body}</p>
              <p className="mt-4 text-sm text-gold-300">Open →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
