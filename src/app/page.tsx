import Link from "next/link";

const TIERS = [
  {
    name: "Memory Rescue",
    price: "$49",
    unit: "per photo",
    blurb: "One cherished photo, professionally restored in 48 hours. Faded, torn, or worn — we bring it back.",
  },
  {
    name: "The Shoebox",
    price: "$149",
    unit: "5 photos",
    blurb: "Five photos restored, plus a 60-second video tribute with original music. Perfect for anniversaries and memorials.",
  },
  {
    name: "The Memoir Film",
    price: "$997",
    unit: "one-time",
    blurb: "Remote interviews, AI-assisted editing, your restored photos woven into a film your family will keep forever.",
  },
  {
    name: "The Biography",
    price: "$2,997",
    unit: "one-time",
    blurb: "Multi-session family interviews and full archival treatment. The definitive film of a life, produced remotely.",
  },
  {
    name: "LifeCharts 2.0",
    price: "$297",
    unit: "per year",
    blurb: "Your family sends videos all year; we cut the annual film. The modern video diary.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <img src="/images/logo.jpg" alt="ForeverMemoirs" className="mx-auto h-24 w-auto" />
        <h1 className="mt-8 font-serif text-5xl leading-tight tracking-tight">
          No life story should go untold.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">
          We restore your faded photographs and turn your family&apos;s memories into
          films worth keeping — from a single $49 photo rescue to a complete
          life-story documentary, all produced remotely.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/order" className="rounded-full bg-ink px-8 py-3 text-parchment hover:bg-gold hover:text-ink">
            Restore a Photo — $49
          </Link>
          <Link href="/about" className="rounded-full border border-ink/20 px-8 py-3 hover:border-gold">
            Our Story
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-ink/10 bg-white/60">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center font-serif text-3xl">How it works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { n: "1", t: "Send your photo", d: "Upload a scan or a phone photo of your print. Your original never leaves your hands." },
              { n: "2", t: "We restore it", d: "AI-assisted restoration with human eyes on every photo — faces stay true to the person." },
              { n: "3", t: "You receive it", d: "High-resolution file back in 48 hours. Love it or you don't pay." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-xl text-ink">{s.n}</div>
                <h3 className="mt-4 font-serif text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-ink/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer ladder */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center font-serif text-3xl">Choose your memoir</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl">{t.name}</h3>
              <p className="mt-2">
                <span className="font-serif text-3xl">{t.price}</span>{" "}
                <span className="text-sm text-ink/60">{t.unit}</span>
              </p>
              <p className="mt-3 flex-1 text-sm text-ink/70">{t.blurb}</p>
              <Link href="/order" className="mt-6 rounded-full bg-ink px-5 py-2 text-center text-sm text-parchment hover:bg-gold hover:text-ink">
                Start
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-serif text-3xl">Our promise</h2>
        <p className="mt-4 text-ink/70">
          Your photos and films belong to you — always. We never use your family&apos;s
          images without your written consent, and every restoration is checked by
          human eyes before it ships. If a photo can&apos;t be restored, you don&apos;t pay.
        </p>
      </section>
    </div>
  );
}
