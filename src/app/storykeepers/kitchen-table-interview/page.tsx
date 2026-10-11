/* ============================================================================
 * FOREVERMEMOIRS — "THE KITCHEN TABLE INTERVIEW" (/storykeepers/kitchen-table-interview)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved — keep the words
 * verbatim; only the layout may change.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "The Kitchen Table Interview — The Storykeepers' Corner",
  description:
    "How to draw out your parent's or grandparent's stories: setting the scene, follow-up questions, and recording with your phone.",
};

const FOLLOW_UPS = [
  "\u201cWhat happened next?\u201d",
  "\u201cWhat did that feel like?\u201d",
  "\u201cWho else was there?\u201d",
  "\u201cTell me more about that part.\u201d",
];

export default async function KitchenTableInterview() {
  await requireStorykeeper();

  return (
    <CornerArticle
      image="/images/storykeepers/kitchen-table-interview.png"
      imageAlt="A grandmother and grandchild talking at a kitchen table with a notebook open between them"
      kicker="The Storykeepers' Corner"
      title="The Kitchen Table Interview"
    >
      <p>
        The best stories rarely come from sitting someone down and firing
        questions at them. They come from the kitchen table, unhurried.
        Here&apos;s how to set that up.
      </p>
      <p>
        <strong className="text-parchment-100">Set the scene.</strong> Pick a
        time when nobody&apos;s rushed — after dinner is good. Put the journal
        or a notebook where you can both see it. Pour something warm. The goal
        is a conversation, not an interrogation.
      </p>
      <p>
        <strong className="text-parchment-100">Start easy.</strong> Don&apos;t
        open with the hardest question in the book. Start with a favorite meal,
        a song, a smell from childhood. Easy questions warm up the memory the
        way stretching warms up a muscle.
      </p>
      <p>
        <strong className="text-parchment-100">Listen more than you talk.</strong>{" "}
        This is the whole secret. When they pause, don&apos;t rush to fill it
        — the best detail usually comes right after the pause. Nod. Keep your
        eyes on them, not your phone.
      </p>
      <div>
        <p>
          <strong className="text-parchment-100">
            Ask the follow-ups that open doors.
          </strong>{" "}
          Short ones work best:
        </p>
        <ul className="mt-3 space-y-2 pl-2">
          {FOLLOW_UPS.map((q) => (
            <li key={q} className="flex gap-3">
              <span className="text-gold-400">•</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>
      <p>
        <strong className="text-parchment-100">Record it with your phone.</strong>{" "}
        Ask first — &ldquo;Do you mind if I record this so I don&apos;t miss
        anything?&rdquo; Then set the phone on the table and forget about it.
        Audio is enough; nobody needs to be on camera. Those recordings become
        treasures on their own.
      </p>
      <p>
        <strong className="text-parchment-100">When they go quiet.</strong>{" "}
        Sometimes a question lands somewhere deep and they stop talking.
        That&apos;s all right. Wait a little. Then gently: &ldquo;We can skip
        that one — what should we talk about instead?&rdquo; Never push. The
        story will come when it&apos;s ready, or it won&apos;t, and both are
        fine.
      </p>
      <p>
        <strong className="text-parchment-100">Write it down soon after.</strong>{" "}
        That evening, jot down what you remember while it&apos;s fresh — the
        exact words if you can. Memory fades fast, and the small details are
        the ones you&apos;ll be glad you kept.
      </p>
      <p>
        One good hour at the kitchen table can give your family something no
        money can buy. Take your time with it.
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
