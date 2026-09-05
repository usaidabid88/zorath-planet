/**
 * Planetary Telemetry Data & Synthetic Simulation Engine for Zorath-9
 * Generated with dataviz standards & mock-data-factory specifications.
 */

export const atmosphericComposition = [
  {
    id: 'n2',
    name: 'Nitrogen (N₂)',
    formula: 'N₂',
    percentage: 72.4,
    color: '#00F0FF', // CyanGlow
    description: 'Inert atmospheric carrier gas maintaining planetary barometric equilibrium.',
    density: '1.2506 g/L',
    toxicity: 'NON-TOXIC',
    status: 'OPTIMAL',
  },
  {
    id: 'o2',
    name: 'Oxygen (O₂)',
    formula: 'O₂',
    percentage: 23.6,
    color: '#10B981', // Emerald
    description: 'High-purity bio-compatible breathing mixture sustaining surface expedition teams.',
    density: '1.4290 g/L',
    toxicity: 'RESPIRABLE',
    status: 'OPTIMAL',
  },
  {
    id: 'xe',
    name: 'Xenon (Xe)',
    formula: 'Xe',
    percentage: 3.2,
    color: '#7B61FF', // Plasma
    description: 'Heavy noble gas responsible for nocturnal phosphorescence and ambient auroral ion glow.',
    density: '5.8940 g/L',
    toxicity: 'INERT',
    status: 'STABLE',
  },
  {
    id: 'ar',
    name: 'Argon (Ar)',
    formula: 'Ar',
    percentage: 0.6,
    color: '#9E86FF', // Plasma Light
    description: 'Noble gas buffer mitigating upper thermospheric thermal transfer.',
    density: '1.7840 g/L',
    toxicity: 'INERT',
    status: 'STABLE',
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide (CO₂)',
    formula: 'CO₂',
    percentage: 0.2,
    color: '#FF5722', // Ember
    description: 'Trace greenhouse constituent absorbed by giant bioluminescent spore colonies.',
    density: '1.9770 g/L',
    toxicity: 'LOW TRACE',
    status: 'NORMAL',
  },
];

export const solDiurnalCycle = [
  { time: '00:00', radiation: 0.02, magnetic: 3.8, temp: 14, ionRisk: 'SAFE', label: 'Midnight Sol' },
  { time: '02:00', radiation: 0.03, magnetic: 4.1, temp: 12, ionRisk: 'SAFE', label: 'Deep Dawn' },
  { time: '04:00', radiation: 0.05, magnetic: 4.6, temp: 11, ionRisk: 'SAFE', label: 'First Dual-Glow' },
  { time: '06:00', radiation: 0.12, magnetic: 5.4, temp: 16, ionRisk: 'MODERATE', label: 'Primary Sunrise' },
  { time: '08:00', radiation: 0.22, magnetic: 6.8, temp: 21, ionRisk: 'MODERATE', label: 'Dual-Apex Rise' },
  { time: '10:00', radiation: 0.35, magnetic: 7.9, temp: 26, ionRisk: 'ELEVATED', label: 'Solar Zenith I' },
  { time: '12:00', radiation: 0.48, magnetic: 8.7, temp: 31, ionRisk: 'HIGH', label: 'Peak Solar Ionization' },
  { time: '14:00', radiation: 0.42, magnetic: 8.2, temp: 29, ionRisk: 'ELEVATED', label: 'Solar Zenith II' },
  { time: '16:00', radiation: 0.28, magnetic: 6.9, temp: 24, ionRisk: 'MODERATE', label: 'Afternoon Decline' },
  { time: '18:00', radiation: 0.14, magnetic: 5.2, temp: 19, ionRisk: 'SAFE', label: 'Primary Sunset' },
  { time: '20:00', radiation: 0.06, magnetic: 4.3, temp: 16, ionRisk: 'SAFE', label: 'Phosphor Bloom' },
  { time: '22:00', radiation: 0.03, magnetic: 3.9, temp: 15, ionRisk: 'SAFE', label: 'Aurora Twilight' },
];

export const planetarySectors = [
  {
    id: 'SEC-ALPHA',
    name: 'Lumina Prime Biosphere',
    category: 'ECOSYSTEM',
    elevation: '+450m',
    gravity: '0.86G',
    hazardRating: 'LEVEL 1 (LOW)',
    radiationAvg: '0.03 mSv/h',
    primaryFlora: 'Bioluminescent Spore Spire',
    clearance: 'OPEN FOR ALL TIERS',
    color: '#00F0FF',
    coordinates: '03°14\'52"N 089°44\'11"W',
    sensorNodes: 24,
    status: 'OPTIMAL',
  },
  {
    id: 'SEC-BETA',
    name: 'Crystalline Rift Ravines',
    category: 'GEOLOGY',
    elevation: '-4,820m',
    gravity: '0.94G',
    hazardRating: 'LEVEL 2 (MODERATE)',
    radiationAvg: '0.08 mSv/h',
    primaryFlora: 'Sub-Crustal Quartz Flora',
    clearance: 'PIONEER & VANGUARD',
    color: '#7B61FF',
    coordinates: '14°28\'04"S 178°12\'40"E',
    sensorNodes: 18,
    status: 'ACTIVE EXPEDITION',
  },
  {
    id: 'SEC-GAMMA',
    name: 'Floating Basalt Spires',
    category: 'MAGNETIC LEVITATION',
    elevation: '+9,140m',
    gravity: '0.56G (ANOMALY)',
    hazardRating: 'LEVEL 3 (ELEVATED)',
    radiationAvg: '0.19 mSv/h',
    primaryFlora: 'Airborne Spore Lichen',
    clearance: 'PIONEER & VANGUARD',
    color: '#FF7A50',
    coordinates: '32°11\'05"S 140°09\'33"W',
    sensorNodes: 12,
    status: 'CORRIDOR OPEN',
  },
  {
    id: 'SEC-DELTA',
    name: 'Obsidian Magma Calderas',
    category: 'GEOTHERMAL',
    elevation: '+1,200m',
    gravity: '0.89G',
    hazardRating: 'LEVEL 4 (SEVERE)',
    radiationAvg: '0.34 mSv/h',
    primaryFlora: 'Thermal Extremophiles',
    clearance: 'VANGUARD GUILD ONLY',
    color: '#FF5722',
    coordinates: '68°02\'19"N 045°30\'00"E',
    sensorNodes: 8,
    status: 'SHIELD MANDATORY',
  },
];

/**
 * Filter telemetry metrics by sector ID
 */
export function getSectorById(sectorId) {
  return planetarySectors.find((s) => s.id === sectorId) || planetarySectors[0];
}

/**
 * Calculate dynamic radiation safety status
 */
export function getRadiationSafetyLabel(mSv) {
  if (mSv < 0.1) return { text: 'NOMINAL SAFE', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  if (mSv < 0.3) return { text: 'MODERATE CAUTION', color: 'text-cyanGlow', bg: 'bg-cyanGlow/20' };
  if (mSv < 0.5) return { text: 'ELEVATED SHIELD', color: 'text-ember', bg: 'bg-ember/20' };
  return { text: 'SEVERE HAZARD', color: 'text-red-400', bg: 'bg-red-500/20' };
}
