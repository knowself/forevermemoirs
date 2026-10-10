import Link from "next/link";

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
              A premium three-minute tribute film for the families you serve —
              restored photographs woven into a memorial, delivered in days.
              Fully remote, zero work for your staff.
            </p>
            <p className="mt-4 text-sm text-gold-300">
              Learn about partnering →
            </p>
          </Link>
        </div>

        <p className="text-center text-sm text-parchment-200/50">
          More partner programs are on the way.
        </p>
      </div>
    </div>
  );
}
