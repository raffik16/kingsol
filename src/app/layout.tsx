import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import SpotifyProvider from "./components/SpotifyProvider";
import SpotifyPlaybar from "./components/SpotifyPlaybar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "King Sol & The Vibes | Latin Reggae Rock from Los Angeles",
  description:
    "King Sol & The Vibes — High energy Latin Reggae Rock from Los Angeles. Love, Truth, Freedom.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css" />
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
              &#x1F451; KING SOL & THE VIBES
            </div>
            <div className="italic text-[#888] text-[0.85rem]">
              Love &bull; Truth &bull; Freedom
            </div>
            <div className="text-[0.8rem] text-[#888]">
              &copy; 2026 King Sol & The Vibes. All rights reserved.
            </div>
          </div>
        </footer>

        <SpotifyProvider>
          <SpotifyPlaybar />
        </SpotifyProvider>

        <div hidden id="snipcart" data-api-key="YOUR_SNIPCART_API_KEY"></div>
        <Script src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
