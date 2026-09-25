import React from 'react';

interface RadarLogoIconProps {
  size?: number;
  className?: string;
  isHovered?: boolean;
}

export const RadarLogoIcon: React.FC<RadarLogoIconProps> = ({
  size = 28,
  className = '',
  isHovered = false,
}) => {
  return (
    <div
      className={`radar-icon-container ${isHovered ? 'is-hovered' : ''} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="irs-radar-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#075985" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="irs-wave-grad" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id="irs-radar-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base rounded shield container */}
        <rect
          width="32"
          height="32"
          rx="7.5"
          fill="url(#irs-radar-bg)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="7"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* Outer Radar Pulse Arc */}
        <path
          className="radar-arc-outer"
          d="M 5.5 12.5 C 8.2 8.5 11.9 6.2 16 6.2 C 20.1 6.2 23.8 8.5 26.5 12.5"
          stroke="#7dd3fc"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Mid Radar Pulse Arc */}
        <path
          className="radar-arc-mid"
          d="M 8.8 15 C 10.8 12.2 13.3 10.5 16 10.5 C 18.7 10.5 21.2 12.2 23.2 15"
          stroke="#38bdf8"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Inner Radar Pulse Arc */}
        <path
          className="radar-arc-inner"
          d="M 12 17.5 C 13.2 15.8 14.5 14.8 16 14.8 C 17.5 14.8 18.8 15.8 20 17.5"
          stroke="#bae6fd"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#irs-radar-glow)"
        />

        {/* Center Transceiver Beacon Node */}
        <circle
          cx="16"
          cy="20.5"
          r="2.6"
          fill="#38bdf8"
          className="radar-beacon"
        />
        <circle
          cx="16"
          cy="20.5"
          r="1.2"
          fill="#ffffff"
        />

        {/* Characteristic IRS Harmonic Radio Wave (sine-wave oscillation across bottom) */}
        <path
          className="radar-sine-wave"
          d="M 4 23.5 C 6.5 23.5 8 20 10.5 20 C 13 20 13.5 25 16 25 C 18.5 25 19 20 21.5 20 C 24 20 25.5 23.5 28 23.5"
          stroke="url(#irs-wave-grad)"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>

      <style>{`
        .radar-icon-container {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .radar-icon-container.is-hovered,
        .radar-icon-container:hover {
          transform: scale(1.08);
        }

        .radar-icon-container.is-hovered .radar-arc-outer,
        .radar-icon-container:hover .radar-arc-outer {
          animation: radarPingOuter 1.4s infinite ease-out;
        }

        .radar-icon-container.is-hovered .radar-arc-mid,
        .radar-icon-container:hover .radar-arc-mid {
          animation: radarPingMid 1.4s infinite ease-out 0.2s;
        }

        .radar-icon-container.is-hovered .radar-beacon,
        .radar-icon-container:hover .radar-beacon {
          animation: radarCorePulse 1.4s infinite ease-in-out;
        }

        .radar-icon-container.is-hovered .radar-sine-wave,
        .radar-icon-container:hover .radar-sine-wave {
          stroke-dasharray: 40;
          animation: waveShift 1.8s infinite linear;
        }

        @keyframes radarPingOuter {
          0% {
            opacity: 0.3;
            transform: scale(0.96);
            transform-origin: 16px 20.5px;
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
            transform-origin: 16px 20.5px;
          }
          100% {
            opacity: 0.3;
            transform: scale(0.96);
            transform-origin: 16px 20.5px;
          }
        }

        @keyframes radarPingMid {
          0% {
            opacity: 0.6;
            transform: scale(0.98);
            transform-origin: 16px 20.5px;
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
            transform-origin: 16px 20.5px;
          }
          100% {
            opacity: 0.6;
            transform: scale(0.98);
            transform-origin: 16px 20.5px;
          }
        }

        @keyframes radarCorePulse {
          0%, 100% {
            r: 2.6;
            fill: #38bdf8;
          }
          50% {
            r: 3.2;
            fill: #7dd3fc;
          }
        }

        @keyframes waveShift {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 40;
          }
        }
      `}</style>
    </div>
  );
};
