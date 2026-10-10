{/* ============================================================================
 * FOREVERMEMOIRS — PRELIMINARY BETA TESTER GOOD-FAITH AGREEMENT
 * (/beta-agreement)
 * ----------------------------------------------------------------------------
 * WHAT THIS IS: a good-faith understanding for the QC exam beta phase — NOT a
 * legal instrument. It creates no legal obligations for either side and is not
 * legal advice. Joe's decision (2026-10-09): Hussein Hill and Moises Nava beta
 * test the QC certification exam under this preliminary understanding, which
 * lets building continue until Joe hires an attorney and takes money.
 *
 * Before any paid engagement, both sides sign the formal contractor agreement
 * at /nda — AFTER counsel reviews it (FM Door #1). This page is superseded
 * then. Do not present this page as a contract, and do not let anyone sign it
 * thinking it is one.
 * ========================================================================== */}

import Link from "next/link";

export default function BetaAgreement() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Beta phase · Good-faith understanding
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Beta Tester Agreement
          </h1>
          <p className="text-sm text-parchment-200/60 max-w-xl mx-auto">
            A good-faith understanding between people building something early —
            not a legal contract. Please read the box below first.
          </p>
        </div>

        {/* The plain-truth box — this is the load-bearing part of the page. */}
        <div className="rounded-3xl border border-gold-500/30 bg-ink-900/60 p-6 sm:p-10">
          <p className="font-serif text-lg sm:text-xl text-parchment-100 italic leading-relaxed">
            &ldquo;This is a handshake on paper, not a contract. It creates no legal
            obligations for either side, and neither side should treat it as legal
            advice. You&apos;re helping us test something early, and this page just
            says we&apos;ll treat each other — and other people&apos;s photos — with
            respect while we do. Before any paid work begins, we&apos;ll both sign a
            formal agreement that a lawyer has reviewed.&rdquo;
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-8 text-parchment-200/80 text-base leading-relaxed">
          <p>
            This understanding is between ForeverMemoirs (&ldquo;we,&rdquo; run by Joe
            Terry) and the beta tester named below (&ldquo;you&rdquo;).
          </p>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">What you&apos;ll see</h2>
            <p>
              Test materials for our photo-restoration quality program — sample photos,
              test images, scoring notes. Some of it is unfinished. All of it is private
              to the beta.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">Your good-faith promises</h2>
            <ol className="space-y-3 pl-6 list-decimal marker:text-gold-400">
              <li>
                <strong className="text-parchment-100">Keep it to yourself.</strong> Don&apos;t
                share, publish, or post the test materials — including in portfolios,
                on social media, or in conversation.
              </li>
              <li>
                <strong className="text-parchment-100">Use them only for the beta.</strong> Only
                for the testing we ask you to do, nothing else.
              </li>
              <li>
                <strong className="text-parchment-100">Delete when asked.</strong> Remove your
                copies when we ask, or when the beta ends.
              </li>
              <li>
                <strong className="text-parchment-100">No AI training use.</strong> Never use these
                materials to train or improve an AI model — yours or anyone else&apos;s.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">What you keep</h2>
            <p>
              Your own judgment. If something in the test looks wrong, say so — that&apos;s
              literally the job. Your feedback is the product here.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">Our promise to you</h2>
            <p>
              We&apos;ll never share your personal information, we&apos;ll tell you honestly what
              the beta is for, and the formal agreement — when it comes — will be reviewed
              by a lawyer before anyone signs it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">How long this lasts</h2>
            <p>
              Until the beta ends, or either side says stop — whichever comes first.
            </p>
          </div>

          {/* Sign-off block — a good-faith sign-off, not a legal signature. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Beta tester printed name</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Sign-off &amp; date</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">X ________________________________</p>
            </div>
          </div>

          <p className="text-xs text-parchment-200/50">
            Preliminary beta understanding — not a legal instrument, creates no legal
            obligations. Superseded by a counsel-reviewed agreement before any paid
            engagement.
          </p>
        </div>

        <div className="text-center">
          <Link href="/privacy" className="text-sm text-gold-300 hover:underline">
            Read the Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
