import React from 'react';
import { postdocs, graduateStudents, undergraduateResearchers, alumni, internHistory } from '../data/people';
import { ProfessorProfile } from '../components/people/ProfessorProfile';
import { PersonCard } from '../components/people/PersonCard';
import { SectionHeader } from '../components/common/SectionHeader';

interface PeoplePageProps {
  onNavigate: (page: string) => void;
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
            People
          </h1>
        </div>
      </section>

      {/* Professor Profile Feature */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Principal Investigator"
          />
          <ProfessorProfile />
        </div>
      </section>

      {/* Postdoctoral Fellows */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Postdoctoral Fellows"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {postdocs.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Graduate Students */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Graduate Students"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {graduateStudents.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Undergraduate Researchers */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Undergraduate Researchers"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {undergraduateResearchers.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Alumni"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {alumni.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Intern History */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
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
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 'var(--space-md)',
                  paddingBottom: '8px',
                  borderBottom: i < internHistory.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    minWidth: '150px',
                  }}
                >
                  [{cohort.period}]
                </span>
                <span style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)' }}>
                  {cohort.names.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
