import React, { useState } from 'react';
import { researchTopics } from '../../data/research';
import type { ResearchTopic } from '../../types';

export const ResearchTopicsSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleCardClick = (topicId: string) => {
    setSelectedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const activeTopic = researchTopics.find((t) => t.id === selectedTopicId) || null;

  // Weave the full title naturally into the opening sentence
  const getIntegratedLead = (topic: ResearchTopic) => {
    let summaryText = topic.summary;
    if (summaryText.startsWith('Developing ')) {
      summaryText = 'focuses on developing ' + summaryText.slice(11);
    } else if (summaryText.startsWith('Building ')) {
      summaryText = 'centers on building ' + summaryText.slice(9);
    } else if (summaryText.startsWith('Fusing ')) {
      summaryText = 'investigates fusing ' + summaryText.slice(7);
    }
    return {
      title: topic.title,
      rest: summaryText,
    };
  };

  const renderDetailsContent = (topic: ResearchTopic) => {
    const topicIndex = researchTopics.findIndex((t) => t.id === topic.id) + 1;
    const lead = getIntegratedLead(topic);

    return (
      <div className="topic-expanded-details">
        {/* Top: Concise Title */}
        <div className="detail-top-bar">
          <div className="detail-pillar-kicker">
            Research Pillar 0{topicIndex}
          </div>
          <h3 className="detail-compact-heading">
            {topic.shortTitle || topic.title}
          </h3>
        </div>

        {/* Narrative & Description Section (Softer text color) */}
        <div className="detail-narrative-section">
          {/* Opening lead integrating the full title */}
          <p className="detail-lead-narrative">
            <strong className="narrative-strong-title">{lead.title}</strong>{' '}
            {lead.rest}
          </p>

          {/* Description paragraphs with softer color */}
          <div className="detail-desc-paragraphs">
            {topic.description.map((paragraph, idx) => (
              <p key={idx} className="detail-desc-p">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Keywords as small #... hashtags below description */}
          <div className="detail-hashtags-row">
            {topic.keywords.map((kw, idx) => (
              <span key={idx} className="keyword-hashtag">
                <span className="hashtag-symbol">#</span>
                {kw.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Figure Section with Highlights naturally placed ABOVE the image */}
        {topic.image && (
          <div className="detail-figure-section">
            {/* Key Highlights placed directly above the figure */}
            {topic.highlights && topic.highlights.length > 0 && (
              <div className="figure-highlights-wrapper">
                <div className="figure-highlights-header">
                  <span className="figure-highlights-label">Key Research Highlights</span>
                </div>
                <div className="figure-highlights-grid">
                  {topic.highlights.map((hl, idx) => (
                    <div key={idx} className="figure-highlight-card">
                      <span className="highlight-card-num">0{idx + 1}</span>
                      <p className="highlight-card-text">{hl}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture / Pipeline Figure */}
            <div className="figure-media-container">
              <div className="figure-media-header">
                <span className="figure-media-title">Architecture & Experimental Pipeline</span>
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

      {/* 3 Interactive Cards Grid (Taller, Square-proportioned, Clean) */}
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
                <div className="topic-card-top">
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

        /* 3 Cards Grid: Closer to square ratio */
        .topics-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
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
          min-height: 310px;
          aspect-ratio: 1 / 0.95;
          padding: 32px 28px;
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

        .topic-card-top {
          display: flex;
          flex-direction: column;
        }

        .topic-card-title {
          font-family: var(--font-heading);
          font-size: clamp(18px, 1.5vw, 21px);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
        }

        .topic-card-question {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.6;
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
          margin-top: auto;
          padding-top: 24px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-accent);
        }

        /* Expanded Details Container */
        .topic-expanded-details {
          margin-top: 24px;
          padding: 36px 36px 40px 36px;
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

        /* Detail Top Bar: Large Concise Title */
        .detail-top-bar {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .detail-pillar-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          margin-bottom: 6px;
        }

        .detail-compact-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.3vw, 2.1rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.25;
        }

        /* Narrative Section */
        .detail-narrative-section {
          margin-bottom: 32px;
          max-width: 980px;
        }

        .detail-lead-narrative {
          font-size: 15px;
          line-height: 1.75;
          color: var(--color-text-secondary);
          margin: 0 0 14px 0;
        }

        .narrative-strong-title {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .detail-desc-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-desc-p {
          font-size: 14px;
          line-height: 1.75;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Keywords Hashtags Row */
        .detail-hashtags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 12px;
          margin-top: 18px;
          padding-top: 14px;
        }

        .keyword-hashtag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-text-muted);
          background-color: var(--color-bg-secondary);
          padding: 3px 9px;
          border-radius: var(--radius-xs, 3px);
          border: 1px solid var(--color-border-subtle);
          letter-spacing: -0.01em;
          transition: all var(--transition-fast);
        }

        .keyword-hashtag:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        .hashtag-symbol {
          color: var(--color-accent);
          margin-right: 2px;
          font-weight: 600;
        }

        /* Figure Section */
        .detail-figure-section {
          margin-top: 28px;
          padding-top: 28px;
          border-top: 1px solid var(--color-border-subtle);
        }

        /* Highlights directly above the figure */
        .figure-highlights-wrapper {
          margin-bottom: 22px;
        }

        .figure-highlights-header {
          margin-bottom: 12px;
        }

        .figure-highlights-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-accent);
        }

        .figure-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .figure-highlight-card {
          padding: 12px 14px;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs, 3px);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .highlight-card-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent);
        }

        .highlight-card-text {
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-secondary);
          margin: 0;
        }

        /* Figure Media Frame */
        .figure-media-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .figure-media-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
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
            gap: 16px;
          }
          .topic-card {
            aspect-ratio: auto !important;
            min-height: 220px !important;
            padding: 24px 20px !important;
          }
          .desktop-topic-details {
            display: none !important;
          }
          .mobile-topic-details {
            display: block !important;
          }
          .figure-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 10px;
          }
          .topic-expanded-details {
            padding: 24px 18px;
          }
        }
      `}</style>
    </section>
  );
};
