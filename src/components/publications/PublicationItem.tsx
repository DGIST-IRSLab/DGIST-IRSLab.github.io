import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, X } from 'lucide-react';
import type { Publication } from '../../types';
import { getPublicationMainFigure } from '../../data/publications';
import { assetUrl } from '../../utils/asset';

interface PublicationItemProps {
  publication: Publication;
  number?: number;
  onOpenBibtex: (pub: Publication) => void;
}

export const PublicationItem: React.FC<PublicationItemProps> = ({
  publication,
  number,
  onOpenBibtex,
}) => {
  const [figureError, setFigureError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const figurePath = getPublicationMainFigure(publication);
  const hasFigure = Boolean(figurePath && !figureError);

  useEffect(() => {
    setFigureError(false);
  }, [figurePath]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  const isTopConf = Boolean(
    publication.isTopConf !== undefined
      ? publication.isTopConf
      : (/CVPR|NeurIPS|ECCV|AAAI|ICASSP/i.test(publication.venue) && publication.type === 'conference')
  );

  const isSCI = Boolean(
    publication.isSCI !== undefined
      ? publication.isSCI
      : (publication.type === 'journal' && !publication.isDomestic)
  );

  const isOral = Boolean(
    publication.isOral ||
    (publication.title.toLowerCase().includes('high-resolution gait micro-doppler') && publication.type === 'conference')
  );

  const isIoTJ = /IoTJ|Internet of Things Journal/i.test(publication.venue) || /IoTJ/i.test(publication.venueShort || '');
  const isTop5Percent = Boolean(
    publication.isTop5Percent !== undefined
      ? publication.isTop5Percent
      : isIoTJ
  );

  const isAward = Boolean(
    publication.isAward ||
    publication.title.includes('물리 모델 기반 레이더 신호 합성 및 학습 파이프라인')
  );

  const renderAuthors = () => {
    const labAuthors = publication.labAuthors || [];
    return publication.authors.map((author, idx) => {
      const isLabMember = labAuthors.some((la) =>
        author.toLowerCase().includes(la.toLowerCase())
      );

      return (
        <React.Fragment key={idx}>
          <span className={isLabMember ? 'pub-author-lab' : 'pub-author-co'}>
            {author}
          </span>
          {idx < publication.authors.length - 1 ? ', ' : ''}
        </React.Fragment>
      );
    });
  };

  return (
    <article
      className="publication-entry"
      id={publication.id}
    >
      {/* Far Left: Publication Index Number */}
      <div className="pub-number-col" aria-label={number !== undefined ? `Publication ${number}` : undefined}>
        {number !== undefined ? number : ''}
      </div>

      {/* Middle-Left: MainFigure Slot */}
      <div className={`pub-figure-slot ${hasFigure ? 'has-figure' : 'is-placeholder'}`}>
        {hasFigure && figurePath ? (
          <button
            type="button"
            className="pub-figure-trigger"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open main figure for ${publication.title}`}
          >
            <img
              src={assetUrl(figurePath)}
              alt={publication.mainFigureAlt || `${publication.title} main figure`}
              onError={() => setFigureError(true)}
              loading="lazy"
              className="pub-figure-img"
            />
          </button>
        ) : (
          <div className="pub-figure-placeholder" aria-label="Main figure placeholder">
            <ImageIcon size={18} strokeWidth={1.6} className="pub-figure-placeholder-icon" />
            <span className="pub-figure-placeholder-text">Main Figure</span>
          </div>
        )}
      </div>

      {/* Right: Paper Metadata & Links */}
      <div className="pub-content-col">
        <h3 className="pub-title-heading">
          {publication.title}
        </h3>

        <div className="pub-authors-row">
          {renderAuthors()}
        </div>

        <div className="pub-venue-row">
          <span className="pub-venue-text">
            <span className="pub-venue-name">{publication.venue}</span>
            <span className="pub-venue-year">
              {publication.venue.includes(publication.year.toString()) ? '' : `, ${publication.year}`}
            </span>
          </span>
          <span className="pub-badges-wrap">
            {isTopConf && (
              <span className="pub-badge pub-badge-topconf">
                Top Conf.
              </span>
            )}
            {isOral && (
              <span className="pub-badge pub-badge-oral">
                Oral
              </span>
            )}
            {isTop5Percent && (
              <span className="pub-badge pub-badge-top5">
                Top 5%
              </span>
            )}
            {isSCI && (
              <span className="pub-badge pub-badge-sci">
                SCI
              </span>
            )}
            {isAward && (
              <span className="pub-badge pub-badge-award">
                Award
              </span>
            )}
            {publication.customBadge && (
              <span className="pub-badge pub-badge-custom">
                {publication.customBadge}
              </span>
            )}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            marginTop: '4px',
          }}
        >
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="link-subtle"
              style={{ fontSize: 'var(--text-body)' }}
            >
              Paper
            </a>
          )}

          {publication.pdfUrl && (publication.projectUrl || publication.codeUrl || publication.videoUrl || publication.bibtex) && (
            <span style={{ color: 'var(--color-text-primary)' }}>·</span>
          )}

          {publication.projectUrl && (
            <>
              <a
                href={publication.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="link-subtle"
                style={{ fontSize: 'var(--text-body)' }}
              >
                Project
              </a>
              {(publication.codeUrl || publication.videoUrl || publication.bibtex) && <span style={{ color: 'var(--color-text-primary)' }}>·</span>}
            </>
          )}

          {publication.codeUrl && (
            <>
              <a
                href={publication.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="link-subtle"
                style={{ fontSize: 'var(--text-body)' }}
              >
                Code
              </a>
              {(publication.videoUrl || publication.bibtex) && <span style={{ color: 'var(--color-text-primary)' }}>·</span>}
            </>
          )}

          {publication.videoUrl && (
            <>
              <a
                href={publication.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="link-subtle"
                style={{ fontSize: 'var(--text-body)' }}
              >
                Video
              </a>
              {publication.bibtex && <span style={{ color: 'var(--color-text-primary)' }}>·</span>}
            </>
          )}

          {publication.bibtex && (
            <button
              type="button"
              onClick={() => onOpenBibtex(publication)}
              className="link-subtle pub-action-link"
              style={{ fontSize: 'var(--text-body)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              BibTeX
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen MainFigure Preview Modal */}
      {lightboxOpen && hasFigure && figurePath && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="pub-fig-modal-backdrop"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={publication.title}
          >
            <div
              className="pub-fig-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pub-fig-modal-header">
                <h4 className="pub-fig-modal-title">{publication.title}</h4>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="pub-fig-modal-close"
                  aria-label="Close figure preview"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="pub-fig-modal-stage">
                <img
                  src={assetUrl(figurePath)}
                  alt={publication.mainFigureAlt || `${publication.title} main figure`}
                  className="pub-fig-modal-img"
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      <style>{`
        .publication-entry {
          position: relative;
          display: grid;
          grid-template-columns: 34px clamp(176px, 19vw, 216px) minmax(0, 1fr);
          gap: clamp(14px, 2vw, 22px);
          align-items: center;
          padding: 1.15rem 1rem !important;
          margin: 0 -1rem;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          border-radius: 8px;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease !important;
        }
        .publication-entry:last-child {
          border-bottom: none;
        }
        .publication-entry:hover {
          box-shadow: var(--card-hover-shadow);
          transform: translateY(-3px);
          border-bottom-color: transparent;
          z-index: 1;
        }
        .publication-entry:has(+ .publication-entry:hover) {
          border-bottom-color: transparent;
        }

        /* Far-Left Number Column */
        .pub-number-col {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-size: 0.96rem;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          color: #64748b;
          user-select: none;
        }

        [data-theme='dark'] .pub-number-col {
          color: #94a3b8;
        }

        /* Left MainFigure Slot */
        .pub-figure-slot {
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }
        .pub-figure-slot.has-figure {
          background-color: #ffffff;
          border: 1px solid var(--color-border);
        }
        .pub-figure-slot.is-placeholder {
          background-color: var(--color-bg-secondary);
          border: 1px dashed var(--color-border-strong);
        }
        .pub-figure-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 6px;
          background: transparent;
          border: none;
          cursor: zoom-in;
        }
        .pub-figure-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pub-figure-trigger:hover .pub-figure-img {
          transform: scale(1.04);
        }
        .pub-figure-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: var(--color-text-primary);
          opacity: 0.45;
          user-select: none;
        }
        .pub-figure-placeholder-icon {
          flex-shrink: 0;
        }
        .pub-figure-placeholder-text {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        /* Right Content Column */
        .pub-content-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .pub-title-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h3);
          font-weight: 600;
          line-height: 1.4;
          color: var(--color-text-primary);
          margin: 0;
        }

        .pub-authors-row {
          font-size: var(--text-body);
          line-height: 1.5;
          color: #475569;
        }

        [data-theme='dark'] .pub-authors-row {
          color: #cbd5e1;
        }

        .pub-author-lab {
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .pub-author-co {
          font-weight: 400;
          color: inherit;
        }

        .pub-venue-row {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: 1.65;
          margin-top: 3px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pub-venue-text {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: 1.65;
          color: var(--color-text-primary);
        }
        .pub-venue-name {
          font-weight: 500;
          color: var(--color-text-primary);
        }
        .pub-venue-year {
          color: var(--color-text-primary);
          font-weight: 500;
        }
        .pub-badges-wrap {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .pub-action-link {
          transition: color 0.15s ease, transform 0.15s ease !important;
        }
        .pub-action-link:hover {
          transform: translateY(-1px);
        }

        /* MainFigure Modal */
        .pub-fig-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px);
        }
        .pub-fig-modal-card {
          width: 100%;
          max-width: 860px;
          max-height: 88vh;
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .pub-fig-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--color-border);
        }
        .pub-fig-modal-title {
          margin: 0;
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.4;
          color: var(--color-text-primary);
        }
        .pub-fig-modal-close {
          background: transparent;
          border: none;
          color: var(--color-text-primary);
          opacity: 0.7;
          cursor: pointer;
          padding: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pub-fig-modal-close:hover {
          opacity: 1;
        }
        .pub-fig-modal-stage {
          background-color: #ffffff;
          padding: clamp(16px, 2.5vw, 28px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
        }
        .pub-fig-modal-img {
          max-width: 100%;
          max-height: 68vh;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 640px) {
          .publication-entry {
            grid-template-columns: 26px minmax(0, 1fr);
            column-gap: 10px;
            row-gap: 10px;
            align-items: start;
            padding: 1rem 0.6rem !important;
            margin: 0 -0.6rem;
          }
          .pub-number-col {
            grid-column: 1;
            grid-row: 1 / span 2;
            justify-content: flex-start;
            padding-top: 2px;
            font-size: 0.88rem;
          }
          .pub-figure-slot {
            grid-column: 2;
          }
          .pub-content-col {
            grid-column: 2;
          }
          .pub-figure-slot.is-placeholder {
            aspect-ratio: auto;
            height: 92px;
          }
        }
      `}</style>
    </article>
  );
};
