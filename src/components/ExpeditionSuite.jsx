import React, { useState, useMemo } from 'react';
import {
  Rocket,
  Shield,
  Wind,
  Zap,
  Radio,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sliders,
  Orbit,
  Check,
  Star,
} from 'lucide-react';
import {
  flightTrajectories,
  suitCategories,
  calculateLoadoutStats,
} from '../data/configuratorData';

const expeditionTiers = [
  {
    id: 'recon',
    name: 'Orbital Reconnaissance',
    tag: 'STANDARD EXPLORER',
    price: 4800,
    priceDisplay: '$4,800',
    unit: 'Credits / Traveler',
    duration: '3 Earth Days',
    description: 'Upper stratospheric orbit flybys and orbital sensor suite access for astronomy enthusiasts.',
    features: [
      'Low-orbit observation suite pass',
      'Atmospheric spectroscopy live feed',
      'Standard anti-gravity training',
      'Ministry Tourist Clearance Certificate',
    ],
    popular: false,
    defaultTrajectoryIdx: 0,
    defaultSuitTier: 0,
  },
  {
    id: 'pioneer',
    name: 'Planetary Pioneer',
    tag: 'MOST POPULAR EXPEDITION',
    price: 14500,
    priceDisplay: '$14,500',
    unit: 'Credits / Traveler',
    duration: '7 Planetary Sol Cycles',
    description: 'Full surface touchdown with guided treks across crystalline rift valleys and glowing rainforests.',
    features: [
      'Touchdown at Outpost Alpha',
      'Neural bio-rebreather suit fitting',
      'Heavy Hover Rover field exploration',
      'Guided Saurian & Megafauna tracking',
      '24/7 Orbital evacuation beacon',
    ],
    popular: true,
    defaultTrajectoryIdx: 1,
    defaultSuitTier: 1,
  },
  {
    id: 'vanguard',
    name: 'Ministry Vanguard Guild',
    tag: 'CLASSIFIED RESEARCH & VIP',
    price: 36000,
    priceDisplay: '$36,000',
    unit: 'Credits / Traveler',
    duration: '21 Planetary Sol Cycles',
    description: 'Unrestricted access to uncharted tectonic zones, deep magma caldera research, and private orbital shuttle.',
    features: [
      'Unrestricted sector travel clearance',
      'Dedicated private suborbital shuttle',
      'Subterranean quartz cavern excavation',
      'Direct uplink to Ministry Research Council',
      'Customized planetary bio-suit fabrication',
    ],
    popular: false,
    defaultTrajectoryIdx: 2,
    defaultSuitTier: 2,
  },
];

