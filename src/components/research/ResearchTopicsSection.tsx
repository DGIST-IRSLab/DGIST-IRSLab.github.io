import React, { useState } from 'react';
import { researchTopics, researchProjects } from '../../data/research';
import { publications } from '../../data/publications';
import type { ResearchTopic } from '../../types';

// Map publication IDs for each topic
const topicPublicationIds: Record<string, string[]> = {
  'wireless-centric-ai': [
    'shin2026llm-mmwave',
    'yang2025gait-microdoppler',
    'hor2023mvdoppler',
    'kang2021uav-microdoppler',
  ],
  'wireless-perception-systems': [
    'choi2025mvdoppler-pose',
    'choi2024crowd-counting-transformer',
    'choi2023rf-vital',
    'choi2022remote-respiration-eccv',
    'choi2022fusion-sar-atr',
  ],
  'multimodal-fusion': [
    'shin2026llm-mmwave',
    'choi2024fusion-vital',
    'shin2026refinevqa',
    'lee2026kiees-journal',
  ],
};

export const ResearchTopicsSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleCardClick = (topicId: string) => {
    setSelectedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const activeTopic = researchTopics.find((t) => t.id === selectedTopicId) || null;

  const renderDetailsContent = (topic: ResearchTopic) => {
    const relatedProjects = researchProjects.filter((p) => p.topicId === topic.id);
    const pubIds = topicPublicationIds[topic.id] || [];
    const relatedPubs = pubIds
      .map((id) => publications.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
      <div className="topic-expanded-details">
        {/* Research Overview */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="details-section-label">
            Research Overview
          </div>
          <p className="details-lead-summary">
            {topic.summary}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topic.description.map((paragraph, idx) => (
              <p key={idx} className="details-desc-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Key Keywords */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="details-section-label">
            Key Keywords
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {topic.keywords.map((kw, idx) => (
              <span key={idx} className="keyword-tag">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Related Projects and Publications (2 columns on desktop) */}
        <div className="related-columns-grid">
          {/* Related Projects */}
          <div>
            <div className="details-column-heading">
              <span>Related Funded Projects</span>
              <span className="count-pill">{relatedProjects.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {relatedProjects.length > 0 ? (
                relatedProjects.map((proj) => (
                  <div key={proj.id} className="related-item-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <span className="agency-badge">
                        {proj.agencyBadge || proj.agency.split(' ')[0]}
                      </span>
                      <span className="period-text">
                        {proj.period}
                      </span>
                    </div>
                    <div className="item-title">
                      {proj.title}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Ongoing related research projects
                </div>
              )}
            </div>
          </div>

          {/* Representative Publications */}
          <div>
            <div className="details-column-heading">
              <span>Representative Publications</span>
              <span className="count-pill">{relatedPubs.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {relatedPubs.map((pub) => {
                const isTop = Boolean(
                  pub.isTopConf !== undefined
                    ? pub.isTopConf
                    : (/CVPR|NeurIPS|ECCV|AAAI|ICASSP/i.test(pub.venue) && pub.type === 'conference')
                );
                const isSci = Boolean(
                  pub.isSCI !== undefined
                    ? pub.isSCI
                    : (pub.type === 'journal' && !pub.isDomestic)
                );

                return (
                  <div key={pub.id} className="related-item-card">
                    <div className="item-title">
                      {pub.title}
                    </div>
                    <div className="item-authors">
                      {pub.authors.map((author, aIdx) => {
                        const isLabMember = (pub.labAuthors || []).some((la) =>
                          author.toLowerCase().includes(la.toLowerCase())
                        );
                        return (
                          <span
                            key={aIdx}
                            style={{
                              fontWeight: isLabMember ? 600 : 400,
                              color: isLabMember ? 'var(--color-text-primary)' : 'inherit',
                            }}
                          >
                            {author}
                            {aIdx < pub.authors.length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                      <span className="venue-text">
                        {pub.venueShort || pub.venue}, {pub.year}
                      </span>
                      {isTop && (
                        <span className="pub-badge pub-badge-topconf" style={{ fontSize: '9.5px', padding: '0 4px' }}>
                          TOP CONF.
                        </span>
                      )}
                      {isSci && (
                        <span className="pub-badge pub-badge-sci" style={{ fontSize: '9.5px', padding: '0 4px' }}>
                          SCI
                        </span>
                      )}
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="link-subtle"
                          style={{ fontSize: '12px', marginLeft: 'auto' }}
                        >
                          Paper ↗
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="research-topics-section">
      {/* Section Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 className="explore-heading">
          Explore our research
        </h2>
        <p className="explore-subtext">
          Our research investigates three core pillars uniting radio-frequency wave physics, foundation artificial intelligence, and physical-world multimodal sensing.
        </p>
      </div>

      {/* 3 Interactive Cards Grid */}
      <div className="topics-cards-grid">
        {researchTopics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <div key={topic.id} className="topic-card-wrapper">
              <div
                className={`topic-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCardClick(topic.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(topic.id);
                  }
                }}
              >
                <div>
                  <h3 className="topic-card-title">
                    {topic.title}
                  </h3>
                  <p className="topic-card-question">
                    &ldquo;{topic.question}&rdquo;
                  </p>
                </div>

                <div className="view-details-action">
                  <span>{isSelected ? 'Hide details ↑' : 'View details ↓'}</span>
                </div>
              </div>

              {/* Mobile details (rendered under the clicked card on small screens) */}
              {isSelected && (
                <div className="mobile-topic-details">
                  {renderDetailsContent(topic)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop details (rendered underneath the 3-column row on large screens) */}
      {activeTopic && (
        <div className="desktop-topic-details">
          {renderDetailsContent(activeTopic)}
        </div>
      )}

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .explore-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.45rem, 2.4vw, 1.85rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0 0 8px 0;
          line-height: 1.25;
        }

        .explore-subtext {
          font-size: 14.5px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
          max-width: 760px;
        }

        .topics-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .topic-card-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .topic-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 180px;
          padding: 24px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          user-select: none;
        }

        .topic-card:hover {
          border-color: var(--color-border-strong);
        }

        .topic-card.selected {
          background-color: var(--color-accent-subtle);
          border: 1.5px solid var(--color-accent);
        }

        .topic-card-title {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
        }

        .topic-card-question {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .topic-card.selected .topic-card-question {
          color: var(--color-text-primary);
        }

        .view-details-action {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          font-weight: 500;
          color: var(--color-accent);
        }

        .topic-expanded-details {
          margin-top: 20px;
          padding: 28px 32px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-top: 2px solid var(--color-accent);
          border-radius: var(--radius-sm);
          animation: detailsFadeIn 0.25s ease-out;
        }

        @keyframes detailsFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .details-section-label {
          font-size: 11px;
          font-family: var(--font-mono);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-accent);
          margin-bottom: 8px;
        }

        .details-lead-summary {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.6;
          color: var(--color-text-primary);
          margin: 0 0 12px 0;
        }

        .details-desc-paragraph {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .keyword-tag {
          font-size: 11.5px;
          font-family: var(--font-mono);
          padding: 2.5px 8px;
          border-radius: var(--radius-xs, 3px);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
        }

        .related-columns-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--color-border-subtle);
        }

        .details-column-heading {
          font-size: 12.5px;
          font-family: var(--font-mono);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .count-pill {
          font-size: 10.5px;
          font-family: var(--font-mono);
          padding: 1px 6px;
          border-radius: 10px;
          background-color: var(--color-bg-secondary);
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }

        .related-item-card {
          padding: 10px 14px;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs, 3px);
        }

        .agency-badge {
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 600;
          padding: 1px 5px;
          border-radius: 2px;
          background-color: var(--color-surface);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
        }

        .period-text {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--color-text-muted);
        }

        .item-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.45;
        }

        .item-authors {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-top: 3px;
          line-height: 1.4;
        }

        .venue-text {
          font-size: 11.5px;
          font-family: var(--font-mono);
          color: var(--color-text-muted);
        }

        /* Responsive Layout Breakpoints */
        @media (min-width: 861px) {
          .mobile-topic-details {
            display: none !important;
          }
          .desktop-topic-details {
            display: block !important;
          }
        }

        @media (max-width: 860px) {
          .topics-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-topic-details {
            display: none !important;
          }
          .mobile-topic-details {
            display: block !important;
          }
          .related-columns-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-lg);
          }
          .topic-expanded-details {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
};
