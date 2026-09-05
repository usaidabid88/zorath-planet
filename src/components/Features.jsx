import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Trees, CloudLightning, Activity, Sparkles, CheckCircle2, ChevronRight, Pause, Play, RefreshCw, Radio, Compass, Shield, Zap, Eye } from 'lucide-react';

/* =====================================================================
   CARD 1: Diagnostic Shuffler (Geological Marvels)
   ===================================================================== */
const initialShufflerCards = [
  {
    id: 1,
    title: 'Crystalline Rift Valleys',
    metric: 'Depth: -4,820m',
    submetric: 'Magnetic Flux: 4.8 Tesla',
    status: 'OPTIMAL CLEARANCE',
    color: 'from-ember/25 via-void-900 to-plasma/20',
    border: 'border-ember/40',
    badge: 'ZONE-A1',
    description: 'Towering quartz monocrystals reflecting dual-star luminescence.',
  },
  {
    id: 2,
    title: 'Floating Basalt Spires',
    metric: 'Elev: +9,140m',
    submetric: 'Gravity Anomaly: -0.32G',
    status: 'HOVER CORRIDOR ACTIVE',
    color: 'from-plasma/25 via-void-900 to-cyanGlow/20',
    border: 'border-plasma/40',
    badge: 'ZONE-B4',
    description: 'Magnetically levitating mountain massifs over ionized cloud seas.',
  },
  {
    id: 3,
    title: 'Obsidian Magma Calderas',
    metric: 'Thermal: 412°C',
    submetric: 'Silica Index: 98.4%',
    status: 'SEISMIC SHIELD ON',
    color: 'from-orange-600/25 via-void-900 to-ember/20',
    border: 'border-orange-500/40',
    badge: 'ZONE-C7',
    description: 'Black glass volcanic basins glowing with dormant geothermal veins.',
  },
];

