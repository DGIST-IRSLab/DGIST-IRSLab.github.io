import React, { useState } from 'react';
import { FileText, ExternalLink, Video, Code, Quote, ChevronDown, ChevronUp } from 'lucide-react';
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

  // Helper to format authors and highlight IRS Lab members
  const renderAuthors = () => {
    return publication.authors.map((author, idx) => {
      // Check if author matches any lab member names or contains special markers
      const isLabMember = publication.labAuthors.some((la) =>
        author.toLowerCase().includes(la.toLowerCase())
      );

      return (
        <React.Fragment key={idx}>
          <span
            style={{
              fontWeight: isLabMember ? 600 : 400,
              color: isLabMember ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              textDecoration: isLabMember ? 'underline' : 'none',
              textDecorationColor: isLabMember ? 'var(--color-accent)' : 'transparent',
              textUnderlineOffset: '3px',
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
        borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        transition: 'background-color var(--transition-fast)',
      }}
    >
      {/* Top line: Badges & Year */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-accent)',
          }}
        >
          {publication.year}
        </span>

        {publication.badges?.map((badge, i) => (
          <span
            key={i}
            className={`badge ${badge.includes('Top') || badge.includes('Oral') ? '' : 'badge-outline'}`}
          >
            {badge}
          </span>
        ))}

        <span
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-dim)',
          }}
        >
          {publication.type.toUpperCase()}
        </span>
      </div>

      {/* Publication Title */}
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15.5px',
          fontWeight: 600,
          lineHeight: 1.45,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        {publication.title}
      </h3>

      {/* Authors list */}
      <div
        style={{
          fontSize: '13.5px',
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
        }}
      >
        {renderAuthors()}
      </div>

      {/* Venue (IBM Plex Mono) */}
      <div
        className="venue-tag"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12.5px',
          color: 'var(--color-text-secondary)',
          fontStyle: 'normal',
        }}
      >
        {publication.venue}
      </div>

      {/* Action links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
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
            style={{ fontSize: '12.5px' }}
          >
            <FileText size={13} />
            <span>Paper PDF</span>
          </a>
        )}

        {publication.projectUrl && (
          <a
            href={publication.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="link-subtle"
            style={{ fontSize: '12.5px' }}
          >
            <ExternalLink size={13} />
            <span>Project Page</span>
          </a>
        )}

        {publication.codeUrl && (
          <a
            href={publication.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="link-subtle"
            style={{ fontSize: '12.5px' }}
          >
            <Code size={13} />
            <span>Code</span>
          </a>
        )}

        {publication.videoUrl && (
          <a
            href={publication.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="link-subtle"
            style={{ fontSize: '12.5px' }}
          >
            <Video size={13} />
            <span>Video</span>
          </a>
        )}

        {publication.bibtex && (
          <button
            type="button"
            onClick={() => onOpenBibtex(publication)}
            className="link-subtle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '12.5px',
            }}
          >
            <Quote size={13} />
            <span>BibTeX</span>
          </button>
        )}

        {publication.abstract && (
          <button
            type="button"
            onClick={() => setAbstractOpen(!abstractOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-dim)',
            }}
          >
            <span>Abstract</span>
            {abstractOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
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
