{/* ============================================================================
 * FOREVERMEMOIRS — INTERVIEW SUBJECT RELEASE FORM (/release)
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS — READ BEFORE EDITING:
 *
 * This page implements Launch Document "Forever Memoirs Launch Document",
 * Section B item 10: for the Memoir Film ($997) and Biography ($2,997) tiers,
 * every living person who appears on camera signs a release BEFORE anything
 * is published. No exceptions. This page is the canonical text of that
 * release — production staff print it (or send the link) and collect a signed
 * copy per subject per production. It is referenced by Terms of Service
 * Section 9, which makes the release a contractual requirement of the
 * film tiers, not a courtesy.
 *
 * STATUS: DRAFT — NOT lawyer-reviewed. Entertainment/interview releases have
 * state-specific requirements (California especially). Counsel must review
 * before the first paid film production.
 *
 * IF YOU ARE AN AI EDITING THIS FILE: this is a legal instrument, not
 * marketing copy. Do not "improve" the language for style. Any change to the
 * grants below changes what the business is allowed to publish — that needs
 * Joe and his lawyer, not a rewrite.
 * ========================================================================== */}

export default function Release() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Legal · Film &amp; Biography Tiers
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Interview Subject Release
          </h1>
          <p className="text-sm text-parchment-200/60 max-w-xl mx-auto">
            Every living person who appears on camera in a ForeverMemoirs film signs this form
            before anything is published. Print it, sign it, keep a copy each.
          </p>
        </div>

        {/* The release text — this is the instrument. Plain language on purpose:
            the signers are grandparents, not lawyers. */}
        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-8 text-parchment-200/80 text-base leading-relaxed">
          <p>
            I, the undersigned (&ldquo;Subject&rdquo;), voluntarily agree to be interviewed,
            photographed, and recorded (audio and video) by ForeverMemoirs (&ldquo;Producer&rdquo;)
            for the production titled:
          </p>

          <div className="rounded-xl border border-white/15 bg-ink-900/60 p-5">
            <p className="text-xs uppercase tracking-widest text-gold-300 mb-1">Production title</p>
            <p className="font-serif text-xl text-parchment-100">________________________________________</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">What I am agreeing to</h2>
            <ol className="space-y-3 pl-6 list-decimal marker:text-gold-400">
              <li>
                <strong className="text-parchment-100">Permission to record.</strong> Producer may
                record my likeness, voice, and statements during interview sessions, including remote
                video sessions.
              </li>
              <li>
                <strong className="text-parchment-100">Permission to use.</strong> Producer may use,
                edit, and publish the recordings — in whole or in part — in the commissioned film,
                in trailers or excerpts promoting that film, and in archival copies delivered to the
                commissioning family.
              </li>
              <li>
                <strong className="text-parchment-100">Family ownership.</strong> The finished film
                belongs to the commissioning family, not to Producer. My grant here is to the family&apos;s
                project, and I understand the family controls how the film is shared.
              </li>
              <li>
                <strong className="text-parchment-100">No public use without asking.</strong> Producer
                will not use my interview in ForeverMemoirs marketing, portfolio, or public channels
                without my separate written permission.
              </li>
              <li>
                <strong className="text-parchment-100">Review right.</strong> I may request to review
                the sections of the film in which I appear before final delivery, and Producer will
                make good-faith corrections to factual errors I identify.
              </li>
              <li>
                <strong className="text-parchment-100">Voluntary.</strong> I am participating freely.
                I understand I may decline to answer any question and may end an interview session at
                any time.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-parchment-100">What I keep</h2>
            <p>
              I keep all rights to my own life story. This release grants permission for this specific
              production only. It is not a transfer of my life rights, and it does not permit fictionalized
              portrayals of me.
            </p>
          </div>

          {/* Signature block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Subject signature</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">X ________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Date</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">__________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Printed name</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">________________________________</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold-300">Producer representative</p>
              <p className="font-serif text-xl text-parchment-100 border-b border-white/20 pb-2">________________________________</p>
            </div>
          </div>

          <p className="text-xs text-parchment-200/50">
            If the subject is under 18, a parent or legal guardian must sign on their behalf and note
            the relationship below the signature.
          </p>
        </div>
      </div>
    </div>
  );
}
