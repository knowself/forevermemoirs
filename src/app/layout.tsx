import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "../components/chrome";

export const metadata: Metadata = {
  title: "ForeverMemoirs 2.0 — No Life Story Should Go Untold",
  description:
    "A&E Biography-style personal documentary films and museum-grade photograph restoration. Rebuilt from Hermosa Beach on a next-generation remote and AI pipeline.",
  keywords: [
    "photo restoration",
    "family memoir film",
    "personal documentary",
    "CodeFormer restoration",
    "vintage photo repair",
    "family history archive",
    "Hermosa Beach",
  ],
  openGraph: {
    title: "ForeverMemoirs 2.0 — No Life Story Should Go Untold",
    description:
      "A&E Biography-style personal documentary films and museum-grade photograph restoration.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-ink-950 text-parchment-100 min-h-screen flex flex-col selection:bg-gold-500/30 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
