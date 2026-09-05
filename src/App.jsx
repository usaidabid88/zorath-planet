import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import PlanetaryTerminal from './components/PlanetaryTerminal';
import Protocol from './components/Protocol';
import ExpeditionSuite from './components/ExpeditionSuite';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CustomCursor from './components/CustomCursor';
import StarfieldBackground from './components/StarfieldBackground';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedLoadout, setSelectedLoadout] = useState(null);

  const openBooking = (loadout = null) => {
    setSelectedLoadout(loadout);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedLoadout(null);
  };

  return (
    <div className="relative w-full max-w-full min-h-screen bg-void text-ghost antialiased selection:bg-ember selection:text-white overflow-x-hidden">
      {/* Interactive Deep Space Starfield Background */}
      <StarfieldBackground />

      {/* Interactive Custom Cursor & Dynamic Spotlight */}
      <CustomCursor />

      {/* Editorial Header Navigation with Integrated Audio Controls */}
      <Navbar onOpenBooking={openBooking} />

      {/* Streamlined Editorial Chapters */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* Chapter 1: Cinematic Hero & First Contact */}
        <Hero onOpenBooking={openBooking} />

        {/* Chapter 2: Institutional Philosophy & Ministry Accreditation */}
        <Philosophy />

        {/* Chapter 3: Unified Planetary Exploration Terminal (Surveys, Telemetry, Surveillance Feed) */}
        <PlanetaryTerminal />

        {/* Chapter 4: Pioneer Safety Protocols & Planetary Directives */}
        <Protocol />

        {/* Chapter 5: Complete Expedition Suite (Clearance Tiers, Flight Orbit, Exo-Suit Loadout) */}
        <ExpeditionSuite onOpenBooking={openBooking} />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Expedition Booking Manifest Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
        initialLoadout={selectedLoadout}
      />
    </div>
  );
}
