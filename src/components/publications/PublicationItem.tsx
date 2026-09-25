import React, { useState } from 'react';
import type { Publication } from '../../types';

interface PublicationItemProps {
  publication: Publication;
  onOpenBibtex: (pub: Publication) => void;
  showAbstract?: boolean;
}

export const PublicationItem: React.FC<PublicationItemProps> = ({
  publication,
  onOpenBibtex,
}) => {
  const [abstractOpen, setAbstractOpen] = useState(false);

  const renderAuthors = () => {
    return publication.authors.map((author, idx) => {
      const isLabMember = publication.labAuthors.some((la) =>
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
        }}
      >
        {publication.venue}{publication.venue.includes(publication.year.toString()) ? '' : `, ${publication.year}`}
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
            className="link-subtle"
            style={{ fontSize: '13px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            BibTeX
          </button>
        )}

        {publication.abstract && (
          <>
            {publication.bibtex && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
            <button
              type="button"
              onClick={() => setAbstractOpen(!abstractOpen)}
              className="link-subtle"
              style={{ fontSize: '13px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Abstract
            </button>
          </>
        )}
      </div>

      {/* Expandable Abstract */}
      {abstractOpen && publication.abstract && (
        <div
          style={{
            marginTop: 'var(--space-xs)',
            padding: 'var(--space-sm) var(--space-md)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-bg-secondary)',
            borderLeft: '2px solid var(--color-accent)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
          }}
        >
          {publication.abstract}
        </div>
      )}
    </article>
  );
};
