import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Nav from "./components/Nav";
import { baseOpenGraph, siteUrl } from "./site";

// Fonts are self-hosted at build time so the hero heading (the page's LCP element) never
// waits on a render-blocking stylesheet from Google. Tailwind's font-* utilities read these variables.
// Dela Gothic One is the Google Fonts Latin subset (OFL): next/font/google would add a
// @font-face rule for each of its ~120 Japanese subsets, growing the page CSS eightfold.
const displayFont = localFont({ src: "./fonts/DelaGothicOne-latin.woff2", weight: "400", variable: "--font-display" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
// Only the italic "&" in the hero heading uses this.
const accentFont = Playfair_Display({ weight: "700", style: "italic", subsets: ["latin"], variable: "--font-accent" });

const description =
  "King Sol & The Vibes — High energy Latin Reggae Rock from Los Angeles. Love, Truth, Freedom.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "King Sol & The Vibes | Latin Reggae Rock, Los Angeles",
    template: "%s | King Sol & The Vibes",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} ${accentFont.variable}`}
    >
      <head>
        {/* FadeIn content starts hidden until JS reveals it; show it outright without JS. */}
        <noscript>
          <style>{`.fade-in { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="font-body bg-sol-dark text-[#f0f0f0] min-h-screen">
        {/* Rasta top bar */}
        <div className="rasta-bar" />

        <Nav />
        <main>{children}</main>

        {/* Footer */}
        <div className="rasta-divider" />
        <footer className="py-[60px] px-6 bg-sol-darker border-t border-sol-border">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="font-display text-[0.9rem] text-sol-gold">
              KING SOL & THE VIBES
            </div>
            <div className="italic text-[#888] text-[0.85rem]">
              Love &bull; Truth &bull; Freedom
            </div>
            <div className="text-[0.8rem] text-[#888]">
              &copy; 2026 King Sol & The Vibes. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
      <GoogleAnalytics gaId="G-KT67XCRWEC" />
    </html>
  );
}
