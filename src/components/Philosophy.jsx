import React from 'react';
import { Atom } from 'lucide-react';

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative w-full max-w-full py-16 sm:py-24 md:py-32 px-4 sm:px-10 md:px-16 bg-[#07080F] border-y border-white/10 overflow-hidden"
    >
      {/* Decorative Floating Glow Elements */}
      <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-plasma/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-ember/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6 sm:gap-10">
        {/* Section Pill */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5 text-ember animate-spin" />
            Planetary Exploration Manifesto
          </span>
        </div>

        {/* Statement 1: Conventional Paradigm */}
        <div className="max-w-3xl">
          <p className="font-sans text-void-200 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Most interstellar tourism focuses on <span className="text-white font-normal">passive observation</span> from pressurized orbital lounges.
          </p>
        </div>

        {/* Statement 2: Differentiated Vision with unified, luxurious typography */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.25] sm:leading-[1.15] tracking-tight">
            We focus on{' '}
            <span className="font-drama italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-plasma-400 filter drop-shadow-[0_2px_15px_rgba(255,87,34,0.35)]">
              raw planetary exploration,
            </span>{' '}
            stepping onto uncharted ground, and discovering{' '}
            <span className="font-drama italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-cyanGlow to-ember-400 filter drop-shadow-[0_2px_15px_rgba(123,97,255,0.35)]">
              ecosystems untouched by time.
            </span>
          </h2>
        </div>

        {/* Institutional Charter Signature */}
        <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-mono text-void-300">
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-ember to-plasma" />
          <span>MINISTRY OF TRAVEL & TOURISM • CADET COLLEGE SANGHAR CHARTER</span>
        </div>
      </div>
    </section>
  );
}
