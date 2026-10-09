"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface TierOption {
  id: string;
  name: string;
  price: string;
  unit: string;
  turnaround: string;
  badge?: string;
  desc: string;
}

const TIERS: TierOption[] = [
  {
    id: "rescue",
    name: "Memory Rescue",
    price: "$49",
    unit: "per photo",
    turnaround: "48 Hours",
    badge: "Front Door",
    desc: "Single photo archival restoration with facial fidelity preservation.",
  },
  {
    id: "shoebox",
    name: "The Shoebox",
    price: "$149",
    unit: "package",
    turnaround: "3 to 4 Days",
    badge: "Most Popular",
    desc: "5 photos restored + 60-second video tribute with original acoustic music.",
  },
  {
    id: "memoir",
    name: "The Memoir Film",
    price: "$997",
    unit: "one-time",
    turnaround: "2 Weeks",
    badge: "Documentary",
    desc: "Guided remote Zoom oral history interview, 10–15 min film, 25 restored photos.",
  },
  {
    id: "biography",
    name: "The Biography",
    price: "$2,997",
    unit: "one-time",
    turnaround: "3 to 4 Weeks",
    badge: "Archival Legacy",
    desc: "Multi-session family interviews, full archival treatment, 25–35 min definitive film.",
  },
  {
    id: "lifecharts",
    name: "LifeCharts 2.0",
    price: "$297",
    unit: "per year",
    turnaround: "Annual Cut",
    desc: "Annual family video diary vault with year-end cinematic documentary cut.",
  },
];

