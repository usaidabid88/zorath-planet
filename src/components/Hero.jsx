import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Radio, Orbit, ShieldCheck, Sparkles, Compass, Volume2, VolumeX } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
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
    // GSAP entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
      )
      .fromTo(
        '.hero-title-sans',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        '.hero-title-drama',
        { y: 35, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        '.hero-description',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.6'
      )
      .fromTo(
        '.hero-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        '.hero-telemetry',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.4'
      );
    }, heroRef);

    // Scroll-aware performance optimization: Only play video when in viewport
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
      observer.observe(heroRef.current);

      return () => {
        observer.disconnect();
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full max-w-full min-h-[100dvh] pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden flex flex-col justify-center bg-void"
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
          className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-[1.12]"
        >
          <source src="/home.mp4" type="video/mp4" />
          <source src="/e.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/45 to-[#07080F]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080F] via-[#07080F]/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07080F_85%)] opacity-80" />
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
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 flex flex-col justify-center"
      >
        <div className="max-w-3xl">
          {/* Top Classification Badge */}
          <div className="hero-badge flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-void-900/80 border border-plasma/40 text-ghost shadow-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ember animate-pulse shadow-[0_0_8px_#FF5722]" />
              Ministry of Travel & Tourism
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-cyanGlow bg-cyanGlow/10 border border-cyanGlow/30 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md">
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyanGlow animate-pulse" />
              SECTOR 07 • EXPEDITIONS OPEN
            </span>
          </div>

          {/* Heading - Dual Typography System */}
          <div className="mb-3 sm:mb-4">
            <h1 className="hero-title-sans font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              Planetary frontier beyond
            </h1>
            <div className="hero-title-drama font-drama italic text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-plasma-400 leading-[1.08] pt-0.5 pb-1 tracking-wide filter drop-shadow-[0_4px_25px_rgba(255,87,34,0.35)] break-words">
              Extraterrestrial wonder.
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="hero-description text-xs sm:text-sm md:text-base text-void-100/90 font-light leading-relaxed max-w-2xl mb-5 sm:mb-6">
            Experience the untamed majesty of Zorath — an alien sanctuary of crystalline canyons, glowing primeval ecosystems, and thunderous plasma tempests engineered for the ultimate frontier expedition.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="btn-magnetic bg-ember hover:bg-ember-600 text-white font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_0_30px_rgba(255,87,34,0.45)] hover:shadow-[0_0_40px_rgba(255,87,34,0.7)] flex items-center justify-center gap-2 group transition-all text-xs sm:text-sm w-full sm:w-auto"
            >
              <span className="btn-slide-layer bg-gradient-to-r from-plasma to-ember"></span>
              <span className="btn-content flex items-center justify-center gap-2">
                <span>Book an Expedition</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href="#archives"
              className="btn-magnetic glass-panel text-ghost hover:text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-white/15 hover:border-plasma/50 flex items-center justify-center gap-2 font-medium text-xs sm:text-sm hover-lift backdrop-blur-xl transition-all w-full sm:w-auto text-center"
            >
              <Orbit className="w-4 h-4 text-cyanGlow" />
              <span>Explore Planetary Radar</span>
            </a>
          </div>
        </div>

        {/* Live Telemetry Bar */}
        <div className="hero-telemetry mt-6 sm:mt-8 pt-4 border-t border-white/10 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-xs font-mono text-void-300">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-plasma font-bold">COORD:</span>
            <span className="text-white font-semibold">44.91°N 128.4°E</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-plasma font-bold">GRAVITY:</span>
            <span className="text-white font-semibold">0.88G</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 sm:gap-2">
            <span className="text-plasma font-bold">ATMOSPHERE:</span>
            <span className="text-white font-semibold">O₂ 24% • Xe 4% • N₂ 72%</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-start gap-2">
            <button
              onClick={toggleHeroAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] sm:text-[10px] font-mono font-bold transition-all shadow-md backdrop-blur-md ${
                isMuted
                  ? 'bg-void-900/80 border-white/15 text-void-300 hover:text-ember hover:border-ember/40'
                  : 'bg-void-900/90 border-cyanGlow/50 text-cyanGlow shadow-cyanGlow/20'
              }`}
              aria-label="Toggle Planetary Ambient Audio"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-ember" />
                  <span>AMBIENT SOUND: OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-cyanGlow animate-pulse" />
                  <span>AMBIENT SOUND: LIVE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
