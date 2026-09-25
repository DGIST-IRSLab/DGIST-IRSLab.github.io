import React from 'react';
import { researchTopics, researchProjects } from '../data/research';
import { SectionHeader } from '../components/common/SectionHeader';
import { ResearchTopicCard } from '../components/research/ResearchTopicCard';
import { ResearchProjectItem } from '../components/research/ResearchProjectItem';

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
          <span className="eyebrow">RESEARCH PROGRAM</span>
          <h1 className="h1-title" style={{ marginTop: '4px' }}>
            Research Agenda & Themes
          </h1>
          <p
            className="body-large"
            style={{
              maxWidth: '820px',
              marginTop: 'var(--space-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            Developing physical-world intelligence by unifying radio-frequency wave mechanics, statistical signal processing, and multimodal foundation models.
          </p>
        </div>
      </section>

      {/* Main Research Figure Frame */}
      <section style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="research-figure-frame" style={{ marginBottom: 'var(--space-2xl)' }}>
            <img
              src="/images/research_home2.jpg"
              alt="IRS Lab Overall Research Vision"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="figure-caption">
              Figure: Comprehensive system overview of IRS Lab — AI-driven wireless sensing pipelines connecting raw RF physical signals, neural representation learning, and multi-modal embodied perception.
            </div>
          </div>
        </div>
      </section>

      {/* Three Research Pillars Detailed */}
      <section>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {researchTopics.map((topic) => (
            <ResearchTopicCard
              key={topic.id}
              topic={topic}
              editorial={true}
              onExplore={() => {
                const el = document.getElementById('projects-directory');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Funded Grants & Projects Directory */}
      <section id="projects-directory" style={{ marginTop: 'var(--space-section)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="SPONSORED INITIATIVES"
            title="Active Research Grants & Projects"
            description="Our research is supported by leading national science foundations, government ministries, and defense research organizations."
            actionText="View Publications"
            onActionClick={() => onNavigate('publications')}
          />

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0 var(--space-lg)',
            }}
          >
            {researchProjects.map((project) => (
              <ResearchProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
