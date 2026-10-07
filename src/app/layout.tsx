import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "../components/chrome";

export const metadata: Metadata = {
  title: "ForeverMemoirs — No Life Story Should Go Untold",
  description:
    "AI-assisted memoir films and photo restoration. From a $49 photo rescue to a complete life-story film, produced remotely.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
