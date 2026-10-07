"use client";

import { useState } from "react";
import Link from "next/link";

export function TrustAndFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I send my photo? Do I need an expensive scanner?",
      a: "No scanner needed! Simply lay your photograph flat in gentle, indirect room lighting and take a clear, high-resolution photo with your smartphone camera. Make sure there is no harsh flash glare. Our restoration models work with phone captures just as easily as professional flatbed scans.",
    },
    {
      q: "Will AI alter my loved one's actual face or expression?",
      a: "Never. Generic consumer AI filters often hallucinate features and turn faces into plastic caricatures. We specifically use CodeFormer with strict fidelity weights and run every single frame through human quality control. If an ancestor had a gentle dimple or a unique eyelid fold, it stays intact.",
    },
    {
      q: "How does the remote Zoom interview work for Memoir Films?",
      a: "No film crew in your living room. We send an easy-to-use, one-click Zoom link and pair your family member with an empathetic, broadcast-trained documentary producer. We guide them through conversation prompts about their childhood, love, trials, and legacy. You can join or listen in.",
    },
    {
      q: "What if my photo is too damaged to be restored?",
      a: "We stand by our Zero-Risk Guarantee: Love it, or you don't pay. If a photograph has suffered total emulsion loss or cannot be reconstructed to our heirloom standard, we will inform you right away and issue an immediate 100% refund.",
    },
    {
      q: "Who owns the copyright and archive rights?",
      a: "You and your family own 100% of the rights to every film and photograph, perpetually. We will never license, broadcast, or display your family's personal materials publicly without explicit written consent.",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Trust Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="rounded-2xl border border-gold-500/20 bg-ink-950 p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-bold text-parchment-100">Love It Or $0 Guarantee</h3>
          <p className="text-xs text-parchment-200/60 leading-relaxed">
            If our restoration doesn&apos;t move you to tears or meet your exacting standards, you owe us nothing.
          </p>
        </div>

        <div className="rounded-2xl border border-gold-500/20 bg-ink-950 p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-bold text-parchment-100">Vault-Grade Privacy</h3>
          <p className="text-xs text-parchment-200/60 leading-relaxed">
            Your family photos are processed in isolated local environments and never uploaded to public AI training datasets.
          </p>
        </div>

        <div className="rounded-2xl border border-gold-500/20 bg-ink-950 p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-bold text-parchment-100">48-Hour Turnaround</h3>
          <p className="text-xs text-parchment-200/60 leading-relaxed">
            Fast delivery of high-resolution archival masters ready for instant framing, gifting, or family sharing.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-3xl border border-white/10 bg-ink-950/70 p-6 sm:p-10">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            Questions &amp; Clarifications
          </span>
          <h2 className="font-serif text-3xl font-bold text-parchment-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-white/5 space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="pt-4 pb-2">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-parchment-100 group-hover:text-gold-300 transition-colors">
                    {faq.q}
                  </span>
                  <span className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-parchment-200/70 leading-relaxed pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center pt-8 border-t border-white/5">
          <p className="text-sm text-parchment-200/70">
            Have a custom archival collection or fragile glass negatives?
          </p>
          <Link
            href="/order"
            className="mt-3 inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 underline font-medium"
          >
            <span>Inquire with our archival restorer</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
