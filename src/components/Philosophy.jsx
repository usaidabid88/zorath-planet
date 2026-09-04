import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Atom, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll('.reveal-word');

      gsap.fromTo(
        words,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-32 md:py-44 px-6 sm:px-12 md:px-20 bg-void-950 border-y border-white/10 overflow-hidden"
    >
      {/* Parallax Low-Opacity Sci-Fi Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80"
          alt="Bioluminescent Texture"
          className="w-full h-full object-cover filter contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/85 to-void-950" />
      </div>

      {/* Decorative Floating Glow Elements */}
      <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-plasma/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-ember/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        {/* Section Pill */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-3.5 py-1 rounded-full flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5 text-ember animate-spin" />
            Planetary Exploration Manifesto
          </span>
        </div>

        {/* Statement 1: Conventional Paradigm */}
        <div className="max-w-2xl">
          <p className="font-sans text-void-300 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
            {["Most", "interstellar", "tourism", "focuses", "on:", "passive", "observation", "from", "pressurized", "orbital", "lounges."].map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-1.5">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Statement 2: Differentiated Vision with unified, luxurious typography */}
        <div className="mt-4 pt-8 border-t border-white/10">
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.12] tracking-tight">
            <span className="reveal-word inline-block mr-2 text-white">We</span>
            <span className="reveal-word inline-block mr-2 text-white">focus</span>
            <span className="reveal-word inline-block mr-3 text-white">on:</span>

            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-plasma-400 drop-shadow-[0_2px_20px_rgba(255,87,34,0.35)]">
              <span className="reveal-word inline-block mr-2 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">raw</span>
              <span className="reveal-word inline-block mr-2 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">planetary</span>
              <span className="reveal-word inline-block mr-3 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">exploration,</span>
            </span>

            <span className="reveal-word inline-block mr-2 text-white">stepping</span>
            <span className="reveal-word inline-block mr-2 text-white">onto</span>
            <span className="reveal-word inline-block mr-2 text-white">uncharted</span>
            <span className="reveal-word inline-block mr-3 text-white">ground,</span>
            <span className="reveal-word inline-block mr-2 text-white">and</span>
            <span className="reveal-word inline-block mr-2 text-white">discovering</span>

            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-cyanGlow to-ember-400 drop-shadow-[0_2px_20px_rgba(123,97,255,0.35)]">
              <span className="reveal-word inline-block mr-2 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">ecosystems</span>
              <span className="reveal-word inline-block mr-2 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">untouched</span>
              <span className="reveal-word inline-block mr-2 font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">by</span>
              <span className="reveal-word inline-block font-drama italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl">time.</span>
            </span>
          </h2>
        </div>

        {/* Institutional Charter Signature */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-void-300">
          <div className="w-12 h-0.5 bg-gradient-to-r from-ember to-plasma" />
          <span>MINISTRY OF TRAVEL & TOURISM • CADET COLLEGE SANGHAR CHARTER #2024-Z</span>
        </div>
      </div>
    </section>
  );
}
