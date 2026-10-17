import React from 'react';
import type { Publication } from '../../types';

interface PublicationItemProps {
  publication: Publication;
  onOpenBibtex: (pub: Publication) => void;
}

export const PublicationItem: React.FC<PublicationItemProps> = ({
  publication,
  onOpenBibtex,
}) => {
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
          <span
            style={{
              fontWeight: isLabMember ? 600 : 400,
              color: 'var(--color-text-primary)',
            }}
          >
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
      style={{
        paddingTop: 'var(--space-md)',
        paddingBottom: 'var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-h3)',
          fontWeight: 600,
          lineHeight: 1.4,
          color: 'var(--color-text-primary)',
        }}
      >
        {publication.title}
      </h3>

      <div
        style={{
          fontSize: 'var(--text-body)',
          lineHeight: 1.5,
          color: 'var(--color-text-primary)',
        }}
      >
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

      <style>{`
        .publication-entry {
          position: relative;
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
      `}</style>
    </article>
  );
};
