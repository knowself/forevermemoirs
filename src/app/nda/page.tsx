{/* ============================================================================
 * FOREVERMEMOIRS — CONTRACTOR CONFIDENTIALITY AGREEMENT (/nda)
 * ----------------------------------------------------------------------------
 * STATUS: DRAFT — NOT lawyer-reviewed. Counsel must review this agreement
 * before any contractor signs it. It is published here so contractors can
 * read what they will be asked to sign; it is not yet in force for anyone.
 *
 * This is a legal instrument, not marketing copy. Plain language on purpose:
 * the signers are working restorers and editors, not lawyers. Do not
 * "improve" the obligations below for style — any change to what a signer
 * must or must not do needs Joe and his lawyer, not a rewrite.
 *
 * JOE DECISION (with lawyer): confirm the confidentiality term (currently
 * 3 years), the governing law, and whether contractors need their own
 * insurance. Every [BRACKETED] value must be confirmed before use.
 * ========================================================================== */}

import Link from "next/link";

export default function Nda() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Legal · Draft — not yet reviewed by counsel
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Contractor Confidentiality Agreement
          </h1>
          <p className="text-sm text-parchment-200/60 max-w-xl mx-auto">
            Everyone who touches a customer&apos;s photos for ForeverMemoirs signs this before
            receiving a single file. Print it, sign it, keep a copy each.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-8 text-parchment-200/80 text-base leading-relaxed">
          <p>
            This agreement is between ForeverMemoirs, a sole proprietorship operating in
            California (&ldquo;Company&rdquo;), and the contractor named below
            (&ldquo;Contractor&rdquo;). It protects both sides: the families who trust us with
            their photos, and the contractor&apos;s own business information.
          </p>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">1. What counts as confidential</h2>
            <p>Confidential information means anything non-public shared in the course of the work, including:</p>
            <ol className="space-y-3 pl-6 list-decimal marker:text-gold-400">
              <li>
                <strong className="text-parchment-100">Customer materials.</strong> Customer photos,
                scans, films, recordings, names, and any personal information attached to an order.
              </li>
              <li>
                <strong className="text-parchment-100">Exam and certification content.</strong> Test
                images, answer keys, scoring criteria, and any other materials from the
                ForeverMemoirs quality-certification program.
              </li>
              <li>
                <strong className="text-parchment-100">Business methods.</strong> Restoration
                workflows, prompts, tooling configurations, pricing, customer lists, and business
                plans shared with the Contractor.
              </li>
              <li>
                <strong className="text-parchment-100">The Contractor&apos;s own confidential information</strong>,
                shared with the Company in the course of the work, is protected the same way.
              </li>
            </ol>
            <p>
              Information that is already public, or that becomes public through no fault of the
              receiving party, is not confidential.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">2. What the Contractor must do</h2>
            <ol className="space-y-3 pl-6 list-decimal marker:text-gold-400">
              <li>
                <strong className="text-parchment-100">Use it only for the assignment.</strong> Use
                confidential information only to complete the work Company assigned, nothing else.
              </li>
              <li>
                <strong className="text-parchment-100">Share with no one.</strong> Do not copy, share,
                publish, or discuss customer materials or other confidential information with anyone
                who is not authorized by Company in writing — including on social media, in portfolios,
                and in conversations.
              </li>
              <li>
                <strong className="text-parchment-100">Keep only what the assignment needs.</strong> Do
                not retain copies of customer materials after the assignment is complete. Delete all
                copies within 7 days of delivery or termination, and sooner if Company asks.
              </li>
              <li>
                <strong className="text-parchment-100">No AI training use.</strong> Never use customer
                materials to train, fine-tune, or improve any AI model — public or private, yours or
                anyone else&apos;s. This is absolute.
              </li>
              <li>
                <strong className="text-parchment-100">Protect it.</strong> Store files securely,
                use reasonable safeguards, and tell Company immediately if you suspect any
                unauthorized access or disclosure.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">3. How long this lasts</h2>
            <p>
              These obligations last for 3 years after the Contractor&apos;s last assignment for
              Company. Customer photos and personal information stay protected indefinitely —
              <em>forever</em> means forever.
            </p>
            <p className="text-sm text-parchment-200/60">
              Note: the 3-year term is a starting point for Joe and his lawyer to confirm before
              anyone signs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">4. What this is not</h2>
            <p>
              This is a confidentiality agreement, not an employment contract. The Contractor is an
              independent contractor, responsible for their own taxes and insurance. Nothing here
              transfers ownership of anyone&apos;s work or ideas except as a separate written
              agreement provides.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">5. Governing law</h2>
            <p>
              This agreement is governed by the laws of the State of California.
            </p>
          </div>

          {/* Signature block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Contractor printed name</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Contractor signature &amp; date</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">X ________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Company representative</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Date</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">__________________</p>
            </div>
          </div>

          <p className="text-xs text-parchment-200/50">
            Draft — not yet reviewed by counsel. Do not sign until Joe confirms the final version
            with his lawyer.
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