function DiagnosticShuffler() {
  const [cards, setCards] = useState(initialShufflerCards);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shuffleNext = () => {
    setCards((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) copy.unshift(last);
      return copy;
    });
  };

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(shuffleNext, 3800);
    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-72 w-full flex items-center justify-center select-none"
    >
      {cards.map((card, idx) => {
        // idx 0 = front, 1 = middle, 2 = back
        const scale = idx === 0 ? 1 : idx === 1 ? 0.94 : 0.88;
        const translateY = idx === 0 ? 0 : idx === 1 ? -18 : -36;
        const zIndex = 30 - idx * 10;
        const opacity = idx === 0 ? 1 : idx === 1 ? 0.75 : 0.45;

        return (
          <div
            key={card.id}
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              zIndex,
              opacity,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className={`absolute inset-x-0 mx-auto max-w-[280px] sm:max-w-sm w-full p-4 sm:p-5 rounded-2xl sm:rounded-2rem bg-void-800/95 backdrop-blur-xl border ${card.border} shadow-2xl shadow-void-950/80 bg-gradient-to-br ${card.color} interactive-card group/card cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-plasma bg-plasma/15 px-2 py-0.5 rounded-full border border-plasma/30">
                {card.badge}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-ember flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                {card.status}
              </span>
            </div>
            <h4 className="font-sans font-bold text-white text-sm sm:text-lg mb-1 group-hover/card:text-ember transition-colors">
              {card.title}
            </h4>
            <p className="text-void-200 text-xs line-clamp-1 mb-3">
              {card.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] sm:text-xs font-mono">
              <span className="text-cyanGlow font-semibold">{card.metric}</span>
              <span className="text-void-300">{card.submetric}</span>
            </div>
          </div>
        );
      })}

      {/* Manual Shuffle Pill */}
      <button
        onClick={shuffleNext}
        className="absolute -bottom-3 right-2 sm:right-4 z-40 bg-void-700/90 hover:bg-void-600 border border-white/15 hover:border-plasma text-void-100 hover:text-white text-[10px] sm:text-[11px] font-mono px-3 sm:px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
      >
        <RefreshCw className="w-3 h-3 text-plasma" />
        <span>CYCLE SECTOR</span>
      </button>
    </div>
  );
}

/* =====================================================================
   CARD 2: Telemetry Typewriter (Diverse Alien Ecosystem)
   ===================================================================== */
const bioFeedMessages = [
  "[BIO-LOG 01] Bioluminescent spore bloom detected across Lumina Canopy. Density: 84% safe.",
  "[BIO-LOG 02] Ancient Saurian apex specimen vocalization recorded at 4.2Hz deep resonance.",
  "[BIO-LOG 03] Marine siphonophores emitting synchronized cyan pulses in the Sapphire Rift.",
  "[BIO-LOG 04] Sub-canopy flora undergoing nocturnal phosphorescence. Light Index: 120 LUX.",
  "[BIO-LOG 05] Atmosphere oxygenation boost detected from subterranean moss chambers.",
];

function TelemetryTypewriter() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const currentMessage = bioFeedMessages[msgIndex];

    if (isTyping) {
      if (charIndex < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const pauseTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 2200);
        return () => clearTimeout(pauseTimeout);
      }
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setMsgIndex((prev) => (prev + 1) % bioFeedMessages.length);
        setIsTyping(true);
      }, 400);
      return () => clearTimeout(resetTimeout);
    }
  }, [charIndex, isTyping, msgIndex, isVisible]);

  return (
    <div ref={containerRef} className="w-full h-auto min-h-[270px] sm:h-72 rounded-2xl sm:rounded-2rem bg-void-950/90 border border-white/10 p-4 sm:p-5 flex flex-col justify-between font-mono relative overflow-hidden interactive-card">
      {/* Background Matrix Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(123,97,255,0.12)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyanGlow animate-ping" />
          <span className="text-[11px] sm:text-xs tracking-wider text-ghost font-bold flex items-center gap-1.5">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyanGlow" />
            LIVE ECO-TELEMETRY
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-plasma bg-plasma/10 border border-plasma/30 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold">
          NODE 88-ALPHA
        </span>
      </div>

      {/* Main Terminal Feed Content */}
      <div className="relative z-10 my-auto py-2 text-xs sm:text-sm text-cyanGlow leading-relaxed min-h-[80px] sm:min-h-[90px] flex items-center">
        <span>
          {displayedText}
          <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 ml-1 bg-ember animate-[pulse_0.8s_infinite] align-middle" />
        </span>
      </div>

      {/* Mini Ecosystem Vital Meters */}
      <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-white/10 grid grid-cols-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px]">
        <div className="bg-void-900/80 p-1.5 sm:p-2 rounded-xl border border-white/5">
          <div className="text-void-400 text-[8px] sm:text-[9px]">FLORA HEALTH</div>
          <div className="text-white font-bold text-[9px] sm:text-[10px]">99.2% OPTIMAL</div>
        </div>
        <div className="bg-void-900/80 p-1.5 sm:p-2 rounded-xl border border-white/5">
          <div className="text-void-400 text-[8px] sm:text-[9px]">FAUNA TRACE</div>
          <div className="text-plasma font-bold text-[9px] sm:text-[10px]">42 SPECIMENS</div>
        </div>
        <div className="bg-void-900/80 p-1.5 sm:p-2 rounded-xl border border-white/5">
          <div className="text-void-400 text-[8px] sm:text-[9px]">SPORE LEVEL</div>
          <div className="text-ember font-bold text-[9px] sm:text-[10px]">LOW TOXIC</div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   CARD 3: Cursor Protocol Scheduler (Dynamic Weather / Launch Clearances)
   ===================================================================== */
const daysOfWeek = [
  { day: 'SUN', state: 'STORM (45°C)', icon: '⚡' },
  { day: 'MON', state: 'TURBULENCE', icon: '💨' },
  { day: 'TUE', state: 'FROST (-12°C)', icon: '❄️' },
  { day: 'WED', state: 'ION HAZE', icon: '🌌' },
  { day: 'THU', state: 'CLEAR SKY (22°C)', icon: '✨', target: true },
  { day: 'FRI', state: 'AURORA', icon: '🌈' },
  { day: 'SAT', state: 'TEMP GALE', icon: '🌪️' },
];

function CursorProtocolScheduler() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timeline = [
      setTimeout(() => setActiveStep(1), 1200),
      setTimeout(() => setActiveStep(2), 1600),
      setTimeout(() => setActiveStep(3), 2400),
      setTimeout(() => setActiveStep(4), 3200),
      setTimeout(() => setActiveStep(5), 3600),
      setTimeout(() => setActiveStep(0), 5500),
    ];
    return () => timeline.forEach(clearTimeout);
  }, [activeStep === 0, isVisible]);

  const getCursorStyle = () => {
    if (activeStep === 0) {
      return { top: '35%', left: '60%', opacity: 1, transform: 'scale(1)' };
    }
    if (activeStep === 1) {
      return { top: '35%', left: '60%', opacity: 1, transform: 'scale(0.88)' };
    }
    if (activeStep === 2) {
      return { top: '35%', left: '60%', opacity: 1, transform: 'scale(1)' };
    }
    if (activeStep === 3) {
      return { top: '80%', left: '72%', opacity: 1, transform: 'scale(1)' };
    }
    if (activeStep === 4) {
      return { top: '80%', left: '72%', opacity: 1, transform: 'scale(0.85)' };
    }
    return { top: '90%', left: '85%', opacity: 0, transform: 'scale(1)' };
  };

  return (
    <div ref={containerRef} className="w-full h-auto min-h-[280px] sm:h-72 rounded-2xl sm:rounded-2rem bg-void-950/90 border border-white/10 p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none interactive-card">
      {/* Animated SVG Cursor */}
      <div
        style={getCursorStyle()}
        className="absolute z-50 pointer-events-none transition-all duration-700 ease-out hidden sm:block"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 filter drop-shadow-[0_0_8px_rgba(255,87,34,0.8)] text-ember fill-ember"
          viewBox="0 0 24 24"
        >
          <path d="M4 2l15 9-6.5 2.5L16 21l-3.5 1.5-3.5-7.5L4 18V2z" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[11px] sm:text-xs font-bold text-ghost flex items-center gap-1.5">
          <CloudLightning className="w-3.5 h-3.5 text-ember" />
          CLIMATE LAUNCH DISPATCH
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] text-void-300">
          WEEKLY ORBITAL CYCLE
        </span>
      </div>

      {/* Weekly Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 my-auto py-2">
        {daysOfWeek.map((item) => {
          const isSelected = item.target && activeStep >= 2;
          return (
            <div
              key={item.day}
              className={`flex flex-col items-center justify-center p-0.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 text-center border ${
                isSelected
                  ? 'bg-ember/25 border-ember shadow-[0_0_15px_rgba(255,87,34,0.4)] scale-105'
                  : 'bg-void-900/60 border-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-[8px] sm:text-[10px] font-mono font-bold text-void-200">
                {item.day}
              </span>
              <span className="text-[11px] sm:text-sm my-0.5">{item.icon}</span>
              <span
                className={`text-[6px] sm:text-[8px] font-mono leading-tight truncate max-w-full block ${
                  isSelected ? 'text-ember-300 font-bold' : 'text-void-400'
                }`}
              >
                {item.day === 'THU' ? 'OPTIMAL' : 'SECTOR'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-void-300">
          <span className="text-void-400">WINDOW:</span>
          <span className="text-white font-bold">THURSDAY (STABLE)</span>
        </div>
        <button
          className={`font-mono text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full transition-all flex items-center justify-center gap-1.5 ${
            activeStep >= 5
              ? 'bg-green-500/20 border border-green-400 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.3)]'
              : activeStep >= 4
              ? 'bg-ember text-white scale-95'
              : 'bg-void-800 border border-white/10 text-void-200'
          }`}
        >
          {activeStep >= 5 ? (
            <>
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
              <span>CLEARANCE GRANTED</span>
            </>
          ) : (
            <span>CONFIRM CLEARANCE</span>
          )}
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   MAIN FEATURES & EXPEDITION PILLARS SECTION
   ===================================================================== */
export default function Features() {
  return (
    <div className="relative bg-void-950 w-full max-w-full overflow-hidden">
      {/* SECTION 1: GEOLOGY */}
      <section id="geology" className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-10 md:px-16 border-t border-white/10 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-ember" />
                  Geological Survey #01
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3 sm:mb-4">
                Crystalline Valleys & Basalt Spires.
              </h2>
              <p className="text-void-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6">
                Zorath's crust is dominated by hyper-pressurized quartz monocrystals and magnetically levitating basalt towers suspended above ionized thermal chasms.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-void-900/80 border border-white/10 text-xs font-mono mb-5 sm:mb-6">
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">MAGNETIC STRENGTH</span>
                  <span className="text-ember font-bold text-sm sm:text-base">4.88 Tesla</span>
                </div>
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">CRUST COMPOSITION</span>
                  <span className="text-cyanGlow font-bold text-sm sm:text-base">94.2% Silica</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Shuffler */}
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-2xl sm:rounded-3rem p-4 sm:p-8 border border-white/15 hover:border-ember/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-[10px] sm:text-xs text-void-300">INTERACTIVE SECTOR SCANNER</span>
                  <span className="font-mono text-[10px] sm:text-xs text-ember flex items-center gap-1">
                    <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-ember" />
                    LIVE SENSORS
                  </span>
                </div>
                <DiagnosticShuffler />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ECOSYSTEM */}
      <section id="ecosystem" className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-10 md:px-16 border-t border-white/10 bg-void-900/40 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Interactive Typewriter */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="glass-panel rounded-2xl sm:rounded-3rem p-4 sm:p-8 border border-white/15 hover:border-cyanGlow/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-[10px] sm:text-xs text-void-300">BIOSPHERIC TELEMETRY STREAM</span>
                  <span className="font-mono text-[10px] sm:text-xs text-cyanGlow flex items-center gap-1">
                    <Activity className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyanGlow" />
                    RESONANCE ACTIVE
                  </span>
                </div>
                <TelemetryTypewriter />
              </div>
            </div>

            {/* Right Description */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-cyanGlow uppercase bg-cyanGlow/10 border border-cyanGlow/30 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-cyanGlow" />
                  Ecosystem Survey #02
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3 sm:mb-4">
                Bioluminescent Primeval Biosphere.
              </h2>
              <p className="text-void-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6">
                Step inside the Lumina Prime phosphorescent jungle, where ancient saurian megafauna co-exist with pulsating spore colonies emitting synchronous bio-luminescence.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-void-900/80 border border-white/10 text-xs font-mono mb-5 sm:mb-6">
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">BIOLUMINESCENCE</span>
                  <span className="text-cyanGlow font-bold text-sm sm:text-base">120 LUX (Cyan)</span>
                </div>
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">SPECIES INDEX</span>
                  <span className="text-plasma font-bold text-sm sm:text-base">1,400+ Cataloged</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CLIMATE */}
      <section id="climate" className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-10 md:px-16 border-t border-white/10 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-plasma uppercase bg-plasma/10 border border-plasma/30 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CloudLightning className="w-3.5 h-3.5 text-plasma" />
                  Climate Dispatch #03
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight mb-3 sm:mb-4">
                Dynamic Plasma Tempests & Launch Windows.
              </h2>
              <p className="text-void-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6">
                Zorath experiences rapid atmospheric ionization with superheated thermal gales alternating with crystal-clear auroral launch windows verified every planetary cycle.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-void-900/80 border border-white/10 text-xs font-mono mb-5 sm:mb-6">
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">ATMOSPHERE VELOCITY</span>
                  <span className="text-plasma font-bold text-sm sm:text-base">Mach 2.2 Max</span>
                </div>
                <div>
                  <span className="text-void-400 block mb-0.5 sm:mb-1 text-[10px] sm:text-xs">SAFE LAUNCH SLOT</span>
                  <span className="text-green-400 font-bold text-sm sm:text-base">Thursday Cycle</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Scheduler */}
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-2xl sm:rounded-3rem p-4 sm:p-8 border border-white/15 hover:border-plasma/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-[10px] sm:text-xs text-void-300">METEOROLOGICAL PROTOCOL ENGINE</span>
                  <span className="font-mono text-[10px] sm:text-xs text-plasma flex items-center gap-1">
                    <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-green-400" />
                    DISPATCH SYNCHRONIZED
                  </span>
                </div>
                <CursorProtocolScheduler />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