function OrderContent() {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier") || "rescue";

  const [selectedTier, setSelectedTier] = useState<string>(initialTier);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  useEffect(() => {
    const tierParam = searchParams.get("tier");
    if (tierParam && TIERS.some((t) => t.id === tierParam)) {
      setSelectedTier(tierParam);
    }
  }, [searchParams]);

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[0];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles(Array.from(files));
    setFileCount(files.length);
    const urls: string[] = [];
    const maxPreviews = Math.min(files.length, 3);
    for (let i = 0; i < maxPreviews; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setPreviewImages(urls);
  }

  // Uploads each file straight to R2 via a presigned URL. Returns the
  // storage keys, [] when uploads aren't configured yet (metadata-only
  // mode), or null when an upload failed and the order should not submit.
  async function uploadFiles(files: File[]): Promise<string[] | null> {
    const keys: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      setUploadProgress(`Uploading photo ${i + 1} of ${files.length}\u2026`);
      let presign: Response;
      try {
        presign = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: f.name, contentType: f.type, size: f.size }),
        });
      } catch {
        setUploadProgress(null);
        return null;
      }
      if (presign.status === 503) {
        // Storage not configured yet — fall back to metadata-only.
        setUploadProgress(null);
        return [];
      }
      if (!presign.ok) {
        setUploadProgress(null);
        return null;
      }
      const { uploadUrl, key } = await presign.json();
      try {
        const put = await fetch(uploadUrl, {
          method: "PUT",
          body: f,
          headers: { "Content-Type": f.type },
        });
        if (!put.ok) {
          setUploadProgress(null);
          return null;
        }
      } catch {
        setUploadProgress(null);
        return null;
      }
      keys.push(key);
    }
    setUploadProgress(null);
    return keys;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);

    // Secure upload first: photo bytes go straight to R2, never through us.
    const photoKeys = await uploadFiles(selectedFiles);
    if (photoKeys === null) {
      setStatus("error");
      return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      tier: selectedTier,
      notes: formData.get("notes"),
      fileCount: fileCount,
      photoKeys,
      // Legal consent flags — Launch Document Section B items 8 & 9. The
      // checkboxes above are `required`, so reaching this point means the
      // customer explicitly agreed. These flags are sent so the API can log
      // them; see the TODO in src/app/api/order/route.ts about persisting
      // them as proper columns.
      agreedToTerms: formData.get("agreedToTerms") === "on",
      confirmedPhotoRights: formData.get("confirmedPhotoRights") === "on",
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/20 border-2 border-gold-400 text-gold-300 mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-gold-300">
          Order Received
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-parchment-100">
          Your story is in master hands.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-parchment-200/80 leading-relaxed">
          Thank you for trusting ForeverMemoirs. We have received your order for{" "}
          <strong className="text-gold-300 font-semibold">{activeTier.name} ({activeTier.price})</strong>.
          Our archival director will reach out within 24 hours with your secure upload vault link and 48-hour delivery timeline.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-ink-950 p-6 max-w-md mx-auto text-left text-xs text-parchment-200/70 space-y-2">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Package Selected</span>
            <span className="text-parchment-100 font-medium">{activeTier.name}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Estimated Turnaround</span>
            <span className="text-parchment-100 font-medium">{activeTier.turnaround}</span>
          </div>
          <div className="flex justify-between pt-1 text-gold-300 font-semibold">
            <span>Satisfaction Guarantee</span>
            <span>100% Love It or $0</span>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-ink-950 hover:brightness-110 shadow-lg shadow-gold-500/20"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20 film-grain">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-radial-gold opacity-15 pointer-events-none" />

      <div className="relative z-10 text-center space-y-3 mb-12">
        <span className="inline-block rounded-full border border-gold-500/30 bg-ink-900/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          Archival Commission
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment-100 tracking-tight">
          Preserve Your Family&apos;s Heritage
        </h1>
        <p className="text-sm sm:text-base text-parchment-200/70 max-w-xl mx-auto">
          Start with a single $49 photograph restoration or commission a complete documentary film.
          Backed by our Love It Or $0 pledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-ink-950/80 p-6 sm:p-8 space-y-6">
            {/* Step 1: Tier Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                1. Select Your Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      selectedTier === tier.id
                        ? "border-gold-400 bg-gold-500/10 text-parchment-100 shadow-md shadow-gold-500/10 ring-1 ring-gold-400/50"
                        : "border-white/10 bg-ink-900/50 text-parchment-200/70 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold text-parchment-100">{tier.name}</span>
                      <span className="font-mono text-xs font-bold text-gold-300">{tier.price}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-parchment-200/60 leading-tight">
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                2. Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-parchment-200/70 mb-1">Your Full Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Eleanor Vance"
                    className="w-full rounded-xl border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-parchment-200/70 mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    className="w-full rounded-xl border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Photo Upload or Scan Preview */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                  3. Upload Your Photos
                </label>
                <span className="text-[11px] text-parchment-200/40">You can also email scans later</span>
              </div>
              <div className="relative rounded-2xl border-2 border-dashed border-white/15 hover:border-gold-500/40 transition-colors bg-ink-900/40 p-6 text-center group cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-xs text-parchment-100 font-medium">
                    {fileCount > 0
                      ? `${fileCount} photo${fileCount > 1 ? "s" : ""} selected`
                      : "Drag & drop your vintage photos or click to browse"}
                  </div>
                  <p className="text-[11px] text-parchment-200/50">
                    JPG, PNG, TIFF, or phone snapshots up to 50MB
                  </p>
                </div>
              </div>

              {/* Thumbnails preview */}
              {previewImages.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {previewImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Upload preview"
                      className="h-14 w-14 rounded-lg object-cover border border-gold-500/30"
                    />
                  ))}
                  {fileCount > 3 && (
                    <div className="h-14 w-14 rounded-lg bg-ink-900 border border-white/10 flex items-center justify-center text-xs text-parchment-200/60 font-mono">
                      +{fileCount - 3}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Step 4: Story & Preservation Notes */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                4. Family Story &amp; Damage Details
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Tell us about the people pictured, approximate decade (e.g. 1940s), damage notes (crease across grandfather's forehead, faded sepia), or any specific instructions..."
                className="w-full rounded-xl border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-parchment-100 placeholder:text-parchment-200/30 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 leading-relaxed"
              />
            </div>

            {/* Step 5: Legal consent — Launch Document Section B items 8 & 9.
                WHY THESE CHECKBOXES EXIST (read before removing or restyling):
                The Terms of Service (/terms) are only enforceable if the customer
                explicitly agrees to them at order time — this is "clickwrap"
                consent, and it is what makes the photo-rights warranty
                (Terms Section 2: customer warrants they own the photo) binding.
                Checkbox 1 = agreement to Terms + Privacy Policy (item 8).
                Checkbox 2 = photo ownership/rights warranty (item 9) — the
                copyright shield. Without it, the business is liable for
                restoring photos the customer had no right to touch.
                Both are required: native `required` blocks submission until
                checked. The API route logs both flags; a future schema migration
                should persist them as columns on the orders table (see the
                TODO in src/app/api/order/route.ts). */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                5. Your Agreement
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-xs text-parchment-200/70 leading-relaxed">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4a017]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-gold-300 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-gold-300 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-xs text-parchment-200/70 leading-relaxed">
                <input
                  type="checkbox"
                  name="confirmedPhotoRights"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4a017]"
                />
                <span>
                  I confirm I own these photos or have the right to have them restored
                  and used in the work I am commissioning.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 py-4 text-sm font-bold text-ink-950 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-gold-500/20 active:scale-95 disabled:opacity-50"
              >
                {status === "sending" ? "Submitting Commission..." : `Commission ${activeTier.name} — ${activeTier.price}`}
              </button>

              {uploadProgress && (
                <p className="text-center text-xs text-gold-300 animate-pulse">
                  {uploadProgress}
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-xs text-red-400">
                  There was an issue submitting your request &mdash; your photos may not have
                  uploaded. Please try again or reach out to support.
                </p>
              )}

              <p className="text-center text-[11px] text-parchment-200/40">
                🔒 No upfront payment required until our restorer confirms your file. Love it or pay $0.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary & Trust Guarantee */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-gold-500/30 bg-ink-950/90 p-6 sm:p-7 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg font-bold text-parchment-100">Commission Summary</h3>
              <span className="rounded-full bg-gold-500/20 border border-gold-500/30 px-2.5 py-0.5 text-[10px] font-mono text-gold-300">
                {activeTier.turnaround}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-serif text-xl font-bold text-parchment-100">{activeTier.name}</div>
                  <div className="text-xs text-parchment-200/60">{activeTier.desc}</div>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-gold-300">{activeTier.price}</span>
                  <div className="text-[10px] text-parchment-200/40">/{activeTier.unit}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs text-parchment-200/70">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>CodeFormer facial preservation check</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Real-ESRGAN texture &amp; grain reconstruction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Personal review by human master restorer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>4K Ultra-HD master download file</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>100% private: Never used for AI training</span>
              </div>
            </div>

            {/* Zero Risk Guarantee Seal */}
            <div className="rounded-2xl border border-gold-500/20 bg-gold-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-gold-300 font-semibold text-xs">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z" clipRule="evenodd" />
                </svg>
                <span>The ForeverMemoirs Pledge</span>
              </div>
              <p className="text-[11px] text-parchment-200/70 leading-relaxed">
                If our restoration doesn&apos;t bring tears to your eyes or meet your expectations,
                you do not pay. No questions, no arguments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Order() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-parchment-200">Loading order form...</div>}>
      <OrderContent />
    </Suspense>
  );
}
