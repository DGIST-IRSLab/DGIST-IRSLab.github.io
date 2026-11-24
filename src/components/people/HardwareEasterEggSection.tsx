import React, { useCallback, useEffect, useRef, useState } from 'react';
import { hardwareMembers } from '../../data/equipment';
import { SectionHeader } from '../common/SectionHeader';
import { HardwareCard } from './HardwareCard';

interface SparkleConfig {
  id: number;
  left: number; // percentage
  top: number;  // px from top of section
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
  kind: 'star' | 'dot';
}

const SPARKLE_COLORS = ['#1791FF', '#47FFFF', '#fbbf24', '#a78bfa', '#38bdf8', '#003BD1'];

const SPARKLES: SparkleConfig[] = Array.from({ length: 20 }, (_, i) => {
  const left = 6 + ((i * 4.7 + (i % 3) * 2.1) % 88);
  const spread = ((i % 5) - 2) * 24;
  return {
    id: i,
    left,
    top: 16 + ((i * 19) % 72),
    dx: spread + (i % 2 === 0 ? -12 : 14),
    dy: -(36 + ((i * 17) % 62)),
    size: i % 3 === 0 ? 18 : i % 3 === 1 ? 13 : 8,
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    delay: (i % 6) * 65,
    kind: i % 3 === 2 ? 'dot' : 'star',
  };
});

const OVERSCROLL_THRESHOLD = 340;
const FAST_SCROLL_VELOCITY = 2.4; // px/ms
const TOUCH_PULL_THRESHOLD = 85;  // px

