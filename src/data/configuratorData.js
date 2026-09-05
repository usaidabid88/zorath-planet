/**
 * Flight Trajectory & Exo-Suit Configurator Mock Data Engine
 * Generated with domain-accurate sci-fi astrophysics and equipment metrics.
 */

export const flightTrajectories = [
  {
    id: 'TRJ-01',
    name: 'Hohmann Planetary Transfer',
    code: 'ORBITAL-STANDARD',
    durationDays: 18.4,
    deltaV: '12.8 km/s',
    propulsionType: 'Xenon-Ion Continuous Thrust',
    gForceAvg: '1.1 G',
    radiationShielding: 'CLASS-B COMPOSITE',
    comfortClass: 'Standard Explorer',
    basePrice: 14500,
    departureOrbit: 'Earth L2 Gateway',
    arrivalOrbit: 'Zorath-9 Geosynchronous Apex',
    transitRisk: 'MINIMAL (0.02%)',
    color: '#00F0FF',
    description: 'Fuel-efficient, gentle acceleration transfer ideal for first-time civilian explorers and scientific researchers.',
  },
  {
    id: 'TRJ-02',
    name: 'High-Thrust Plasma Cycler',
    code: 'PLASMA-EXPRESS',
    durationDays: 7.2,
    deltaV: '28.4 km/s',
    propulsionType: 'Pulsed Magneto-Plasma (VASIMR)',
    gForceAvg: '2.2 G (Compensated)',
    radiationShielding: 'CLASS-A ACTIVE MAGNETIC',
    comfortClass: 'Pioneer Expedited',
    basePrice: 28900,
    departureOrbit: 'Lunar High Orbit Station',
    arrivalOrbit: 'Zorath-9 Low Polar Orbit',
    transitRisk: 'LOW (0.08%)',
    color: '#7B61FF',
    description: 'Fast-transit corridor cutting voyage time by more than half utilizing high-density magnetic plasma burn arcs.',
  },
  {
    id: 'TRJ-03',
    name: 'Sub-Light Relativistic Warp Transit',
    code: 'WARP-VIP',
    durationDays: 1.8,
    deltaV: '0.12 c (Relativistic)',
    propulsionType: 'Antimatter-Catalyzed Micro-Singularity',
    gForceAvg: '0.85 G (Inertial Dampened)',
    radiationShielding: 'CLASS-AAA QUANTUM DEFLECTION',
    comfortClass: 'Ultra-Luxury Vanguard VIP',
    basePrice: 64000,
    departureOrbit: 'Orbital Spire Zenith',
    arrivalOrbit: 'Direct Surface Descent Corridor',
    transitRisk: 'NOMINAL (<0.01%)',
    color: '#FF5722',
    description: 'Instantaneous sub-light luxury corridor with private gravity staterooms, zero-lag subspace comms, and premier culinary bio-printers.',
  },
];

