import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2, ShieldCheck, Calendar, User, Mail, Phone, MapPin, Rocket } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expedition: 'pioneer',
    preferredDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          expedition: 'pioneer',
          preferredDate: '',
          message: '',
        });
      }, 2500);
    }, 1800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void-950/95 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3rem bg-void-900/95 border border-plasma/30 shadow-2xl backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-void-800 hover:bg-void-700 border border-white/10 flex items-center justify-center text-void-300 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/40 flex items-center justify-center mb-5 sm:mb-6 animate-[scaleIn_0.4s_ease-out]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
            </div>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-white mb-2">
              Expedition Request Received
            </h3>
            <p className="text-void-300 text-xs sm:text-sm font-light max-w-sm">
              The Ministry of Travel and Tourism will review your clearance application within 24 hours. Safe travels, Explorer.
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-8 md:p-10">
            {/* Header */}
            <div className="mb-6 sm:mb-8 pr-8 sm:pr-0">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-plasma uppercase bg-plasma/10 border border-plasma/30 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-plasma" />
                  OFFICIAL EXPEDITION PORTAL
                </span>
              </div>
              <h2 className="font-sans font-bold text-xl sm:text-3xl text-white mb-1.5 sm:mb-2">
                Book Your Zorath Expedition
              </h2>
              <p className="text-void-300 text-xs sm:text-sm font-light">
                Complete the clearance manifest below to reserve your place on the next orbital launch window.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-void-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Explorer Name"
                      className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3.5 text-white placeholder-void-500 text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-void-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="explorer@email.com"
                      className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3.5 text-white placeholder-void-500 text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Expedition Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                    Contact Frequency
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-void-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+00 000 000 0000"
                      className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3.5 text-white placeholder-void-500 text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                    Expedition Tier *
                  </label>
                  <select
                    name="expedition"
                    value={formData.expedition}
                    onChange={handleChange}
                    required
                    className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-white text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="recon">Orbital Reconnaissance (4,800 Cr)</option>
                    <option value="pioneer">Planetary Pioneer (14,500 Cr)</option>
                    <option value="vanguard">Ministry Vanguard (36,000 Cr)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                  Preferred Launch Window
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-void-400" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3.5 text-white text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-void-300 mb-1.5 uppercase tracking-wider">
                  Special Requests or Queries
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Dietary requirements, medical accommodations, research objectives..."
                  className="w-full bg-void-800 border border-white/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-white placeholder-void-500 text-xs sm:text-sm focus:border-plasma/50 focus:outline-none focus:ring-1 focus:ring-plasma/30 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-magnetic w-full py-3 sm:py-4 px-5 sm:px-6 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? 'bg-void-700 text-void-300 cursor-wait'
                    : 'bg-ember hover:bg-ember-600 text-white shadow-[0_0_25px_rgba(255,87,34,0.4)] hover:shadow-[0_0_35px_rgba(255,87,34,0.6)]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Clearance...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Expedition Request</span>
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-void-400 pt-1 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-cyanGlow shrink-0" />
                <span>MINISTRY SECURE TRANSMISSION • ENCRYPTED RELAY</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