export const HardwareEasterEggSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [chargeRatio, setChargeRatio] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const chargeRef = useRef(0);
  const decayTimerRef = useRef<number | null>(null);
  const sparkleTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const peakVelocityRef = useRef(0);
  const peakVelocityTimeRef = useRef(0);

  const touchStartYRef = useRef<number | null>(null);
  const touchNearBottomRef = useRef(false);

  const triggerReveal = useCallback(() => {
    if (decayTimerRef.current !== null) {
      window.clearTimeout(decayTimerRef.current);
      decayTimerRef.current = null;
    }
    chargeRef.current = 0;
    peakVelocityRef.current = 0;
    setChargeRatio(0);
    setIsOpen(true);
    setShowSparkles(true);

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetTop = Math.max(0, window.scrollY + rect.top - 104);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }, 80);

    if (sparkleTimerRef.current !== null) {
      window.clearTimeout(sparkleTimerRef.current);
    }
    sparkleTimerRef.current = window.setTimeout(() => {
      setShowSparkles(false);
    }, 1350);
  }, []);

  const handleHide = useCallback(() => {
    setIsOpen(false);
    setShowSparkles(false);
    chargeRef.current = 0;
    peakVelocityRef.current = 0;
    setChargeRatio(0);
  }, []);

  useEffect(() => {
    return () => {
      if (decayTimerRef.current !== null) window.clearTimeout(decayTimerRef.current);
      if (sparkleTimerRef.current !== null) window.clearTimeout(sparkleTimerRef.current);
      if (scrollTimerRef.current !== null) window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) return;

    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    const getDistFromBottom = () => {
      const docHeight = document.documentElement.scrollHeight;
      return Math.max(0, docHeight - (window.scrollY + window.innerHeight));
    };

    const scheduleChargeDecay = () => {
      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
      decayTimerRef.current = window.setTimeout(() => {
        chargeRef.current = 0;
        setChargeRatio(0);
      }, 480);
    };

    // 1) Fast downward scroll slam into the bottom of the page
    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(now - lastScrollTimeRef.current, 8);
      const dy = currentY - lastScrollYRef.current;

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      if (dy > 0) {
        const velocity = dy / dt;
        if (velocity > peakVelocityRef.current || now - peakVelocityTimeRef.current > 420) {
          peakVelocityRef.current = velocity;
          peakVelocityTimeRef.current = now;
        }
      } else if (dy < -20) {
        peakVelocityRef.current = 0;
      }

      const dist = getDistFromBottom();
      const recentFastSlam =
        now - peakVelocityTimeRef.current <= 420 && peakVelocityRef.current >= FAST_SCROLL_VELOCITY;

      if (dist <= 45 && recentFastSlam) {
        triggerReveal();
      }
    };

    // 2) Energetic downward wheel / trackpad overscroll near or at the bottom
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) {
        if (chargeRef.current > 0) {
          chargeRef.current = Math.max(0, chargeRef.current + e.deltaY * 1.5);
          setChargeRatio(Math.min(chargeRef.current / OVERSCROLL_THRESHOLD, 1));
        }
        return;
      }

      const dist = getDistFromBottom();
      if (dist <= 55) {
        chargeRef.current += Math.min(e.deltaY, 175);
      } else if (dist <= 160 && e.deltaY >= 50) {
        chargeRef.current += Math.min(e.deltaY * 0.72, 135);
      } else {
        return;
      }

      const ratio = Math.min(chargeRef.current / OVERSCROLL_THRESHOLD, 1);
      setChargeRatio(ratio);

      if (chargeRef.current >= OVERSCROLL_THRESHOLD) {
        triggerReveal();
        return;
      }

      scheduleChargeDecay();
    };

    // 3) Mobile touch pull-up past the bottom of the page
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchNearBottomRef.current = getDistFromBottom() <= 75;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchNearBottomRef.current || touchStartYRef.current === null || e.touches.length !== 1) {
        return;
      }
      const pull = touchStartYRef.current - e.touches[0].clientY;
      if (pull <= 12) return;

      const ratio = Math.min(pull / TOUCH_PULL_THRESHOLD, 1);
      setChargeRatio(ratio);

      if (pull >= TOUCH_PULL_THRESHOLD) {
        touchStartYRef.current = null;
        touchNearBottomRef.current = false;
        triggerReveal();
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchNearBottomRef.current = false;
      if (chargeRef.current === 0) {
        setChargeRatio(0);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, triggerReveal]);

  // Subtle peeking sparkle gauge only while actively pushing past the bottom
  if (!isOpen) {
    const showPeek = chargeRatio > 0.16;
    if (!showPeek) return null;

    return (
      <div className="hw-scroll-peek" aria-hidden="true">
        <div
          className="hw-scroll-peek-inner"
          style={{
            opacity: Math.min(1, (chargeRatio - 0.12) * 1.4),
            transform: `translateY(${Math.round((1 - chargeRatio) * 14)}px) scale(${0.86 + chargeRatio * 0.2})`,
          }}
        >
          <span className="hw-peek-star">✦</span>
          <span className="hw-peek-bar">
            <span
              className="hw-peek-bar-fill"
              style={{ width: `${Math.round(chargeRatio * 100)}%` }}
            />
          </span>
          <span className="hw-peek-star">✦</span>
        </div>

        <style>{`
          .hw-scroll-peek {
            display: flex;
            justify-content: center;
            padding-top: 20px;
            pointer-events: none;
          }

          .hw-scroll-peek-inner {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: transform 0.12s ease-out, opacity 0.15s ease-out;
          }

          .hw-peek-star {
            font-size: 13px;
            color: var(--key-blue-2);
            text-shadow: 0 0 8px rgba(23, 145, 255, 0.55);
          }

          .hw-peek-bar {
            width: 72px;
            height: 4px;
            border-radius: 999px;
            background: var(--color-border);
            overflow: hidden;
          }

          .hw-peek-bar-fill {
            display: block;
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--key-blue-1), var(--key-blue-2), var(--key-blue-3));
            transition: width 0.08s linear;
          }
        `}</style>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="members-section hardware-pop-section"
      aria-label="Hardware Members"
    >
      <div className="container hardware-pop-container">
        {/* Sparkle & twinkle burst ("뾰로롱✨") */}
        {showSparkles && (
          <div className="hw-sparkle-burst" aria-hidden="true">
            {SPARKLES.map((s) =>
              s.kind === 'star' ? (
                <svg
                  key={s.id}
                  viewBox="0 0 24 24"
                  className="hw-sparkle-item"
                  style={
                    {
                      left: `${s.left}%`,
                      top: `${s.top}px`,
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      color: s.color,
                      '--sp-dx': `${s.dx}px`,
                      '--sp-dy': `${s.dy}px`,
                      animationDelay: `${s.delay}ms`,
                    } as React.CSSProperties
                  }
                >
                  <path
                    fill="currentColor"
                    d="M12 1.5 L14.4 9.6 L22.5 12 L14.4 14.4 L12 22.5 L9.6 14.4 L1.5 12 L9.6 9.6 Z"
                  />
                </svg>
              ) : (
                <span
                  key={s.id}
                  className="hw-sparkle-item hw-sparkle-dot"
                  style={
                    {
                      left: `${s.left}%`,
                      top: `${s.top}px`,
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      backgroundColor: s.color,
                      '--sp-dx': `${s.dx}px`,
                      '--sp-dy': `${s.dy}px`,
                      animationDelay: `${s.delay}ms`,
                    } as React.CSSProperties
                  }
                />
              )
            )}
          </div>
        )}

        <div className="hw-header-pop">
          <SectionHeader
            title="Hardware Members"
            actionText="Hide"
            onActionClick={handleHide}
          />
        </div>

        <div className="members-grid">
          {hardwareMembers.map((item, idx) => (
            <HardwareCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>

      <style>{`
        .hardware-pop-section {
          position: relative;
          overflow: visible;
        }

        .hardware-pop-container {
          position: relative;
        }

        .hw-header-pop {
          opacity: 0;
          transform: translateY(22px) scale(0.92);
          animation: hwHeaderPpyororong 0.56s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes hwHeaderPpyororong {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.9);
          }
          65% {
            opacity: 1;
            transform: translateY(-4px) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Magical Sparkle Burst Overlay */
        .hw-sparkle-burst {
          position: absolute;
          inset: -24px 0 auto 0;
          height: 160px;
          pointer-events: none;
          z-index: 20;
          overflow: visible;
        }

        .hw-sparkle-item {
          position: absolute;
          opacity: 0;
          filter: drop-shadow(0 0 6px currentColor);
          will-change: transform, opacity;
          animation: hwSparkleFloat 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hw-sparkle-dot {
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        @keyframes hwSparkleFloat {
          0% {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.15) rotate(-45deg);
          }
          28% {
            opacity: 1;
            transform: translate3d(calc(var(--sp-dx) * 0.45), calc(var(--sp-dy) * 0.55), 0)
              scale(1.18) rotate(20deg);
          }
          65% {
            opacity: 0.9;
            transform: translate3d(calc(var(--sp-dx) * 0.85), calc(var(--sp-dy) * 0.9), 0)
              scale(0.92) rotate(75deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--sp-dx), var(--sp-dy), 0) scale(0.2) rotate(135deg);
          }
        }
      `}</style>
    </section>
  );
};
