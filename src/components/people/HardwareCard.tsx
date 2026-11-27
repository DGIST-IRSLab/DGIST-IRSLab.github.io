import React, { useState } from 'react';
import { ExternalLink, Radio, Cpu } from 'lucide-react';
import type { HardwareMember } from '../../types';
import { getSpecialEquipmentPhoto } from '../../data/equipment';
import { assetUrl } from '../../utils/asset';

interface HardwareCardProps {
  item: HardwareMember;
  index?: number;
  isSuitMode?: boolean;
  transformSeq?: number;
}

const getBadgeClass = (variant?: HardwareMember['badgeVariant']): string => {
  switch (variant) {
    case 'radar':
      return 'hw-badge-radar';
    case 'capture':
      return 'hw-badge-capture';
    case 'imaging':
      return 'hw-badge-imaging';
    case 'sdr':
      return 'hw-badge-sdr';
    case 'thermal':
      return 'hw-badge-thermal';
    case 'robot':
      return 'hw-badge-robot';
    case 'upcoming':
    default:
      return 'hw-badge-upcoming';
  }
};

const getTieColors = (variant?: HardwareMember['badgeVariant']): { main: string; light: string } => {
  switch (variant) {
    case 'radar':
      return { main: '#003BD1', light: '#3b6ef5' };
    case 'capture':
      return { main: '#1791FF', light: '#5cb4ff' };
    case 'imaging':
      return { main: '#0e7490', light: '#22a6c4' };
    case 'sdr':
      return { main: '#4338ca', light: '#818cf8' };
    case 'thermal':
      return { main: '#c2410c', light: '#f97316' };
    case 'robot':
      return { main: '#334155', light: '#64748b' };
    default:
      return { main: '#475569', light: '#64748b' };
  }
};

/**
 * Tailored studio executive suit & color-coordinated necktie SVG layer.
 */
const SuitOverlaySvg: React.FC<{ id: string; variant?: HardwareMember['badgeVariant'] }> = ({
  id,
  variant,
}) => {
  const tie = getTieColors(variant);
  const gradId = `suit-grad-${id}`;

  return (
    <svg
      viewBox="0 0 200 250"
      preserveAspectRatio="xMidYMax slice"
      className="hw-suit-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26344d" />
          <stop offset="55%" stopColor="#192336" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      {/* Soft contact shadow right below the hardware "head" */}
      <ellipse cx="100" cy="165" rx="34" ry="7.5" fill="rgba(15, 23, 42, 0.16)" />

      {/* Suit jacket torso & tailored shoulders */}
      <path
        d="M 10 252 L 18 194 C 22 178 44 170 72 164 L 100 164 L 128 164 C 156 170 178 178 182 194 L 190 252 Z"
        fill={`url(#${gradId})`}
      />

      {/* Crisp white dress shirt V-front */}
      <polygon points="75,163 100,232 125,163" fill="#f8fafc" />
      <polygon points="75,163 100,232 100,163" fill="#eef2f6" opacity="0.55" />

      {/* Matching necktie (knot + tapered blade + silk highlight) */}
      <polygon points="94,166 106,166 103,178 97,178" fill={tie.main} />
      <polygon points="97,178 103,178 108,224 100,234 92,224" fill={tie.main} />
      <polygon points="98,179 101,179 103,221 100,228 97,221" fill={tie.light} opacity="0.45" />

      {/* Crisp folded white shirt collar wings */}
      <polygon points="74,162 94,166 86,184 70,174" fill="#ffffff" stroke="#d5dde8" strokeWidth="0.9" />
      <polygon points="126,162 106,166 114,184 130,174" fill="#ffffff" stroke="#d5dde8" strokeWidth="0.9" />

      {/* Tailored jacket lapels */}
      <polygon
        points="73,163 60,185 71,191 65,199 99,235 80,186"
        fill="#2e3f5c"
        stroke="#131c2e"
        strokeWidth="0.8"
      />
      <polygon
        points="127,163 140,185 129,191 135,199 101,235 120,186"
        fill="#2e3f5c"
        stroke="#131c2e"
        strokeWidth="0.8"
      />

      {/* Matching pocket square on breast pocket */}
      <polygon points="134,218 143,210 149,215 153,211 157,218" fill={tie.light} opacity="0.92" />
      <line x1="132" y1="218" x2="159" y2="218" stroke="#0f172a" strokeWidth="1.6" />

      {/* Subtle jacket center button */}
      <circle cx="100" cy="242" r="2.6" fill="#0f172a" stroke="#3b4c68" strokeWidth="0.8" />
    </svg>
  );
};

