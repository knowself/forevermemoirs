/* ============================================================================
 * FOREVERMEMOIRS — "WHEN MEMORIES HURT" (/storykeepers/when-memories-hurt)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved — keep the words
 * verbatim; only the layout may change.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "When Memories Hurt — The Storykeepers' Corner",
  description:
    "A gentle guide to the tender questions: permission to skip, to pause, to write just one sentence.",
};

export default async function WhenMemoriesHurt() {
  await requireStorykeeper();

  return (
    <CornerArticle
      image="/images/storykeepers/when-memories-hurt.png"
      imageAlt="Weathered hands wrapped around a warm mug beside a folded quilt in soft window light"
      kicker="The Storykeepers' Corner"
      title="When Memories Hurt: A Gentle Guide to Tender Questions"
    >
      <p>
        Our journals ask real questions. Some of them touch tender places — a
        person you lost, a year that nearly broke you, a goodbye you never got
        to say.
      </p>
      <p>
        If one of those questions finds you on a hard day, here is what we want
        you to know.
      </p>
      <p>
        <strong className="text-parchment-100">You are allowed to skip it.</strong>{" "}
        Really. Turn the page. There is no test here and no one is keeping
        score. The book will be there tomorrow.
      </p>
      <p>
        <strong className="text-parchment-100">You are allowed to set the book down.</strong>{" "}
        Some memories need daylight and company. Close the journal, make some
        tea, and come back when the house feels quieter.
      </p>
      <p>
        <strong className="text-parchment-100">You are allowed to write just one sentence.</strong>{" "}
        &ldquo;I miss him&rdquo; is a complete answer. &ldquo;I don&rsquo;t want
        to talk about that yet&rdquo; is a complete answer. One honest line is
        worth more than a page of performing.
      </p>
      <p>
        <strong className="text-parchment-100">How to sit with a difficult memory.</strong>{" "}
        If you do want to write through it, go slow. Write what happened first
        — just the facts, like you&rsquo;re telling a neighbor. The feelings
        usually find their own way onto the page after that. If they don&rsquo;t,
        that&rsquo;s fine too. Stop whenever you need to.
      </p>
      <p>
        <strong className="text-parchment-100">Talk to someone you trust.</strong>{" "}
        Sometimes a memory loosens its grip once it&rsquo;s been said out loud
        to a person who loves you. A child, a sibling, an old friend. You
        don&rsquo;t have to carry the heavy ones alone.
      </p>
      <p>
        <strong className="text-parchment-100">
          If grief feels too heavy to carry on your own
        </strong>
        , a counselor or grief support group can help — there is no shame in
        that, and asking is a strong thing to do.
      </p>
      <p>
        The stories matter. But you matter more than the stories. Take care of
        yourself first, and the pages will wait.
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
