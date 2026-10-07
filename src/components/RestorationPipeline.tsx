export function RestorationPipeline() {
  const steps = [
    {
      num: "01",
      title: "Capture & Upload",
      badge: "Zero Risk",
      desc: "Take a picture of your old photo using your smartphone or flatbed scanner. Your physical heirloom never leaves your family's hands.",
    },
    {
      num: "02",
      title: "Facial Fidelity Engine",
      badge: "CodeFormer",
      desc: "Our neural network reconstructs facial micro-details and lost expressions using fidelity-first algorithms — preserving the exact soul of the person.",
    },
    {
      num: "03",
      title: "Archival Texture Repair",
      badge: "Real-ESRGAN",
      desc: "Deep texture reconstruction heals paper cracks, water stains, tear lines, and vintage dust while keeping authentic 1940s film grain alive.",
    },
    {
      num: "04",
      title: "Human Master QC",
      badge: "Essential",
      desc: "Every single restoration is personally reviewed by human eyes. AI assists the repair, but our restorers guarantee the face is 100% genuine.",
    },
    {
      num: "05",
      title: "Archival Delivery",
      badge: "48-Hour Turnaround",
      desc: "Delivered directly to your inbox in crystal-clear 4K resolution suitable for large-format gallery printing. Love it or you don't pay.",
    },
  ];

  return (
    <section id="pipeline" className="border-y border-gold-500/15 bg-ink-900/40 py-20 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            The Restoration Science
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-100">
            AI-Assisted Precision. Human Master Craft.
          </h2>
          <p className="text-sm text-parchment-200/70 max-w-2xl mx-auto">
            Traditional restorers take 2 weeks and charge $250+. Generic AI apps distort faces into cartoon mannequins.
            Our Hermosa Beach pipeline solves both.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative rounded-2xl border border-white/10 bg-ink-950/80 p-5 flex flex-col justify-between hover:border-gold-500/40 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-gold-400/50 group-hover:text-gold-300 transition-colors">
                    {s.num}
                  </span>
                  <span className="rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] font-mono text-gold-300 border border-gold-500/20">
                    {s.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-base font-bold text-parchment-100">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-parchment-200/60 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-gold-400 font-medium">
                <span>Step {i + 1} of 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
