import React, { useEffect, useRef, useState } from 'react';
import { hardwareMembers } from '../../data/equipment';
import { SectionHeader } from '../common/SectionHeader';
import { HardwareCard } from './HardwareCard';

interface GraduateHeaderCrackOverlayProps {
  /** Crack intensity from 0 (none) to 4 (about to shatter) */
  stage: number;
  /** Increments on each click to re-trigger dust burst */
  burstKey: number;
}

const DUST_PARTICLES = [
  { x: 18, dx: -14, dy: 20, size: 4, delay: 0 },
  { x: 26, dx: 9, dy: 28, size: 5, delay: 30 },
  { x: 35, dx: -8, dy: 24, size: 3.5, delay: 15 },
  { x: 44, dx: 16, dy: 30, size: 4.5, delay: 45 },
  { x: 52, dx: -18, dy: 26, size: 5, delay: 10 },
  { x: 61, dx: 12, dy: 32, size: 3.5, delay: 55 },
  { x: 70, dx: -10, dy: 22, size: 4, delay: 25 },
  { x: 78, dx: 15, dy: 26, size: 4.5, delay: 40 },
];

/**
 * Progressive hairline-to-fissure crack overlay rendered along the bottom
 * border of the "Graduate Students" section header on clicks 3..6.
 */
