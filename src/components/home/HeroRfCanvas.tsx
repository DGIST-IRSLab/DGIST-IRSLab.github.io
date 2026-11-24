import React, { useEffect, useRef } from 'react';

/**
 * Minimal architectural RF wavefield / phased-array canvas for the HomePage hero.
 * Renders crisp harmonic wave lines that drift smoothly and subtly focus
 * (constructive interference) near the user's cursor.
 */
export const HeroRfCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let time = 0;

    // Smoothly interpolated pointer state (normalized 0..1)
    const pointer = {
      targetX: 0.72,
      targetY: 0.5,
      x: 0.72,
      y: 0.5,
      targetStrength: 0,
      strength: 0,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        pointer.targetX = (e.clientX - rect.left) / Math.max(rect.width, 1);
        pointer.targetY = (e.clientY - rect.top) / Math.max(rect.height, 1);
        pointer.targetStrength = 1;
      } else {
        pointer.targetStrength = 0;
      }
    };

    const onPointerLeave = () => {
      pointer.targetStrength = 0;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const LINE_COUNT = 16;

    const draw = () => {
      if (width === 0 || height === 0) return;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Wavefield focal center sits naturally on the right side on desktop
      const baseFocusX = width * (width < 768 ? 0.65 : 0.74);
      const baseFocusY = height * 0.5;
      const focusX = baseFocusX + (pointer.x * width - baseFocusX) * 0.45 * pointer.strength;
      const focusY = baseFocusY + (pointer.y * height - baseFocusY) * 0.45 * pointer.strength;

      const stepX = width < 640 ? 10 : 7;

      for (let i = 0; i < LINE_COUNT; i++) {
        const norm = i / (LINE_COUNT - 1); // 0..1
        const centerWeight = 1 - Math.abs(norm - 0.5) * 2; // 1 at center, 0 at edges
        const baseY = height * (0.14 + norm * 0.72);
        const phaseOffset = i * 0.42;

        // Horizontal gradient: whisper-quiet behind left text, crisp & vivid across right side
        const grad = ctx.createLinearGradient(0, baseY, width, baseY);
        const alphaPeak = isDark
          ? 0.1 + centerWeight * 0.34
          : 0.07 + centerWeight * 0.28;

        if (isDark) {
          grad.addColorStop(0, 'rgba(23, 145, 255, 0)');
          grad.addColorStop(0.28, `rgba(23, 145, 255, ${(alphaPeak * 0.12).toFixed(3)})`);
          grad.addColorStop(0.62, `rgba(23, 145, 255, ${(alphaPeak * 0.75).toFixed(3)})`);
          grad.addColorStop(0.84, `rgba(71, 255, 255, ${(alphaPeak * 0.95).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(23, 145, 255, 0)');
        } else {
          grad.addColorStop(0, 'rgba(0, 59, 209, 0)');
          grad.addColorStop(0.28, `rgba(0, 59, 209, ${(alphaPeak * 0.1).toFixed(3)})`);
          grad.addColorStop(0.62, `rgba(0, 59, 209, ${(alphaPeak * 0.75).toFixed(3)})`);
          grad.addColorStop(0.84, `rgba(23, 145, 255, ${(alphaPeak * 1.0).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(23, 145, 255, 0)');
        }

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.85 + centerWeight * 0.85;

        for (let x = 0; x <= width + stepX; x += stepX) {
          const nx = x / Math.max(width, 1);

          // Gaussian envelope concentrating the RF signal packet toward the right / focus
          const dx = x - focusX;
          const dy = baseY - focusY;
          const distSq = dx * dx + dy * dy * 2.2;
          const spread = Math.max(width * 0.24, 180);
          const packet = Math.exp(-distSq / (2 * spread * spread));

          // FMCW-inspired chirped carrier + slow harmonic envelope
          const carrierFreq = 0.014 + nx * 0.018;
          const primaryWave =
            Math.sin(x * carrierFreq - time * 1.65 + phaseOffset) *
            (5 + packet * (34 + pointer.strength * 14)) *
            (0.35 + centerWeight * 0.65);

          const secondaryWave =
            Math.sin(x * 0.0065 + time * 0.85 - phaseOffset * 0.7) *
            (4 + packet * 10);

          // Gentle envelope ramp from left so text area stays ultra-clean
          const leftFade = Math.min(1, Math.max(0, (nx - 0.16) / 0.45));
          const y = baseY + (primaryWave + secondaryWave) * leftFade;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      if (!reducedMotion) {
        time += 0.016;
        rafId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-rf-canvas" aria-hidden="true" />;
};
