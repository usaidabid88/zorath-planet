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
      className="relative w-full max-w-full py-16 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-void-950 border-y border-white/10 overflow-hidden"
    >
      {/* Parallax Low-Opacity Sci-Fi Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=70"
          alt="Bioluminescent Texture"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover filter contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/85 to-void-950" />
      </div>

      {/* Decorative Floating Glow Elements */}
      <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-plasma/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-ember/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Pill */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5 text-ember animate-spin" />
            Planetary Exploration Manifesto
          </span>
        </div>

        {/* Statement 1: Conventional Paradigm */}
        <div className="max-w-2xl">
          <p className="font-sans text-void-300 text-base sm:text-lg md:text-xl font-light leading-relaxed">
            {["Most", "interstellar", "tourism", "focuses", "on:", "passive", "observation", "from", "pressurized", "orbital", "lounges."].map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-1.5">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Statement 2: Differentiated Vision with unified, luxurious typography */}
        <div className="mt-2 pt-6 sm:pt-8 border-t border-white/10">
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] sm:leading-[1.12] tracking-tight">
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">We</span>
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">focus</span>
            <span className="reveal-word inline-block mr-2 sm:mr-3 text-white">on:</span>

            {['raw', 'planetary', 'exploration,'].map((word, i) => (
              <span
                key={i}
                className="reveal-word inline-block mr-1.5 sm:mr-2.5 font-drama italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-plasma-400 filter drop-shadow-[0_2px_15px_rgba(255,87,34,0.35)]"
              >
                {word}
              </span>
            ))}

            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">stepping</span>
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">onto</span>
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">uncharted</span>
            <span className="reveal-word inline-block mr-2 sm:mr-3 text-white">ground,</span>
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">and</span>
            <span className="reveal-word inline-block mr-1.5 sm:mr-2 text-white">discovering</span>

            {['ecosystems', 'untouched', 'by', 'time.'].map((word, i) => (
              <span
                key={i}
                className="reveal-word inline-block mr-1.5 sm:mr-2.5 font-drama italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-cyanGlow to-ember-400 filter drop-shadow-[0_2px_15px_rgba(123,97,255,0.35)]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Institutional Charter Signature */}
        <div className="mt-4 sm:mt-8 flex flex-wrap items-center gap-3 text-[10px] sm:text-xs font-mono text-void-300">
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-ember to-plasma" />
          <span>MINISTRY OF TRAVEL & TOURISM • CADET COLLEGE SANGHAR CHARTER</span>
        </div>
      </div>
    </section>
  );
}
