{/* ============================================================================
 * FOREVERMEMOIRS — PRIVACY POLICY PAGE (/privacy)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS — READ BEFORE EDITING:
 *
 * This page implements Launch Document "Forever Memoirs Launch Document",
 * Section B item 7: a plain-language privacy policy is REQUIRED before the
 * site accepts a single photo upload. Part 4 of that document ("The law may
 * not require a policy yet. Your customers do.") defines exactly what this
 * page must say:
 *   - WHAT is collected: name, email, the photos themselves, order details.
 *     Nothing else. If a future feature collects anything new (analytics,
 *     cookies, location), THIS PAGE MUST BE UPDATED FIRST.
 *   - WHY: to perform the restoration the customer ordered. One purpose.
 *   - WHO sees it: named roles only. "Our team" is not an answer.
 *   - HOW LONG it is kept: stated retention periods below. "Indefinite" is
 *     not a period.
 *   - HOW DELETION works: how a customer asks, who carries it out.
 *   - THE NO-TRAINING PLEDGE: customer photos are NEVER used to train public
 *     AI models. This is a binding promise here, not marketing copy.
 *   - EXIF/GPS: phone photos carry location metadata. We strip it on upload
 *     and say so. We refuse to collect location data the business doesn't need.
 *
 * STATUS: DRAFT — NOT lawyer-reviewed (Launch Document Section B requires
 * counsel review before uploads go live). Do not present this text as final
 * legal advice. Every [BRACKETED] value is a decision Joe and his lawyer
 * must confirm.
 *
 * IF YOU ARE AN AI EDITING THIS FILE: do not soften the deletion promise,
 * do not add data collection without updating this page, and do not remove
 * the no-training pledge. Those are load-bearing trust commitments.
 * ========================================================================== */}

import Link from "next/link";

export default function Privacy() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Legal
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-parchment-200/60">
            Effective October 8, 2026. We will update this page in plain language whenever it changes.
          </p>
        </div>

        {/* Plain-language promise — this paragraph is the heart of the page.
            Launch Document Part 4: "a landing page that says 'we take your
            privacy seriously' with no actual policy behind it is worse than
            saying nothing." This page IS the policy behind the promise. */}
        <div className="rounded-3xl border border-gold-500/20 bg-ink-900/50 p-6 sm:p-10">
          <p className="font-serif text-lg sm:text-xl text-parchment-100 italic leading-relaxed">
            &ldquo;You are handing us the only photo of your mother. We act like it. We collect
            the minimum needed to do your restoration, we never sell or share your photos, we
            never train AI models on them, and we delete everything when you ask.&rdquo;
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-10 text-parchment-200/80 text-base leading-relaxed">
          {/* WHAT WE COLLECT — Launch Document Part 4: name, email, the photos
              themselves, order details. Nothing else. If this list grows, the
              business is drifting from its promise; flag it to Joe. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">What we collect</h2>
            <ul className="space-y-2 pl-4 border-l border-gold-500/30 list-none">
              <li><strong className="text-parchment-100">Your name and email address</strong> — so we can deliver your order and talk to you about it.</li>
              <li><strong className="text-parchment-100">The photos you send us</strong> — the whole point. Originals and the restorations we produce from them.</li>
              <li><strong className="text-parchment-100">Order details</strong> — which package you chose, your notes about the photos, and payment records.</li>
            </ul>
            <p>
              That is the complete list. We do not collect your location, your browsing history,
              or anything else. If we ever need something more, we will ask first and update this page.
            </p>
          </section>

          {/* WHY — one purpose, stated once. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">Why we collect it</h2>
            <p>
              To perform the restoration or film work you ordered. One purpose. We do not use your
              information for advertising, we do not sell it, and we do not share it with data brokers.
            </p>
          </section>

          {/* WHO SEES IT — named roles only. "Our team" is not an answer.
              JOE DECISION (with lawyer): confirm exactly who these roles are. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">Who sees your photos</h2>
            <ul className="space-y-2 pl-4 border-l border-gold-500/30 list-none">
              <li><strong className="text-parchment-100">The founder</strong> — who runs every order personally at this stage.</li>
              <li><strong className="text-parchment-100">Contracted restorers and editors</strong> — only when hired for your order, only the files they need, and only under a signed confidentiality agreement.</li>
              <li><strong className="text-parchment-100">Our payment processor (Stripe)</strong> — sees payment details, never your photos.</li>
            </ul>
            <p>
              Nobody else. Not advertisers, not AI companies, not the public. Every person added
              to this list is a person who can lose a laptop, so the list stays short on purpose.
            </p>
          </section>

          {/* THE NO-TRAINING PLEDGE — moved from marketing copy into binding policy.
              Launch Document Part 4: "A promise in a policy can be pointed to.
              A promise in a headline can be edited away." NEVER remove this. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">Your photos never train AI models</h2>
            <p>
              We use AI tools to restore your photos. That is a one-way process: the tool works on
              your photo, and your photo never flows back into any public model, dataset, or training
              run. Your family&apos;s faces will never become part of someone else&apos;s AI.
            </p>
          </section>

          {/* EXIF / LOCATION — we strip it and say so. Keeping GPS data we don't
              need is pure liability: it can be breached, subpoenaed, or mishandled. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">We strip location data from your photos</h2>
            <p>
              Phone photos carry hidden metadata, including GPS coordinates of where the photo was
              taken — often your home. We strip all of that metadata when your photo arrives, and we
              never store it. We refuse to collect location data this business does not need.
            </p>
          </section>

          {/* RETENTION — "Indefinite is not a period."
              JOE DECISION (with lawyer): confirm these periods before launch. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">How long we keep things</h2>
            <ul className="space-y-2 pl-4 border-l border-gold-500/30 list-none">
              <li><strong className="text-parchment-100">Your original photos:</strong> 30 days after final delivery, then permanently deleted.</li>
              <li><strong className="text-parchment-100">Finished restorations and films:</strong> 1 year after delivery, so we can help with re-orders or revisions — then deleted.</li>
              <li><strong className="text-parchment-100">Order records (name, email, package):</strong> kept as long as tax and business law requires, then deleted.</li>
            </ul>
          </section>

          {/* DELETION — offered from day one, before any law requires it.
              JOE DECISION: the contact below MUST be a real, monitored inbox
              before launch. A deletion promise with no working contact is worse
              than no promise. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">Deletion on request</h2>
            <p>
              You can ask us to delete everything we hold about you — photos, restorations, order
              details — at any time, for any reason. Email{" "}
              <a href="mailto:joe@forevermemoirs.com" className="text-gold-300 hover:underline">
                joe@forevermemoirs.com
              </a>{" "}
              with the subject &ldquo;Delete my data,&rdquo; and the founder personally carries it out
              within 14 days and confirms back to you in writing.
            </p>
          </section>

          {/* CALIFORNIA — home law. Thresholds likely don't catch a business this
              size, but the rights below are offered voluntarily because customers
              expect them. Do not remove this section to "simplify." */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">California privacy rights</h2>
            <p>
              We are a California business. Whether or not formal thresholds apply to us yet, we honor
              the substance of California privacy rights for every customer: the right to know what we
              hold about you, the right to get a copy of it, and the right to have it deleted. Use the
              contact above to exercise any of them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">Changes to this policy</h2>
            <p>
              If this policy changes, we will update this page and note the new effective date at the
              top. We will never quietly expand what we collect.
            </p>
          </section>
        </div>

        <div className="text-center">
          <Link href="/terms" className="text-sm text-gold-300 hover:underline">
            Read the Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
