"use client";
import { useState } from "react";

export default function Order() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
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
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-serif text-4xl">Thank you.</h1>
        <p className="mt-4 text-ink/70">
          Your restoration request is in. We&apos;ll email you within 24 hours with
          upload instructions and your 48-hour delivery window.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-serif text-4xl">Restore a photo</h1>
      <p className="mt-3 text-ink/70">
        $49 per photo. 48-hour turnaround. Love it or you don&apos;t pay.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium">Your name</label>
          <input name="name" required className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Package</label>
          <select name="tier" className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2">
            <option value="rescue">Memory Rescue — $49 (1 photo)</option>
            <option value="shoebox">The Shoebox — $149 (5 photos + video tribute)</option>
            <option value="memoir">The Memoir Film — $997</option>
            <option value="biography">The Biography — $2,997</option>
            <option value="lifecharts">LifeCharts 2.0 — $297/yr</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Tell us about the photo(s)</label>
          <textarea name="notes" rows={4} placeholder="Who's in it, what's damaged, what matters most…"
            className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-2" />
        </div>
        <button type="submit" disabled={status === "sending"}
          className="w-full rounded-full bg-ink py-3 text-parchment hover:bg-gold hover:text-ink disabled:opacity-50">
          {status === "sending" ? "Sending…" : "Start my restoration"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-700">Something went wrong — please try again.</p>
        )}
      </form>
    </div>
  );
}
