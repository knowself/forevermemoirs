import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, Footer, MobileCTA } from "../components/chrome";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ForeverMemoirs 2.0 — No Life Story Should Go Untold",
  description:
    "A&E Biography-style personal documentary films and museum-grade photograph restoration. Rebuilt from Hermosa Beach on a next-generation remote and AI pipeline.",
  keywords: [
    "photo restoration",
    "family memoir film",
    "personal documentary",
    "GFPGAN restoration",
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

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ForeverMemoirs",
  description:
    "A&E Biography-style personal documentary films and museum-grade photograph restoration. Rebuilt from Hermosa Beach on a next-generation remote and AI pipeline.",
  url: "https://www.forevermemoirs.com",
  telephone: "+1-310-379-9822",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1904 Big Valley Road, Suite 143",
    addressLocality: "Finley",
    addressRegion: "CA",
    postalCode: "95435",
    addressCountry: "US",
  },
  areaServed: "Lake County, California",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-ink-950 text-parchment-100 min-h-screen flex flex-col selection:bg-gold-500/30 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTA />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
      </body>
    </html>
  );
}
