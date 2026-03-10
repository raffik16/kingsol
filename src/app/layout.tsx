import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "King Sol & the Vibes | Reggae. Cumbia. Soul. Fire.",
  description: "LA-based reggae/ska/cumbia band. High-energy Latin rock — listen, shop merch, and catch us live at Reggae Sunday and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css" />
      </head>
      <body className="font-body bg-sol-dark text-gray-200 min-h-screen">
        <Nav />
        <main className="page-enter">{children}</main>

        {/* Footer */}
        <footer className="border-t border-sol-border bg-sol-dark relative">
          {/* Rasta stripe */}
          <div className="rasta-stripe h-[3px]">
            <div style={{ background: "var(--rasta-red)" }} />
            <div style={{ background: "var(--rasta-gold)" }} />
            <div style={{ background: "var(--rasta-green)" }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">KING SOL & THE VIBES</h3>
                <p className="font-accent text-rasta-gold text-lg mb-2">Reggae. Cumbia. Soul. Fire.</p>
                <p className="text-gray-500 text-sm">Los Angeles, CA</p>
              </div>
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-gray-400 mb-4">Navigate</h4>
                <div className="space-y-2">
                  <Link href="/" className="block text-gray-500 hover:text-rasta-gold text-sm transition-colors">Home</Link>
                  <Link href="/about" className="block text-gray-500 hover:text-rasta-gold text-sm transition-colors">About</Link>
                  <Link href="/shop" className="block text-gray-500 hover:text-rasta-gold text-sm transition-colors">Shop</Link>
                  <Link href="/contact" className="block text-gray-500 hover:text-rasta-gold text-sm transition-colors">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-gray-400 mb-4">Connect</h4>
                <div className="flex gap-4">
                  {/* Spotify */}
                  <a href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT" target="_blank" rel="noopener" className="text-gray-500 hover:text-rasta-green transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-500 hover:text-rasta-red transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-500 hover:text-rasta-gold transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* TikTok */}
                  <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-500 hover:text-rasta-green transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  </a>
                  {/* Apple Music */}
                  <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-500 hover:text-rasta-red transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.104 1.594-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.335-2.22-1.163-.4-.786-.196-1.81.556-2.348.376-.27.81-.41 1.263-.49.39-.07.783-.12 1.174-.18.39-.058.7-.225.87-.596.06-.13.09-.276.09-.42V8.89c0-.317-.076-.397-.39-.345l-4.66.874c-.026.005-.05.013-.076.02-.243.065-.324.163-.338.41-.003.06 0 .12 0 .18v7.22c0 .404-.048.803-.215 1.178-.27.605-.74.997-1.378 1.192-.336.104-.683.16-1.037.182-.986.06-1.864-.283-2.312-1.143-.426-.82-.18-1.878.63-2.432.37-.254.793-.39 1.23-.464.418-.07.837-.128 1.254-.19.36-.053.657-.2.834-.54.08-.153.12-.322.12-.49V7.254c0-.253.024-.503.1-.746.127-.41.42-.642.827-.727.192-.04.387-.07.58-.1l5.1-.94c.3-.055.603-.107.907-.145.258-.032.39.06.425.32.01.078.014.158.014.236v5.073z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-sol-border mt-8 pt-8 text-center text-gray-600 text-sm">
              © 2026 King Sol & the Vibes. All rights reserved.
            </div>
          </div>
        </footer>

        <div hidden id="snipcart" data-api-key="YOUR_SNIPCART_API_KEY"></div>
        <Script src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
