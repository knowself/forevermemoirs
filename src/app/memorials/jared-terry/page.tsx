import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jared Nathanael Terry — A Living Memorial | ForeverMemoirs",
  description:
    "The life of Jared Nathanael Terry (September 7, 1994 – November 6, 2026) — a son, husband, father, ballplayer, and quiet philosopher — told in chapters, with a playlist for every chapter.",
};

function MusicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

interface Chapter {
  id: string;
  numeral: string;
  title: string;
  years: string;
  body: string[];
  playlistTitle: string;
  playlistNote: string;
  culminating?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    id: "early-years",
    numeral: "Chapter One",
    title: "The Early Years",
    years: "1994 · Torrance, California",
    body: [
      "Jared Nathanael Terry was born September 7, 1994, in Torrance, California, to Joe and Kerry Terry.",
      "He grew up in a house full of music and faith, and took piano lessons as a boy. Those early years — the songs, the table, the family close around him — are where his story starts.",
    ],
    playlistTitle: "Songs of home and first piano pieces",
    playlistNote:
      "The music of a childhood house: hymns, piano practice, and the songs his family sang together.",
  },
  {
    id: "school-years",
    numeral: "Chapter Two",
    title: "The School Years",
    years: "Hermosa Beach · Mira Costa High School",
    body: [
      "The Hermosa Beach years were Jared\u2019s school years. At Mira Costa High School he played varsity baseball, and at ten years old he joined the Hermosa Beach Junior Guards.",
      "Baseball came first — and so did the Dodgers. He was a Dodgers fan for life; the blue ran deep, from the sandlot to the big leagues and back again.",
    ],
    playlistTitle: "School-days and game-day songs",
    playlistNote:
      "The songs of Hermosa Beach and Mira Costa — the ones playing on the way to practice, and on the way home from a win.",
  },
  {
    id: "young-adulthood",
    numeral: "Chapter Three",
    title: "Young Adulthood",
    years: "College of the Canyons · Exxon Mobil",
    body: [
      "After Mira Costa came College of the Canyons, where Jared played baseball, and then work at Exxon Mobil — a young man making his own way.",
      "Friends from those years remember a young man who loved a good game — Cashflow nights, poker, anything with a score to keep — and a quiet philosopher, thinking things through before he spoke.",
    ],
    playlistTitle: "Songs from college, work, and friends",
    playlistNote:
      "The music of the Canyons years and the first working years — songs his friends would know in a single note.",
  },
  {
    id: "taylor-years",
    numeral: "Chapter Four",
    title: "The Taylor Years",
    years: "2023 · Puerto Vallarta, Mexico",
    body: [
      "Jared met Taylor Lockwood, and on November 4, 2023, they married in Puerto Vallarta, Mexico.",
      "She was his wife and his partner — and the chapters that follow are theirs together.",
    ],
    playlistTitle: "Their songs — courtship and wedding",
    playlistNote:
      "The songs that belonged to Jared and Taylor: courtship, and the wedding in Puerto Vallarta.",
  },
  {
    id: "pregnancy-planning",
    numeral: "Chapter Five",
    title: "The Pregnancy Planning",
    years: "2026 · Zachary, Louisiana",
    body: [
      "In 2026, Jared and Taylor began planning for a child and preparing a home in Zachary, Louisiana — waiting, hoping, and getting ready for the life that was coming.",
    ],
    playlistTitle: "Quiet, hopeful songs while waiting",
    playlistNote:
      "Soft songs for a season of waiting — a home in Zachary being made ready, one room at a time.",
  },
  {
    id: "jervais",
    numeral: "Chapter Six",
    title: "Jervais Bleu Terry",
    years: "2026 —",
    body: [
      "Jared became a father in 2026, when his son Jervais Bleu Terry was born. The photographs from those first weeks show a father holding his boy close.",
      "This chapter is for Jervais. As he grows, his family will add letters here — so that one day he can read, in their words, who his father was.",
    ],
    playlistTitle: "Lullabies for his son — grows with him",
    playlistNote:
      "Lullabies for Jervais, chosen to grow with him — the first songs he will know his father by.",
    culminating: true,
  },
];

