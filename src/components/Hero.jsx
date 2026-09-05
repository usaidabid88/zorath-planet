import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Radio, Orbit, Volume2, VolumeX } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleHeroAudio = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    if (!nextMuted) {
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch(() => {});
    }
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (currentVideo && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              currentVideo.play().catch(() => {});
            } else {
              currentVideo.pause();
            }
          });
        },
        { threshold: 0.15 }
      );
      if (heroRef.current) {
        observer.observe(heroRef.current);
      }
      return () => observer.disconnect();
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full max-w-full min-h-[100dvh] pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden flex flex-col justify-center bg-void"
    >
      {/* Background Video & Fallback Image with Smooth Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster="/m.jpg"
          className="w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.15]"
        >
          <source src="/home.mp4" type="video/mp4" />
          <source src="/e.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/50 to-[#07080F]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080F]/90 via-[#07080F]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07080F_85%)] opacity-85" />
      </div>

      {/* Decorative Sci-Fi Orbit Rings */}
      <div className="absolute top-1/3 right-8 md:right-20 z-0 pointer-events-none opacity-25 hidden lg:block">
        <div className="relative w-72 h-72 rounded-full border border-plasma/40 animate-[spin_60s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-ember rounded-full shadow-[0_0_15px_#FF5722]" />
          <div className="absolute inset-6 rounded-full border border-cyanGlow/40 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-16 rounded-full border border-dashed border-white/20" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Top Classification Badge */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-void-900/90 border border-plasma/40 text-ghost shadow-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ember animate-pulse shadow-[0_0_8px_#FF5722]" />
              Ministry of Travel & Tourism
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-cyanGlow bg-cyanGlow/10 border border-cyanGlow/30 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md">
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyanGlow animate-pulse" />
              SECTOR 07 • EXPEDITIONS OPEN
            </span>
          </div>

          {/* Heading - Dual Typography System */}
          <div className="mb-4 sm:mb-5">
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] drop-shadow-md">
              Planetary frontier beyond
            </h1>
            <div className="font-drama italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-plasma-400 leading-[1.08] pt-1 pb-1 tracking-wide filter drop-shadow-[0_4px_30px_rgba(255,87,34,0.45)] break-words">
              Extraterrestrial wonder.
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base md:text-lg text-void-100/90 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8">
            Experience the untamed majesty of Zorath — an alien sanctuary of crystalline canyons, glowing primeval ecosystems, and thunderous plasma tempests engineered for the ultimate frontier expedition.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="btn-magnetic bg-ember hover:bg-ember-600 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,87,34,0.45)] hover:shadow-[0_0_40px_rgba(255,87,34,0.7)] flex items-center justify-center gap-2 group transition-all text-xs sm:text-sm w-full sm:w-auto"
            >
              <span className="btn-slide-layer bg-gradient-to-r from-plasma to-ember"></span>
              <span className="btn-content flex items-center justify-center gap-2">
                <span>Book an Expedition</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href="#terminal"
              className="btn-magnetic glass-panel text-ghost hover:text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/15 hover:border-plasma/50 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm hover-lift backdrop-blur-xl transition-all w-full sm:w-auto text-center"
            >
              <Orbit className="w-4 h-4 text-cyanGlow" />
              <span>Explore Scientific Matrix</span>
            </a>
          </div>
        </div>

        {/* Live Sci-Fi Telemetry HUD Bar */}
        <div className="mt-8 sm:mt-12 p-3.5 sm:p-4 rounded-2xl bg-void-950/80 border border-white/10 backdrop-blur-xl grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-xs font-mono text-void-300 shadow-2xl">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-void-900/80 px-2.5 py-1 rounded-lg border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanGlow animate-pulse" />
            <span className="text-plasma font-bold">COORD:</span>
            <span className="text-white font-semibold">44.91°N 128.4°E</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-void-900/80 px-2.5 py-1 rounded-lg border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            <span className="text-plasma font-bold">GRAVITY:</span>
            <span className="text-white font-semibold">0.88G</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 sm:gap-2 bg-void-900/80 px-2.5 py-1 rounded-lg border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-plasma font-bold">ATMOSPHERE:</span>
            <span className="text-white font-semibold">O₂ 24% • Xe 4% • N₂ 72%</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-start gap-2">
            <button
              onClick={toggleHeroAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-mono font-bold transition-all shadow-md backdrop-blur-md ${
                isMuted
                  ? 'bg-void-900/90 border-white/15 text-void-300 hover:text-ember hover:border-ember/40'
                  : 'bg-void-900/90 border-cyanGlow/50 text-cyanGlow shadow-[0_0_15px_rgba(0,240,255,0.25)]'
              }`}
              aria-label="Toggle Planetary Ambient Audio"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-ember" />
                  <span>AMBIENT AUDIO: MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-cyanGlow animate-pulse" />
                  <span>AMBIENT AUDIO: ACTIVE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
