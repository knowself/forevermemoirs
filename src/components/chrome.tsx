"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl shadow-black/50"
          : "bg-transparent border-b border-white/5 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="relative overflow-hidden rounded-full border border-gold-500/40 p-0.5 shadow-md shadow-gold-500/10 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/logo.jpg"
              alt="ForeverMemoirs"
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-tight text-parchment-100 font-bold group-hover:text-gold-300 transition-colors">
                ForeverMemoirs
              </span>
              <span className="hidden sm:inline-block rounded-full bg-gold-500/15 border border-gold-500/30 px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase text-gold-300">
                2.0
              </span>
            </div>
            <span className="hidden min-[420px]:block text-[10px] uppercase tracking-widest text-parchment-200/50">
              Hermosa Beach, CA • Est. 2020
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-8 text-sm">
          <Link
            href="/#restoration"
            className="hidden md:inline-block text-parchment-200/80 hover:text-gold-300 transition-colors"
          >
            Photo Lab
          </Link>
          <Link
            href="/#tiers"
            className="hidden md:inline-block text-parchment-200/80 hover:text-gold-300 transition-colors"
          >
            Offer Ladder
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${
              pathname === "/about"
                ? "text-gold-300 font-medium"
                : "text-parchment-200/80 hover:text-gold-300"
            }`}
          >
            Our Story
          </Link>
          <Link
            href="/order"
            className="relative group overflow-hidden rounded-full px-3 py-1.5 sm:px-5 sm:py-2 min-h-[44px] inline-flex items-center text-[11px] sm:text-xs font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 transition-all duration-300 group-hover:brightness-110" />
            <span className="relative text-ink-950 font-semibold flex items-center gap-1.5">
              <span>Restore a Photo</span>
              <span className="text-[11px] opacity-75 font-normal">($49)</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function MobileCTA() {
  const pathname = usePathname();
  // Don't cover the order form's own submit button
  if (pathname === "/order") return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="border-t border-gold-500/25 bg-ink-950/90 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/order"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-sm font-bold text-ink-950 shadow-lg shadow-gold-500/25 active:scale-[0.98]"
        >
          <span>Restore a Photo</span>
          <span className="rounded-full bg-ink-950/20 px-2 py-0.5 font-mono text-xs">$49</span>
        </Link>
        <p className="mt-1.5 text-center text-[10px] text-parchment-200/50">
          48-hour turnaround • Love it or $0
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gold-500/15 bg-ink-950 text-parchment-200/70 overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-radial-gold pointer-events-none opacity-40" />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-28 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="ForeverMemoirs"
                className="h-10 w-10 rounded-full border border-gold-500/40 object-cover"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-parchment-100">
                ForeverMemoirs
              </span>
            </div>
            <p className="font-serif italic text-gold-300/90 text-lg">
              &ldquo;No life story should go untold.&rdquo;
            </p>
            <p className="text-sm leading-relaxed text-parchment-200/60 max-w-sm">
              Archival family documentary films and AI-assisted photo restoration.
              Preserving voices, faces, and generational memories with uncompromising human craft.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-parchment-200/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hermosa Beach, California • Remote Worldwide</span>
            </div>
          </div>

          {/* Offer Ladder Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm tracking-wider uppercase text-gold-300/80 font-semibold">
              The Offer Ladder
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/order?tier=rescue" className="hover:text-gold-300 transition-colors flex items-center justify-between group">
                  <span>Memory Rescue (Single Photo)</span>
                  <span className="text-gold-400 text-xs font-mono group-hover:underline">$49</span>
                </Link>
              </li>
              <li>
                <Link href="/order?tier=shoebox" className="hover:text-gold-300 transition-colors flex items-center justify-between group">
                  <span>The Shoebox (5 Photos + Video Tribute)</span>
                  <span className="text-gold-400 text-xs font-mono group-hover:underline">$149</span>
                </Link>
              </li>
              <li>
                <Link href="/order?tier=memoir" className="hover:text-gold-300 transition-colors flex items-center justify-between group">
                  <span>The Memoir Film (Interviews + Archive)</span>
                  <span className="text-gold-400 text-xs font-mono group-hover:underline">$997</span>
                </Link>
              </li>
              <li>
                <Link href="/order?tier=biography" className="hover:text-gold-300 transition-colors flex items-center justify-between group">
                  <span>The Biography (Full Archival Treatment)</span>
                  <span className="text-gold-400 text-xs font-mono group-hover:underline">$2,997</span>
                </Link>
              </li>
              <li>
                <Link href="/order?tier=lifecharts" className="hover:text-gold-300 transition-colors flex items-center justify-between group">
                  <span>LifeCharts 2.0 (Annual Video Diary)</span>
                  <span className="text-gold-400 text-xs font-mono group-hover:underline">$297/yr</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Archival Pledge Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm tracking-wider uppercase text-gold-300/80 font-semibold">
              The Archival Pledge
            </h4>
            <div className="rounded-xl border border-gold-500/20 bg-ink-900/60 p-4 text-xs leading-relaxed text-parchment-200/70 space-y-2">
              <p className="font-medium text-parchment-100 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                100% Client Ownership
              </p>
              <p>
                Your family&apos;s memories never train external public models. Every restoration passes human QC so faces remain genuine.
              </p>
              <p className="text-gold-400/90 font-medium pt-1">
                48-Hour Turnaround • Love it or $0
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-parchment-200/40">
          <p>© {new Date().getFullYear()} ForeverMemoirs LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gold-300 transition-colors">Origins & Heritage</Link>
            <Link href="/order" className="hover:text-gold-300 transition-colors">Start Order</Link>
            <span>Hermosa Beach, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
