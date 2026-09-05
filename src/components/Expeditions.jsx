import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Compass, Star } from 'lucide-react';

const tiers = [
  {
    name: 'Orbital Reconnaissance',
    tag: 'STANDARD EXPLORER',
    price: '4,800',
    unit: 'Credits / Traveler',
    duration: '3 Earth Days',
    description: 'Upper stratospheric orbit flybys and orbital sensor suite access for astronomy enthusiasts.',
    features: [
      'Low-orbit observation suite pass',
      'Atmospheric spectroscopy live feed',
      'Standard anti-gravity training',
      'Ministry Tourist Clearance Certificate',
      'Commemorative planetary holographic token',
    ],
    cta: 'Book Recon Flight',
    popular: false,
    theme: 'border-white/10 bg-void-900/60',
  },
  {
    name: 'Planetary Pioneer',
    tag: 'MOST POPULAR EXPEDITION',
    price: '14,500',
    unit: 'Credits / Traveler',
    duration: '7 Planetary Sol Cycles',
    description: 'Full surface touchdown with guided treks across crystalline rift valleys and glowing rainforests.',
    features: [
      'Touchdown at Outpost Alpha',
      'Neural bio-rebreather suit fitting',
      'Heavy Hover Rover field exploration',
      'Guided Saurian & Megafauna tracking',
      'Crystalline cave bioluminescence tour',
      '24/7 Orbital evacuation beacon',
      'Full Planetary Explorer Guild Accreditation',
    ],
    cta: 'Secure Pioneer Seat',
    popular: true,
    theme: 'border-ember bg-gradient-to-b from-void-800 via-void-900 to-void-950 shadow-[0_0_50px_rgba(255,87,34,0.25)]',
  },
  {
    name: 'Ministry Vanguard Guild',
    tag: 'CLASSIFIED RESEARCH & VIP',
    price: '36,000',
    unit: 'Credits / Traveler',
    duration: '21 Planetary Sol Cycles',
    description: 'Unrestricted access to uncharted tectonic zones, deep magma caldera research, and private orbital shuttle.',
    features: [
      'Unrestricted sector travel clearance',
      'Dedicated private suborbital shuttle',
      'Subterranean quartz cavern excavation',
      'Direct uplink to Ministry Research Council',
      'Cadet College Sanghar VIP Honorary Fellowship',
      'Customized planetary bio-suit fabrication',
    ],
    cta: 'Apply for Vanguard Access',
    popular: false,
    theme: 'border-plasma/30 bg-void-900/60',
  },
];

export default function Expeditions({ onOpenBooking }) {
  return (
    <section id="expeditions" className="relative py-14 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 bg-void-950 w-full max-w-full overflow-hidden">
      {/* Ambience glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[100vw] h-[600px] bg-ember/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-ember uppercase bg-ember/10 border border-ember/30 px-3 py-1 rounded-full">
            Interstellar Voyage Manifest
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-white mt-3 sm:mt-4 tracking-tight">
            Expedition Clearance Tiers
          </h2>
          <p className="text-void-300 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-light">
            Select your clearance level authorized by the Ministry of Travel and Tourism for the upcoming orbital launch window.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl sm:rounded-3rem p-5 sm:p-8 md:p-10 flex flex-col justify-between relative transition-all duration-300 border ${
                tier.theme
              } ${tier.popular ? 'md:-translate-y-4 ring-2 ring-ember/60' : 'hover:border-white/25'}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ember to-plasma text-white text-[10px] sm:text-[11px] font-mono tracking-wider font-bold px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Star className="w-3 h-3 fill-white" />
                  {tier.tag}
                </div>
              )}

              <div>
                {!tier.popular && (
                  <span className="font-mono text-[10px] sm:text-[11px] text-plasma font-semibold tracking-wider block mb-1.5 sm:mb-2">
                    {tier.tag}
                  </span>
                )}
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-void-300 text-xs font-light leading-relaxed mb-4 sm:mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-5 sm:mb-6 pt-3.5 sm:pt-4 border-t border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-4xl font-sans font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-xs font-mono text-void-300">
                      {tier.unit}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-cyanGlow mt-1">
                    Duration: {tier.duration}
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-void-100 font-light">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onOpenBooking}
                className={`btn-magnetic w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-ember text-white shadow-[0_0_25px_rgba(255,87,34,0.5)] hover:shadow-[0_0_35px_rgba(255,87,34,0.8)]'
                    : 'bg-void-800 hover:bg-void-700 text-ghost border border-white/10'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
