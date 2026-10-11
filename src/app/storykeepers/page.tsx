/* ============================================================================
 * FOREVERMEMOIRS — THE STORYKEEPERS' CORNER (/storykeepers)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS:
 *
 * The front door of the Corner: what it is, why it's free, and the email
 * gate. Copy below is Joe-approved — keep the words verbatim; only the
 * layout may change. Already-verified visitors skip the gate and go straight
 * to the library.
 *
 * The gate itself lives in GateForm.tsx (client component): email + explicit
 * opt-in checkbox (unchecked by default, required) → 6-digit code → verify.
 * ========================================================================== */

import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import GateForm from "./GateForm";
import { hasStorykeeperSession } from "./guard";

export const metadata: Metadata = {
  title: "The Storykeepers' Corner — ForeverMemoirs",
  description:
    "A free room for families preserving their stories: guidance for the tender questions, ways to draw out a good story, and printable worksheets. Verified email entry, never a payment.",
};

const STEPS = [
  "Type in your email address below.",
  "Check the box that says yes to hearing from us — that's what puts you on the list for word when new journals and guides arrive. The box starts unchecked; nothing is assumed. (It's required to enter.)",
  "We send you a 6-digit code — check your inbox.",
  "Type the code into the form, and the door opens.",
];

export default async function Storykeepers() {
  if (await hasStorykeeperSession()) redirect("/storykeepers/library");

  return (
    <div className="relative overflow-hidden film-grain py-12 sm:py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 z-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image
            src="/images/storykeepers/front-door.png"
            alt="A kettle steaming on a warm kitchen stove in morning light"
            width={1920}
            height={1280}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="text-center space-y-4 mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Free forever
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            The Storykeepers&apos; Corner
          </h1>
          <p className="text-xl text-gold-300 font-serif italic">
            A free room for families preserving their stories.
          </p>
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-parchment-200/85">
          <p>
            If you&apos;re holding one of our guided journals — maybe{" "}
            <em>Grandma, Tell Me Your Story</em> — this place is for you.
            It&apos;s where we keep the extra help: guidance for the tender
            questions, ways to draw out a good story, and printable worksheets
            for the kitchen table.
          </p>
          <p>
            <strong className="text-parchment-100">
              It&apos;s free, and it stays free.
            </strong>{" "}
            No payment, no trial, no catch. The only thing we ask is a verified
            email, so we know you&apos;re a real person and so we can send you
            word when new journals and guides arrive.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-ink-950/60 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-parchment-100 pb-4">
            Getting in takes about a minute:
          </h2>
          <ol className="space-y-3 text-parchment-200/85 leading-relaxed">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-lg text-parchment-200/85">
            That&apos;s it. Come on in. The kettle&apos;s on.
          </p>
        </div>

        <div className="mt-8">
          <GateForm />
        </div>
      </div>
    </div>
  );
}
