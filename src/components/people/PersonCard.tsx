import React, { useState } from 'react';
import { Mail, Globe, ExternalLink, GraduationCap } from 'lucide-react';
import type { Person } from '../../types';
import { getSpecialPhoto } from '../../data/people';
import { assetUrl } from '../../utils/asset';

interface PersonCardProps {
  person: Person;
  compact?: boolean;
  onNavigate?: (page: string, anchorId?: string) => void;
}

const getRoleBadgeClass = (role: string): string => {
  switch (role) {
    case 'Professor':
      return 'role-badge-prof';
    case 'Postdoc Fellow':
      return 'role-badge-postdoc';
    case 'Ph.D. Student':
    case 'Integrated M.S./Ph.D.':
    case 'Integrated Ph.D.':
    case 'Joint MS & PhD':
      return 'role-badge-phd';
    case 'MS Student':
      return 'role-badge-ms';
    case 'Undergraduate Researcher':
      return 'role-badge-intern';
    case 'Alumni':
      return 'role-badge-alumni';
    default:
      return 'role-badge-default';
  }
};

export const PersonCard: React.FC<PersonCardProps> = ({ person, onNavigate }) => {
  const [imageError, setImageError] = useState(false);
  const [specialError, setSpecialError] = useState(false);
  const isPI = person.id === 'jaeho-choi' || person.role === 'Professor';
  const homeUrl = isPI && onNavigate ? undefined : (person.website || person.googleScholar || person.cvUrl || person.github);
  const specialPhoto = getSpecialPhoto(person);
  const hasSpecial = Boolean(specialPhoto && !specialError);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isPI && onNavigate) {
      e.preventDefault();
      onNavigate('pi');
    }
  };

  const renderPhotoContent = () => (
    <>
      {!imageError ? (
        <img
          src={assetUrl(person.photo)}
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
          src={assetUrl(specialPhoto)}
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
  );

  return (
    <div
      className="person-academic-card"
      id={person.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '8px 8px 12px 8px',
        overflow: 'hidden',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      {/* Photo Container with rounded corners and fixed academic aspect ratio (4:5) */}
      <div
        className="person-photo-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: 'var(--color-bg-tertiary)',
          overflow: 'hidden',
          borderRadius: '8px',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        {isPI && onNavigate ? (
          <div
            onClick={handleCardClick}
            aria-label={`${person.name}'s PI page`}
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            {renderPhotoContent()}
          </div>
        ) : homeUrl ? (
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
            {renderPhotoContent()}
          </a>
        ) : (
          renderPhotoContent()
        )}
      </div>

      {/* Info Body */}
      <div
        className="person-card-body"
        style={{
          padding: '10px 4px 2px 4px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '6px',
        }}
      >
        <div
          className="person-name-row"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '4px',
            flexWrap: 'wrap',
          }}
        >
          <h4
            className="member-name-heading"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-h3)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {isPI && onNavigate ? (
              <span
                onClick={handleCardClick}
                className="member-name-link"
                style={{
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <span>{person.name}</span>
                <ExternalLink size={11} className="member-name-icon" style={{ opacity: 0.5, flexShrink: 0 }} />
              </span>
            ) : homeUrl ? (
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
        </div>

        {/* Role Badge under name (Plain text for Alumni like original site) */}
        <div className="person-role-badge-wrap">
          {person.role === 'Alumni' ? (
            <span className="person-alumni-dest-simple">
              {person.title.includes('(') ? (
                <>
                  {person.title.slice(0, person.title.indexOf('(')).trim()}
                  <br />
                  {person.title.slice(person.title.indexOf('('))}
                </>
              ) : (
                <>
                  {person.title}
                  {person.alumniPeriod && (
                    <>
                      <br />
                      ({person.alumniPeriod})
                    </>
                  )}
                </>
              )}
            </span>
          ) : (
            <span className={`person-role-badge ${getRoleBadgeClass(person.role)}`} title={person.title}>
              {person.title}
            </span>
          )}
        </div>

        {/* Alumni Destination (Simple text like original site) */}
        {person.alumniDestination && (
          <div className="person-alumni-dest-simple">
            {person.alumniDestination}
          </div>
        )}

        {/* Links & Email row */}
        {(person.email || person.website || person.googleScholar) && (
          <div
            className="person-card-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              marginTop: '2px',
            }}
          >
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                title={person.email}
                aria-label={`Email ${person.name}`}
                className="person-social-link"
                style={{
                  color: 'var(--color-text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
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
                className="person-social-link"
                style={{
                  color: 'var(--color-text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
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
                className="person-social-link"
                style={{
                  color: 'var(--color-text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              >
                <GraduationCap size={13} />
              </a>
            )}

            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="person-email-text"
              >
                {person.email}
              </a>
            )}
          </div>
        )}
      </div>

      <style>{`
        .person-academic-card {
          padding: 8px 8px 12px 8px !important;
          border-radius: 10px !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        @media (hover: hover) and (pointer: fine) {
          .person-academic-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--card-hover-shadow);
          }
        }
        .person-photo-container {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--color-border-subtle);
        }
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

        /* Role Badges (Matched with original site Bootstrap badges) */
        .person-role-badge-wrap {
          display: flex;
          align-items: center;
          margin-top: 1px;
          margin-bottom: 1px;
        }

        .person-role-badge {
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
          vertical-align: baseline;
          border: none;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Professor & Postdoc Fellow Badge (--key-blue-1: #003BD1) */
        .role-badge-prof,
        .role-badge-postdoc {
          background-color: var(--key-blue-1);
          color: #ffffff;
        }

        /* Ph.D. / Integrated / M.S. Student Badge (--key-blue-2: #1791FF) */
        .role-badge-phd,
        .role-badge-ms {
          background-color: var(--key-blue-2);
          color: #ffffff;
        }

        /* Undergraduate Researcher & Alumni Badge (Bootstrap secondary #6c757d) */
        .role-badge-intern,
        .role-badge-alumni,
        .role-badge-default {
          background-color: #6c757d;
          color: #ffffff;
        }

        /* Simple Alumni Destination Text */
        .person-alumni-dest-simple {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        /* Email Address Text next to Icons */
        .person-email-text {
          font-family: var(--font-sans);
          font-size: clamp(0.72rem, 1.4vw, 0.88rem);
          color: var(--color-text-primary);
          text-decoration: none;
          line-height: 1.4;
          overflow-wrap: anywhere;
          word-break: break-word;
          transition: color var(--transition-fast);
        }

        .person-email-text:hover {
          color: var(--color-accent);
        }

        .member-name-link:hover {
          color: var(--color-accent) !important;
          text-decoration: underline;
        }
        .member-name-link:hover .member-name-icon {
          opacity: 1 !important;
          color: var(--color-accent);
        }
        .person-social-link {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease !important;
        }
        .person-social-link:hover {
          transform: scale(1.15);
        }

        @media (max-width: 640px) {
          .person-academic-card {
            padding: 6px 6px 10px 6px !important;
            border-radius: 10px !important;
          }
          .person-photo-container {
            border-radius: 6px !important;
            max-height: 220px;
          }
          .person-card-body {
            padding: 6px 2px 2px 2px !important;
            gap: 4px !important;
          }
          .person-role-badge {
            font-size: 0.7rem !important;
          }
          .member-name-heading {
            font-size: 13.5px !important;
          }
          .person-card-links {
            gap: 5px !important;
          }
        }
      `}</style>
    </div>
  );
};
