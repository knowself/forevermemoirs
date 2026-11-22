import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_MEMORIALS } from "../../lib/memorials";

export const metadata: Metadata = {
  title: "Living Memorials — Kept by Families | ForeverMemoirs",
  description:
    "A Living Memorial is a home page for a life — told in chapters, with a playlist for every chapter, and kept by the family. Memorials listed here are those their families have chosen to share publicly.",
};

export default function MemorialsIndex() {
  return (
    <div className="bg-[#fdfbf7] text-[#171412]">
      <section className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dodger">
          ForeverMemoirs
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
          Living Memorials
        </h1>
        <p className="mt-4 font-serif italic text-xl sm:text-2xl text-dodger">
          Kept by Families
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#171412]/75">
          A Living Memorial is a home page for a life — told in chapters, with
          a playlist for every chapter, and kept by the family. The memorials
          listed here are the ones their families have chosen to share
          publicly.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 sm:pb-24">
        <div className="space-y-6">
          {PUBLIC_MEMORIALS.map((memorial) => (
            <article
              key={memorial.slug}
              className="rounded-3xl border border-dodger/20 bg-white p-8 sm:p-10 shadow-[0_2px_24px_-8px_rgba(0,90,156,0.25)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dodger">
                Living Memorial No. 01
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                <Link
                  href={`/memorials/${memorial.slug}`}
                  className="text-[#171412] underline decoration-dodger/30 decoration-2 underline-offset-8 hover:text-dodger hover:decoration-dodger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger rounded-sm"
                >
                  {memorial.name}
                </Link>
              </h2>
              <p className="mt-3 text-sm font-medium tracking-wide text-[#171412]/60">
                {memorial.dates}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#171412]/75">
                {memorial.blurb}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={`/memorials/${memorial.slug}`}
                  className="inline-flex min-h-[48px] items-center rounded-full bg-dodger px-7 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,90,156,0.55)] transition hover:bg-dodger-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfbf7] active:scale-[0.98]"
                >
                  Visit the memorial
                  <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <p className="text-xs text-[#171412]/55">
                  Kept by his family · {memorial.steward}, Steward
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[#171412]/55">
          Some families keep their memorial private, for family and friends
          only. Those memorials are never listed here — a memorial appears on
          this page only when its family has chosen to share it publicly.
        </p>
      </section>
    </div>
  );
}
