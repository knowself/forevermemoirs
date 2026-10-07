import Link from "next/link";

export default function About() {
  return (
    <div className="relative overflow-hidden film-grain py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Origins &amp; Heritage
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-100 tracking-tight">
            Our Story &amp; The 2.0 Revival
          </h1>
          <p className="font-serif italic text-gold-300 text-lg sm:text-xl">
            &ldquo;No life story should go untold.&rdquo;
          </p>
        </div>

        {/* Narrative Section */}
        <div className="rounded-3xl border border-white/10 bg-ink-950/80 p-8 sm:p-12 space-y-8 text-parchment-200/80 text-base leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">
              The Hermosa Beach Origins
            </h2>
            <p>
              ForeverMemoirs was founded in Hermosa Beach, California, with a solemn conviction:{" "}
              <strong className="text-parchment-100">ordinary families live extraordinary lives.</strong>{" "}
              Too often, the stories of grandmothers who crossed oceans, fathers who built businesses from toolboxes,
              and mothers who held neighborhoods together are lost when memory fades.
            </p>
            <p>
              In our original era, we produced broadcast-quality personal documentary films in the grand style of
              an A&amp;E Biography. We dispatched camera crews, set up lighting rigs in living rooms, and delivered
              custom-authored DVDs. It was deeply moving work — but it was expensive, geographically restricted to
              Southern California, and out of reach for too many families who needed it most.
            </p>
          </div>

          {/* Visual Divider / Quote */}
          <div className="border-l-2 border-gold-400 pl-6 py-2 my-8 bg-gold-500/5 rounded-r-xl">
            <blockquote className="font-serif text-lg sm:text-xl text-parchment-100 italic">
              &ldquo;The shoebox of fading photographs tucked in your closet is a sacred treasure chest.
              Our mission is to make sure those voices and faces endure for your great-grandchildren.&rdquo;
            </blockquote>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-parchment-100">
              The 2.0 Transformation
            </h2>
            <p>
              The technology has caught up to our heart. With ForeverMemoirs 2.0, we rebuilt our entire studio
              on a modern, open-source AI and remote documentary pipeline:
            </p>
            <ul className="space-y-3 pl-4 border-l border-gold-500/30">
              <li className="flex items-start gap-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>
                  <strong className="text-parchment-100">Remote Zoom Direction:</strong> No strangers in your home.
                  Our documentary producers guide heartfelt, intimate oral history interviews over comfortable video calls.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>
                  <strong className="text-parchment-100">In-House Neural Restoration:</strong> Using local CodeFormer
                  and Real-ESRGAN pipelines, we restore vintage 1920s–1980s prints at zero marginal compute cost —
                  allowing us to bring a photo restoration down to just $49.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>
                  <strong className="text-parchment-100">Permanent Archival Streaming:</strong> No DVDs that scratch or obsolete
                  players. Your films are preserved in secure cloud vaults and master downloads your family can share globally.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison: 1.0 vs 2.0 Table */}
        <div className="rounded-3xl border border-gold-500/20 bg-ink-900/50 p-6 sm:p-10 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-parchment-100 text-center">
            How ForeverMemoirs Evolved
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gold-300 font-serif">
                  <th className="pb-3 font-semibold">Aspect</th>
                  <th className="pb-3 font-semibold">ForeverMemoirs 1.0 (2020)</th>
                  <th className="pb-3 font-semibold text-parchment-100">ForeverMemoirs 2.0 (Today)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-parchment-200/70">
                <tr>
                  <td className="py-3 font-medium text-parchment-100">Pricing Entry</td>
                  <td className="py-3 text-parchment-200/50">$1,375 minimum</td>
                  <td className="py-3 text-gold-300 font-semibold">$49 photo rescue / $149 shoebox</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-parchment-100">Location</td>
                  <td className="py-3 text-parchment-200/50">Los Angeles area only</td>
                  <td className="py-3 text-parchment-100">Anywhere worldwide (Remote Zoom)</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-parchment-100">Production</td>
                  <td className="py-3 text-parchment-200/50">Multi-person camera crew</td>
                  <td className="py-3 text-parchment-100">Intimate 1-on-1 guided remote sessions</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-parchment-100">Delivery Format</td>
                  <td className="py-3 text-parchment-200/50">Physical DVDs &amp; USBs</td>
                  <td className="py-3 text-parchment-100">4K Master Downloads + Private Stream Vault</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-parchment-100">Photo Restoration</td>
                  <td className="py-3 text-parchment-200/50">Hand retouching ($100s/hr)</td>
                  <td className="py-3 text-parchment-100">CodeFormer neural lab + Human Master QC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* The 3 Core Ethics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-ink-950 p-6 space-y-3">
            <span className="font-mono text-gold-400 text-xs font-semibold uppercase tracking-wider">
              Principle 01
            </span>
            <h4 className="font-serif text-lg font-bold text-parchment-100">Never Alter a Face</h4>
            <p className="text-xs text-parchment-200/70 leading-relaxed">
              AI must serve fidelity, never fantasy. We never use generative models that replace ancestral facial structure with generic strangers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-ink-950 p-6 space-y-3">
            <span className="font-mono text-gold-400 text-xs font-semibold uppercase tracking-wider">
              Principle 02
            </span>
            <h4 className="font-serif text-lg font-bold text-parchment-100">Archival Client Rights</h4>
            <p className="text-xs text-parchment-200/70 leading-relaxed">
              Your stories belong exclusively to your bloodline. We never train public neural networks on your uploaded family treasures.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-ink-950 p-6 space-y-3">
            <span className="font-mono text-gold-400 text-xs font-semibold uppercase tracking-wider">
              Principle 03
            </span>
            <h4 className="font-serif text-lg font-bold text-parchment-100">Human Master QC</h4>
            <p className="text-xs text-parchment-200/70 leading-relaxed">
              Every photo and film chapter is examined by experienced documentary eyes before delivery. No automated black box ships unchecked.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-8">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 text-sm font-bold text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/20 active:scale-95"
          >
            <span>Start Your Family Preservation</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
