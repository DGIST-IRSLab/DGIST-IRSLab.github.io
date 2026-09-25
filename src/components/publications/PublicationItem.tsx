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

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          marginTop: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <span>
          {publication.venue}{publication.venue.includes(publication.year.toString()) ? '' : `, ${publication.year}`}
        </span>
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
