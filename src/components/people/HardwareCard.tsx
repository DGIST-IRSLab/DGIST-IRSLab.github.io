import React, { useState } from 'react';
import { ExternalLink, Radio, Cpu } from 'lucide-react';
import type { HardwareMember } from '../../types';
import { getSpecialEquipmentPhoto } from '../../data/equipment';
import { assetUrl } from '../../utils/asset';

interface HardwareCardProps {
  item: HardwareMember;
  index?: number;
}

const getBadgeClass = (variant?: HardwareMember['badgeVariant']): string => {
  switch (variant) {
    case 'radar':
      return 'hw-badge-radar';
    case 'capture':
      return 'hw-badge-capture';
    case 'imaging':
      return 'hw-badge-imaging';
    case 'upcoming':
    default:
      return 'hw-badge-upcoming';
  }
};

export const HardwareCard: React.FC<HardwareCardProps> = ({ item, index = 0 }) => {
  const [imageError, setImageError] = useState(false);
  const [specialError, setSpecialError] = useState(false);

  const specialPhoto = getSpecialEquipmentPhoto(item);
  const hasSpecial = Boolean(specialPhoto && !specialError);

  const renderPhotoContent = () => {
    if (item.isComingSoon) {
      return (
        <div className="hw-coming-soon-frame">
          <div className="hw-coming-soon-icon">
            <Radio size={28} strokeWidth={1.6} />
          </div>
          <span className="hw-coming-soon-label">TBD</span>
          <span className="hw-coming-soon-sub">More Gear Incoming</span>
        </div>
      );
    }

    return (
      <>
        {!imageError && item.photo ? (
          <img
            src={assetUrl(item.photo)}
            alt={item.name}
            onError={() => setImageError(true)}
            loading="lazy"
            className={`hw-photo-img hw-photo-standard ${hasSpecial ? 'has-special' : ''}`}
          />
        ) : (
          <div className="hw-coming-soon-frame">
            <Cpu size={26} strokeWidth={1.6} />
            <span className="hw-coming-soon-label">HARDWARE</span>
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
      style={{
        animationDelay: `${360 + index * 95}ms`,
      }}
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
        {item.specs && <div className="hw-meta-specs">{item.specs}</div>}
      </div>

      <style>{`
        .hw-member-card {
          display: flex;
          flex-direction: column;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 8px 8px 12px 8px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          animation: hwCardReveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color var(--transition-fast);
        }

        .hw-member-card-upcoming {
          border-style: dashed;
          border-color: var(--color-border-strong);
          background-color: var(--color-bg-secondary);
        }

        @keyframes hwCardReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .hw-member-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--card-hover-shadow);
          }
        }

        .hw-photo-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background-color: #ffffff;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hw-photo-container-upcoming {
          background: repeating-linear-gradient(
            -45deg,
            var(--color-bg-secondary),
            var(--color-bg-secondary) 10px,
            var(--color-bg-tertiary) 10px,
            var(--color-bg-tertiary) 20px
          );
        }

        .hw-photo-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .hw-photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .hw-photo-standard {
          object-fit: contain;
          padding: 14px;
          opacity: 1;
          z-index: 1;
        }

        .hw-photo-container:hover .hw-photo-standard:not(.has-special) {
          transform: scale(1.06);
        }

        .hw-photo-special {
          object-fit: cover;
          opacity: 0;
          z-index: 2;
          transform: scale(1.02);
          pointer-events: none;
        }

        .hw-photo-container:hover .hw-photo-special {
          opacity: 1;
          transform: scale(1);
        }

        .hw-photo-container:hover .hw-photo-standard.has-special {
          opacity: 0;
        }

        .hw-coming-soon-frame {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: var(--color-text-primary);
          opacity: 0.55;
          text-align: center;
          padding: 12px;
        }

        .hw-coming-soon-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px dashed var(--color-border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .hw-coming-soon-label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .hw-coming-soon-sub {
          font-size: 0.72rem;
          opacity: 0.8;
        }

        .hw-card-body {
          padding: 10px 4px 2px 4px;
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

        .hw-badge-upcoming {
          background-color: #6c757d;
        }

        .hw-meta-vendor {
          font-size: clamp(0.75rem, 1.3vw, 0.85rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.35;
          opacity: 0.88;
        }

        .hw-meta-specs {
          font-size: clamp(0.72rem, 1.2vw, 0.82rem);
          color: var(--color-text-primary);
          opacity: 0.68;
          line-height: 1.35;
        }

        @media (max-width: 640px) {
          .hw-member-card {
            padding: 6px 6px 10px 6px;
          }
          .hw-photo-container {
            border-radius: 6px;
            max-height: 220px;
          }
          .hw-photo-standard {
            padding: 10px;
          }
          .hw-card-body {
            padding: 6px 2px 2px 2px;
            gap: 4px;
          }
          .hw-role-badge {
            font-size: 0.7rem;
          }
          .hw-name-heading {
            font-size: 13.5px;
          }
        }
      `}</style>
    </div>
  );
};