export const suitCategories = {
  armor: {
    id: 'armor',
    name: 'Exo-Chassis Armor',
    icon: 'Shield',
    options: [
      {
        id: 'ARM-01',
        name: 'Aegis Carbon Fiber Weave',
        tier: 'STANDARD',
        thermalRating: 40,
        radiationResistance: 45,
        massKg: 18,
        price: 2800,
        color: '#00F0FF',
        description: 'Lightweight pressurized carbon shell offering reliable protection against micro-meteoroids and thermal breezes.',
      },
      {
        id: 'ARM-02',
        name: 'Chrono-Quartz Monocrystal Shell',
        tier: 'PIONEER',
        thermalRating: 70,
        radiationResistance: 75,
        massKg: 14,
        price: 5400,
        color: '#7B61FF',
        description: 'Hardened quartz composite utilizing Zorath crystalline resonance to dissipate electromagnetic discharge.',
      },
      {
        id: 'ARM-03',
        name: 'Void Titanium Nanoweave',
        tier: 'VANGUARD',
        thermalRating: 95,
        radiationResistance: 98,
        massKg: 9,
        price: 9800,
        color: '#FF5722',
        description: 'Self-repairing liquid titanium lattice engineered for extreme volcanic caldera and high-radiation anomaly zones.',
      },
    ],
  },
  rebreather: {
    id: 'rebreather',
    name: 'Atmospheric Life-Support',
    icon: 'Wind',
    options: [
      {
        id: 'REB-01',
        name: 'Dual-Vortex O₂ Recycler',
        tier: 'STANDARD',
        autonomyHours: 36,
        xenonFilterEff: 88,
        massKg: 8,
        price: 1900,
        color: '#00F0FF',
        description: 'Dual chemical scrubbers providing 36 hours of continuous bio-compatible oxygen generation.',
      },
      {
        id: 'REB-02',
        name: 'Cryo-Ion Hyper-Scrubber',
        tier: 'PIONEER',
        autonomyHours: 84,
        xenonFilterEff: 96,
        massKg: 6,
        price: 3800,
        color: '#7B61FF',
        description: 'Cryogenic moisture extractor and high-efficiency noble gas condenser for multi-day surface traversals.',
      },
      {
        id: 'REB-03',
        name: 'Closed-Loop Micro-Algal Biome',
        tier: 'VANGUARD',
        autonomyHours: 192,
        xenonFilterEff: 99.9,
        massKg: 4,
        price: 6500,
        color: '#FF5722',
        description: 'Bioluminescent micro-algal lung matrix with infinite metabolic recycling and instant spore neutralization.',
      },
    ],
  },
  mobility: {
    id: 'mobility',
    name: 'Planetary Mobility Rig',
    icon: 'Zap',
    options: [
      {
        id: 'MOB-01',
        name: 'Magnetic Basalt Anchors',
        tier: 'STANDARD',
        agilityScore: 45,
        jumpAssistMeters: 2,
        massKg: 10,
        price: 1400,
        color: '#00F0FF',
        description: 'High-adhesion magnetic boot servos designed for steep crystalline cliff scrambles and uneven terrain.',
      },
      {
        id: 'MOB-02',
        name: 'Micro-Ion Thruster Pack',
        tier: 'PIONEER',
        agilityScore: 78,
        jumpAssistMeters: 14,
        massKg: 7,
        price: 4200,
        color: '#7B61FF',
        description: 'Twin vectorable cold-gas thrusters enabling leap-assisted chasm crossing and soft terrain descents.',
      },
      {
        id: 'MOB-03',
        name: 'Anti-Gravity Levitation Harness',
        tier: 'VANGUARD',
        agilityScore: 98,
        jumpAssistMeters: 60,
        massKg: 3,
        price: 8200,
        color: '#FF5722',
        description: 'Zero-G field generator permitting sustained glides between floating basalt spires without physical ground contact.',
      },
    ],
  },
  sensors: {
    id: 'sensors',
    name: 'HUD & Sensor Array',
    icon: 'Radio',
    options: [
      {
        id: 'SEN-01',
        name: 'Spectral Polarized Visor',
        tier: 'STANDARD',
        scanRangeKm: 5,
        aiAnalysisScore: 50,
        massKg: 1.5,
        price: 1200,
        color: '#00F0FF',
        description: 'High-contrast chromatic HUD displaying thermal horizons, atmospheric pressure, and beacon waypoints.',
      },
      {
        id: 'SEN-02',
        name: 'Seismic Echo Ground Radar',
        tier: 'PIONEER',
        scanRangeKm: 25,
        aiAnalysisScore: 82,
        massKg: 2,
        price: 2900,
        color: '#7B61FF',
        description: 'Sub-surface ground-penetrating radar detecting subterranean quartz caverns and crystal geysers.',
      },
      {
        id: 'SEN-03',
        name: 'Quantum Flora & Biosphere AI',
        tier: 'VANGUARD',
        scanRangeKm: 70,
        aiAnalysisScore: 99,
        massKg: 1.2,
        price: 5100,
        color: '#FF5722',
        description: 'Autonomous neural bio-scanner that identifies alien taxonomy, spore toxicity, and specimen genetics in real-time.',
      },
    ],
  },
};

/**
 * Compute overall expedition gear readiness index and total package investment
 */
export function calculateLoadoutStats(selectedTrajectory, selectedSuit) {
  const armor = selectedSuit.armor || suitCategories.armor.options[0];
  const rebreather = selectedSuit.rebreather || suitCategories.rebreather.options[0];
  const mobility = selectedSuit.mobility || suitCategories.mobility.options[0];
  const sensors = selectedSuit.sensors || suitCategories.sensors.options[0];

  const totalEquipmentCost =
    armor.price + rebreather.price + mobility.price + sensors.price;
  const grandTotal = selectedTrajectory.basePrice + totalEquipmentCost;
  const totalMassKg =
    armor.massKg + rebreather.massKg + mobility.massKg + sensors.massKg;

  // Composite Readiness Score (0 - 100%)
  const compositeScore = Math.round(
    (armor.radiationResistance * 0.3 +
      (rebreather.autonomyHours / 192) * 100 * 0.25 +
      mobility.agilityScore * 0.25 +
      sensors.aiAnalysisScore * 0.2)
  );

  let readinessTier = 'STANDARD EXPLORER';
  let tierColor = 'text-cyanGlow';
  if (compositeScore > 85) {
    readinessTier = 'DEEP VANGUARD READY';
    tierColor = 'text-ember';
  } else if (compositeScore > 65) {
    readinessTier = 'PIONEER CORRIDOR READY';
    tierColor = 'text-plasma';
  }

  return {
    totalEquipmentCost,
    grandTotal,
    totalMassKg,
    compositeScore,
    readinessTier,
    tierColor,
    armor,
    rebreather,
    mobility,
    sensors,
  };
}
