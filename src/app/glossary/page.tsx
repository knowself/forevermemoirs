import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — ForeverMemoirs",
  description:
    "Every technical term on the ForeverMemoirs site, explained in plain English. GFPGAN, Real-ESRGAN, 4K, Human Master QC, and more.",
};

type Entry = {
  term: string;
  def: string;
  href: string;
  linkLabel: string;
  external?: boolean;
};

type Group = {
  heading: string;
  blurb: string;
  entries: Entry[];
};

const groups: Group[] = [
  {
    heading: "Our AI engines",
    blurb: "The two open-source tools that do the restoration work.",
    entries: [
      {
        term: "GFPGAN",
        def: "The AI engine that rebuilds damaged faces in your old photos. When a face is scratched, faded, or blurred, GFPGAN reconstructs the missing detail while keeping the person's identity intact — it's why your great-grandmother's portrait still looks like her. It's free, open-source software, so there are no licensing surprises in your price.",
        href: "https://github.com/TencentARC/GFPGAN",
        linkLabel: "GFPGAN on GitHub",
        external: true,
      },
      {
        term: "Real-ESRGAN",
        def: "The AI that repairs everything around the face — backgrounds, clothing, paper texture — and enlarges the photo to print-ready size without the blur you'd get from simply zooming in on your phone.",
        href: "https://github.com/xinntao/Real-ESRGAN",
        linkLabel: "Real-ESRGAN on GitHub",
        external: true,
      },
      {
        term: "Neural network",
        def: "The kind of AI we use: software trained on millions of photographs to recognize what faces, textures, and damage look like, so it can rebuild what's missing instead of guessing.",
        href: "https://en.wikipedia.org/wiki/Deep_learning",
        linkLabel: "Deep learning on Wikipedia",
        external: true,
      },
    ],
  },
  {
    heading: "How we work",
    blurb: "The process behind every restoration.",
    entries: [
      {
        term: "AI-assisted restoration",
        def: "Our workflow in three words: AI repairs, humans approve. The software rebuilds what's damaged, and a real person checks every photo before it ships. Never AI alone, never hand-retouching alone.",
        href: "/#pipeline",
        linkLabel: "See the pipeline",
      },
      {
        term: "Human Master QC",
        def: "Quality control by human eyes. After the AI finishes, a trained reviewer examines the restoration face by face — checking that expressions, dimples, and family resemblances survived intact — before anything is delivered.",
        href: "/#pipeline",
        linkLabel: "See the pipeline",
      },
      {
        term: "Fidelity",
        def: "How faithfully the restored face matches the real person. High fidelity means your ancestor's gentle dimple, unique eyelid fold, and expression come through the repair unchanged. It's the one thing we never compromise.",
        href: "/#restoration",
        linkLabel: "Try the comparison slider",
      },
    ],
  },
  {
    heading: "Picture quality",
    blurb: "What the finished photo actually is.",
    entries: [
      {
        term: "4K / UHD",
        def: "A resolution of about 3,840 × 2,160 pixels — roughly four times the detail of old standard television. A 4K master can be printed large enough to frame without going soft or blocky.",
        href: "https://en.wikipedia.org/wiki/4K_resolution",
        linkLabel: "4K resolution on Wikipedia",
        external: true,
      },
      {
        term: "Archival",
        def: "Built to last generations: print-ready resolution, stable file formats, and careful handling from upload to delivery. When we say 'archival master,' we mean the definitive copy your grandchildren will inherit.",
        href: "/about",
        linkLabel: "Our origins & heritage",
      },
      {
        term: "Film grain",
        def: "The fine, sandy texture baked into old film photographs. We deliberately keep authentic grain alive instead of scrubbing it into plastic smoothness — it's part of the photo's character and era.",
        href: "https://en.wikipedia.org/wiki/Film_grain",
        linkLabel: "Film grain on Wikipedia",
        external: true,
      },
      {
        term: "Remaster",
        def: "Creating a new, higher-quality master copy from an aging original. Same photograph, renewed — ready for the next hundred years.",
        href: "https://en.wikipedia.org/wiki/Remaster",
        linkLabel: "Remaster on Wikipedia",
        external: true,
      },
    ],
  },
  {
    heading: "Film terms",
    blurb: "From our documentary side.",
    entries: [
      {
        term: "Ken Burns effect",
        def: "The slow pan-and-zoom across a still photograph you know from documentaries. It makes a frozen moment feel alive on screen, and it's how your restored photos move inside our video tributes.",
        href: "https://en.wikipedia.org/wiki/Ken_Burns_effect",
        linkLabel: "Ken Burns effect on Wikipedia",
        external: true,
      },
      {
        term: "Oral history",
        def: "A recorded conversation in which someone tells their life story in their own words — childhood, love, trials, legacy. It's the raw material of every Memoir Film, captured over a relaxed remote interview.",
        href: "https://en.wikipedia.org/wiki/Oral_history",
        linkLabel: "Oral history on Wikipedia",
        external: true,
      },
    ],
  },
];

export default function Glossary() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Reference
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Glossary
          </h1>
          <p className="text-sm text-parchment-200/60 max-w-xl mx-auto">
            Every technical term on our site, in plain English. No jargon left unexplained.
          </p>
        </div>

        {/* Groups */}
        {groups.map((group) => (
          <section key={group.heading} className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-100">
                {group.heading}
              </h2>
              <p className="text-sm text-parchment-200/60 mt-1">{group.blurb}</p>
            </div>
            <dl className="space-y-4">
              {group.entries.map((entry) => (
                <div
                  key={entry.term}
                  className="rounded-2xl border border-gold-500/20 bg-ink-900/50 p-6 sm:p-7"
                >
                  <dt className="font-serif text-xl font-bold text-gold-300">
                    {entry.term}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-parchment-200/80">
                    {entry.def}
                  </dd>
                  <dd className="mt-3">
                    {entry.external ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        {entry.linkLabel}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={entry.href}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        {entry.linkLabel}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        {/* Closing note */}
        <div className="rounded-2xl border border-gold-500/20 bg-ink-900/50 p-6 text-center">
          <p className="text-sm text-parchment-200/70">
            Still curious about something?{" "}
            <Link href="/#restoration" className="text-gold-300 hover:text-gold-200 font-medium">
              See the restoration in action
            </Link>{" "}
            or{" "}
            <Link href="/order" className="text-gold-300 hover:text-gold-200 font-medium">
              start with a single photo
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
