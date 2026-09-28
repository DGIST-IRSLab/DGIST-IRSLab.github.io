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
              color: isLabMember ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.4,
          color: 'var(--color-text-primary)',
        }}
      >
        {publication.title}
      </h3>

      <div
        style={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
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
          {isOral && (
            <span className="pub-badge pub-badge-oral">
              ORAL
            </span>
          )}
          {isTop5Percent && (
            <span className="pub-badge pub-badge-top5">
              Top 5%
            </span>
          )}
          {isTopConf && (
            <span className="pub-badge pub-badge-topconf">
              TOP CONF.
            </span>
          )}
          {isSCI && (
            <span className="pub-badge pub-badge-sci">
              SCI
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
            style={{ fontSize: '13px' }}
          >
            Paper
          </a>
        )}

        {publication.pdfUrl && (publication.projectUrl || publication.codeUrl || publication.videoUrl || publication.bibtex) && (
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
        )}

        {publication.projectUrl && (
          <>
            <a
              href={publication.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="link-subtle"
              style={{ fontSize: '13px' }}
            >
              Project
            </a>
            {(publication.codeUrl || publication.videoUrl || publication.bibtex) && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
          </>
        )}

        {publication.codeUrl && (
          <>
            <a
              href={publication.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="link-subtle"
              style={{ fontSize: '13px' }}
            >
              Code
            </a>
            {(publication.videoUrl || publication.bibtex) && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
          </>
        )}

        {publication.videoUrl && (
          <>
            <a
              href={publication.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="link-subtle"
              style={{ fontSize: '13px' }}
            >
              Video
            </a>
            {publication.bibtex && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
          </>
        )}

        {publication.bibtex && (
          <button
            type="button"
            onClick={() => onOpenBibtex(publication)}
            className="link-subtle pub-action-link"
            style={{ fontSize: '13px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            BibTeX
          </button>
        )}
      </div>

      <style>{`
        .publication-entry {
          position: relative;
          padding: 14px 16px !important;
          border-radius: var(--radius-sm);
          border-left: 2.5px solid transparent;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .publication-entry:hover {
          background-color: var(--color-surface-hover);
          transform: translateX(5px);
          border-left-color: var(--color-accent);
        }
        .pub-venue-row {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.5;
          margin-top: 3px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pub-venue-text {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--color-text-secondary);
        }
        .pub-venue-name {
          font-weight: 500;
          color: var(--color-text-primary);
        }
        .pub-venue-year {
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .pub-badges-wrap {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .pub-badge-oral {
          background-color: #fff7ed;
          color: #c2410c;
          border: 1px solid #fed7aa;
        }
        [data-theme='dark'] .pub-badge-oral {
          background-color: rgba(249, 115, 22, 0.15);
          color: #fb923c;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }
        .pub-badge-top5 {
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        [data-theme='dark'] .pub-badge-top5 {
          background-color: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
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
