/* ============================================================================
 * Storykeepers' Corner — shared article shell.
 *
 * Every guide page renders inside <CornerArticle>: the warm illustration as a
 * header image, a kicker + serif title, then Joe-approved copy in a readable
 * measure. Follows the site's dark theme (ink/parchment/gold).
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";

export default function CornerArticle({
  image,
  imageAlt,
  kicker,
  title,
  children,
}: {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden film-grain py-12 sm:py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 z-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image
            src={image}
            alt={imageAlt}
            width={1920}
            height={1280}
            className="w-full h-auto"
            priority={false}
          />
        </div>

        <div className="text-center space-y-4 mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            {kicker}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment-100 tracking-tight">
            {title}
          </h1>
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-parchment-200/85">
          {children}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/storykeepers/library"
            className="rounded-full border border-gold-500/40 px-6 py-3 text-sm font-semibold text-gold-300 hover:bg-gold-500/10 transition-colors"
          >
            ← Back to the Library
          </Link>
          <Link
            href="/"
            className="text-sm text-parchment-200/60 hover:text-parchment-100 transition-colors"
          >
            ForeverMemoirs home
          </Link>
        </div>
      </div>
    </div>
  );
}
