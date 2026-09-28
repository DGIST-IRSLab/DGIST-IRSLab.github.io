import React from 'react';
import { professor, postdocs, graduateStudents, undergraduateResearchers, alumni, internHistory } from '../data/people';
import { PersonCard } from '../components/people/PersonCard';
import { SectionHeader } from '../components/common/SectionHeader';

interface PeoplePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ onNavigate }) => {
  return (
    <div className="people-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Header Banner */}
      <section
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        <div className="container">
          <h1 className="h1-title">
            Members
          </h1>
          <p
            style={{
              marginTop: '6px',
              color: 'var(--color-text-secondary)',
              fontSize: '16px',
            }}
          >
            Faculty, postdoctoral fellows, graduate students, and undergraduate researchers
          </p>
        </div>
      </section>

      {/* Principal Investigator */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Principal Investigator"
            actionText="View Full P.I Profile"
            onActionClick={() => onNavigate('pi')}
          />
          <div className="members-grid">
            <PersonCard person={professor} onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Postdoctoral Fellows */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Postdoctoral Fellows"
          />

          <div className="members-grid">
            {postdocs.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Graduate Students */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Graduate Students"
          />

          <div className="members-grid">
            {graduateStudents.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Undergraduate Researchers */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Undergraduate Researchers"
          />

          <div className="members-grid">
            {undergraduateResearchers.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Alumni"
          />

          <div className="members-grid">
            {alumni.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Intern History */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Research Interns"
            actionText="Join the Lab"
            onActionClick={() => onNavigate('join')}
          />

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
          >
            {internHistory.map((cohort, i) => (
              <div
                key={i}
                className="intern-row"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'var(--space-md)',
                  paddingBottom: '8px',
                  borderBottom: i < internHistory.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                }}
              >
                <span
                  className="intern-period"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    minWidth: '150px',
                    flexShrink: 0,
                  }}
                >
                  [{cohort.period}]
                </span>
                <span className="intern-names" style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)' }}>
                  {cohort.names.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .members-section {
          padding-top: var(--space-2xl);
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: var(--space-lg);
        }

        @media (max-width: 1024px) {
          .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
            gap: var(--space-md);
          }
        }

        @media (max-width: 640px) {
          .members-section {
            padding-top: var(--space-xl);
          }

          .members-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }

          .intern-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }

          .intern-period {
            min-width: auto !important;
          }
        }

        @media (max-width: 360px) {
          .members-grid {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export const MembersPage = PeoplePage;
