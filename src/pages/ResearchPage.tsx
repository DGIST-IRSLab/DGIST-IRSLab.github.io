import React from 'react';
import { researchTopics, researchProjects } from '../data/research';
import { SectionHeader } from '../components/common/SectionHeader';
import { ResearchTopicCard } from '../components/research/ResearchTopicCard';
import { ResearchProjectItem } from '../components/research/ResearchProjectItem';
import { ResearchCarousel } from '../components/research/ResearchCarousel';

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
          <p
            style={{
              marginTop: 'var(--space-md)',
              fontSize: '15.5px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '860px',
            }}
          >
            Our goal is to develop new sensing technologies to see the world from an entirely new perspective, through AI-Driven Wireless+X Sensing. By Integrating the Power of AI with Radio-Frequency Signal Processing—and further expanding these capabilities through Sensor Fusion—we aim to push the boundaries of human perceptual capabilities in diverse areas such as IoT, Health Monitoring, Autonomous Driving, Defense/Remote Sensing, and HCI.
          </p>
        </div>
      </section>

      {/* Main Research Figure Carousel */}
      <section style={{ paddingTop: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <ResearchCarousel />
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
            title="Projects"
            actionText="View Publications"
            onActionClick={() => onNavigate('publications')}
          />

          <div className="projects-list-container">
            {researchProjects.map((project) => (
              <ResearchProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
