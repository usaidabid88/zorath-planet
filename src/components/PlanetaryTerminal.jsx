import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Gauge,
  Activity,
  Orbit,
  Radio,
  Mountain,
  Shield,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  atmosphericComposition,
  solDiurnalCycle,
  planetarySectors,
} from '../data/telemetryData';

export default function PlanetaryTerminal() {
  const [activeTab, setActiveTab] = useState('surface'); // 'surface', 'telemetry', 'surveillance'

  /* --- Tab 1 State: Surface Exploration --- */
  const [activeZone, setActiveZone] = useState(planetarySectors[0]);

  /* --- Tab 2 State: Telemetry Metrics --- */
  const [activeMetric, setActiveMetric] = useState('radiation');
  const [selectedGas, setSelectedGas] = useState(atmosphericComposition[0]);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  /* --- Tab 3 State: Video Surveillance Console --- */
  const [opticalFilter, setOpticalFilter] = useState('STANDARD');
  const [isConsoleMuted, setIsConsoleMuted] = useState(true);
  const [missionTimer, setMissionTimer] = useState(14820);
  const consoleVideoRef = useRef(null);

  // Mission Stopwatch
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `T+${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleConsoleAudio = (e) => {
    if (e) e.stopPropagation();
    if (!consoleVideoRef.current) return;
    const nextMuted = !isConsoleMuted;
    consoleVideoRef.current.muted = nextMuted;
    if (!nextMuted) {
      consoleVideoRef.current.volume = 1.0;
      consoleVideoRef.current.play().catch(() => {});
    }
    setIsConsoleMuted(nextMuted);
  };

  // SVG Chart Geometry
  const chartWidth = 600;
  const chartHeight = 220;
  const padding = { top: 20, right: 25, bottom: 35, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Chart Computations
  const chartData = useMemo(() => {
    const values = solDiurnalCycle.map((d) =>
      activeMetric === 'radiation'
        ? d.radiation
        : activeMetric === 'magnetic'
        ? d.magnetic
        : d.temp
    );
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values) * 1.15;

    const points = solDiurnalCycle.map((d, index) => {
      const x = padding.left + (index / (solDiurnalCycle.length - 1)) * innerWidth;
      const val =
        activeMetric === 'radiation'
          ? d.radiation
          : activeMetric === 'magnetic'
          ? d.magnetic
          : d.temp;
      const y = padding.top + innerHeight - ((val - minVal) / (maxVal - minVal || 1)) * innerHeight;
      return { x, y, data: d, value: val };
    });

    const pathD = points.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x},${pt.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (pt.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (pt.x - prev.x) / 2;
      const cy2 = pt.y;
      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`;
    }, '');

    const areaD = `${pathD} L ${points[points.length - 1].x},${padding.top + innerHeight} L ${
      points[0].x
    },${padding.top + innerHeight} Z`;

    return { points, pathD, areaD, minVal, maxVal };
  }, [activeMetric, innerWidth, innerHeight]);

  const metricMeta = {
    radiation: {
      name: 'Ionized Radiation Flux',
      unit: 'mSv/h',
      color: '#FF5722',
      gradId: 'terminalRadGrad',
      accentText: 'text-ember',
      badgeBg: 'bg-ember/10 border-ember/30 text-ember',
    },
    magnetic: {
      name: 'Planetary Magnetic Field',
      unit: 'Tesla',
      color: '#00F0FF',
      gradId: 'terminalMagGrad',
      accentText: 'text-cyanGlow',
      badgeBg: 'bg-cyanGlow/10 border-cyanGlow/30 text-cyanGlow',
    },
    temp: {
      name: 'Surface Thermal Gradient',
      unit: '°C',
      color: '#7B61FF',
      gradId: 'terminalTempGrad',
      accentText: 'text-plasma',
      badgeBg: 'bg-plasma/10 border-plasma/30 text-plasma',
    },
  };

  return (
    <section
      id="terminal"
      className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 bg-void-950 border-t border-white/10 w-full max-w-full overflow-hidden"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyanGlow/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-plasma/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-cyanGlow uppercase bg-cyanGlow/10 border border-cyanGlow/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Orbit className="w-3.5 h-3.5 text-cyanGlow animate-spin" />
                Interstellar Intelligence Terminal
              </span>
              <span className="font-mono text-[10px] text-plasma bg-plasma/10 border border-plasma/25 px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
                <Radio className="w-3 h-3 text-plasma" />
                LIVE RELAY 2.4 GHz
              </span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Planetary Survey & Analytics
            </h2>
          </div>

          {/* Master 3-Tab Selector Pills */}
          <div className="flex items-center gap-1.5 bg-void-900 p-1.5 rounded-full border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('surface')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'surface'
                  ? 'bg-ember text-white shadow-lg shadow-ember/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>1. Surface Surveys</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'telemetry'
                  ? 'bg-cyanGlow text-void-950 font-bold shadow-lg shadow-cyanGlow/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>2. Telemetry Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('surveillance')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'surveillance'
                  ? 'bg-plasma text-white shadow-lg shadow-plasma/30'
                  : 'text-void-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3. Live Surveillance</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: SURFACE EXPLORATION SURVEYS
            ===================================================================== */}
        {activeTab === 'surface' && (
          <div className="space-y-6 sm:space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Top Interactive Sector Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {planetarySectors.map((sector) => {
                const isSelected = activeZone.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setActiveZone(sector)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-void-900 border-ember shadow-lg shadow-ember/20 scale-[1.02]'
                        : 'bg-void-950/70 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded border"
                          style={{
                            color: sector.color,
                            borderColor: `${sector.color}40`,
                            backgroundColor: `${sector.color}15`,
                          }}
                        >
                          {sector.id}
                        </span>
                        <span className="font-mono text-[9px] text-void-400">
                          {sector.category}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-base text-white mb-1">
                        {sector.name}
                      </h4>
                      <span className="font-mono text-[10px] text-void-400 block mb-3">
                        {sector.coordinates}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/10 font-mono text-[10px] space-y-1 w-full text-void-300">
                      <div className="flex justify-between">
                        <span>ELEVATION:</span>
                        <span className="text-white font-medium">{sector.elevation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GRAVITY:</span>
                        <span className="text-white font-medium">{sector.gravity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CLEARANCE:</span>
                        <span className="text-ember font-medium">{sector.hazardRating}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Zone Deep Dive Detailed Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-ember">
                    {activeZone.id} DETAILED PROFILE
                  </span>
                  <span className="text-void-400">•</span>
                  <span className="font-mono text-xs text-emerald-400">{activeZone.status}</span>
                </div>
                <h3 className="font-sans font-extrabold text-xl sm:text-3xl text-white mb-3">
                  {activeZone.name}
                </h3>
                <p className="text-xs sm:text-sm text-void-300 font-light leading-relaxed mb-6 max-w-2xl">
                  {activeZone.id === 'SEC-ALPHA' &&
                    'The Lumina Prime biosphere is home to ancient saurian megafauna and symbiotic spore colonies that produce rhythmic phosphorescent light cycles at night.'}
                  {activeZone.id === 'SEC-BETA' &&
                    'Sub-crustal quartz ravines extending nearly five kilometers beneath the surface. Deep crystal structures resonate at harmonic audio frequencies.'}
                  {activeZone.id === 'SEC-GAMMA' &&
                    'Anomalous magnetic massifs suspended permanently above cloud banks, providing unprecedented vantage points for scientific atmospheric probes.'}
                  {activeZone.id === 'SEC-DELTA' &&
                    'Active obsidian lava calderas rich in rare extraterrestrial heavy metals and geothermal energy conduits requiring class-AAA shielding.'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-void-950 border border-white/5">
                    <span className="text-void-400 text-[9px] block">PRIMARY FLORA</span>
                    <span className="text-white font-bold">{activeZone.primaryFlora}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-void-950 border border-white/5">
                    <span className="text-void-400 text-[9px] block">SENSOR NODES</span>
                    <span className="text-cyanGlow font-bold">{activeZone.sensorNodes} Active</span>
                  </div>
                  <div className="p-3 rounded-xl bg-void-950 border border-white/5">
                    <span className="text-void-400 text-[9px] block">AVG RADIATION</span>
                    <span className="text-plasma font-bold">{activeZone.radiationAvg}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-void-950 border border-white/5">
                    <span className="text-void-400 text-[9px] block">ACCESS STATUS</span>
                    <span className="text-emerald-400 font-bold">{activeZone.clearance.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-void-950 border border-white/10 text-xs font-mono space-y-3">
                <span className="text-void-400 text-[10px] font-bold block uppercase tracking-wider">
                  MISSION READINESS PROTOCOL
                </span>
                <div className="flex items-start gap-2 text-void-300">
                  <Shield className="w-4 h-4 text-cyanGlow shrink-0 mt-0.5" />
                  <span>Atmospheric filters required during nocturnal spore blooms.</span>
                </div>
                <div className="flex items-start gap-2 text-void-300">
                  <Activity className="w-4 h-4 text-plasma shrink-0 mt-0.5" />
                  <span>Magnetic levitation harnesses operational in Sector Alpha & Gamma.</span>
                </div>
                <div className="flex items-start gap-2 text-void-300">
                  <Radio className="w-4 h-4 text-ember shrink-0 mt-0.5" />
                  <span>Sub-space comm relay synchronized with Orbit Gateway PR-04.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: ATMOSPHERIC TELEMETRY MATRIX
            ===================================================================== */}
        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-[fadeIn_0.3s_ease-out]">
            {/* 24-Hour Diurnal Chart */}
            <div className="lg:col-span-7 p-5 sm:p-7 rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-void-400 uppercase tracking-wider block mb-0.5">
                    DIURNAL CYCLE TIMELINE (24H SOL)
                  </span>
                  <h3 className="font-sans font-bold text-lg text-white">
                    {metricMeta[activeMetric].name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-void-950 p-1 rounded-full border border-white/10">
                  {['radiation', 'magnetic', 'temp'].map((k) => (
                    <button
                      key={k}
                      onClick={() => setActiveMetric(k)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all ${
                        activeMetric === k
                          ? `${metricMeta[k].badgeBg} font-bold shadow-md`
                          : 'text-void-400 hover:text-white'
                      }`}
                    >
                      {k === 'radiation' ? 'Radiation' : k === 'magnetic' ? 'Magnetic' : 'Thermal'}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="relative w-full overflow-hidden select-none">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="terminalRadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5722" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FF5722" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="terminalMagGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="terminalTempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = padding.top + innerHeight * (1 - pct);
                    const val = (chartData.minVal + pct * (chartData.maxVal - chartData.minVal)).toFixed(1);
                    return (
                      <g key={i}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="rgba(255, 255, 255, 0.07)"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={padding.left - 8}
                          y={y + 3}
                          fill="#7B7E9C"
                          fontSize="9"
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis Labels */}
                  {chartData.points.map((pt, i) => {
                    if (i % 2 !== 0) return null;
                    return (
                      <text
                        key={i}
                        x={pt.x}
                        y={chartHeight - 10}
                        fill="#7B7E9C"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {pt.data.time}
                      </text>
                    );
                  })}

                  {/* Fill & Stroke */}
                  <path d={chartData.areaD} fill={`url(#${metricMeta[activeMetric].gradId})`} />
                  <path
                    d={chartData.pathD}
                    fill="none"
                    stroke={metricMeta[activeMetric].color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Points */}
                  {chartData.points.map((pt, i) => (
                    <g
                      key={i}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer"
                    >
                      <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredPoint?.data.time === pt.data.time ? 5 : 3.5}
                        fill="#07080F"
                        stroke={metricMeta[activeMetric].color}
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>

                {hoveredPoint && (
                  <div
                    className="absolute pointer-events-none p-2.5 rounded-xl bg-void-950/95 border border-white/20 shadow-2xl text-xs font-mono -translate-x-1/2 -translate-y-full mb-3 z-30"
                    style={{
                      left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                      top: `${(hoveredPoint.y / chartHeight) * 100}%`,
                    }}
                  >
                    <div className="text-white font-bold">{hoveredPoint.data.time} • {hoveredPoint.data.label}</div>
                    <div className={metricMeta[activeMetric].accentText}>
                      {hoveredPoint.value} {metricMeta[activeMetric].unit}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Atmospheric Gas Composition */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] text-void-400 uppercase tracking-wider block">
                      SPECTROMETRIC COMPOSITION
                    </span>
                    <h3 className="font-sans font-bold text-lg text-white">Atmospheric Gas Split</h3>
                  </div>
                  <span className="font-mono text-[10px] text-cyanGlow bg-cyanGlow/10 px-2 py-0.5 rounded-full border border-cyanGlow/30">
                    1.04 ATM
                  </span>
                </div>

                {/* Stacked Gas Visualizer Bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex p-0.5 bg-void-950 border border-white/15 mb-4">
                  {atmosphericComposition.map((gas) => (
                    <div
                      key={gas.id}
                      onClick={() => setSelectedGas(gas)}
                      style={{ width: `${gas.percentage}%`, backgroundColor: gas.color }}
                      className={`h-full cursor-pointer transition-all ${
                        selectedGas.id === gas.id ? 'ring-2 ring-white scale-y-110' : ''
                      }`}
                      title={`${gas.name}: ${gas.percentage}%`}
                    />
                  ))}
                </div>

                {/* Gas Buttons */}
                <div className="space-y-1.5 mb-4">
                  {atmosphericComposition.map((gas) => (
                    <button
                      key={gas.id}
                      onClick={() => setSelectedGas(gas)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left text-xs transition-all ${
                        selectedGas.id === gas.id
                          ? 'bg-void-800 border-white/30 shadow-md'
                          : 'bg-void-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: gas.color }} />
                        <span className="font-semibold text-white">{gas.name}</span>
                      </div>
                      <span className="font-mono font-bold" style={{ color: gas.color }}>
                        {gas.percentage}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-void-950 border border-white/10 text-xs font-mono">
                <div className="flex justify-between text-white font-bold mb-1">
                  <span>{selectedGas.name}</span>
                  <span className="text-emerald-400">{selectedGas.status}</span>
                </div>
                <p className="text-[11px] text-void-300 font-sans leading-relaxed">
                  {selectedGas.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: ORBITAL SURVEILLANCE FEED & OPTICAL SHADERS
            ===================================================================== */}
        {activeTab === 'surveillance' && (
          <div className="rounded-3xl bg-void-900/90 border border-white/10 backdrop-blur-xl shadow-2xl p-4 sm:p-7 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            {/* Top Video HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-ember">
                  <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
                  LIVE ORBITAL FEED
                </span>
                <span className="text-void-400">|</span>
                <span className="text-white font-bold">{formatTimer(missionTimer)}</span>
              </div>

              {/* Optical Shaders Switcher */}
              <div className="flex items-center gap-1 bg-void-950 p-1 rounded-full border border-white/10">
                {['STANDARD', 'NIGHT_VISION', 'THERMAL'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOpticalFilter(filter)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all ${
                      opticalFilter === filter
                        ? 'bg-plasma text-white font-bold'
                        : 'text-void-400 hover:text-white'
                    }`}
                  >
                    {filter.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Viewport with Optical Filter Class */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
              <video
                ref={consoleVideoRef}
                autoPlay
                loop
                muted={isConsoleMuted}
                playsInline
                className={`w-full h-full object-cover transition-all duration-300 ${
                  opticalFilter === 'NIGHT_VISION'
                    ? 'filter saturate-[2.5] hue-rotate-[90deg] brightness-[1.2] contrast-[1.4]'
                    : opticalFilter === 'THERMAL'
                    ? 'filter invert hue-rotate-[180deg] saturate-[3] contrast-[1.6]'
                    : 'brightness-[0.9] contrast-[1.1]'
                }`}
              >
                <source src="/home.mp4" type="video/mp4" />
                <source src="/e.mp4" type="video/mp4" />
              </video>

              {/* Video Audio Toggle Overlay */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={toggleConsoleAudio}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md transition-all ${
                    isConsoleMuted
                      ? 'bg-void-950/80 border-white/20 text-void-300 hover:text-ember'
                      : 'bg-void-950/90 border-cyanGlow text-cyanGlow shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  }`}
                >
                  {isConsoleMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-ember" />
                      <span>UNMUTE SURVEILLANCE</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-cyanGlow animate-pulse" />
                      <span>AUDIO ACTIVE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scanner Grid Reticle */}
              <div className="absolute inset-0 pointer-events-none border border-cyanGlow/20 m-3 rounded-xl flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-cyanGlow/40 animate-ping" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
