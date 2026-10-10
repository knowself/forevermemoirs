import Link from "next/link";

/* Funeral Home Services — B2B partner page.
 *
 * Tone rule: grief work demands flawless sensitivity. Dignified, plain,
 * no hype, no money-back slogans, no manufactured urgency.
 */

const tiers = [
  {
    name: "The 3-Minute Tribute",
    price: "$397",
    tagline: "A cherished moment — the essence of a life, beautifully told.",
    includes: [
      "Up to 30 restored photographs",
      "Music and title cards with the loved one's name and dates",
      "Priority turnaround — typically 48 to 72 hours",
      "Private streaming link the family can share and keep",
    ],
  },
  {
    name: "The 15-Minute Tribute",
    price: "$797",
    tagline: "The fuller story — chapters of a life, told at an unhurried pace.",
    includes: [
      "Up to 100 restored photographs",
      "Eulogy and service audio woven into the film",
      "Chaptered life sections with multiple music selections",
      "5 to 7 day turnaround",
      "Private streaming link plus a downloadable keepsake file",
    ],
  },
];

const addOns = [
  "24-hour rush production",
  "Extended photo restoration beyond the included set",
  "Keepsake USB drives for family members",
];

const steps = [
  {
    title: "Offer the tribute",
    body: "Present the Memorial Tribute Film as your premium memorial option to the family — the step above the standard slideshow. Two lengths to fit every family and budget.",
  },
  {
    title: "The family uploads photos",
    body: "Families send photographs through our secure, private upload. Nothing is ever used for any other purpose.",
  },
  {
    title: "We produce the film",
    body: "Restored photographs woven into a memorial film with music and title cards — at the priority turnaround of the chosen option.",
  },
  {
    title: "You present it",
    body: "You receive a private streaming link to share with the family — ready for the service and for keepsakes afterward.",
  },
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
            photographs woven into a memorial, delivered in days.
          </p>
        </div>

        {/* Tribute options */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-parchment-100 text-center">
            Two tribute options
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 space-y-5 flex flex-col"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-parchment-100">
                    {tier.name}
                  </h3>
                  <p className="font-serif italic text-gold-300/90 mt-1">
                    {tier.tagline}
                  </p>
                </div>
                <p className="font-serif text-4xl font-bold text-gold-300">
                  {tier.price}
                </p>
                <ul className="space-y-3 text-parchment-200/80 leading-relaxed text-sm flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-gold-400 mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink-950/60 p-6 sm:p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-400/80">
              Also available
            </p>
            <p className="mt-2 text-parchment-200/70 text-sm">
              {addOns.join("  •  ")}
            </p>
          </div>
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
