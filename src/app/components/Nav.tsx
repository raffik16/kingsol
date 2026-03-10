"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sol-dark/95 backdrop-blur-md border-b border-sol-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-white hover:text-sol-gold transition-colors">
            KING SOL
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm uppercase tracking-wider transition-colors ${
                  pathname === link.href ? "text-sol-gold" : "text-gray-300 hover:text-sol-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="snipcart-checkout text-sm text-gray-300 hover:text-sol-gold transition-colors font-display uppercase tracking-wider">
              Cart (<span className="snipcart-items-count">0</span>)
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-sol-border mt-2 pt-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-display text-sm uppercase tracking-wider ${
                  pathname === link.href ? "text-sol-gold" : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="snipcart-checkout block text-sm text-gray-300 font-display uppercase tracking-wider">
              Cart (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