export default function ExpeditionSuite({ onOpenBooking }) {
  const [activeMode, setActiveMode] = useState('tiers'); // 'tiers', 'trajectories', 'exo-suit'
  const [selectedTrajectory, setSelectedTrajectory] = useState(flightTrajectories[1]);
  const [selectedSuit, setSelectedSuit] = useState({
    armor: suitCategories.armor.options[1],
    rebreather: suitCategories.rebreather.options[1],
    mobility: suitCategories.mobility.options[1],
    sensors: suitCategories.sensors.options[1],
  });

  // Computed Loadout Statistics
  const stats = useMemo(
    () => calculateLoadoutStats(selectedTrajectory, selectedSuit),
    [selectedTrajectory, selectedSuit]
  );

  const handleSelectTier = (tier) => {
    const traj = flightTrajectories[tier.defaultTrajectoryIdx];
    const sTier = tier.defaultSuitTier;
    setSelectedTrajectory(traj);
    setSelectedSuit({
      armor: suitCategories.armor.options[sTier],
      rebreather: suitCategories.rebreather.options[sTier],
      mobility: suitCategories.mobility.options[sTier],
      sensors: suitCategories.sensors.options[sTier],
    });
  };

  const handleSuitOptionSelect = (categoryId, option) => {
    setSelectedSuit((prev) => ({
      ...prev,
      [categoryId]: option,
    }));
  };

  const handleBookWithCustomLoadout = (tierName = null) => {
    if (onOpenBooking) {
      onOpenBooking({
        tier: tierName || selectedTrajectory.name,
        trajectory: selectedTrajectory,
        suit: selectedSuit,
        totalCost: stats.grandTotal,
      });
    }
  };

  return (
    <section
      id="expeditions"
      className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 bg-void border-t border-white/10 w-full max-w-full overflow-hidden"
    >
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] max-w-[100vw] h-[650px] bg-ember/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-plasma/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Sliders className="w-3.5 h-3.5 text-ember" />
                Expedition Clearance & Mission Suite
              </span>
              <span className="font-mono text-[10px] text-cyanGlow bg-cyanGlow/10 border border-cyanGlow/25 px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                <Orbit className="w-3 h-3 text-cyanGlow" />
                LAUNCH WINDOW 2026/2027
              </span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Voyage Manifest & Hardware
            </h2>
          </div>

          {/* Master 3-Way Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-void-950 p-1.5 rounded-full border border-white/10 shrink-0">
            <button
              onClick={() => setActiveMode('tiers')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeMode === 'tiers'
                  ? 'bg-ember text-white shadow-lg shadow-ember/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>1. Clearance Tiers</span>
            </button>

            <button
              onClick={() => setActiveMode('trajectories')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeMode === 'trajectories'
                  ? 'bg-cyanGlow text-void-950 font-bold shadow-lg shadow-cyanGlow/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>2. Flight Orbit</span>
            </button>

            <button
              onClick={() => setActiveMode('exo-suit')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeMode === 'exo-suit'
                  ? 'bg-plasma text-white shadow-lg shadow-plasma/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>3. Exo-Suit Gear</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            MODE 1: EXPEDITION CLEARANCE TIERS
            ===================================================================== */}
        {activeMode === 'tiers' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {expeditionTiers.map((tier) => (
                <div
                  key={tier.name}
                  onClick={() => handleSelectTier(tier)}
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 border cursor-pointer ${
                    tier.popular
                      ? 'border-ember bg-gradient-to-b from-void-850 via-void-900 to-void-950 shadow-[0_0_50px_rgba(255,87,34,0.25)] md:-translate-y-2 ring-2 ring-ember/60'
                      : 'border-white/10 bg-void-950/80 hover:border-white/25'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ember to-plasma text-white text-[10px] font-mono tracking-wider font-bold px-3.5 py-0.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-white" />
                      {tier.tag}
                    </div>
                  )}

                  <div>
                    {!tier.popular && (
                      <span className="font-mono text-[10px] text-plasma font-semibold tracking-wider block mb-2">
                        {tier.tag}
                      </span>
                    )}
                    <h3 className="font-sans font-bold text-xl text-white mb-2">{tier.name}</h3>
                    <p className="text-void-300 text-xs font-light leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="mb-6 pt-4 border-t border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-sans font-extrabold text-white">
                          {tier.priceDisplay}
                        </span>
                        <span className="text-xs font-mono text-void-300">{tier.unit}</span>
                      </div>
                      <div className="text-[10px] font-mono text-cyanGlow mt-1">
                        Duration: {tier.duration}
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-void-100 font-light">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTier(tier);
                        handleBookWithCustomLoadout(tier.name);
                      }}
                      className={`btn-magnetic w-full py-3.5 px-6 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                        tier.popular
                          ? 'bg-ember text-white shadow-[0_0_25px_rgba(255,87,34,0.5)] hover:shadow-[0_0_35px_rgba(255,87,34,0.8)]'
                          : 'bg-void-800 hover:bg-void-700 text-ghost border border-white/10'
                      }`}
                    >
                      <span>Book {tier.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        handleSelectTier(tier);
                        setActiveMode('trajectories');
                      }}
                      className="w-full text-center text-[10px] font-mono text-void-400 hover:text-cyanGlow py-1"
                    >
                      Customize Trajectory & Gear →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            MODE 2: FLIGHT TRAJECTORIES
            ===================================================================== */}
        {activeMode === 'trajectories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start animate-[fadeIn_0.3s_ease-out]">
            <div className="lg:col-span-7 space-y-4">
              {flightTrajectories.map((trajectory) => {
                const isSelected = selectedTrajectory.id === trajectory.id;
                return (
                  <div
                    key={trajectory.id}
                    onClick={() => setSelectedTrajectory(trajectory)}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-void-900 border-ember shadow-xl shadow-ember/20 scale-[1.01]'
                        : 'bg-void-950/70 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                            style={{
                              color: trajectory.color,
                              borderColor: `${trajectory.color}40`,
                              backgroundColor: `${trajectory.color}15`,
                            }}
                          >
                            {trajectory.code}
                          </span>
                          <span className="text-xs font-mono text-void-400">
                            {trajectory.comfortClass}
                          </span>
                        </div>
                        <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                          {trajectory.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="font-sans font-extrabold text-lg sm:text-xl text-white">
                          ${trajectory.basePrice.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-mono text-void-400">PASS TARIFF</span>
                      </div>
                    </div>

                    <p className="text-xs text-void-300 font-light leading-relaxed mb-4">
                      {trajectory.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-void-950/80 border border-white/5">
                        <span className="text-void-400 block text-[9px]">DURATION</span>
                        <span className="text-white font-bold">{trajectory.durationDays} Days</span>
                      </div>
                      <div className="p-2 rounded-xl bg-void-950/80 border border-white/5">
                        <span className="text-void-400 block text-[9px]">DELTA-V</span>
                        <span className="text-cyanGlow font-bold">{trajectory.deltaV}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-void-950/80 border border-white/5">
                        <span className="text-void-400 block text-[9px]">G-FORCE</span>
                        <span className="text-plasma font-bold">{trajectory.gForceAvg}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-void-950/80 border border-white/5">
                        <span className="text-void-400 block text-[9px]">PROPULSION</span>
                        <span className="text-white font-medium truncate block">
                          {trajectory.propulsionType.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbit HUD Map */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Orbit className="w-4 h-4 text-cyanGlow animate-spin" />
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Orbital Transfer Vector
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    L2 SYNCED
                  </span>
                </div>

                <div className="relative w-full h-48 bg-void-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-3 mb-4">
                  <svg viewBox="0 0 400 240" className="w-full h-full">
                    <circle cx="60" cy="120" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <circle cx="340" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <path
                      d="M 60,120 Q 200,20 340,120"
                      fill="none"
                      stroke={selectedTrajectory.color}
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      className="animate-[pulse_3s_ease-in-out_infinite]"
                    />
                    <circle cx="200" cy="70" r="4" fill={selectedTrajectory.color} className="animate-ping" />
                    <circle cx="200" cy="70" r="3" fill="#FFFFFF" />
                    <g transform="translate(60, 120)">
                      <circle r="12" fill="#00F0FF" opacity="0.2" className="animate-pulse" />
                      <circle r="7" fill="#00F0FF" />
                      <text y="22" fill="#A9ABBF" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        EARTH
                      </text>
                    </g>
                    <g transform="translate(340, 120)">
                      <circle r="14" fill="#FF5722" opacity="0.25" className="animate-pulse" />
                      <circle r="9" fill="#FF5722" />
                      <text y="24" fill="#FF7A50" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                        ZORATH-9
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-void-300">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>DEPARTURE VECTOR:</span>
                    <span className="text-white font-medium">{selectedTrajectory.departureOrbit}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>ARRIVAL CORRIDOR:</span>
                    <span className="text-white font-medium">{selectedTrajectory.arrivalOrbit}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>TRANSIT RISK MARGIN:</span>
                    <span className="text-emerald-400 font-medium">{selectedTrajectory.transitRisk}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveMode('exo-suit')}
                className="mt-6 w-full py-3 rounded-full bg-void-800 hover:bg-void-750 border border-plasma/40 text-ghost hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-semibold transition-all"
              >
                <span>Proceed to Exo-Suit Gear Loadout</span>
                <ArrowRight className="w-4 h-4 text-plasma" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            MODE 3: MODULAR EXO-SUIT CUSTOMIZER
            ===================================================================== */}
        {activeMode === 'exo-suit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start animate-[fadeIn_0.3s_ease-out]">
            <div className="lg:col-span-7 space-y-4">
              {Object.entries(suitCategories).map(([catKey, category]) => {
                const currentSelection = selectedSuit[catKey];
                return (
                  <div
                    key={catKey}
                    className="p-4 sm:p-5 rounded-2xl bg-void-950/80 border border-white/10 backdrop-blur-md shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-void-900 border border-white/10 flex items-center justify-center text-plasma">
                          {catKey === 'armor' && <Shield className="w-3.5 h-3.5" />}
                          {catKey === 'rebreather' && <Wind className="w-3.5 h-3.5" />}
                          {catKey === 'mobility' && <Zap className="w-3.5 h-3.5" />}
                          {catKey === 'sensors' && <Radio className="w-3.5 h-3.5" />}
                        </span>
                        <h3 className="font-sans font-bold text-sm text-white">
                          {category.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-cyanGlow">
                        {currentSelection.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {category.options.map((option) => {
                        const isOptionSelected = currentSelection.id === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleSuitOptionSelect(catKey, option)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isOptionSelected
                                ? 'bg-void-900 border-plasma shadow-md shadow-plasma/20 scale-[1.02]'
                                : 'bg-void-950/60 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                                  style={{
                                    color: option.color,
                                    backgroundColor: `${option.color}15`,
                                  }}
                                >
                                  {option.tier}
                                </span>
                                <span className="text-[10px] font-mono text-white font-bold">
                                  +${option.price.toLocaleString()}
                                </span>
                              </div>
                              <div className="font-sans font-semibold text-xs text-white mb-1">
                                {option.name}
                              </div>
                            </div>
                            <span className="text-[9px] text-void-400 font-mono mt-1 block">
                              Mass: {option.massKg} kg
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suit Telemetry HUD */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-plasma" />
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      Suit Telemetry Matrix
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] font-bold ${stats.tierColor}`}>
                    {stats.readinessTier}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-void-950 border border-white/10 mb-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-void-400 uppercase block mb-1">
                      READINESS INDEX
                    </span>
                    <div className="text-3xl font-sans font-black text-white">
                      {stats.compositeScore}%
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      SURFACE RATED & PASS
                    </span>
                  </div>

                  <div className="text-right font-mono text-xs space-y-1">
                    <div className="text-void-300">
                      MASS: <span className="text-white font-bold">{stats.totalMassKg} kg</span>
                    </div>
                    <div className="text-void-300">
                      GEAR: <span className="text-plasma font-bold">${stats.totalEquipmentCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-void-300">Radiation Deflection</span>
                      <span className="text-white font-bold">{stats.armor.radiationResistance}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-void-950 overflow-hidden">
                      <div className="h-full bg-cyanGlow" style={{ width: `${stats.armor.radiationResistance}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-void-300">O₂ Autonomy</span>
                      <span className="text-white font-bold">{stats.rebreather.autonomyHours}h</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-void-950 overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${(stats.rebreather.autonomyHours / 192) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-void-300">Planetary Agility</span>
                      <span className="text-white font-bold">{stats.mobility.agilityScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-void-950 overflow-hidden">
                      <div className="h-full bg-plasma" style={{ width: `${stats.mobility.agilityScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveMode('tiers')}
                className="w-full py-2.5 rounded-full bg-void-950 hover:bg-void-900 border border-white/10 text-void-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Clearance Tiers</span>
              </button>
            </div>
          </div>
        )}

        {/* Global Summary & Checkout Bar */}
        <div className="mt-8 p-4 sm:p-6 rounded-3xl bg-void-900/90 border border-plasma/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            <div>
              <span className="text-void-400 block text-[10px]">SELECTED FLIGHT VECTOR</span>
              <span className="text-white font-bold text-sm sm:text-base">
                {selectedTrajectory.name}
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
            <div>
              <span className="text-void-400 block text-[10px]">SUIT CONFIGURATION</span>
              <span className="text-plasma font-bold text-sm sm:text-base">
                {stats.readinessTier} ({stats.compositeScore}%)
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
            <div>
              <span className="text-void-400 block text-[10px]">TOTAL EXPEDITION PASS</span>
              <span className="text-ember font-extrabold text-lg sm:text-2xl font-sans">
                ${stats.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleBookWithCustomLoadout()}
            className="btn-magnetic bg-ember hover:bg-ember-600 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,87,34,0.45)] hover:shadow-[0_0_40px_rgba(255,87,34,0.7)] flex items-center justify-center gap-2 group transition-all text-xs sm:text-sm w-full md:w-auto shrink-0"
          >
            <span className="btn-slide-layer bg-gradient-to-r from-plasma to-ember"></span>
            <span className="btn-content flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-200" />
              <span>Confirm & Book Loadout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
