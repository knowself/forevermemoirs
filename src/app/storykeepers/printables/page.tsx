/* ============================================================================
 * FOREVERMEMOIRS — PRINTABLES (/storykeepers/printables)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved.
 *
 * NOTE: the worksheet PDFs themselves are a later build step. Each worksheet
 * below renders as a "coming soon" card — no fake download links.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "Printables — The Storykeepers' Corner",
  description:
    "Free worksheets for the kitchen table: journal prompt sheets, a family-tree starter, and a photo-captioning page.",
};

const WORKSHEETS = [
  {
    title: "Chapter prompt sheets",
    body: "The journal's questions as loose pages, one chapter per sheet, with writing lines. Good for family gatherings: hand everyone the same sheet and compare answers.",
  },
  {
    title: "The family-tree starter",
    body: "A simple three-generation tree with room for names, dates, and one-line memories. Fill in what you know; the blanks become your next questions.",
  },
  {
    title: "\u201cWho is in this photo?\u201d",
    body: "A photo-captioning worksheet. Space to attach or describe a photo, then prompts: Who is in this picture? When was it taken? What was happening just outside the frame?",
  },
];

export default async function Printables() {
  await requireStorykeeper();

  return (
    <CornerArticle
      image="/images/storykeepers/printables.png"
      imageAlt="A neat stack of worksheet pages with a pencil and a mason jar of wildflowers"
      kicker="The Storykeepers' Corner"
      title="Printables"
    >
      <p>
        Worksheets for the kitchen table. Print them, pass them around, spill
        coffee on them — that&apos;s what they&apos;re for. Everything here is
        free.
      </p>

      <div className="space-y-6">
        {WORKSHEETS.map((w) => (
          <div
            key={w.title}
            className="rounded-3xl border border-white/10 bg-ink-950/80 p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-parchment-100">
                {w.title}
              </h2>
              <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
                Coming soon
              </span>
            </div>
            <p className="mt-3 text-parchment-200/70 leading-relaxed">{w.body}</p>
          </div>
        ))}
      </div>

      <p className="font-serif italic text-gold-300/90">How to use them</p>
      <p>
        No rules. Print a stack before Sunday dinner. Tuck one into a birthday
        card. Leave the family-tree starter on the fridge and let everyone fill
        in a box.
      </p>
      <p>
        New worksheets arrive as the journal series grows — Grandpa, Mom, and
        the Family Storykeeper will each bring their own.
      </p>
      <p className="text-parchment-200/50 text-base">
        <em>
          From the Storykeepers&apos; Corner — free guidance for families
          preserving their stories.
        </em>
      </p>
    </CornerArticle>
  );
}
