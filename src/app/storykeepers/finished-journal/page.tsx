/* ============================================================================
 * FOREVERMEMOIRS — "WHAT TO DO WITH A FINISHED JOURNAL" (/storykeepers/finished-journal)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved — keep the words
 * verbatim; only the layout may change. The VideoPostcard/Memoir Film
 * mentions are presented as options, not a pitch, per Joe's direction.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "What To Do With a Finished Journal — The Storykeepers' Corner",
  description:
    "Keep it safe, share it with family — and if you want, turn it into something that moves.",
};

export default async function FinishedJournal() {
  await requireStorykeeper();

  return (
    <CornerArticle
      image="/images/storykeepers/finished-journal.png"
      imageAlt="A completed journal tied with twine beside old photographs, a film strip curling from it"
      kicker="The Storykeepers' Corner"
      title="What To Do With a Finished Journal"
    >
      <p>
        You did it. Ninety-two questions, a lifetime of answers, in
        someone&apos;s own handwriting. That book is now one of the most
        valuable things your family owns. Here&apos;s what people do next.
      </p>
      <p>
        <strong className="text-parchment-100">Keep it safe.</strong> This
        sounds obvious, but say it out loud: put the finished journal somewhere
        it won&apos;t get lost in a move or a cleanup. A bookshelf, a cedar
        chest, a fireproof box. Tell someone where it is.
      </p>
      <p>
        <strong className="text-parchment-100">Share it with family.</strong>{" "}
        Take photos of the pages, or scan them at the library, and send copies
        to the people who&apos;d treasure them — siblings, grandchildren, the
        cousin who lives far away. A story only lives if it&apos;s passed
        around.
      </p>
      <div className="rounded-3xl border border-gold-500/25 bg-ink-950/80 p-8 space-y-4">
        <p>
          <strong className="text-parchment-100">
            If you&apos;d like it to move and speak
          </strong>{" "}
          — some families take the finished journal one step further, and
          that&apos;s the work our studio does every day:
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-gold-400">•</span>
            <span>
              A <strong className="text-parchment-100">VideoPostcard</strong>{" "}
              ($79) — a short film built from your photos and stories, ready to
              share with family anywhere.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400">•</span>
            <span>
              A <strong className="text-parchment-100">Memoir Film</strong>{" "}
              ($997) — a full-length film of a life story, made from the
              journal, restored photos, and recorded memories.
            </span>
          </li>
        </ul>
        <p>
          No pressure, ever. A finished journal on a shelf is already a
          triumph. But if you want those pages to live on a screen — to be
          watched at reunions, sent to grandchildren across the country, kept
          forever — we&apos;d be honored to make it.
        </p>
      </div>
      <p>
        Whatever you choose: thank you for doing this work. Future generations
        of your family just got a gift they&apos;ll never be able to repay.
      </p>
      <p className="text-parchment-200/50 text-base">
        <em>
          ForeverMemoirs — a small family studio in Finley, California. We
          restore old photos and turn life stories into film. forevermemoirs.com
        </em>
      </p>
    </CornerArticle>
  );
}
