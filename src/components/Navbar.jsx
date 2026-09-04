import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Radio } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Geology', href: '#geology' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Climate', href: '#climate' },
    { name: 'Manifesto', href: '#philosophy' },
    { name: 'Protocol', href: '#protocol' },
    { name: 'Archives', href: '#archives' },
    { name: 'Tiers', href: '#expeditions' },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-2.5 sm:px-4 pt-2.5 sm:pt-4 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 max-w-5xl w-full ${
            scrolled
              ? 'bg-[#0A0C16]/90 backdrop-blur-2xl border border-plasma/30 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.9),0_0_20px_0_rgba(123,97,255,0.15)] text-ghost'
              : 'bg-[#07080F]/60 backdrop-blur-xl border border-white/10 text-ghost/90'
          }`}
        >
          {/* Brand Logo & Identifier in single clean horizontal alignment */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none shrink-0"
          >
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-void-800 border border-plasma/40 flex items-center justify-center p-0.5 sm:p-1 group-hover:border-ember transition-colors shrink-0">
              <img
                src="/logo.png"
                alt="Zorath Planetary Crest"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,87,34,0.6)] group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-ember font-bold text-xs">
                Z
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans font-bold tracking-wider text-sm sm:text-lg text-white group-hover:text-ember transition-colors whitespace-nowrap">
                ZORATH
              </span>
              <span className="inline-flex items-center text-[9px] sm:text-[10px] font-mono font-medium tracking-widest text-plasma bg-plasma/10 border border-plasma/30 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                PR-04
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-void-200 hover:text-white rounded-full hover:bg-white/[0.08] transition-all whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="btn-magnetic bg-ember hover:bg-ember-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_28px_rgba(255,87,34,0.7)] flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              <span className="btn-slide-layer bg-gradient-to-r from-plasma to-ember"></span>
              <span className="btn-content flex items-center gap-1 sm:gap-1.5">
                <span className="hidden sm:inline">Book Expedition</span>
                <span className="sm:hidden">Book</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-void-100 hover:text-white rounded-full hover:bg-white/10 focus:outline-none transition-colors shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080F]/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8 lg:hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Top close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-void-800 border border-white/10 text-white hover:text-ember transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-5 text-center w-full max-w-sm">
            <span className="font-mono text-xs tracking-widest text-plasma uppercase mb-2 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-plasma animate-pulse" />
              Interstellar Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-ghost hover:text-ember transition-colors py-1 w-full text-center border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-magnetic bg-ember text-white px-8 py-3.5 rounded-full text-sm font-semibold mt-4 shadow-lg shadow-ember/30 w-full"
            >
              Book an Expedition
            </button>
          </div>
        </div>
      )}
    </>
  );
}
