import Link from "next/link";

/* Funeral Home Services — B2B partner page.
 *
 * Tone rule: grief work demands flawless sensitivity. Dignified, plain,
 * no hype, no money-back slogans, no manufactured urgency. Pricing and
 * referral terms are negotiated in person — they do not belong on this page.
 */

const steps = [
  {
    title: "Offer the tribute",
    body: "Present the Memorial Tribute Film as your premium memorial option to the family — the step above the standard slideshow.",
  },
  {
    title: "The family uploads photos",
    body: "Families send photographs through our secure, private upload. Nothing is ever used for any other purpose.",
  },
  {
    title: "We produce the film",
    body: "Restored photographs woven into a three-minute memorial with music and title cards — priority turnaround, typically 48 to 72 hours.",
  },
  {
    title: "You present it",
    body: "You receive a private streaming link to share with the family — ready for the service and for keepsakes afterward.",
  },
];

const includes = [
  "Three-minute memorial tribute film",
  "Photo restoration by human-checked craft — damage and fading repaired, faces kept genuine",
  "Music and title cards with the loved one's name and dates",
  "Private streaming link the family can share and keep",
];

export default function FuneralHomes() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            For Funeral Homes
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Memorial Tribute Films
          </h1>
          <p className="text-lg text-parchment-200/70 max-w-2xl mx-auto">
            A premium tribute film for the families you serve — restored
            photographs woven into a three-minute memorial, delivered in days.
          </p>
        </div>

        {/* What families receive */}
        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-parchment-100">
            What the family receives
          </h2>
          <ul className="space-y-3 text-parchment-200/80 leading-relaxed">
            {includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-gold-400 mt-1">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How partnering works */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-parchment-100 text-center">
            How partnering works
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl border border-white/10 bg-ink-950/80 p-6 sm:p-8"
              >
                <p className="font-serif text-3xl text-gold-400/80">{i + 1}</p>
                <h3 className="font-serif text-lg font-bold text-parchment-100 mt-2">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-parchment-200/70 leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Why partner */}
        <div className="rounded-3xl border border-gold-500/25 bg-ink-900/60 p-8 sm:p-12 space-y-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-parchment-100">
            Built for how your home already works
          </h2>
          <p className="text-parchment-200/70 leading-relaxed max-w-2xl mx-auto">
            No work for your staff, no equipment, no new process to learn —
            it&apos;s fully remote. Every film passes human review before it
            reaches a family. And when a family wants the whole life story
            preserved, the tribute becomes a gentle path to the Memoir Film.
          </p>
          <p className="font-serif italic text-gold-300/90">
            We take on a limited number of partner homes, so every film gets
            the care grief deserves.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <a
            href="mailto:joe@forevermemoirs.com?subject=Funeral%20home%20partnership%20—%20Memorial%20Tribute%20Films"
            className="inline-block rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-ink-950 hover:brightness-110 transition-all"
          >
            Talk with Joe about partnering
          </a>
          <p className="text-sm text-parchment-200/50">
            joe@forevermemoirs.com
          </p>
        </div>

        <div className="text-center">
          <Link href="/business" className="text-sm text-gold-300 hover:underline">
            ← All business services
          </Link>
        </div>
      </div>
    </div>
  );
}
