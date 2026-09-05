import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState('default'); // 'default', 'button', 'card', 'input'
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices with desktop width
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    let rafId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target;
      if (target.closest('button, a, select, [role="button"]')) {
        setHoverState('button');
      } else if (target.closest('.interactive-card, .video-player-box')) {
        setHoverState('card');
      } else if (target.closest('input, textarea')) {
        setHoverState('input');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const updateTrailing = () => {
      // Smooth lerp trailing
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      setTrailingPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateTrailing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isClicking
              ? 'scale-75 bg-ember'
              : hoverState === 'button'
              ? 'w-3 h-3 bg-ember scale-125 shadow-[0_0_15px_#FF5722]'
              : hoverState === 'card'
              ? 'w-2.5 h-2.5 bg-cyanGlow scale-125 shadow-[0_0_15px_#00F0FF]'
              : hoverState === 'input'
              ? 'w-1 h-4 bg-white rounded-none'
              : 'w-2 h-2 bg-white shadow-[0_0_10px_#ffffff]'
          }`}
        />
      </div>

      {/* Trailing Interactive Glow Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isClicking
              ? 'scale-90 border-ember bg-ember/20'
              : hoverState === 'button'
              ? 'w-12 h-12 border-ember/70 bg-ember/10 scale-125 shadow-[0_0_25px_rgba(255,87,34,0.35)]'
              : hoverState === 'card'
              ? 'w-14 h-14 border-cyanGlow/60 bg-cyanGlow/10 scale-110 shadow-[0_0_30px_rgba(0,240,255,0.3)]'
              : hoverState === 'input'
              ? 'w-6 h-6 border-white/40 bg-white/5'
              : 'w-8 h-8 border-white/20 bg-transparent'
          }`}
        />
      </div>

      {/* Ambient Mouse Spotlight following pointer across dark sections */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 hidden lg:block opacity-35 transition-opacity duration-500"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(123, 97, 255, 0.12) 0%, rgba(255, 87, 34, 0.05) 40%, transparent 70%)',
        }}
      />
    </>
  );
}
