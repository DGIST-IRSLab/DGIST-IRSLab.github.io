import React, { useState } from 'react';
import { Mail, Globe, ExternalLink, GraduationCap } from 'lucide-react';
import type { Person } from '../../types';

interface PersonCardProps {
  person: Person;
  compact?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, compact = false }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="person-academic-card"
      id={person.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      {/* Photo Container with fixed academic aspect ratio (4:5) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: 'var(--color-bg-tertiary)',
          overflow: 'hidden',
        }}
      >
        {!imageError ? (
          <img
            src={person.photo}
            alt={person.name}
            onError={() => setImageError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
            }}
          >
            {person.name.split(' ').map((n) => n[0]).join('')}
          </div>
        )}

        {/* Small subtle role tag overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            backgroundColor: 'rgba(11, 15, 20, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#ffffff',
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '10.5px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {person.title}
        </div>
      </div>

      {/* Info Body */}
      <div
        style={{
          padding: 'var(--space-sm)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14.5px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
            }}
          >
            {person.name}
          </h4>
          {person.nameKr && (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {person.nameKr}
            </span>
          )}
        </div>

        {/* Alumni Destination or Period */}
        {person.alumniDestination && (
          <div
            style={{
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              fontWeight: 500,
            }}
          >
            → {person.alumniDestination}
          </div>
        )}

        {/* Research Interests */}
        {!compact && person.researchInterests && person.researchInterests.length > 0 && (
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.45,
              marginTop: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {person.researchInterests.join(', ')}
          </p>
        )}

        {/* Links row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: 'auto',
            paddingTop: '6px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              title={person.email}
              aria-label={`Email ${person.name}`}
              style={{
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <Mail size={13} />
            </a>
          )}

          {person.website && (
            <a
              href={person.website}
              target="_blank"
              rel="noreferrer"
              title="Personal Webpage"
              aria-label={`${person.name}'s website`}
              style={{
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <Globe size={13} />
            </a>
          )}

          {person.googleScholar && (
            <a
              href={person.googleScholar}
              target="_blank"
              rel="noreferrer"
              title="Google Scholar"
              aria-label={`${person.name}'s Google Scholar`}
              style={{
                color: 'var(--color-text-muted)',
                display: 'inline-flex',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <GraduationCap size={13} />
            </a>
          )}

          {person.cvUrl && (
            <a
              href={person.cvUrl}
              target="_blank"
              rel="noreferrer"
              title="Curriculum Vitae"
              className="link-subtle"
              style={{ fontSize: '11px', marginLeft: 'auto' }}
            >
              <span>CV</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
