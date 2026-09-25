import React from 'react';
import { ResearchIntroQuote } from '../components/research/ResearchIntroQuote';
import { ResearchCarousel } from '../components/research/ResearchCarousel';
import { ResearchTopicsSection } from '../components/research/ResearchTopicsSection';
import { SupportedByMarquee } from '../components/research/SupportedByMarquee';

interface ResearchPageProps {
  onNavigate: (page: string, anchorId?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate: _onNavigate }) => {
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

      {/* Supported By: Funding Agencies Marquee Banner */}
      <section id="supported-by-section" style={{ marginTop: 'var(--space-xl)' }}>
        <div className="container">
          <SupportedByMarquee />
        </div>
      </section>
    </div>
  );
};
