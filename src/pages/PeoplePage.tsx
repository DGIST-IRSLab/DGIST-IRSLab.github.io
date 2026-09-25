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
          <span className="eyebrow">RESEARCH PERSONNEL</span>
          <h1 className="h1-title" style={{ marginTop: '4px' }}>
            Lab Members & Alumni
          </h1>
          <p
            className="body-large"
            style={{
              maxWidth: '800px',
              marginTop: 'var(--space-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            A collaborative team of researchers, postdoctoral fellows, graduate students, and undergraduate researchers dedicated to wireless sensing and physical AI.
          </p>
        </div>
      </section>

      {/* Professor Profile Feature */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="FACULTY"
            title="Principal Investigator"
          />
          <ProfessorProfile />
        </div>
      </section>

      {/* Postdoctoral Fellows */}
      <section style={{ paddingTop: 'var(--space-lg)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="POSTDOCTORAL RESEARCHERS"
            title="Postdoctoral Fellows"
            description="Leading specialized inquiries in multimodal LLMs and physical-layer wireless AI."
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
            eyebrow="GRADUATE RESEARCH"
            title="Graduate Students"
            description="Ph.D., Joint MS/Ph.D., and Master's students conducting foundational and experimental research."
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
            eyebrow="UNDERGRADUATE RESEARCH"
            title="Undergraduate Researchers"
            description="DGIST undergraduate students actively participating in lab experiments, data collection, and algorithm development."
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
            eyebrow="CAREER DESTINATIONS"
            title="Alumni"
            description="Former lab members and postdoctoral scholars now continuing their careers at premier global research institutions."
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
            eyebrow="INTERNSHIP PROGRAM"
            title="Research Intern Cohorts"
            description="Past undergraduate students who successfully concluded research internship projects in IRS Lab."
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
