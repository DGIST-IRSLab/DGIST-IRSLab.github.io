import React, { useState } from 'react';
import { Mail, Globe, ExternalLink, GraduationCap, ArrowRight } from 'lucide-react';
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

export const PersonCard: React.FC<PersonCardProps> = ({ person, compact = false, onNavigate }) => {
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
          gap: '5px',
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
              fontSize: '14.5px',
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
                <ArrowRight size={12} className="member-name-icon" style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
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
          {person.nameKr && (
            isPI && onNavigate ? (
              <span
                onClick={handleCardClick}
                className="member-name-kr member-name-kr-link"
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                }}
              >
                {person.nameKr}
              </span>
            ) : homeUrl ? (
              <a
                href={homeUrl}
                target="_blank"
                rel="noreferrer"
                className="member-name-kr member-name-kr-link"
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
                className="member-name-kr"
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

        {/* Role Badge under name */}
        <div className="person-role-badge-wrap">
          <span className={`person-role-badge ${getRoleBadgeClass(person.role)}`} title={person.title}>
            {person.title}
          </span>
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
            className="person-card-interests"
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
          className="person-card-links"
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
              className="person-social-link"
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
              className="person-social-link"
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
              className="person-social-link"
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
        .person-academic-card {
          padding: 8px 8px 12px 8px !important;
          border-radius: 12px !important;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease !important;
        }
        @media (hover: hover) and (pointer: fine) {
          .person-academic-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
            border-color: var(--color-accent-border) !important;
          }
          [data-theme='dark'] .person-academic-card:hover {
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.38);
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

        /* Role Badges */
        .person-role-badge-wrap {
          display: flex;
          align-items: center;
          margin-top: 1px;
          margin-bottom: 2px;
        }

        .person-role-badge {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 2.5px 7.5px;
          border-radius: var(--radius-xs, 4px);
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Professor / PI Badge (Royal Indigo) */
        .role-badge-prof {
          background-color: #eef2ff;
          color: #4338ca;
          border: 1px solid #c7d2fe;
        }
        [data-theme='dark'] .role-badge-prof {
          background-color: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        /* Postdoctoral Fellow Badge (Rich Violet) */
        .role-badge-postdoc {
          background-color: #f5f3ff;
          color: #6d28d9;
          border: 1px solid #ddd6fe;
        }
        [data-theme='dark'] .role-badge-postdoc {
          background-color: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        /* Ph.D. / Integrated Ph.D. Student Badge (Ocean Azure) */
        .role-badge-phd {
          background-color: #f0f9ff;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }
        [data-theme='dark'] .role-badge-phd {
          background-color: rgba(14, 165, 233, 0.15);
          color: #7dd3fc;
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        /* M.S. Student Badge (Emerald Green) */
        .role-badge-ms {
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
        [data-theme='dark'] .role-badge-ms {
          background-color: rgba(34, 197, 94, 0.15);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        /* Undergraduate Researcher Badge (Warm Amber) */
        .role-badge-intern {
          background-color: #fffbeb;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        [data-theme='dark'] .role-badge-intern {
          background-color: rgba(245, 158, 11, 0.15);
          color: #fcd34d;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        /* Alumni Badge (Slate Gray) */
        .role-badge-alumni {
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }
        [data-theme='dark'] .role-badge-alumni {
          background-color: rgba(148, 163, 184, 0.15);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.25);
        }

        .role-badge-default {
          background-color: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
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
        .person-social-link {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease !important;
        }
        .person-social-link:hover {
          transform: scale(1.2) translateY(-1px);
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
            font-size: 10px !important;
            padding: 1.5px 6px !important;
          }
          .member-name-heading {
            font-size: 13.5px !important;
          }
          .member-name-kr {
            font-size: 11.5px !important;
          }
          .person-card-interests {
            font-size: 11px !important;
            line-height: 1.35 !important;
          }
          .person-card-links {
            padding-top: 5px !important;
            gap: 7px !important;
          }
        }
      `}</style>
    </div>
  );
};
