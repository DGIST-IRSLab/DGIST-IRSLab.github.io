import React, { useState } from 'react';
import { Mail, Globe, ExternalLink, GraduationCap } from 'lucide-react';
import type { Person } from '../../types';
import { getSpecialPhoto } from '../../data/people';

interface PersonCardProps {
  person: Person;
  compact?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, compact = false }) => {
  const [imageError, setImageError] = useState(false);
  const [specialError, setSpecialError] = useState(false);
  const homeUrl = person.website || person.googleScholar || person.cvUrl || person.github;
  const specialPhoto = getSpecialPhoto(person);
  const hasSpecial = Boolean(specialPhoto && !specialError);

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
        className="person-photo-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: 'var(--color-bg-tertiary)',
          overflow: 'hidden',
        }}
      >
        {homeUrl ? (
          <a
            href={homeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${person.name}'s homepage`}
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            {!imageError ? (
              <img
                src={person.photo}
                alt={person.name}
                onError={() => setImageError(true)}
                loading="lazy"
                className={`person-photo-img person-photo-standard ${hasSpecial ? 'has-special' : ''}`}
                style={{
                  position: 'absolute',
                  inset: 0,
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
                  position: 'absolute',
                  inset: 0,
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

            {hasSpecial && (
              <img
                src={specialPhoto}
                alt={`${person.name} special`}
                onError={() => setSpecialError(true)}
                loading="lazy"
                className="person-photo-img person-photo-special"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: person.specialPhotoObjectPosition || 'center 20%',
                  display: 'block',
                }}
              />
            )}
          </a>
        ) : (
          <>
            {!imageError ? (
              <img
                src={person.photo}
                alt={person.name}
                onError={() => setImageError(true)}
                loading="lazy"
                className={`person-photo-img person-photo-standard ${hasSpecial ? 'has-special' : ''}`}
                style={{
                  position: 'absolute',
                  inset: 0,
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
                  position: 'absolute',
                  inset: 0,
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

            {hasSpecial && (
              <img
                src={specialPhoto}
                alt={`${person.name} special`}
                onError={() => setSpecialError(true)}
                loading="lazy"
                className="person-photo-img person-photo-special"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: person.specialPhotoObjectPosition || 'center 20%',
                  display: 'block',
                }}
              />
            )}
          </>
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
            zIndex: 4,
            pointerEvents: 'none',
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
              margin: 0,
            }}
          >
            {homeUrl ? (
              <a
                href={homeUrl}
                target="_blank"
                rel="noreferrer"
                className="member-name-link"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <span>{person.name}</span>
                <ExternalLink size={11} className="member-name-icon" style={{ opacity: 0.5, flexShrink: 0 }} />
              </a>
            ) : (
              <span>{person.name}</span>
            )}
          </h4>
          {person.nameKr && (
            homeUrl ? (
              <a
                href={homeUrl}
                target="_blank"
                rel="noreferrer"
                className="member-name-kr-link"
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {person.nameKr}
              </a>
            ) : (
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {person.nameKr}
              </span>
            )
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

      <style>{`
        .person-photo-img {
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .person-photo-standard {
          opacity: 1;
          z-index: 1;
        }
        .person-photo-container:hover .person-photo-standard:not(.has-special) {
          transform: scale(1.03);
        }
        .person-photo-special {
          opacity: 0;
          z-index: 2;
          transform: scale(1.02);
          pointer-events: none;
        }
        .person-photo-container:hover .person-photo-special {
          opacity: 1;
          transform: scale(1);
        }
        .person-photo-container:hover .person-photo-standard.has-special {
          opacity: 0;
        }
        .member-name-link:hover {
          color: var(--color-accent) !important;
          text-decoration: underline;
        }
        .member-name-link:hover .member-name-icon {
          opacity: 1 !important;
          color: var(--color-accent);
        }
        .member-name-kr-link:hover {
          color: var(--color-accent) !important;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
