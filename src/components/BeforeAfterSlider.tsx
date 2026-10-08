"use client";

import { useState, useRef, useCallback } from "react";

type Pair = {
  id: string;
  label: string;
  sublabel: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

const PAIRS: Pair[] = [
  {
    id: "heirloom",
    label: "The Heirloom Portrait",
    sublabel: "Grandfather & granddaughter, c. 1940s",
    before: "/images/damaged-portrait.jpg",
    after: "/images/restored-portrait.jpg",
    beforeAlt: "Original damaged portrait",
    afterAlt: "Restored portrait",
  },
  {
    id: "grandmother",
    label: "Grandmother & Son",
    sublabel: "Studio portrait, c. 1960s",
    before: "/images/damaged-grandmother-son.jpg",
    after: "/images/restored-grandmother-son.jpg",
    beforeAlt: "Original damaged photo of a grandmother with her son",
    afterAlt: "Restored photo of a grandmother with her son",
  },
  {
    id: "boydog",
    label: "A Boy & His Dog",
    sublabel: "Backyard snapshot, c. 1970s",
    before: "/images/damaged-boy-dog.jpg",
    after: "/images/restored-boy-dog.jpg",
    beforeAlt: "Original damaged photo of a young boy with his dog",
    afterAlt: "Restored photo of a young boy with his dog",
  },
];

function PairSlider({ pair }: { pair: Pair }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-gold-500/30 via-ink-800 to-black shadow-2xl shadow-black/80 border border-gold-500/30">
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink-950 cursor-ew-resize touch-pan-y"
      >
        {/* Restored Layer (Full background layer) */}
        <img
          src={pair.after}
          alt={pair.afterAlt}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

        {/* Damaged Layer (Clipped to sliderPosition) */}
        <div
          className="absolute inset-0 h-full overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={pair.before}
            alt={pair.beforeAlt}
            className="absolute inset-0 h-full max-w-none object-cover"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
            }}
          />
        </div>

        {/* Dividing Gold Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-400 slider-handle-line pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold-300 bg-ink-900/90 text-gold-300 shadow-xl backdrop-blur-md transition-transform duration-150 hover:scale-110 active:scale-95">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
            </svg>
          </div>
        </div>

        {/* Badge: Original / Damaged (Left) */}
        <div
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none transition-opacity duration-200"
          style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
        >
          <div className="rounded-full bg-ink-950/80 px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-amber-200/90 backdrop-blur-md border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="sm:hidden">Original</span>
            <span className="hidden sm:inline">Original (Faded &amp; Scratched)</span>
          </div>
        </div>

        {/* Badge: Restored Master (Right) */}
        <div
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 pointer-events-none transition-opacity duration-200"
          style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
        >
          <div className="rounded-full bg-ink-950/80 px-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-gold-300 backdrop-blur-md border border-gold-500/40 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="sm:hidden">Restored</span>
            <span className="hidden sm:inline">Restored Master (CodeFormer + Human QC)</span>
          </div>
        </div>

        {/* Bottom subtle instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="rounded-full bg-ink-950/70 px-4 py-1 text-[11px] text-parchment-200/70 backdrop-blur-md border border-white/10">
            Drag slider left or right to compare
          </span>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSlider() {
  const [activeId, setActiveId] = useState(PAIRS[0].id);
  const active = PAIRS.find((p) => p.id === activeId) ?? PAIRS[0];

  return (
    <div className="relative mx-auto max-w-4xl select-none">
      {/* Pair switcher */}
      <div className="mb-5 flex gap-2 sm:gap-3 overflow-x-auto pb-1 sm:justify-center" role="tablist" aria-label="Restoration examples">
        {PAIRS.map((pair) => {
          const isActive = pair.id === activeId;
          return (
            <button
              key={pair.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(pair.id)}
              className={`flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-gold-500/60 bg-gold-500/10"
                  : "border-white/10 bg-ink-900/60 hover:border-gold-500/30"
              }`}
            >
              <img
                src={pair.after}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 rounded-lg object-cover pointer-events-none"
              />
              <span className="pr-1">
                <span className={`block text-[13px] font-medium leading-tight ${isActive ? "text-gold-200" : "text-parchment-100"}`}>
                  {pair.label}
                </span>
                <span className="block text-[11px] leading-tight text-parchment-200/50">
                  {pair.sublabel}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <PairSlider key={active.id} pair={active} />

      {/* Technical Lab Metrics Strip */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
          <div className="text-xs text-parchment-200/50 uppercase tracking-widest">Face Fidelity</div>
          <div className="mt-1 font-serif text-lg text-gold-300 font-bold">100% Genuine</div>
          <div className="text-[10px] text-parchment-200/40">Never alters identity</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
          <div className="text-xs text-parchment-200/50 uppercase tracking-widest">Resolution</div>
          <div className="mt-1 font-serif text-lg text-gold-300 font-bold">4K Archival</div>
          <div className="text-[10px] text-parchment-200/40">Real-ESRGAN + CodeFormer</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
          <div className="text-xs text-parchment-200/50 uppercase tracking-widest">Quality Control</div>
          <div className="mt-1 font-serif text-lg text-gold-300 font-bold">Human Master QC</div>
          <div className="text-[10px] text-parchment-200/40">Verified frame by frame</div>
        </div>
        <div className="rounded-xl border border-white/5 bg-ink-900/60 p-3">
          <div className="text-xs text-parchment-200/50 uppercase tracking-widest">Turnaround</div>
          <div className="mt-1 font-serif text-lg text-gold-300 font-bold">48 Hours</div>
          <div className="text-[10px] text-parchment-200/40">Fast digital delivery</div>
        </div>
      </div>
    </div>
  );
}
