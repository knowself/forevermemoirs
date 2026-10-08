{/* ============================================================================
 * FOREVERMEMOIRS — TERMS OF SERVICE PAGE (/terms)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS — READ BEFORE EDITING:
 *
 * This page implements Launch Document "Forever Memoirs Launch Document",
 * Section B items 8 and 9:
 *   - Item 8: Terms of service covering photo ownership/rights, revision
 *     limits, refund terms, and deletion rights. REQUIRED before uploads.
 *   - Item 9: The customer warrants they own the photo or hold the right to
 *     have it restored. This is the copyright shield: without it, the business
 *     is liable for restoring photos customers had no right to touch.
 * The order form (/order) captures explicit agreement to these terms via two
 * required checkboxes — that clickwrap is what makes this page enforceable,
 * not just informative. If you change the order form, keep the checkboxes.
 *
 * STATUS: DRAFT — NOT lawyer-reviewed (Launch Document Section B requires
 * counsel review before uploads go live). Every [BRACKETED] value is a
 * decision Joe and his lawyer must confirm, especially: revision limits,
 * turnaround language, refund mechanics, and limitation of liability.
 *
 * IF YOU ARE AN AI EDITING THIS FILE: the photo-rights warranty (Section 2)
 * and the revision/refund limits (Sections 4-5) are the business's legal
 * armor. Do not soften them without Joe's explicit instruction.
 * ========================================================================== */}

import Link from "next/link";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-parchment-200/60">
            Effective October 8, 2026. By placing an order, you agree to these terms.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-10 text-parchment-200/80 text-base leading-relaxed">
          {/* 1. THE SERVICE */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">1. What we do</h2>
            <p>
              ForeverMemoirs provides AI-assisted photo restoration, video tributes, memoir films,
              biographies, and related archival services. Every restoration passes human review before
              delivery — AI does the heavy lifting, a person makes sure your family still looks like
              your family.
            </p>
          </section>

          {/* 2. PHOTO RIGHTS WARRANTY — Launch Document Section B item 9.
              This is the copyright shield. The matching checkbox on /order
              captures the customer's explicit warranty at order time. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">2. Your photos, your rights</h2>
            <p>
              By submitting photos to us, you warrant that you own the photos or hold the right to
              have them restored, reproduced, and used in the work you commissioned — including any
              people pictured in them. If someone else owns the rights to a photo (a professional
              photographer, a publication, an archive), get their permission first.
            </p>
            <p>
              You keep full ownership of your photos and of everything we create from them. Our work
              product is yours: the restorations, the films, the files. We claim no ownership interest
              in your family&apos;s memories, ever.
            </p>
          </section>

          {/* 3. TURNAROUND — estimates are targets, not guarantees.
              JOE DECISION (with lawyer): the site advertises "48-hour turnaround."
              These terms must match whatever Joe finally approves as the promise. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">3. Turnaround times</h2>
            <p>
              Turnaround times shown on the site are good-faith estimates for typical orders, not
              guarantees. Heavily damaged photos, large orders, and film tiers take longer, and we will
              tell you honestly up front if your order needs more time. If a photo cannot be restored
              to a standard we are proud of, we will tell you so and you will not pay for it.
            </p>
          </section>

          {/* 4. REVISIONS — Launch Document: "Generous is fine. Unlimited is not
              a policy, it is a leak." JOE DECISION: confirm the round count. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">4. Revisions</h2>
            <p>
              Every order includes two rounds of revisions at no charge — tell us what to adjust and we
              will rework it. Further revision rounds are billed fairly and quoted before we begin them.
              Revisions cover the quality of our restoration work, not new creative direction
              introduced after delivery.
            </p>
          </section>

          {/* 5. REFUND — the "Love it or $0" pledge, in binding form.
              JOE DECISION (with lawyer): confirm refund mechanics and timing. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">5. The Love-It-Or-$0 guarantee</h2>
            <p>
              If our work does not meet your expectations, tell us within 14 days of delivery and you
              do not pay — or we refund what you paid, in full. No questions, no arguments. If we look
              at your photo and honestly cannot restore it, we will tell you straight and charge you
              nothing, before any work begins.
            </p>
          </section>

          {/* 6. PAYMENT */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">6. Payment</h2>
            <p>
              Payment is processed securely through our payment provider. Card numbers never touch our
              servers. No payment is taken until we have confirmed we can work with your photos.
            </p>
          </section>

          {/* 7. PRIVACY & DELETION — points at /privacy, which holds the detail. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">7. Privacy and your data</h2>
            <p>
              How we handle your photos and information is described in our{" "}
              <Link href="/privacy" className="text-gold-300 hover:underline">Privacy Policy</Link>,
              which is part of these terms. In short: we collect the minimum, we never train AI models
              on your photos, we strip location metadata on arrival, and we delete everything when you ask.
            </p>
          </section>

          {/* 8. ACCEPTABLE USE — Launch Document safety section: anyone can upload
              anything. These terms give the business the right to refuse. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">8. Acceptable use</h2>
            <p>
              You may not submit content you have no right to use, content that is unlawful, or content
              depicting the exploitation of children. We reserve the right to refuse any order, delete
              submitted files, and report illegal material to the appropriate authorities, including the
              National Center for Missing and Exploited Children, as the law requires.
            </p>
          </section>

          {/* 9. FILM TIERS — interview subjects must sign the release BEFORE
              publication. The canonical release text lives at /release. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">9. Memoir films and biographies</h2>
            <p>
              For interview-based tiers, every living person who appears on camera signs our{" "}
              <Link href="/release" className="text-gold-300 hover:underline">interview release form</Link>{" "}
              before anything is published. We do not publish identifiable interviews without written consent.
            </p>
          </section>

          {/* 10. LIABILITY — JOE DECISION (with lawyer): this cap must be set
              deliberately. The draft below is a starting point, not advice. */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">10. Limitation of liability</h2>
            <p>
              Our liability for any order is limited to the amount you paid for that order. We are not
              liable for indirect or consequential damages. We handle your originals with extreme care,
              and we strongly recommend you keep your own copies of every photo you send us — we cannot
              replace a one-of-a-kind physical original.
            </p>
          </section>

          {/* 11. GOVERNING LAW */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">11. Governing law</h2>
            <p>
              These terms are governed by the laws of the State of California.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">12. Changes</h2>
            <p>
              We may update these terms as the business grows. The version in effect when you placed
              your order governs that order.
            </p>
          </section>
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
