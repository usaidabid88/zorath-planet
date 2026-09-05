import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Radio,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  setMuted,
  getMuted,
  playUiClick,
  startAmbientDrone,
  stopAmbientDrone,
} from '../utils/audioSynthesizer';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);

  useEffect(() => {
    setAudioMuted(getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleNavbarAudio = (e) => {
    if (e) e.stopPropagation();
    const nextMuted = !audioMuted;
    setMuted(nextMuted);
    setAudioMuted(nextMuted);
    if (!nextMuted) {
      playUiClick(1120);
      startAmbientDrone();
    } else {
      stopAmbientDrone();
    }
  };

  const navLinks = [
    { name: 'Manifesto', href: '#philosophy' },
    { name: 'Scientific Matrix', href: '#terminal' },
    { name: 'Protocol', href: '#protocol' },
    { name: 'Expeditions', href: '#expeditions' },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-2 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 w-full max-w-full">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 max-w-5xl w-full ${
            scrolled
              ? 'bg-[#0A0C16]/90 backdrop-blur-2xl border border-plasma/30 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.9),0_0_20px_0_rgba(123,97,255,0.15)] text-ghost'
              : 'bg-[#07080F]/70 backdrop-blur-xl border border-white/10 text-ghost/90'
          }`}
        >
          {/* Brand Logo & Identifier */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none shrink-0"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-void-800 border border-plasma/40 flex items-center justify-center p-0.5 sm:p-1 group-hover:border-ember transition-colors shrink-0">
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
              <span className="font-sans font-bold tracking-wider text-sm sm:text-base text-white group-hover:text-ember transition-colors whitespace-nowrap">
                ZORATH
              </span>
              <span className="inline-flex items-center text-[9px] font-mono font-medium tracking-widest text-plasma bg-plasma/10 border border-plasma/30 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                PR-04
              </span>
            </div>
          </a>

          {/* Editorial Desktop Nav Links (Streamlined 4 Sections) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-void-200 hover:text-white rounded-full hover:bg-white/[0.08] transition-all whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs & Audio Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Embedded Audio Pill */}
            <button
              onClick={toggleNavbarAudio}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all text-[11px] font-mono ${
                !audioMuted
                  ? 'bg-cyanGlow/15 border-cyanGlow/40 text-cyanGlow shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                  : 'bg-void-900 border-white/10 text-void-400 hover:text-white'
              }`}
              title={!audioMuted ? 'Mute Procedural Audio' : 'Unmute Procedural Audio'}
            >
              {!audioMuted ? (
                <Volume2 className="w-3.5 h-3.5 text-cyanGlow animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              {/* Equalizer Frequency Bars */}
              <div className="flex items-end gap-[1.5px] h-3 w-4 justify-center overflow-hidden">
                {[40, 80, 60, 95].map((h, i) => (
                  <span
                    key={i}
                    className={`w-[2.5px] rounded-t-sm transition-all duration-150 ${
                      !audioMuted ? (i % 2 === 0 ? 'bg-cyanGlow' : 'bg-plasma') : 'bg-void-600'
                    }`}
                    style={{
                      height: !audioMuted ? `${20 + ((i * 23) % 80)}%` : '20%',
                    }}
                  />
                ))}
              </div>
            </button>

            {/* Book Expedition CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="btn-magnetic bg-ember hover:bg-ember-600 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_28px_rgba(255,87,34,0.7)] flex items-center gap-1 sm:gap-1.5 shrink-0"
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
              className="md:hidden p-1.5 text-void-100 hover:text-white rounded-full hover:bg-white/10 focus:outline-none transition-colors shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#07080F]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 md:hidden animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between w-full pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-void-800 border border-plasma/40 flex items-center justify-center p-0.5">
                <img
                  src="/logo.png"
                  alt="Zorath Planetary Crest"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,87,34,0.6)]"
                />
              </div>
              <span className="font-sans font-bold tracking-wider text-base text-white">ZORATH</span>
              <span className="text-[9px] font-mono font-medium text-plasma bg-plasma/10 border border-plasma/30 px-1.5 py-0.5 rounded-full">
                PR-04
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-void-800 border border-white/10 text-white hover:text-ember transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col items-center gap-4 text-center my-auto w-full max-w-sm mx-auto py-4">
            <span className="font-mono text-[11px] tracking-widest text-plasma uppercase mb-1 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-plasma animate-pulse" />
              Navigation Directives
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-ghost hover:text-ember active:text-ember transition-colors py-2 w-full text-center border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm mx-auto pt-2 space-y-3">
            <button
              onClick={toggleNavbarAudio}
              className="w-full py-3 rounded-full bg-void-900 border border-white/10 text-xs font-mono text-white flex items-center justify-center gap-2"
            >
              {!audioMuted ? <Volume2 className="w-4 h-4 text-cyanGlow" /> : <VolumeX className="w-4 h-4 text-ember" />}
              <span>{!audioMuted ? 'Mission Audio Online' : 'Mission Audio Muted'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-magnetic bg-ember text-white py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-ember/30 w-full flex items-center justify-center gap-2"
            >
              <span>Book an Expedition</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
