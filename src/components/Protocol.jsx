import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Orbit, Scan, Activity, ArrowRight, ShieldCheck, Cpu, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   ANIMATION 1: Rotating Geometric Orbital Rings
   ===================================================================== */
function OrbitalRingVisual() {
  return (
    <div className="relative w-full h-64 sm:h-80 flex items-center justify-center overflow-hidden">
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Core Planet */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-ember-600 via-plasma-500 to-cyanGlow shadow-[0_0_35px_rgba(255,87,34,0.6)] animate-pulse" />

        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border-2 border-plasma/40 animate-[spin_20s_linear_infinite] [transform:rotateX(60deg)_rotateY(20deg)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyanGlow rounded-full shadow-[0_0_12px_#00F0FF]" />
        </div>

        {/* Ring 2 */}
        <div className="absolute inset-4 rounded-full border border-dashed border-ember/50 animate-[spin_15s_linear_infinite_reverse] [transform:rotateX(-45deg)_rotateY(30deg)]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-ember rounded-full shadow-[0_0_10px_#FF5722]" />
        </div>

        {/* Ring 3 */}
        <div className="absolute inset-8 rounded-full border border-white/20 animate-[spin_30s_linear_infinite]" />

        {/* Crosshair Coordinates */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-full h-[1px] bg-cyanGlow" />
          <div className="h-full w-[1px] bg-cyanGlow absolute" />
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   ANIMATION 2: Scanning Laser Line Telemetry Matrix
   ===================================================================== */
function LaserScanVisual() {
  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2rem bg-void-950 border border-white/10 p-4 flex flex-col justify-between overflow-hidden font-mono">
      {/* Grid of Dots */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-3 p-6 opacity-30">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanGlow/60" />
          </div>
        ))}
      </div>

      {/* Sweeping Laser Beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyanGlow to-transparent shadow-[0_0_20px_#00F0FF,0_0_40px_#00F0FF] animate-scanline" />

      {/* Overlay Scan UI */}
      <div className="relative z-10 flex justify-between text-xs text-void-300">
        <span className="text-cyanGlow flex items-center gap-1">
          <Scan className="w-3.5 h-3.5 animate-spin" />
          SENSOR RECEPTOR: ACTIVE
        </span>
        <span>LAT: 44.912°N</span>
      </div>

      <div className="relative z-10 text-center py-6">
        <div className="inline-block px-4 py-2 rounded-xl bg-void-900/90 border border-cyanGlow/40 shadow-xl backdrop-blur-md">
          <div className="text-[10px] text-void-300 mb-0.5">BIO-COMPATIBILITY INDEX</div>
          <div className="text-xl font-bold text-white tracking-widest text-cyanGlow">
            99.984% SYNCHRONIZED
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-between text-[10px] text-void-400">
        <span>THERMAL DEFLECTION: STABLE</span>
        <span>RAD SHIELD: 100%</span>
      </div>
    </div>
  );
}

/* =====================================================================
   ANIMATION 3: Dynamic EKG / Barometric Waveform
   ===================================================================== */
function WaveformVisual() {
  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2rem bg-void-950 border border-white/10 p-5 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-xs font-mono text-void-300 border-b border-white/10 pb-2">
        <span className="text-ember flex items-center gap-1.5 font-bold">
          <Activity className="w-3.5 h-3.5 text-ember animate-pulse" />
          ATMOSPHERIC BAROMETRIC WAVE
        </span>
        <span className="text-plasma">FREQ: 4.88 kHz</span>
      </div>

      {/* SVG Waveform Path with Stroke Dash Animation */}
      <div className="my-auto w-full">
        <svg className="w-full h-28 overflow-visible" viewBox="0 0 500 100" fill="none">
          <path
            d="M 0 50 Q 50 50, 75 50 T 120 50 L 140 10 L 160 90 L 180 30 L 200 70 L 220 50 L 280 50 L 300 15 L 320 85 L 340 35 L 360 65 L 380 50 T 500 50"
            stroke="url(#waveGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_12px_rgba(255,87,34,0.8)]"
            strokeDasharray="600"
            strokeDashoffset="600"
            style={{
              animation: 'dash 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B61FF" />
              <stop offset="50%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10 text-void-300">
        <span>EXPEDITION HOVER SPEED: MACH 1.4</span>
        <span className="text-white font-bold">DEPLOYMENT READY</span>
      </div>

      <style>{`
        @keyframes dash {
          0% { stroke-dashoffset: 600; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }
      `}</style>
    </div>
  );
}

/* =====================================================================
   MAIN PROTOCOL STACKING SECTION
   ===================================================================== */
const protocolSteps = [
  {
    step: '01',
    title: 'Orbital Insertion & Magnetic Shield Synchronization',
    tag: 'TRANSIT PROTOCOL',
    description:
      'Traverse Zorath’s upper thermosphere along synchronized magnetic corridors with adaptive thermal plasma deflection shields.',
    visual: <OrbitalRingVisual />,
    theme: 'border-plasma/30 bg-gradient-to-br from-void-900/90 via-void-900 to-plasma/10',
  },
  {
    step: '02',
    title: 'Bio-Atmospheric Acclimation & Neural Link Sync',
    tag: 'PHYSIOLOGICAL PROTOCOL',
    description:
      'Equip certified neural rebreathers to safely metabolize Zorath’s oxygen-xenon mix and regulate internal barometric balance.',
    visual: <LaserScanVisual />,
    theme: 'border-cyanGlow/30 bg-gradient-to-br from-void-900/90 via-void-900 to-cyanGlow/10',
  },
  {
    step: '03',
    title: 'Surface Terrain Rover & Expedition Deployment',
    tag: 'EXPLORATION PROTOCOL',
    description:
      'Deploy all-terrain hover transports and biological field guides across glowing forests, frozen peaks, and subterranean crystal caverns.',
    visual: <WaveformVisual />,
    theme: 'border-ember/30 bg-gradient-to-br from-void-900/90 via-void-900 to-ember/10',
  },
];

export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          ScrollTrigger.create({
            trigger: nextCard,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.1,
                opacity: 1 - progress * 0.5,
                filter: `blur(${progress * 15}px)`,
                ease: 'none',
                duration: 0.1,
              });
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="protocol"
      ref={containerRef}
      className="relative py-14 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 bg-void-950"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-plasma uppercase bg-plasma/10 border border-plasma/30 px-3 py-1 rounded-full">
            Sticky Stacking Archive
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-white mt-3 sm:mt-4 tracking-tight">
            Interstellar Expedition Protocol
          </h2>
          <p className="text-void-300 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-light">
            A three-phase scientific flight pathway engineered to guide explorers from outer orbital insertion down to planetary soil.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
          {protocolSteps.map((step, idx) => (
            <div
              key={step.step}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`sticky top-16 sm:top-24 md:top-28 rounded-2xl sm:rounded-3rem p-4 sm:p-8 md:p-12 border ${step.theme} backdrop-blur-2xl shadow-2xl transition-all duration-300`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Text Description */}
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-ember">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase bg-white/10 border border-white/15 px-2 sm:px-2.5 py-0.5 rounded-full text-ghost">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-void-200 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4 sm:mb-6">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-cyanGlow">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>MINISTRY STANDARD OPERATING REGULATION</span>
                  </div>
                </div>

                {/* Micro-UI Visual Component */}
                <div className="w-full">{step.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
