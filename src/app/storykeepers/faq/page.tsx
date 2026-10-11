/* ============================================================================
 * FOREVERMEMOIRS — QUESTIONS (/storykeepers/faq)
 * ----------------------------------------------------------------------------
 * Verified visitors only. Copy below is Joe-approved — keep the words
 * verbatim; only the layout may change.
 * ========================================================================== */

import type { Metadata } from "next";
import CornerArticle from "../Article";
import { requireStorykeeper } from "../guard";

export const metadata: Metadata = {
  title: "Questions — The Storykeepers' Corner",
  description:
    "Is it really free? What do we do with your email? Short answers.",
};

const QA = [
  {
    q: "Is it really free?",
    a: "Yes. The Storykeepers' Corner is free and stays free. No payment, no trial period, no premium tier hiding behind the good stuff.",
  },
  {
    q: "Then why do you need my email?",
    a: "Two reasons, both plain. First, the code we send proves you're a real person, which keeps the room spam-free. Second, we'd like to send you word when new journals and new guides arrive — that's all. Nothing is assumed: the front door has a checkbox, unchecked until you check it, and checking it is what puts you on the list. We never sell your email, and you can unsubscribe anytime with one click.",
  },
  {
    q: "How do I get a new code?",
    a: "Go back to the front door at forevermemoirs.com/storykeepers, type in your email, and we'll send a fresh code. Codes expire after 15 minutes — if yours ran out, just ask for another.",
  },
  {
    q: "I didn't get the code email. What now?",
    a: "Check your spam or junk folder first — it hides there sometimes. If it's not there after a few minutes, try again. Still nothing? Write to us through the contact page and we'll sort it out.",
  },
  {
    q: "Who is ForeverMemoirs?",
    a: "A small family studio in Finley, California. We restore old, damaged photos and turn life stories into film — VideoPostcards and Memoir Films for families who want their stories to last.",
  },
  {
    q: "Do I need to own one of the journals to use the Corner?",
    a: "No. The guides and worksheets are useful to any family preserving its stories. But if you'd like the journals, you'll find them wherever books are sold — starting with Grandma, Tell Me Your Story.",
  },
];

export default async function Faq() {
  await requireStorykeeper();

  return (
    <CornerArticle
      image="/images/storykeepers/faq.png"
      imageAlt="A warmly lit open doorway with light spilling out"
      kicker="The Storykeepers' Corner"
      title="Questions"
    >
      <div className="space-y-8">
        {QA.map((item) => (
          <div key={item.q}>
            <h2 className="font-serif text-2xl font-bold text-parchment-100">
              {item.q}
            </h2>
            <p className="mt-2 text-parchment-200/70 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
      <p className="text-parchment-200/50 text-base">
        <em>
          From the Storykeepers&apos; Corner — free guidance for families
          preserving their stories.
        </em>
      </p>
    </CornerArticle>
  );
}
