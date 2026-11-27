import React, { useCallback, useEffect, useRef, useState } from 'react';
import { hardwareMembers } from '../../data/equipment';
import { SectionHeader } from '../common/SectionHeader';
import { HardwareCard } from './HardwareCard';

const UNLOCK_CLICKS = 5;

interface SparkleConfig {
  id: number;
  left: number;
  top: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
  kind: 'star' | 'dot';
}

const SPARKLE_COLORS = ['#1791FF', '#47FFFF', '#fbbf24', '#a78bfa', '#38bdf8', '#003BD1'];

const SPARKLES: SparkleConfig[] = Array.from({ length: 24 }, (_, i) => {
  const left = 3 + ((i * 4.1 + (i % 3) * 1.9) % 92);
  const spread = ((i % 5) - 2) * 26;
  return {
    id: i,
    left,
    top: 8 + ((i * 17) % 86),
    dx: spread + (i % 2 === 0 ? -14 : 16),
    dy: -(38 + ((i * 19) % 66)),
    size: i % 3 === 0 ? 19 : i % 3 === 1 ? 13 : 8,
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    delay: (i % 6) * 55,
    kind: i % 3 === 2 ? 'dot' : 'star',
  };
});

/**
 * Synthesizes a light, magical "뾰로롱~" bell arpeggio via Web Audio API.
 */
function playPpyororongChime(toSuit: boolean) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const notes = toSuit
      ? [1046.5, 1318.5, 1568.0, 1975.5, 2093.0] // C6 -> E6 -> G6 -> B6 -> C7 ("뾰로롱!")
      : [1568.0, 1318.5, 1046.5, 783.99]; // G6 -> E6 -> C6 -> G5

    const now = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.055);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.015, now + idx * 0.055 + 0.18);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
      gain.gain.linearRampToValueAtTime(0.065, now + idx * 0.055 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.26);
    });

    window.setTimeout(() => {
      ctx.close().catch(() => {});
    }, 900);
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

export const HardwareEasterEggSection: React.FC = () => {
  const [isSuitMode, setIsSuitMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  const clickCountRef = useRef(0);
  const clickResetTimerRef = useRef<number | null>(null);
  const sparkleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clickResetTimerRef.current !== null) window.clearTimeout(clickResetTimerRef.current);
      if (sparkleTimerRef.current !== null) window.clearTimeout(sparkleTimerRef.current);
    };
  }, []);

  const triggerSuitToggle = useCallback((nextSuit: boolean) => {
    clickCountRef.current = 0;
    setIsSuitMode(nextSuit);
    setClickCount(0);
    setBurstKey((prev) => prev + 1);
    setShowSparkles(true);
    playPpyororongChime(nextSuit);

    if (sparkleTimerRef.current !== null) {
      window.clearTimeout(sparkleTimerRef.current);
    }
    sparkleTimerRef.current = window.setTimeout(() => {
      setShowSparkles(false);
    }, 1250);
  }, []);

  const handleTitleClick = useCallback(() => {
    if (clickResetTimerRef.current !== null) {
      window.clearTimeout(clickResetTimerRef.current);
    }

    const next = clickCountRef.current + 1;
    if (next >= UNLOCK_CLICKS) {
      triggerSuitToggle(!isSuitMode);
      return;
    }

    clickCountRef.current = next;
    setClickCount(next);
    clickResetTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
      setClickCount(0);
    }, 2200);
  }, [isSuitMode, triggerSuitToggle]);

  return (
    <section className="members-section hardware-members-section" aria-label="Hardware Members">
      <div className="container hardware-members-container">
        <div className="members-hardware-divider" role="separator" aria-hidden="true">
          <span className="members-hardware-divider-line" />
        </div>

        {/* Magical "뾰로롱✨" Sparkle Burst */}
        {showSparkles && (
          <div key={burstKey} className="hw-sparkle-burst" aria-hidden="true">
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

        <SectionHeader
          title="Hardware Members"
          onTitleClick={handleTitleClick}
          titleClassName={clickCount >= 2 ? `hw-title-charging charge-${clickCount}` : ''}
          titleSuffix={
            <>
              {clickCount >= 2 && (
                <span key={clickCount} className="hw-click-hint-star" aria-hidden="true">
                  ✦
                </span>
              )}
              {isSuitMode && (
                <span className="hw-suit-active-pill" title="Executive Suit Mode Active!">
                  ✦ Suit Up!
                </span>
              )}
            </>
          }
          actionText={isSuitMode ? 'Casual Mode' : undefined}
          onActionClick={isSuitMode ? () => triggerSuitToggle(false) : undefined}
        />

        <div className="members-grid">
          {hardwareMembers.map((item, idx) => (
            <HardwareCard
              key={item.id}
              item={item}
              index={idx}
              isSuitMode={isSuitMode}
              transformSeq={burstKey}
            />
          ))}
        </div>
      </div>

      <style>{`
        .hardware-members-section {
          padding-top: 0 !important;
        }

        .hardware-members-container {
          position: relative;
        }

        .members-hardware-divider {
          padding-top: clamp(44px, 5.5vw, 64px);
          padding-bottom: clamp(40px, 5vw, 56px);
        }

        .members-hardware-divider-line {
          display: block;
          width: 100%;
          height: 2px;
          background-color: #94a3b8;
          opacity: 0.65;
          border-radius: 1px;
        }

        [data-theme='dark'] .members-hardware-divider-line {
          background-color: #64748b;
          opacity: 0.7;
        }

        /* Subtle charging bounce on clicks 2..4 */
        .hw-title-charging.charge-2,
        .hw-title-charging.charge-4 {
          animation: hwTitleChargeBounceA 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hw-title-charging.charge-3 {
          animation: hwTitleChargeBounceB 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes hwTitleChargeBounceA {
          0% { transform: scale(1); }
          50% { transform: scale(1.045) translateY(-1.5px); }
          100% { transform: scale(1); }
        }

        @keyframes hwTitleChargeBounceB {
          0% { transform: scale(1); }
          50% { transform: scale(1.055) translateY(-2px); }
          100% { transform: scale(1); }
        }

        .hw-click-hint-star {
          display: inline-block;
          font-size: 0.85rem;
          color: var(--key-blue-2);
          text-shadow: 0 0 8px rgba(23, 145, 255, 0.6);
          animation: hwHintTwinkle 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes hwHintTwinkle {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-45deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.25) rotate(15deg);
          }
          100% {
            opacity: 0.85;
            transform: scale(1) rotate(0deg);
          }
        }

        .hw-suit-active-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 9px;
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: #ffffff;
          background: linear-gradient(135deg, var(--key-blue-1), var(--key-blue-2));
          box-shadow: 0 2px 10px rgba(23, 145, 255, 0.3);
          animation: hwHintTwinkle 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        /* Magical Sparkle Burst Overlay */
        .hw-sparkle-burst {
          position: absolute;
          left: 0;
          right: 0;
          top: 76px;
          height: 180px;
          pointer-events: none;
          z-index: 30;
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

        @media (max-width: 640px) {
          .members-hardware-divider {
            padding-top: 32px;
            padding-bottom: 28px;
          }
        }
      `}</style>
    </section>
  );
};
