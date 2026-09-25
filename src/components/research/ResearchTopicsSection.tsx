import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { researchTopics } from '../../data/research';
import type { ResearchTopic } from '../../types';

export const ResearchTopicsSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleCardClick = (topicId: string) => {
    setSelectedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const activeTopic = researchTopics.find((t) => t.id === selectedTopicId) || null;

  const renderDetailsContent = (topic: ResearchTopic) => {
    return (
      <div className="topic-expanded-details">
        {/* Top Content: Overview (Left) & Highlights/Keywords (Right) */}
        <div className="details-header-grid">
          {/* Left: Research Overview Text */}
          <div className="details-overview-col">
            <div className="details-section-label">
              Research Overview
            </div>
            <p className="details-lead-summary">
              {topic.summary}
            </p>
            <div className="details-desc-list">
              {topic.description.map((paragraph, idx) => (
                <p key={idx} className="details-desc-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Key Highlights & Keywords */}
          <div className="details-meta-col">
            {topic.highlights && topic.highlights.length > 0 && (
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <div className="details-section-label">
                  Key Highlights
                </div>
                <div className="details-highlights-list">
                  {topic.highlights.map((hl, idx) => (
                    <div key={idx} className="details-highlight-item">
                      <CheckCircle2 size={14} className="highlight-icon" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="details-section-label">
                Core Keywords
              </div>
              <div className="keyword-tags-wrap">
                {topic.keywords.map((kw, idx) => (
                  <span key={idx} className="keyword-tag">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Research Figure & Architecture */}
        {topic.image && (
          <div className="details-figure-container">
            <div className="details-figure-header">
              <span className="details-section-label" style={{ marginBottom: 0 }}>
                System Architecture & Methodology
              </span>
              <a
                href={topic.image}
                target="_blank"
                rel="noreferrer"
                className="figure-zoom-link"
                title="Open high-resolution figure in new tab"
              >
                View full image ↗
              </a>
            </div>

            <div className="research-figure-frame">
              <a
                href={topic.image}
                target="_blank"
                rel="noreferrer"
                title="Click to view full-resolution image"
                style={{ display: 'block', cursor: 'zoom-in' }}
              >
                <img
                  src={topic.image}
                  alt={topic.title}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </a>
              {topic.imageCaption && (
                <div className="figure-caption">
                  {topic.imageCaption}
                </div>
              )}
            </div>
          </div>
        )}
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

        .details-header-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 32px;
          align-items: start;
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

        .details-desc-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .details-desc-paragraph {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .details-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .details-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-secondary);
        }

        .highlight-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 2.5px;
        }

        .keyword-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
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

        .details-figure-container {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--color-border-subtle);
        }

        .details-figure-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .figure-zoom-link {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .figure-zoom-link:hover {
          color: var(--color-accent);
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
          .details-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px;
          }
          .topic-expanded-details {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
};
