import Link from "next/link";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { OfferLadder } from "../components/OfferLadder";
import { CinematicShowcase } from "../components/CinematicShowcase";
import { RestorationPipeline } from "../components/RestorationPipeline";
import { TrustAndFAQ } from "../components/TrustAndFAQ";

export default function Home() {
  return (
    <div className="relative overflow-hidden film-grain">
      {/* Hero Ambient Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/10 blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 sm:pt-24 pb-16 text-center z-10">
        <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1.5 text-xs text-parchment-100 shadow-xl backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-gold-300">ForeverMemoirs 2.0</span>
          <span className="text-white/20">•</span>
          <span className="text-parchment-200/70">Est. Hermosa Beach, CA</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-parchment-50 leading-[1.12]">
          No life story should{" "}
          <span className="gold-text-gradient italic font-normal">
            go untold.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-parchment-200/80 leading-relaxed">
          We restore your family&apos;s weathered photographs with museum-grade fidelity and craft personal
          A&amp;E Biography-style documentary films — from a single{" "}
          <span className="text-gold-300 font-semibold">$49 photo rescue</span> to a complete
          multi-session family legacy, produced entirely remotely.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/#tiers"
            className="w-full sm:w-auto rounded-full border border-gold-500/30 bg-ink-900/60 px-8 py-3.5 min-h-[48px] inline-flex items-center justify-center text-sm font-medium text-parchment-100 backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-300"
          >
            Explore The Offer Ladder
          </Link>
        </div>

        {/* Live Heritage Stats */}
        <div className="mt-16 border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">48 Hours</div>
            <div className="mt-1 text-xs text-parchment-200/60 uppercase tracking-wider">Fast Turnaround</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">$49</div>
            <div className="mt-1 text-xs text-parchment-200/60 uppercase tracking-wider">Photo Restoration</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">100%</div>
            <div className="mt-1 text-xs text-parchment-200/60 uppercase tracking-wider">Human Master QC</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">Remote</div>
            <div className="mt-1 text-xs text-parchment-200/60 uppercase tracking-wider">Zoom Interviews</div>
          </div>
        </div>
      </section>

      {/* Interactive Photo Restoration Section */}
      <section id="restoration" className="mx-auto max-w-6xl px-6 py-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            Interactive Comparison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-100">
            See the CodeFormer Restoration in Action
          </h2>
          <p className="text-sm text-parchment-200/70">
            Drag the gold divider to inspect how an 80-year-old scratched, creased family print is restored to archival brilliance without ever altering the subject&apos;s face.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* The 5-Step Pipeline */}
      <RestorationPipeline />

      {/* Cinematic Documentary Showcase */}
      <section className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            Heirloom Personal Documentaries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-100">
            Films Your Family Will Keep Forever
          </h2>
          <p className="text-sm text-parchment-200/70">
            Personal films produced with the gravitas of an A&amp;E Biography, recorded over comfortable Zoom sessions with our oral historians.
          </p>
        </div>

        <CinematicShowcase />
      </section>

      {/* The Complete Offer Ladder */}
      <OfferLadder />

      {/* Trust & FAQ */}
      <TrustAndFAQ />

      {/* Final Call to Action */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 text-center z-10">
        <div className="relative rounded-3xl border border-gold-500/30 bg-gradient-to-b from-ink-900 via-ink-950 to-black p-10 sm:p-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-radial-gold opacity-25 pointer-events-none" />
          
          <img
            src="/images/logo-full.png"
            alt="ForeverMemoirs"
            className="mx-auto h-20 w-20 rounded-xl object-contain shadow-lg mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-parchment-50 max-w-2xl mx-auto leading-tight">
            Every family has a story. Let&apos;s make sure yours survives.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-parchment-200/70">
            Begin today with a single photograph for $49. 48-hour delivery, complete archival rights, and a 100% money-back guarantee.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-8 py-4 text-sm font-bold text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/25 active:scale-95"
            >
              Start My Photo Restoration — $49
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-parchment-100 hover:border-gold-400 hover:text-gold-300 transition-colors"
            >
              Learn About ForeverMemoirs 2.0
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
