import React, { useState } from 'react';
import { ExternalLink, Radio, Cpu } from 'lucide-react';
import type { HardwareMember } from '../../types';
import { getSpecialEquipmentPhoto } from '../../data/equipment';
import { assetUrl } from '../../utils/asset';

interface HardwareCardProps {
  item: HardwareMember;
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

export const HardwareCard: React.FC<HardwareCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [specialError, setSpecialError] = useState(false);

  const specialPhoto = getSpecialEquipmentPhoto(item);
  const hasSpecial = Boolean(specialPhoto && !specialError);
  const photoFit = item.photoFit ?? 'contain';

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

    const photoClass = `hw-photo-img ${
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
      className={`hw-member-card ${item.isComingSoon ? 'hw-member-card-upcoming' : ''}`}
      id={item.id}
    >
      {/* Photo Container matching PersonCard 4:5 aspect ratio */}
      <div
        className={`hw-photo-container ${item.isComingSoon ? 'hw-photo-container-upcoming' : ''}`}
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

        .hw-photo-img {
          display: block;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Clean studio product framing */
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

        .hw-member-card:hover .hw-photo-full-contain:not(.has-special),
        .hw-member-card:hover .hw-photo-full-cover:not(.has-special) {
          transform: scale(1.05);
        }

        .hw-photo-special {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 3;
          transform: scale(1.02);
          pointer-events: none;
        }

        .hw-photo-container:hover .hw-photo-special {
          opacity: 1;
          transform: scale(1);
        }

        .hw-photo-container:hover .hw-photo-full-contain.has-special,
        .hw-photo-container:hover .hw-photo-full-cover.has-special {
          opacity: 0;
        }

        /* Subtle bottom spec strip on hover */
        .hw-hover-specs {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
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
