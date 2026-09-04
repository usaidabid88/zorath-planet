import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import VideoConsole from './components/VideoConsole';
import Expeditions from './components/Expeditions';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="relative min-h-screen bg-void text-ghost antialiased selection:bg-ember selection:text-white">
      {/* Interactive Custom Cursor & Spotlight */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenBooking={openBooking} />
        <Features />
        <Philosophy />
        <Protocol />
        <VideoConsole />
        <Expeditions onOpenBooking={openBooking} />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Expedition Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
    </div>
  );
}