export default function JaredTerryMemorial() {
  return (
    <div className="bg-[#fdfbf7] text-[#171412]">
      {/* Hero — Dodger blue */}
      <section className="relative overflow-hidden bg-dodger text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            A ForeverMemoirs Living Memorial
          </p>
          <h1 className="mt-5 font-serif text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            Jared Nathanael Terry
          </h1>
          <p className="mt-5 text-base sm:text-lg font-medium tracking-wide text-white/90">
            September 7, 1994 — November 6, 2026
          </p>
          <p className="mt-2 text-sm sm:text-base text-white/75">
            Torrance, California · Zachary, Louisiana
          </p>
          <p className="mx-auto mt-8 max-w-2xl font-serif italic text-xl sm:text-2xl leading-relaxed text-white">
            &ldquo;Be angry. God can take it. But let love have the last
            word.&rdquo;
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/60">
            From his father&rsquo;s words at Jared&rsquo;s memorial
          </p>
          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/85">
            A son, husband, father, ballplayer, and quiet philosopher.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#early-years"
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-dodger shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)] transition hover:bg-dodger-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dodger active:scale-[0.98]"
            >
              Read his story
            </Link>
            <Link
              href="#share-a-memory"
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dodger active:scale-[0.98]"
            >
              Share a Memory
            </Link>
          </div>
        </div>
        <div className="relative h-1 bg-[#c89e27]" aria-hidden="true" />
      </section>

      {/* Chapter navigation — sticky pills */}
      <nav
        aria-label="Chapters of Jared's life"
        className="sticky top-[88px] z-40 border-b border-dodger/15 bg-[#fdfbf7]/95 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id} className="shrink-0">
                <Link
                  href={`#${chapter.id}`}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full border border-dodger/30 bg-white px-4 py-2 text-sm font-semibold text-dodger transition hover:border-dodger hover:bg-dodger hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfbf7]"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Intro — how this page works */}
      <section className="mx-auto max-w-3xl px-6 pt-14 sm:pt-20 pb-4 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          A life, told in chapters
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#171412]/75">
          This is not a static obituary page. It is a Living Memorial — a
          place to walk through Jared&rsquo;s story, and to hear it. Music is
          memory: ForeverMemoirs creates a playlist for every chapter, so each
          part of his story has its songs. His family keeps this page, and it
          will grow — for Jervais, most of all.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#171412]/60">
          Every chapter has its own playlist — an original soundtrack made for
          Jared, and the songs his family chooses.{" "}
          <Link
            href="/memorials#music"
            className="font-semibold text-dodger underline decoration-dodger/30 underline-offset-4 hover:decoration-dodger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger rounded-sm"
          >
            How the music works
          </Link>
        </p>
      </section>

      {/* Chapters */}
      <main className="mx-auto max-w-3xl px-6 pb-8">
        {CHAPTERS.map((chapter, index) => (
          <section
            key={chapter.id}
            id={chapter.id}
            aria-labelledby={`${chapter.id}-heading`}
            className={`scroll-mt-40 py-12 sm:py-16 ${
              index > 0 ? "border-t border-dodger/15" : ""
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dodger">
              {chapter.numeral}
            </p>
            <h2
              id={`${chapter.id}-heading`}
              className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight"
            >
              {chapter.title}
            </h2>
            <p className="mt-2 text-sm font-medium tracking-wide text-[#171412]/55">
              {chapter.years}
            </p>
            <div className="mt-6 space-y-5 text-base sm:text-lg leading-relaxed text-[#171412]/80">
              {chapter.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Chapter playlist */}
            <div
              className={`mt-8 rounded-2xl border p-6 sm:p-7 ${
                chapter.culminating
                  ? "border-dodger/40 bg-dodger text-white shadow-[0_16px_36px_-12px_rgba(0,90,156,0.55)]"
                  : "border-dodger/25 bg-white shadow-[0_2px_20px_-8px_rgba(0,90,156,0.25)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    chapter.culminating
                      ? "bg-white/15 text-white"
                      : "bg-dodger/10 text-dodger"
                  }`}
                >
                  <MusicIcon className="h-5 w-5" />
                </span>
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      chapter.culminating ? "text-white/75" : "text-dodger"
                    }`}
                  >
                    Chapter playlist
                  </p>
                  <p className="mt-0.5 font-serif text-lg sm:text-xl font-bold leading-snug">
                    {chapter.playlistTitle}
                  </p>
                </div>
              </div>
              <p
                className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  chapter.culminating ? "text-white/85" : "text-[#171412]/70"
                }`}
              >
                {chapter.playlistNote}
              </p>
              <p
                className={`mt-4 border-t pt-4 text-sm ${
                  chapter.culminating
                    ? "border-white/20 text-white/70"
                    : "border-dodger/15 text-[#171412]/55"
                }`}
              >
                The family is choosing the first songs for this chapter.
                {chapter.culminating &&
                  " New songs and letters will be added as Jervais grows."}
              </p>
            </div>
          </section>
        ))}
      </main>

      {/* Book of Memories / Share a Memory */}
      <section
        id="share-a-memory"
        aria-labelledby="share-a-memory-heading"
        className="scroll-mt-40 border-t border-dodger/15 bg-white"
      >
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dodger">
            Book of Memories
          </p>
          <h2
            id="share-a-memory-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Share a Memory — or a song
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#171412]/75">
            If Jared was part of your life, his family would love to hear it —
            a story, a photograph, or a song that belongs in one of his
            chapters. Every note is read by the family first, and appears here
            only after they have approved it. Nothing posts itself.
          </p>
          <div className="mt-8 rounded-2xl border border-dodger/25 bg-dodger-50 p-6 sm:p-8">
            <p className="font-serif text-xl font-bold text-dodger">
              Sharing opens with the family dashboard
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#171412]/75">
              The family dashboard — where Jared&rsquo;s family reviews
              memories, approves songs, and keeps this page true — is coming
              soon. When it opens, this section becomes the place to leave
              your memory of Jared. Nothing you would write is collected
              here yet.
            </p>
          </div>
        </div>
      </section>

      {/* Steward note */}
      <section className="border-t border-dodger/15 bg-[#fdfbf7]">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="font-serif italic text-lg sm:text-xl text-[#171412]/75">
            This Living Memorial is kept by Jared&rsquo;s family.
          </p>
          <p className="mt-3 text-sm text-[#171412]/60">
            Joe Terry, Steward · A ForeverMemoirs Living Memorial
          </p>
          <p className="mt-1 text-sm font-semibold tracking-wide text-dodger">
            Living Memorials — Kept by Families
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/memorials"
              className="font-semibold text-dodger underline decoration-dodger/30 underline-offset-4 hover:decoration-dodger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger rounded-sm"
            >
              All Living Memorials
            </Link>
            <Link
              href="/"
              className="font-semibold text-dodger underline decoration-dodger/30 underline-offset-4 hover:decoration-dodger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger rounded-sm"
            >
              ForeverMemoirs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
