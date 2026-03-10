"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#music", label: "Music" },
  { href: "/#shows", label: "Shows" },
  { href: "/#shop", label: "Shop" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 200) {
          current = s.getAttribute("id") || "hero";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <nav
      className={`fixed top-1 left-0 right-0 z-[1000] border-b transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,5,5,0.97)] border-white/5"
          : "bg-[rgba(10,10,10,0.92)] border-white/5"
      } backdrop-blur-[20px]`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="font-display text-[1.1rem] tracking-[1px] text-sol-gold flex items-center gap-2.5">
          <span className="text-[1.4rem]">&#x1F451;</span>
          KING SOL & THE VIBES
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("/#", "");
            const isActive = pathname === "/" && activeSection === sectionId;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-[0.85rem] font-medium tracking-[1.5px] uppercase relative transition-colors duration-300
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-sol-gold after:transition-[width] after:duration-300
                    ${isActive
                      ? "text-sol-gold after:w-full"
                      : "text-[#888] hover:text-[#f0f0f0] after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: cart + hamburger */}
        <div className="flex items-center gap-3">
          <button
            className="snipcart-checkout relative text-[#f0f0f0] text-[1.2rem] p-2 hover:text-sol-gold transition-colors"
            aria-label="Open Cart"
          >
            &#x1F6D2;
            <span className="snipcart-items-count absolute top-0 right-0 bg-rasta-red text-white text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`w-6 h-[2px] bg-[#f0f0f0] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-[#f0f0f0] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-[#f0f0f0] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-[rgba(5,5,5,0.98)] border-b border-sol-border">
          <ul className="flex flex-col gap-5 p-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[0.85rem] font-medium tracking-[1.5px] uppercase text-[#888] hover:text-[#f0f0f0] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
