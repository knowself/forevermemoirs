"use client";

import Link from "next/link";

export function CinematicShowcase() {
  return (
    <div className="relative rounded-3xl border border-gold-500/20 bg-gradient-to-b from-ink-900/90 to-ink-950 p-6 sm:p-10 overflow-hidden shadow-2xl">
      {/* Glow backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gold opacity-20 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Film Stills & Cinematic Player */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl group">
            <img
              src="/images/cinematic-interview.jpg"
              alt="Cinematic Family Memoir Interview"
              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Film Camera UI / Timecode Overlay */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 sm:gap-3 pointer-events-none">
              <span className="flex items-center gap-1.5 rounded-full bg-red-600/80 px-2.5 py-1 text-[10px] font-mono tracking-widest text-white uppercase backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                REC 4K
              </span>
              <span className="hidden sm:inline font-mono text-xs text-parchment-100/90 tracking-wider">
                TC 01:24:08:14
              </span>
            </div>

            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 pointer-events-none">
              <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-gold-300 border border-gold-500/30">
                24 FPS • 35MM LOOK
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-3 pointer-events-none">
              <div className="min-w-0">
                <p className="font-serif text-xs sm:text-base text-parchment-100 font-semibold drop-shadow-md truncate">
                  &ldquo;The Miller Family Memoir: Margaret&apos;s Chapter&rdquo;
                </p>
                <p className="hidden sm:block text-xs text-gold-300/80">Produced remotely via guided archival session</p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Documentary Narrative Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-medium uppercase tracking-widest text-gold-300">
            <span>A&amp;E Biography Style • Modernized</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-parchment-100 font-bold leading-tight">
            The same Hollywood biography standard. Rebuilt without the film crew.
          </h3>

          <p className="text-sm leading-relaxed text-parchment-200/70">
            In 2020, ForeverMemoirs charged up to $9,495 to send camera crews to living rooms in Southern California.
            Today, our 2.0 revival uses intimate, remote Zoom interview direction with broadcast documentary editors and AI-assisted pacing.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                ✓
              </div>
              <div>
                <strong className="text-sm text-parchment-100">Guided Oral History Interview:</strong>
                <span className="text-xs text-parchment-200/70 block">
                  Our interviewers ask the questions that draw out the hidden stories, laughter, and wisdom.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                ✓
              </div>
              <div>
                <strong className="text-sm text-parchment-100">Restored Archival Integration:</strong>
                <span className="text-xs text-parchment-200/70 block">
                  Vintage photos and old VHS/home movies are restored and woven seamlessly into the storyline.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                ✓
              </div>
              <div>
                <strong className="text-sm text-parchment-100">Bespoke Musical Scoring:</strong>
                <span className="text-xs text-parchment-200/70 block">
                  Custom acoustic soundtrack tailored to the era and emotion of your family&apos;s story.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/order?tier=memoir"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:brightness-110 shadow-lg shadow-gold-500/20"
            >
              Start The Memoir Film — $997
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-parchment-200/20 px-6 py-3 text-sm text-parchment-200/80 hover:border-gold-400 hover:text-gold-300 transition-colors"
            >
              Read Our 2.0 Manifesto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
