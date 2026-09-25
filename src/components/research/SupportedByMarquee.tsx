import React from 'react';

interface Sponsor {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  height?: number;
}

const sponsors: Sponsor[] = [
  {
    id: 'iitp',
    name: 'IITP',
    fullName: 'Institute of Information & Communications Technology Planning & Evaluation (정보통신기획평가원)',
    logo: '/images/sponsors/iitp.svg',
    height: 30,
  },
  {
    id: 'nrf',
    name: 'NRF',
    fullName: 'National Research Foundation of Korea (한국연구재단)',
    logo: '/images/sponsors/nrf.svg',
    height: 30,
  },
  {
    id: 'kiost',
    name: 'KIOST',
    fullName: 'Korea Institute of Ocean Science and Technology (한국해양과학기술원)',
    logo: '/images/sponsors/kiost.svg',
    height: 30,
  },
  {
    id: 'add',
    name: 'ADD',
    fullName: 'Agency for Defense Development (국방과학연구소)',
    logo: '/images/sponsors/add.svg',
    height: 38,
  },
  {
    id: 'msit',
    name: 'MSIT',
    fullName: 'Ministry of Science and ICT (과학기술정보통신부)',
    logo: '/images/sponsors/msit.svg',
    height: 28,
  },
  {
    id: 'dgist',
    name: 'DGIST',
    fullName: 'Daegu Gyeongbuk Institute of Science and Technology (대구경북과학기술원)',
    logo: '/images/sponsors/dgist.png',
    height: 32,
  },
];

export const SupportedByMarquee: React.FC = () => {
  // Triple the items to ensure smooth continuous marquee across all resolutions
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="supported-by-section">
      <div className="supported-by-header">
        <span className="supported-by-kicker">Supported By</span>
        <span className="supported-by-divider">—</span>
        <span className="supported-by-caption">
          Research funded by national science foundations and public research initiatives
        </span>
      </div>

      <div className="marquee-outer" aria-label="Funding Agencies and Sponsors">
        <div className="marquee-track">
          {marqueeItems.map((sponsor, idx) => (
            <div
              key={`${sponsor.id}-${idx}`}
              className="marquee-item"
              title={`${sponsor.name}: ${sponsor.fullName}`}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} Logo`}
                className="sponsor-logo"
                style={{ maxHeight: sponsor.height ? `${sponsor.height}px` : '32px' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .supported-by-section {
          margin-top: clamp(48px, 6vw, 72px);
          padding-top: var(--space-xl);
          border-top: 1px solid var(--color-border);
        }

        .supported-by-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--space-lg);
          flex-wrap: wrap;
        }

        .supported-by-kicker {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
        }

        .supported-by-divider {
          color: var(--color-border-strong);
          font-size: 12px;
        }

        .supported-by-caption {
          font-size: 13px;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* Marquee Outer Container with Left and Right Subtle Fade */
        .marquee-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 16px 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }

        /* Scrolling Track */
        .marquee-track {
          display: flex;
          align-items: center;
          gap: clamp(48px, 5vw, 72px);
          width: max-content;
          animation: marqueeInfinite 36s linear infinite;
          will-change: transform;
        }

        /* Pause animation on hover */
        .marquee-outer:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          cursor: default;
          user-select: none;
        }

        /* Monochrome and low opacity by default */
        .sponsor-logo {
          width: auto;
          max-width: 190px;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.45;
          transition: all var(--transition-normal);
        }

        /* Dark mode support: soften dark logos */
        [data-theme="dark"] .sponsor-logo {
          filter: grayscale(100%) brightness(1.7) contrast(1.1);
          opacity: 0.55;
        }

        /* Hover to highlight logo in original color and full opacity */
        .marquee-item:hover .sponsor-logo {
          filter: grayscale(0%) brightness(1);
          opacity: 1;
          transform: scale(1.05);
        }

        [data-theme="dark"] .marquee-item:hover .sponsor-logo {
          filter: grayscale(0%) brightness(1.05);
          opacity: 1;
          transform: scale(1.05);
        }

        @keyframes marqueeInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }

        @media (max-width: 768px) {
          .supported-by-section {
            margin-top: 40px;
            padding-top: var(--space-lg);
          }
          .marquee-track {
            gap: 36px;
            animation-duration: 28s;
          }
          .sponsor-logo {
            max-width: 140px;
          }
        }
      `}</style>
    </div>
  );
};