export const GraduateHeaderCrackOverlay: React.FC<GraduateHeaderCrackOverlayProps> = ({
  stage,
  burstKey,
}) => {
  if (stage <= 0) return null;

  const visibleParticles = DUST_PARTICLES.slice(0, Math.min(stage * 2, DUST_PARTICLES.length));

  return (
    <div className={`grad-crack-overlay grad-crack-stage-${stage}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 32"
        preserveAspectRatio="none"
        className="grad-crack-svg"
      >
        {/* Stage 1+: Main hairline crack */}
        <path
          d="M 110 26 L 138 22 L 154 27 L 185 20 L 210 25"
          className="grad-crack-path grad-crack-main"
        />

        {/* Stage 2+: Side branches & wider fracture */}
        {stage >= 2 && (
          <>
            <path
              d="M 154 27 L 166 15 L 180 12"
              className="grad-crack-path grad-crack-branch"
            />
            <path
              d="M 210 25 L 245 19 L 278 27 L 315 21"
              className="grad-crack-path grad-crack-main"
            />
          </>
        )}

        {/* Stage 3+: Deep branching cracks across divider */}
        {stage >= 3 && (
          <>
            <path
              d="M 60 27 L 88 21 L 110 26"
              className="grad-crack-path grad-crack-main"
            />
            <path
              d="M 245 19 L 258 8 L 274 5"
              className="grad-crack-path grad-crack-branch"
            />
            <path
              d="M 315 21 L 352 27 L 394 18 L 432 25"
              className="grad-crack-path grad-crack-main"
            />
          </>
        )}

        {/* Stage 4: Critical fracture right before wall collapse */}
        {stage >= 4 && (
          <>
            <path
              d="M 12 25 L 42 19 L 60 27"
              className="grad-crack-path grad-crack-critical"
            />
            <path
              d="M 394 18 L 412 6 L 430 11"
              className="grad-crack-path grad-crack-branch"
            />
            <path
              d="M 432 25 L 478 17 L 520 26 L 568 20 L 594 26"
              className="grad-crack-path grad-crack-critical"
            />
          </>
        )}
      </svg>

      {/* Dust / chip burst keyed by click count so each tap pops fresh rubble */}
      <div key={burstKey} className="grad-dust-burst">
        {visibleParticles.map((p, idx) => (
          <span
            key={idx}
            className="grad-dust-chip"
            style={
              {
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--chip-dx': `${p.dx}px`,
                '--chip-dy': `${p.dy}px`,
                animationDelay: `${p.delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <style>{`
        .grad-crack-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 32px;
          pointer-events: none;
          overflow: visible;
          z-index: 4;
        }

        .grad-crack-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .grad-crack-path {
          fill: none;
          stroke: var(--color-text-primary);
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.45;
        }

        .grad-crack-main {
          stroke-width: 1.6;
        }

        .grad-crack-branch {
          stroke-width: 1.15;
          opacity: 0.35;
        }

        .grad-crack-critical {
          stroke-width: 2.1;
          stroke: var(--key-blue-2);
          opacity: 0.85;
        }

        .grad-crack-stage-3 .grad-crack-main {
          opacity: 0.65;
          filter: drop-shadow(0 0 4px rgba(23, 145, 255, 0.35));
        }

        .grad-crack-stage-4 .grad-crack-main,
        .grad-crack-stage-4 .grad-crack-branch {
          stroke: var(--key-blue-2);
          opacity: 0.9;
          filter: drop-shadow(0 0 7px rgba(23, 145, 255, 0.55));
        }

        .grad-dust-burst {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .grad-dust-chip {
          position: absolute;
          bottom: 4px;
          background: var(--color-border-strong);
          border-radius: 1px;
          opacity: 0;
          animation: gradChipFall 0.55s cubic-bezier(0.25, 0.1, 0.65, 1) forwards;
        }

        @keyframes gradChipFall {
          0% {
            opacity: 0.9;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--chip-dx), var(--chip-dy)) rotate(140deg) scale(0.4);
          }
        }
      `}</style>
    </div>
  );
};

interface BrickConfig {
  id: number;
  row: number;
  col: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  scale: number;
}

// 3 rows x 8 columns = 24 masonry blocks with deterministic shatter physics.
// Center bricks blow out first; outer columns follow shortly after and tumble down.
const WALL_BRICKS: BrickConfig[] = Array.from({ length: 24 }, (_, idx) => {
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const distFromCenter = Math.abs(col - 3.5);
  const side = col < 4 ? -1 : 1;
  // Deterministic pseudo-random spread per brick
  const seed = ((idx * 37 + 13) % 19) - 9;
  return {
    id: idx,
    row,
    col,
    dx: side * (22 + distFromCenter * 18) + seed * 3.5,
    dy: 210 + row * 65 + Math.abs(seed) * 14,
    rot: side * (32 + ((idx * 29) % 58)) + seed * 4,
    delay: 150 + Math.round(distFromCenter * 38) + row * 28 + ((idx * 17) % 35),
    scale: 0.88 + ((idx * 7) % 5) * 0.04,
  };
});

const RUBBLE_CHIPS = Array.from({ length: 18 }, (_, i) => {
  const spread = ((i * 53 + 11) % 90) + 5; // 5% .. 95%
  const side = spread < 50 ? -1 : 1;
  return {
    id: i,
    left: spread,
    top: 15 + ((i * 23) % 60),
    size: 5 + (i % 6) * 2,
    dx: side * (28 + ((i * 31) % 70)),
    dy: 140 + ((i * 41) % 150),
    rot: side * (120 + ((i * 47) % 200)),
    delay: 140 + ((i * 19) % 180),
  };
});

const DUST_CLOUDS = [
  { left: 16, top: 45, size: 130, delay: 140 },
  { left: 32, top: 38, size: 170, delay: 110 },
  { left: 50, top: 42, size: 190, delay: 90 },
  { left: 68, top: 40, size: 165, delay: 120 },
  { left: 84, top: 48, size: 135, delay: 150 },
];

interface HardwareEasterEggSectionProps {
  onClose: () => void;
}

export const HardwareEasterEggSection: React.FC<HardwareEasterEggSectionProps> = ({
  onClose,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showCrumbleOverlay, setShowCrumbleOverlay] = useState(true);

  useEffect(() => {
    // Gently bring the newly broken wall into comfortable view if it's below the fold
    const scrollTimer = window.setTimeout(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top > viewportHeight * 0.62 || rect.top < 72) {
        const targetTop = Math.max(0, window.scrollY + rect.top - 96);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }, 60);

    // Clean up masonry debris overlay once all bricks have fallen away
    const cleanupTimer = window.setTimeout(() => {
      setShowCrumbleOverlay(false);
    }, 1450);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="members-section hardware-secret-section"
      aria-label="Hardware Members"
    >
      <div className="container hardware-secret-container">
        {/* Secret Content unveiled behind the crumbling wall */}
        <div className="hardware-secret-content">
          <SectionHeader
            title="Hardware Members"
            description="The silent workhorses behind our graduate students."
            actionText="Rebuild Wall"
            onActionClick={onClose}
          />

          <div className="members-grid">
            {hardwareMembers.map((item, idx) => (
              <HardwareCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        {/* Collapsing Masonry Wall Overlay */}
        {showCrumbleOverlay && (
          <div className="wall-crumble-overlay" aria-hidden="true">
            {/* Initial lightning crack flash across the wall */}
            <svg
              viewBox="0 0 800 320"
              preserveAspectRatio="none"
              className="wall-shatter-flash"
            >
              <path
                d="M 400 0 L 386 68 L 418 128 L 378 202 L 412 268 L 395 320"
                className="wall-flash-stroke"
              />
              <path
                d="M 386 68 L 285 112 L 210 95 M 418 128 L 530 155 L 625 135 M 378 202 L 260 238"
                className="wall-flash-branch"
              />
            </svg>

            {/* 3x8 staggered masonry bricks shattering downward */}
            <div className="wall-bricks-grid">
              {WALL_BRICKS.map((brick) => (
                <div
                  key={brick.id}
                  className={`wall-brick wall-brick-row-${brick.row}`}
                  style={
                    {
                      '--brick-dx': `${brick.dx}px`,
                      '--brick-dy': `${brick.dy}px`,
                      '--brick-rot': `${brick.rot}deg`,
                      '--brick-scale': brick.scale,
                      animationDelay: `${brick.delay}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* Angular flying rubble chips */}
            {RUBBLE_CHIPS.map((chip) => (
              <span
                key={chip.id}
                className="wall-rubble-chip"
                style={
                  {
                    left: `${chip.left}%`,
                    top: `${chip.top}%`,
                    width: `${chip.size}px`,
                    height: `${chip.size}px`,
                    '--rubble-dx': `${chip.dx}px`,
                    '--rubble-dy': `${chip.dy}px`,
                    '--rubble-rot': `${chip.rot}deg`,
                    animationDelay: `${chip.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}

            {/* Expanding dust clouds */}
            {DUST_CLOUDS.map((cloud, i) => (
              <span
                key={i}
                className="wall-dust-cloud"
                style={{
                  left: `${cloud.left}%`,
                  top: `${cloud.top}%`,
                  width: `${cloud.size}px`,
                  height: `${cloud.size}px`,
                  animationDelay: `${cloud.delay}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .hardware-secret-section {
          position: relative;
          overflow: visible;
        }

        .hardware-secret-container {
          position: relative;
        }

        .hardware-secret-content {
          animation: hwSectionUnveil 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes hwSectionUnveil {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
            filter: blur(4px);
          }
          45% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* Masonry Wall Overlay */
        .wall-crumble-overlay {
          position: absolute;
          inset: -12px -8px -24px -8px;
          z-index: 25;
          pointer-events: none;
          overflow: visible;
        }

        .wall-bricks-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          padding: 4px;
        }

        .wall-brick {
          background: linear-gradient(
            145deg,
            var(--color-bg-secondary) 0%,
            var(--color-bg-tertiary) 100%
          );
          border: 1.5px solid var(--color-border-strong);
          border-radius: 4px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 4px 12px rgba(0, 0, 0, 0.12);
          will-change: transform, opacity;
          animation: wallBrickTumble 0.95s cubic-bezier(0.45, 0.04, 0.78, 0.32) forwards;
        }

        .wall-brick-row-1 {
          background: linear-gradient(
            145deg,
            var(--color-bg-tertiary) 0%,
            var(--color-bg-secondary) 100%
          );
        }

        @keyframes wallBrickTumble {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          14% {
            opacity: 1;
            transform: translate3d(calc(var(--brick-dx) * 0.14), -12px, 0)
              rotate(calc(var(--brick-rot) * 0.15)) scale(var(--brick-scale));
          }
          75% {
            opacity: 0.82;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--brick-dx), var(--brick-dy), 0)
              rotate(var(--brick-rot)) scale(0.75);
          }
        }

        /* Crack Flash across the wall right as it gives way */
        .wall-shatter-flash {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          opacity: 0;
          animation: wallFlash 0.38s ease-out forwards;
        }

        .wall-flash-stroke {
          fill: none;
          stroke: var(--key-blue-2);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 12px rgba(23, 145, 255, 0.85));
        }

        .wall-flash-branch {
          fill: none;
          stroke: var(--key-blue-3);
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 8px rgba(71, 255, 255, 0.7));
        }

        @keyframes wallFlash {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          65% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
          }
        }

        /* Flying Rubble Chips */
        .wall-rubble-chip {
          position: absolute;
          z-index: 4;
          background-color: var(--color-border-strong);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          opacity: 0;
          will-change: transform, opacity;
          animation: wallRubbleFly 0.85s cubic-bezier(0.35, 0.05, 0.72, 0.38) forwards;
        }

        @keyframes wallRubbleFly {
          0% {
            opacity: 0.95;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          18% {
            opacity: 1;
            transform: translate3d(calc(var(--rubble-dx) * 0.25), -24px, 0)
              rotate(calc(var(--rubble-rot) * 0.25)) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--rubble-dx), var(--rubble-dy), 0)
              rotate(var(--rubble-rot)) scale(0.35);
          }
        }

        /* Translucent Dust Puff Clouds */
        .wall-dust-cloud {
          position: absolute;
          z-index: 2;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.3);
          background: radial-gradient(
            circle,
            rgba(148, 163, 184, 0.34) 0%,
            rgba(148, 163, 184, 0.14) 45%,
            transparent 72%
          );
          opacity: 0;
          will-change: transform, opacity;
          animation: wallDustPuff 0.95s ease-out forwards;
        }

        @keyframes wallDustPuff {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.35);
          }
          22% {
            opacity: 0.85;
            transform: translate(-50%, -42%) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -18%) scale(1.85);
          }
        }

        @media (max-width: 640px) {
          .wall-bricks-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(6, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
