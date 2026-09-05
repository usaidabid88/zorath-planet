import React, { useEffect, useRef } from 'react';

/**
 * StarfieldBackground
 * Ultra-high-performance 2D Canvas cosmic particle field.
 * Features multi-depth parallax stars, glowing nebula dust clusters,
 * constellation connection lines, and mouse/touch inertial drift.
 */
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle density responsive adjustment
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 55 : 130;
    const maxConnectionDist = isMobile ? 70 : 110;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    // Star color palette (cyanGlow, plasma, ember, white)
    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(0, 240, 255, ',
      'rgba(123, 97, 255, ',
      'rgba(255, 87, 34, ',
    ];

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -10;
        this.z = Math.random() * 0.9 + 0.1; // Depth: 0.1 (far) to 1.0 (near)
        this.size = Math.random() * 1.8 * this.z + 0.4;
        this.baseAlpha = Math.random() * 0.6 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.03 + 0.008;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.15 * this.z;
        this.vy = (Math.random() * 0.25 + 0.08) * this.z;
        this.colorPrefix =
          Math.random() > 0.4
            ? starColors[0]
            : starColors[Math.floor(Math.random() * starColors.length)];
        this.isSpecial = Math.random() < 0.12; // Star with glowing aura
      }

      update(time) {
        this.x += this.vx + (targetMouseX - width / 2) * 0.0003 * this.z;
        this.y += this.vy + (targetMouseY - height / 2) * 0.0003 * this.z;

        // Twinkle effect
        this.alpha =
          this.baseAlpha +
          Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.25;
        this.alpha = Math.max(0.1, Math.min(0.95, this.alpha));

        // Screen wrap
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y > height + 20) this.reset(false);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorPrefix}${this.alpha})`;
        ctx.fill();

        // Glowing halos for special stars
        if (this.isSpecial) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `${this.colorPrefix}${this.alpha * 0.25})`;
          ctx.fill();
        }
      }
    }

    const stars = Array.from({ length: count }, () => new Star());

    // Nebula dust clouds
    const nebulas = [
      { x: width * 0.15, y: height * 0.25, r: 280, color: 'rgba(123, 97, 255, 0.035)' },
      { x: width * 0.85, y: height * 0.65, r: 340, color: 'rgba(255, 87, 34, 0.025)' },
      { x: width * 0.5, y: height * 0.85, r: 300, color: 'rgba(0, 240, 255, 0.025)' },
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nebulas[0].x = width * 0.15;
      nebulas[0].y = height * 0.25;
      nebulas[1].x = width * 0.85;
      nebulas[1].y = height * 0.65;
      nebulas[2].x = width * 0.5;
      nebulas[2].y = height * 0.85;
      stars.forEach((s) => s.reset(true));
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = 0;
    const render = (time) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Nebula Gradients
      nebulas.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 10, n.x, n.y, n.r);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Constellation Lines between close stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        if (s1.z < 0.4) continue; // Only connect nearer stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          if (s2.z < 0.4) continue;
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const lineAlpha = (1 - dist / maxConnectionDist) * 0.12 * Math.min(s1.alpha, s2.alpha);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Stars
      stars.forEach((star) => {
        star.update(time);
        star.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
