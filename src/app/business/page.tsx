import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Business — ForeverMemoirs",
  description:
    "ForeverMemoirs partners with businesses that serve families at life's milestones — starting with funeral homes and premium Memorial Tribute Films, delivered in days.",
};

export default function Business() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            For Business
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Partner with ForeverMemoirs
          </h1>
          <p className="text-lg text-parchment-200/70 max-w-2xl mx-auto">
            We partner with businesses that serve families at life&apos;s milestones —
            starting with funeral homes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 max-w-2xl mx-auto">
          <Link
            href="/business/funeral-homes"
            className="group rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-10 hover:border-gold-500/40 transition-colors"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400/80 pb-2">
              Funeral Homes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-100 group-hover:text-gold-300 transition-colors">
              Memorial Tribute Films
            </h2>
            <p className="mt-3 text-parchment-200/70 leading-relaxed">
              A premium tribute film for the families you serve — two options,
              a 3-minute tribute and a 15-minute tribute, with restored
              photographs woven into a memorial, delivered in days.
              Fully remote, zero work for your staff.
            </p>
            <p className="mt-4 text-sm text-gold-300">
              Learn about partnering →
            </p>
          </Link>
        </div>

        <div className="space-y-12 text-left">
          <section>
            <h2 className="font-serif text-3xl font-bold text-parchment-100">
              How partnering works
            </h2>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                  1
                </span>
                <p className="text-parchment-200/85 leading-relaxed">
                  <strong className="text-parchment-100">Offer the tribute.</strong>{" "}
                  Present the Memorial Tribute Film as your premium memorial
                  option to the family — the step above the standard slideshow.
                  Two lengths fit every family and budget.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                  2
                </span>
                <p className="text-parchment-200/85 leading-relaxed">
                  <strong className="text-parchment-100">
                    The family uploads photos.
                  </strong>{" "}
                  Families send photographs through our secure, private upload.
                  Nothing is ever used for any other purpose.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                  3
                </span>
                <p className="text-parchment-200/85 leading-relaxed">
                  <strong className="text-parchment-100">We produce the film.</strong>{" "}
                  Restored photographs woven into a memorial film with music
                  and title cards — at the priority turnaround of the chosen
                  option.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                  4
                </span>
                <p className="text-parchment-200/85 leading-relaxed">
                  <strong className="text-parchment-100">You present it.</strong>{" "}
                  You receive a private streaming link to share with the family
                  — ready for the service and for keepsakes afterward.
                </p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-parchment-100">
              What your home gets
            </h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  A premium tribute film for the families you serve — two
                  options: a 3-minute tribute and a 15-minute tribute, with
                  restored photographs woven into a memorial, delivered in days.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  Fully remote, zero work for your staff. No equipment, no new
                  process to learn.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  Every film passes human review before it reaches a family.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  Original music made for each life — no licensing fees, no
                  rights holders, nothing that can be muted or taken down. Your
                  home&apos;s own license covers the music played in the room at
                  the service; our original music covers everything online.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  When a family wants the whole life story preserved, the
                  tribute becomes a gentle path to the Memoir Film.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-400">•</span>
                <span className="text-parchment-200/85 leading-relaxed">
                  We take on a limited number of partner homes, so every film
                  gets the care grief deserves.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-3xl font-bold text-parchment-100">
              Questions funeral directors ask
            </h2>
            <div className="mt-6 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-100">
                  How long does a tribute film take?
                </h3>
                <p className="mt-2 text-parchment-200/85 leading-relaxed">
                  The 3-Minute Tribute is typically ready in 48 to 72 hours.
                  The 15-Minute Tribute takes 5 to 7 days. 24-hour rush
                  production is available.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-100">
                  What do families need to do?
                </h3>
                <p className="mt-2 text-parchment-200/85 leading-relaxed">
                  Send photographs through our secure, private upload.
                  That&apos;s it. Nothing is ever used for any other purpose.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-100">
                  What about the music — won&apos;t we run into licensing trouble?
                </h3>
                <p className="mt-2 text-parchment-200/85 leading-relaxed">
                  No. Our films use original music made for each life, so there
                  are no licensing fees, no rights holders, and nothing that can
                  be muted or taken down. Your home&apos;s own license covers
                  the music played in the room at the service; our original
                  music covers everything online. A licensed signature song in
                  the tribute film is also available.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-100">
                  Does my staff have to learn anything new?
                </h3>
                <p className="mt-2 text-parchment-200/85 leading-relaxed">
                  No. It&apos;s fully remote — no work for your staff, no
                  equipment, no new process to learn.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-100">
                  What does a tribute cost?
                </h3>
                <p className="mt-2 text-parchment-200/85 leading-relaxed">
                  Two options: the 3-Minute Tribute at $397 (up to 30 restored
                  photographs) and the 15-Minute Tribute at $797 (up to 100
                  restored photographs, with eulogy and service audio woven
                  in). Talk with Joe about partnering:{" "}
                  <a
                    href="mailto:joe@forevermemoirs.com"
                    className="text-gold-300 hover:underline"
                  >
                    joe@forevermemoirs.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>

        <p className="text-center text-sm text-parchment-200/70">
          <Link href="/memorials" className="text-gold-300 hover:underline">
            Living Memorials
          </Link>
          {" — a home page for a life, kept by the family."}
        </p>

        <p className="text-center text-sm text-parchment-200/50">
          More partner programs are on the way.
        </p>
      </div>
    </div>
  );
}