export const HardwareCard: React.FC<HardwareCardProps> = ({
  item,
  index = 0,
  isSuitMode = false,
  transformSeq = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const [specialError, setSpecialError] = useState(false);

  const specialPhoto = getSpecialEquipmentPhoto(item);
  const hasSpecial = Boolean(specialPhoto && !specialError);
  const photoFit = item.photoFit ?? 'contain';
  const canWearSuit = (item.wearSuit ?? item.badgeVariant !== 'robot') && !item.isComingSoon;
  const activeSuit = isSuitMode && canWearSuit;
  const shouldAnimateTransform = transformSeq > 0 && canWearSuit;
  const staggerMs = Math.min(index, 12) * 42;
  const popTilt = index % 2 === 0 ? '-2.2deg' : '2.2deg';

  const renderPhotoContent = () => {
    if (item.isComingSoon) {
      return (
        <div className="hw-recruiting-head">
          <div className="hw-recruiting-circle">
            <Radio size={26} strokeWidth={1.7} />
          </div>
          <span className="hw-recruiting-tagline">We welcome new gear!</span>
        </div>
      );
    }

    const photoClass = activeSuit
      ? `hw-photo-img ${
          photoFit === 'cover' ? 'hw-photo-suit-cover' : 'hw-photo-suit-head'
        } ${hasSpecial ? 'has-special' : ''}`
      : `hw-photo-img ${
          photoFit === 'cover' ? 'hw-photo-full-cover' : 'hw-photo-full-contain'
        } ${hasSpecial ? 'has-special' : ''}`;

    return (
      <>
        {/* Hardware product photo */}
        {!imageError && item.photo ? (
          <img
            src={assetUrl(item.photo)}
            alt={item.name}
            onError={() => setImageError(true)}
            loading="lazy"
            className={photoClass}
          />
        ) : (
          <div className="hw-recruiting-head">
            <div className="hw-recruiting-circle">
              <Cpu size={24} strokeWidth={1.6} />
            </div>
          </div>
        )}

        {/* Executive Suit & Tie Overlay when Suit Mode is unlocked (non-robot items only) */}
        {activeSuit && <SuitOverlaySvg id={item.id} variant={item.badgeVariant} />}

        {/* Card-level mini sparkle stars on transformation */}
        {shouldAnimateTransform && (
          <div
            key={`sp-${transformSeq}`}
            className="hw-card-mini-sparkles"
            style={{ animationDelay: `${staggerMs}ms` }}
            aria-hidden="true"
          >
            <span className="hw-mini-star s1">✦</span>
            <span className="hw-mini-star s2">✦</span>
            <span className="hw-mini-star s3">✦</span>
          </div>
        )}

        {hasSpecial && (
          <img
            src={assetUrl(specialPhoto)}
            alt={`${item.name} in lab`}
            onError={() => setSpecialError(true)}
            loading="lazy"
            className="hw-photo-img hw-photo-special"
          />
        )}
      </>
    );
  };

  return (
    <div
      className={`hw-member-card ${item.isComingSoon ? 'hw-member-card-upcoming' : ''} ${
        activeSuit ? 'is-suited' : ''
      }`}
      id={item.id}
    >
      {/* Photo Container matching PersonCard 4:5 aspect ratio */}
      <div
        key={shouldAnimateTransform ? `frame-${transformSeq}` : 'frame-init'}
        className={`hw-photo-container ${item.isComingSoon ? 'hw-photo-container-upcoming' : ''} ${
          shouldAnimateTransform ? 'hw-transform-pop' : ''
        }`}
        style={
          shouldAnimateTransform
            ? ({
                animationDelay: `${staggerMs}ms`,
                '--pop-tilt': popTilt,
              } as React.CSSProperties)
            : undefined
        }
      >
        {item.url && !item.isComingSoon ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.name} product page`}
            className="hw-photo-link"
          >
            {renderPhotoContent()}
          </a>
        ) : (
          renderPhotoContent()
        )}

        {/* Subtle bottom hover spec strip */}
        {item.specs && item.specs.length > 0 && !item.isComingSoon && (
          <div className="hw-hover-specs" aria-hidden="true">
            {item.specs.map((spec) => (
              <div key={spec.label} className="hw-hover-spec-row">
                <span className="hw-hover-spec-label">{spec.label}</span>
                <span className="hw-hover-spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Body matching PersonCard */}
      <div className="hw-card-body">
        <div className="hw-name-row">
          <h4 className="hw-name-heading">
            {item.url && !item.isComingSoon ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="hw-name-link"
              >
                <span>{item.name}</span>
                <ExternalLink
                  size={11}
                  className="hw-name-icon"
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </h4>
        </div>

        <div className="hw-role-badge-wrap">
          <span className={`hw-role-badge ${getBadgeClass(item.badgeVariant)}`} title={item.role}>
            {item.role}
          </span>
        </div>

        {item.vendor && <div className="hw-meta-vendor">{item.vendor}</div>}
      </div>

      <style>{`
        .hw-member-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          overflow: visible;
        }

        .hw-member-card-upcoming {
          border-style: dashed;
          border-color: var(--color-border-strong);
          background-color: var(--color-bg-secondary);
        }

        /* Clean White Studio Backdrop (Sharp Editorial Frame) */
        .hw-photo-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #ffffff;
          overflow: hidden;
          border-radius: 0;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hw-transform-pop {
          animation: hwPpyororongCardPop 0.58s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes hwPpyororongCardPop {
          0% {
            transform: scale(0.86) translateY(10px) rotate(var(--pop-tilt, -2deg));
          }
          52% {
            transform: scale(1.045) translateY(-5px) rotate(calc(var(--pop-tilt, -2deg) * -0.4));
            box-shadow: 0 10px 26px rgba(23, 145, 255, 0.22);
          }
          100% {
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }

        .hw-photo-container-upcoming {
          background: radial-gradient(
            ellipse 85% 70% at 50% 35%,
            var(--color-bg-secondary) 0%,
            var(--color-bg-tertiary) 100%
          );
        }

        .hw-photo-link {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .hw-suit-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;
          animation: hwSuitSlideUp 0.48s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes hwSuitSlideUp {
          from {
            opacity: 0;
            transform: translateY(28%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hw-photo-img {
          display: block;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Clean studio product framing (Default) */
        .hw-photo-full-contain {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 16px;
          z-index: 2;
        }

        .hw-photo-full-cover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 2;
        }

        /* Executive Suit Portrait Framing ("뾰로롱" Suit Mode) */
        .hw-photo-suit-head {
          position: absolute;
          top: 7%;
          left: 10%;
          width: 80%;
          height: 56%;
          object-fit: contain;
          z-index: 2;
        }

        .hw-photo-suit-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 69%;
          object-fit: cover;
          object-position: center 35%;
          z-index: 2;
        }

        .hw-member-card:hover .hw-photo-full-contain:not(.has-special),
        .hw-member-card:hover .hw-photo-full-cover:not(.has-special) {
          transform: scale(1.05);
        }

        .hw-member-card:hover .hw-photo-suit-head:not(.has-special) {
          transform: translateY(-3px) scale(1.05) rotate(-1.5deg);
        }

        .hw-member-card:hover .hw-photo-suit-cover:not(.has-special) {
          transform: scale(1.04);
        }

        /* Mini sparkles inside each card during transformation */
        .hw-card-mini-sparkles {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
        }

        .hw-mini-star {
          position: absolute;
          font-size: 14px;
          opacity: 0;
          animation: hwMiniStarPop 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hw-mini-star.s1 {
          left: 16%;
          top: 52%;
          color: #1791FF;
          --ms-dx: -12px;
          --ms-dy: -24px;
        }

        .hw-mini-star.s2 {
          right: 16%;
          top: 48%;
          color: #fbbf24;
          font-size: 16px;
          animation-delay: 70ms;
          --ms-dx: 14px;
          --ms-dy: -28px;
        }

        .hw-mini-star.s3 {
          left: 48%;
          top: 60%;
          color: #47FFFF;
          font-size: 12px;
          animation-delay: 120ms;
          --ms-dx: 4px;
          --ms-dy: -32px;
        }

        @keyframes hwMiniStarPop {
          0% {
            opacity: 0;
            transform: translate(0, 6px) scale(0.2) rotate(-30deg);
          }
          35% {
            opacity: 1;
            transform: translate(calc(var(--ms-dx) * 0.5), calc(var(--ms-dy) * 0.5)) scale(1.2) rotate(25deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--ms-dx), var(--ms-dy)) scale(0.2) rotate(90deg);
          }
        }

        .hw-photo-special {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 5;
          transform: scale(1.02);
          pointer-events: none;
        }

        .hw-photo-container:hover .hw-photo-special {
          opacity: 1;
          transform: scale(1);
        }

        .hw-photo-container:hover .hw-photo-full-contain.has-special,
        .hw-photo-container:hover .hw-photo-full-cover.has-special,
        .hw-photo-container:hover .hw-photo-suit-head.has-special,
        .hw-photo-container:hover .hw-photo-suit-cover.has-special {
          opacity: 0;
        }

        .hw-photo-container:hover .hw-photo-suit-head.has-special ~ .hw-suit-svg,
        .hw-photo-container:hover .hw-photo-suit-cover.has-special ~ .hw-suit-svg {
          opacity: 0;
        }

        /* Subtle bottom spec strip on hover */
        .hw-hover-specs {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 6;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 7px 10px;
          border-radius: 0;
          background: rgba(15, 23, 42, 0.86);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          pointer-events: none;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.22s ease, transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hw-member-card:hover .hw-hover-specs {
          opacity: 1;
          transform: translateY(0);
        }

        .hw-hover-spec-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 6px;
          font-size: 0.7rem;
          line-height: 1.3;
        }

        .hw-hover-spec-label {
          color: #cbd5e1;
          font-weight: 500;
          flex-shrink: 0;
        }

        .hw-hover-spec-value {
          color: #ffffff;
          font-weight: 600;
          text-align: right;
        }

        /* Now Recruiting centered placeholder */
        .hw-recruiting-head {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--color-text-primary);
          text-align: center;
          padding: 0 12px;
        }

        .hw-recruiting-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 2px dashed var(--color-border-strong);
          background-color: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--key-blue-2);
          opacity: 0.85;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hw-member-card-upcoming:hover .hw-recruiting-circle {
          transform: scale(1.08) rotate(8deg);
        }

        .hw-recruiting-tagline {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--color-text-primary);
          opacity: 0.72;
          line-height: 1.25;
        }

        .hw-card-body {
          padding: 10px 0 2px 0;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 6px;
        }

        .hw-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 4px;
          flex-wrap: wrap;
        }

        .hw-name-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h3);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.3;
          margin: 0;
        }

        .hw-name-link {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color var(--transition-fast);
        }

        .hw-name-link:hover {
          color: var(--color-accent);
          text-decoration: underline;
        }

        .hw-name-link:hover .hw-name-icon {
          opacity: 1 !important;
          color: var(--color-accent);
        }

        .hw-role-badge-wrap {
          display: flex;
          align-items: center;
          margin-top: 1px;
          margin-bottom: 1px;
        }

        .hw-role-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.35em 0.65em;
          border-radius: 0.375rem;
          line-height: 1;
          color: #ffffff;
          text-align: center;
          white-space: nowrap;
          border: none;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .hw-badge-radar {
          background-color: var(--key-blue-1);
        }

        .hw-badge-capture {
          background-color: var(--key-blue-2);
        }

        .hw-badge-imaging {
          background-color: #0e7490;
        }

        .hw-badge-sdr {
          background-color: #4338ca;
        }

        .hw-badge-thermal {
          background-color: #c2410c;
        }

        .hw-badge-robot {
          background-color: #334155;
        }

        .hw-badge-upcoming {
          background-color: #6c757d;
        }

        .hw-meta-vendor {
          font-size: clamp(0.75rem, 1.3vw, 0.85rem);
          font-weight: 500;
          color: var(--color-text-primary);
          line-height: 1.35;
          opacity: 0.72;
        }

        @media (max-width: 640px) {
          .hw-photo-container {
            max-height: 200px;
          }
          .hw-recruiting-circle {
            width: 42px;
            height: 42px;
          }
          .hw-recruiting-tagline {
            font-size: 0.62rem;
          }
          .hw-card-body {
            padding: 6px 0 1px 0;
            gap: 3px;
          }
          .hw-role-badge {
            font-size: 0.62rem;
            padding: 0.3em 0.5em;
          }
          .hw-name-heading {
            font-size: 12px;
            line-height: 1.25;
          }
          .hw-meta-vendor {
            font-size: 0.68rem;
          }
        }
      `}</style>
    </div>
  );
};
