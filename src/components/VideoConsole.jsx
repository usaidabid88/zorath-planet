import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Radio, Sparkles, Film, Eye, ShieldAlert, Zap } from 'lucide-react';

const videoChannels = [
  {
    id: 'ch-01',
    channel: 'CH 01',
    title: 'Geological Canyons & Basalt Spire Uplink',
    category: 'GEOLOGY',
    src: '/intro.mp4',
    altSrc: '/b.mp4',
    poster: '/m.jpg',
    duration: '01:24',
    description: 'Direct optical telemetry from drone probe scanning the deep crystalline tectonic ravines.',
  },
  {
    id: 'ch-02',
    channel: 'CH 02',
    title: 'Primeval Fauna & Bioluminescent Jungle',
    category: 'ECOSYSTEM',
    src: '/eco.mp4',
    altSrc: '/a.mp4',
    poster: '/i.jpg',
    duration: '02:08',
    description: 'Nocturnal footage of Saurian megafauna traversing the Lumina Prime phosphorescent canopy.',
  },
  {
    id: 'ch-03',
    channel: 'CH 03',
    title: 'Plasma Lightning Superstorms & Thermal Gale',
    category: 'CLIMATE',
    src: '/d.mp4',
    altSrc: '/wea.mp4',
    poster: '/m.jpg',
    duration: '01:45',
    description: 'High-speed capture of ionized electrical fronts raging across the northern hemisphere.',
  },
  {
    id: 'ch-04',
    channel: 'CH 04',
    title: 'Expedition Rover Overland Route Testing',
    category: 'EXPEDITIONS',
    src: '/tour.mp4',
    altSrc: '/c.mp4',
    poster: '/i.jpg',
    duration: '01:50',
    description: 'Field run of the Heavy Hover Transport traversing rough crystalline desert dunes.',
  },
  {
    id: 'ch-05',
    channel: 'CH 05',
    title: 'Planetary Documentary & Ministry Briefing',
    category: 'DOCUMENTARY',
    src: '/home.mp4',
    altSrc: '/e.mp4',
    poster: '/m.jpg',
    duration: '03:12',
    description: 'Official planetary archive compiled by Cadet College Sanghar Ministry Research Team.',
  },
];

export default function VideoConsole() {
  const [selectedChannel, setSelectedChannel] = useState(videoChannels[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Performance IntersectionObserver: Auto-pause off-screen video
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (currentVideo && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (isPlaying) {
                currentVideo.play().catch(() => {});
              }
            } else {
              currentVideo.pause();
            }
          });
        },
        { threshold: 0.15 }
      );
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      return () => observer.disconnect();
    }
  }, [isPlaying]);

  const handleChannelSwitch = (ch) => {
    setSelectedChannel(ch);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="archives"
      ref={sectionRef}
      className="relative py-14 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 bg-void-900 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-cyanGlow uppercase bg-cyanGlow/10 border border-cyanGlow/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mb-2.5 sm:mb-3">
              <Radio className="w-3.5 h-3.5 text-cyanGlow animate-pulse" />
              Live Interstellar Feed Console
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Planetary Surveillance Archives
            </h2>
          </div>
          <p className="text-void-300 text-xs sm:text-sm max-w-md font-light">
            Switch across 5 dedicated orbital camera channels capturing real footage of Zorath's geology, biology, and atmospheric anomalies.
          </p>
        </div>

        {/* Video Player & Channel Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Video Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative w-full aspect-video rounded-2xl sm:rounded-3rem overflow-hidden bg-void-950 border border-plasma/40 shadow-2xl shadow-void-950 group video-player-box">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={selectedChannel.poster}
                className="w-full h-full object-cover filter contrast-[1.08]"
              >
                <source src={selectedChannel.src} type="video/mp4" />
                <source src={selectedChannel.altSrc} type="video/mp4" />
              </video>

              {/* Sci-Fi HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none p-3.5 sm:p-6 flex flex-col justify-between bg-gradient-to-t from-void-950/95 via-transparent to-void-950/50">
                {/* Top HUD Stats */}
                <div className="flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-white">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-void-900/80 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 shadow-md">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-ember">{selectedChannel.channel}</span>
                    <span className="text-void-400">|</span>
                    <span>{selectedChannel.category}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-void-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-cyanGlow shadow-md">
                    <Zap className="w-3 h-3 text-cyanGlow" />
                    <span>4K-UHD • 60 FPS • INTERSTELLAR UPLINK</span>
                  </div>
                </div>

                {/* Bottom HUD Info */}
                <div>
                  <h3 className="font-sans font-bold text-sm sm:text-lg md:text-xl text-white mb-0.5 sm:mb-1 drop-shadow-md">
                    {selectedChannel.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-void-200 font-light max-w-xl line-clamp-1 drop-shadow">
                    {selectedChannel.description}
                  </p>
                </div>
              </div>

              {/* Video Control Bar */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 bg-void-950/85 backdrop-blur-md border border-white/20 p-1 sm:p-1.5 rounded-full shadow-lg">
                <button
                  onClick={togglePlay}
                  className="p-1.5 sm:p-2 text-white hover:text-ember rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Play/Pause"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 sm:p-2 text-white hover:text-cyanGlow rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Mute/Unmute"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Channel Selector Sidebar (4 Columns on desktop, horizontal swiper on mobile) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3 w-full">
            <span className="font-mono text-[10px] sm:text-xs text-void-300 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-plasma" />
              Select Orbital Relay Feed:
            </span>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2.5 sm:gap-3 snap-x">
              {videoChannels.map((ch) => {
                const isCurrent = selectedChannel.id === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChannelSwitch(ch)}
                    className={`min-w-[240px] lg:min-w-0 w-auto lg:w-full p-3 sm:p-4 rounded-xl sm:rounded-2rem text-left transition-all duration-300 border flex items-center gap-3 sm:gap-4 interactive-card snap-start shrink-0 lg:shrink ${
                      isCurrent
                        ? 'bg-void-800 border-ember shadow-lg shadow-ember/20 scale-[1.01]'
                        : 'bg-void-950/60 border-white/5 hover:border-white/25 hover:bg-void-800/60'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold shrink-0 transition-transform ${
                        isCurrent
                          ? 'bg-ember text-white shadow-[0_0_12px_#FF5722] scale-105'
                          : 'bg-void-800 text-void-300'
                      }`}
                    >
                      {ch.channel}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-xs font-mono text-plasma font-semibold tracking-wider">
                        {ch.category}
                      </span>
                      <span className="text-xs sm:text-sm font-sans font-bold text-white truncate">
                        {ch.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
