/* ============================================================================
 * FOREVERMEMOIRS — PRINTABLES (/storykeepers/printables)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved.
 *
 * The worksheet PDFs live in public/printables/ (built by
 * ~/workspace/your_files/forevermemoirs-kdp/build_printables.py) and each
 * card below links its download.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "Printables — The Storykeepers' Corner",
  description:
    "Free worksheets for the kitchen table: an extensible family tree, recipe keepsake cards, and photo story cards.",
};

const WORKSHEETS = [
  {
    title: "The family tree",
    body: "Four generations on one page, plus branch sheets you can print as many times as you need and share-your-branch slips for the whole family. Fill in what you know; the blanks become your next questions.",
    href: "/printables/family-tree.pdf",
    pages: "3 pages",
  },
  {
    title: "Recipe keepsake cards",
    body: "Her famous dishes, in her words \u2014 or yours, while she tells you. Four keepsake cards with room for ingredients, steps, and the memory that goes with the dish.",
    href: "/printables/recipe-cards.pdf",
    pages: "4 pages",
  },
  {
    title: "\u201cThe story behind this photo\u201d",
    body: "For the four photo pages in her journal \u2014 and every shoebox after that. Who is in the picture, when it was taken, what was happening just outside the frame, and what you want the family to know.",
    href: "/printables/photo-story-cards.pdf",
    pages: "2 pages",
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
              <a
                href={w.href}
                download
                className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300 hover:bg-gold-500/20"
              >
                Download PDF · {w.pages}
              </a>
            </div>
            <p className="mt-3 text-parchment-200/70 leading-relaxed">{w.body}</p>
          </div>
        ))}
      </div>

      <p className="font-serif italic text-gold-300/90">How to use them</p>
      <p>
        No rules. Print a stack before Sunday dinner. Tuck one into a birthday
        card. Leave the family tree on the fridge and let everyone fill
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
