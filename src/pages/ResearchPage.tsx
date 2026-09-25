import React from 'react';
import { researchProjects } from '../data/research';
import { SectionHeader } from '../components/common/SectionHeader';
import { ResearchIntroQuote } from '../components/research/ResearchIntroQuote';
import { ResearchCarousel } from '../components/research/ResearchCarousel';
import { ResearchTopicsSection } from '../components/research/ResearchTopicsSection';
import { ResearchProjectItem } from '../components/research/ResearchProjectItem';
import { SupportedByMarquee } from '../components/research/SupportedByMarquee';

interface ResearchPageProps {
  onNavigate: (page: string, anchorId?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  return (
    <div className="research-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
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
            Research
          </h1>
        </div>
      </section>

      {/* Intro Vision Editorial Quote Section */}
      <ResearchIntroQuote />

      {/* Main Research Figure Carousel */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <ResearchCarousel />
        </div>
      </section>

      {/* Three Research Pillars Interactive Cards */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <ResearchTopicsSection />
        </div>
      </section>

      {/* Funded Grants & Projects Directory */}
      <section id="projects-directory" style={{ marginTop: 'var(--space-section)' }}>
        <div className="container">
          <SectionHeader
            title="Projects"
            actionText="View Publications"
            onActionClick={() => onNavigate('publications')}
          />

          <div className="projects-list-container">
            {researchProjects.map((project) => (
              <ResearchProjectItem key={project.id} project={project} />
            ))}
          </div>

          {/* Supported By: Funding Agencies Marquee Banner */}
          <SupportedByMarquee />
        </div>
      </section>
    </div>
  );
};
