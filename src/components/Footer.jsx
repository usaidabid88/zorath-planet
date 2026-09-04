import React from 'react';
import { Compass, Mail, Phone, MapPin, Radio, Github, Twitter, Instagram, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-void-950 rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-white/10 overflow-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-plasma/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-void-800 border border-plasma/40 flex items-center justify-center p-1">
                <img
                  src="/logo.png"
                  alt="Zorath Planetary Crest"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,87,34,0.6)]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-ember font-bold text-lg">
                  Z
                </div>
              </div>
              <span className="font-sans font-bold text-lg sm:text-xl text-white tracking-wider">ZORATH</span>
            </div>
            <p className="text-void-300 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Official planetary exploration portal under the Ministry of Travel and Tourism. Cadet College Sanghar Charter.
            </p>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22C55E]" />
              <span className="text-green-400">SYSTEM OPERATIONAL</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-sans font-bold text-white text-xs sm:text-sm mb-3 sm:mb-5 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Home Base', 'Geological Survey', 'Ecosystem Data', 'Climate Log', 'Expedition Tiers', 'Archives'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-void-300 hover:text-ember text-xs sm:text-sm transition-colors hover-lift flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-void-500 group-hover:bg-ember transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-sans font-bold text-white text-xs sm:text-sm mb-3 sm:mb-5 uppercase tracking-wider">
              Communications
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2.5 sm:gap-3 text-void-300 text-xs sm:text-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-void-800 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyanGlow" />
                </div>
                <div>
                  <div className="text-void-400 text-[10px] sm:text-[11px] mb-0.5">Direct Line</div>
                  <a href="tel:+922355480014" className="text-white hover:text-ember transition-colors font-medium">
                    +92 235 5480014
                  </a>
                  <div className="text-void-400 text-[10px] sm:text-[11px] mt-0.5">Cadet College Sanghar</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3 text-void-300 text-xs sm:text-sm">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-void-800 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-plasma" />
                </div>
                <div>
                  <div className="text-void-400 text-[10px] sm:text-[11px] mb-0.5">Ministry Inquiries</div>
                  <a href="mailto:ccsanghar@gmail.com" className="text-white hover:text-ember transition-colors font-medium">
                    ccsanghar@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-sans font-bold text-white text-xs sm:text-sm mb-3 sm:mb-5 uppercase tracking-wider">
              Social Uplink
            </h4>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              {[
                { icon: '𝕏', label: 'X / Twitter', color: 'hover:bg-white/10 hover:text-white' },
                { icon: '◉', label: 'Instagram', color: 'hover:bg-[#E1306C]/20 hover:text-[#E1306C]' },
                { icon: '▶', label: 'YouTube', color: 'hover:bg-[#FF0000]/20 hover:text-[#FF0000]' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={social.label}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-void-800 border border-white/10 flex items-center justify-center text-void-300 text-base sm:text-lg transition-all hover:scale-110 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="text-[11px] sm:text-xs font-mono text-void-400 space-y-0.5 sm:space-y-1">
              <p>© 2024 Zorath Planet</p>
              <p>Ministry of Travel & Tourism</p>
              <p>Cadet College Sanghar</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-void-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyanGlow animate-pulse" />
            <span>INTERSTELLAR RELAY: SECTOR 07 • FREQUENCY 128.4 MHz</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 sm:gap-4">
            <a href="#" className="hover:text-ember transition-colors">Privacy Protocol</a>
            <span className="text-void-600">|</span>
            <a href="#" className="hover:text-ember transition-colors">Expedition Terms</a>
            <span className="text-void-600">|</span>
            <a href="#" className="hover:text-ember transition-colors">Neural Data Act</a>
          </div>
        </div>
      </div>
    </footer>
  );
}