"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-sol-dark/95 backdrop-blur-md border-b border-sol-border" : "bg-transparent"
        }`}
      >
        {/* Rasta stripe at very top */}
        <div className="rasta-stripe h-[3px]">
          <div style={{ background: "var(--rasta-red)" }} />
          <div style={{ background: "var(--rasta-gold)" }} />
          <div style={{ background: "var(--rasta-green)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-display text-xl font-bold tracking-tight text-white hover:text-rasta-gold transition-colors">
              KING SOL
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-display text-sm uppercase tracking-wider transition-colors ${
                    pathname === link.href ? "text-rasta-gold active" : "text-gray-300 hover:text-rasta-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="snipcart-checkout text-sm text-gray-300 hover:text-rasta-gold transition-colors font-display uppercase tracking-wider flex items-center gap-1">
                Cart (<span className="snipcart-items-count text-rasta-gold font-bold">0</span>)
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-300 hover:text-rasta-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - full screen overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-overlay animate-fade-in-up"
            onClick={closeMenu}
            style={{ animation: "none", opacity: 1 }}
          />
          {/* Panel sliding in from right */}
          <div className="mobile-menu-panel animate-slide-in-right">
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="self-end text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center mb-8"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Links */}
            <div className="space-y-6 flex-1">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block font-display text-3xl font-bold uppercase tracking-wider min-h-[44px] flex items-center transition-all duration-200 ${
                    pathname === link.href
                      ? "gradient-text"
                      : "text-gray-300 hover:text-rasta-gold"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={closeMenu}
                className="snipcart-checkout block font-display text-3xl font-bold uppercase tracking-wider text-gray-300 hover:text-rasta-gold min-h-[44px] flex items-center transition-all duration-200"
              >
                Cart (<span className="snipcart-items-count text-rasta-gold">0</span>)
              </button>
            </div>

            {/* Rasta stripe at bottom of panel */}
            <div className="rasta-stripe h-[3px] mt-auto rounded-full overflow-hidden">
              <div style={{ background: "var(--rasta-red)" }} />
              <div style={{ background: "var(--rasta-gold)" }} />
              <div style={{ background: "var(--rasta-green)" }} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
