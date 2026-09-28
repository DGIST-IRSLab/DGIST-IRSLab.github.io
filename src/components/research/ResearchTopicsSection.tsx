import React, { useState } from 'react';
import { ExternalLink, ChevronUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { researchTopics } from '../../data/research';
import type { ResearchTopic } from '../../types';
import { assetUrl } from '../../utils/asset';

export const ResearchTopicsSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleCardClick = (topicId: string) => {
    setSelectedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const activeTopic = researchTopics.find((t) => t.id === selectedTopicId) || null;

  const renderDetailsContent = (topic: ResearchTopic, pillarIndex: number) => {
    return (
      <div className="topic-expanded-details" id={`details-${topic.id}`}>
        {/* Top Header Bar */}
        <div className="detail-top-bar">
          <div className="detail-meta-row">
            <span className="detail-pillar-label">PILLAR 0{pillarIndex + 1}</span>
            <span className="detail-divider">/</span>
            <span className="detail-meta-badge">RESEARCH ARCHITECTURE &amp; METHODOLOGY</span>
          </div>
          <div className="detail-title-row">
            <h3 className="detail-heading">{topic.title}</h3>
            <button
              type="button"
              onClick={() => setSelectedTopicId(null)}
              className="detail-close-btn"
              aria-label="Close architecture details"
            >
              <span>Close</span>
              <ChevronUp size={16} />
            </button>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Content on Left, High-Res Figure on Right */}
        <div className="detail-grid-layout">
          {/* Left Column: Narrative, Motivation & Highlights */}
          <div className="detail-content-col">
            <div className="detail-lead-box">
              <span className="detail-lead-label">Executive Overview</span>
              <p className="detail-lead-summary">{topic.summary}</p>
            </div>

            {/* Core Research Question */}
            <div className="detail-rq-box">
              <span className="detail-rq-prefix">Core Research Question</span>
              <p className="detail-rq-text">&ldquo;{topic.question}&rdquo;</p>
            </div>

            {/* Technical Approach & Motivation */}
            <div className="detail-desc-group">
              <h4 className="detail-subheading">Technical Approach &amp; Challenges</h4>
              {topic.description.map((paragraph, idx) => (
                <p key={idx} className="detail-desc-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Technical Highlights */}
            {topic.highlights && topic.highlights.length > 0 && (
              <div className="detail-highlights-group">
                <h4 className="detail-subheading">Key Technical Contributions</h4>
                <ul className="detail-highlights-list">
                  {topic.highlights.map((hl, idx) => (
                    <li key={idx} className="detail-highlight-item">
                      <CheckCircle2 size={16} className="detail-highlight-icon" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Academic Keywords Tags (Clean academic chips, NO hashtags) */}
            <div className="detail-tags-group">
              <span className="detail-tags-label">Keywords &amp; Methodologies:</span>
              <div className="detail-tags-list">
                {topic.keywords.map((kw, idx) => (
                  <span key={idx} className="academic-keyword-chip">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Resolution Architecture Figure Frame */}
          {topic.image && (
            <div className="detail-figure-col">
              <div className="figure-card-frame">
                <div className="figure-top-bar">
                  <span className="figure-bar-label">Architecture &amp; Pipeline Diagram</span>
                  <a
                    href={assetUrl(topic.image)}
                    target="_blank"
                    rel="noreferrer"
                    className="figure-external-link"
                    title="Open high-resolution figure in new tab"
                  >
                    <span>View full image</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="figure-image-wrapper">
                  <a
                    href={assetUrl(topic.image)}
                    target="_blank"
                    rel="noreferrer"
                    title="Click to view full-resolution image"
                    className="figure-zoom-anchor"
                  >
                    <img
                      src={assetUrl(topic.image)}
                      alt={topic.title}
                      loading="lazy"
                      className="figure-primary-image"
                    />
                  </a>
                </div>

                {topic.imageCaption && (
                  <div className="figure-academic-caption">
                    {topic.imageCaption}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="research-topics-section">
      {/* Section Header */}
      <div className="topics-section-header">
        <div className="topics-eyebrow">RESEARCH PILLARS</div>
        <h2 className="explore-heading">
          Explore our research
        </h2>
        <p className="explore-subtext">
          Our research investigates three core pillars uniting radio-frequency wave physics, foundation artificial intelligence, and physical-world multimodal sensing.
        </p>
      </div>

      {/* 3 Academic Pillar Cards Grid */}
      <div className="topics-cards-grid">
        {researchTopics.map((topic, index) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <div key={topic.id} className="topic-card-wrapper">
              <article
                className={`academic-topic-card ${isSelected ? 'selected' : ''}`}
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
                {/* 1. Research Figure Thumbnail Banner */}
                <div className="card-figure-thumb-wrap">
                  <img
                    src={assetUrl(topic.image)}
                    alt={topic.title}
                    loading="lazy"
                    className="card-figure-thumb-img"
                  />
                  <div className="card-pillar-pill">
                    <span>PILLAR 0{index + 1}</span>
                  </div>
                </div>

                {/* 2. Card Content Body */}
                <div className="card-content-body">
                  <h3 className="card-topic-title">{topic.title}</h3>

                  {/* Research Question Box */}
                  <div className="card-question-box">
                    <p className="card-question-text">
                      &ldquo;{topic.question}&rdquo;
                    </p>
                  </div>

                  {/* Concise Summary */}
                  <p className="card-summary-text">{topic.summary}</p>

                  {/* Key Highlights List */}
                  {topic.highlights && topic.highlights.length > 0 && (
                    <div className="card-highlights-box">
                      <div className="card-highlights-header">Key Research Focus:</div>
                      <ul className="card-highlights-list">
                        {topic.highlights.slice(0, 2).map((hl, i) => (
                          <li key={i} className="card-highlight-item">
                            <span className="card-bullet-pip" aria-hidden="true" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Academic Keywords Chips (No hashtags) */}
                  <div className="card-chips-row">
                    {topic.keywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="card-chip">
                        {kw.trim()}
                      </span>
                    ))}
                    {topic.keywords.length > 3 && (
                      <span className="card-chip-more">+{topic.keywords.length - 3}</span>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="card-action-footer">
                    <span className="card-action-btn">
                      <span>{isSelected ? 'Close Details' : 'View Architecture & Details'}</span>
                      {isSelected ? <ChevronUp size={14} /> : <ArrowRight size={14} className="card-arrow-icon" />}
                    </span>
                  </div>
                </div>
              </article>

              {/* Mobile details (rendered right below clicked card on mobile) */}
              {isSelected && (
                <div className="mobile-topic-details">
                  {renderDetailsContent(topic, index)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop details (rendered below the 3-column row on large screens) */}
      {activeTopic && (
        <div className="desktop-topic-details">
          {renderDetailsContent(
            activeTopic,
            researchTopics.findIndex((t) => t.id === activeTopic.id)
          )}
        </div>
      )}

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .topics-section-header {
          margin-bottom: var(--space-xl);
        }

        .topics-eyebrow {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--color-accent);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .explore-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.5vw, 1.95rem);
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
          max-width: 780px;
        }

        /* 3 Pillar Cards Grid */
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

        /* Academic Topic Card */
        .academic-topic-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
          user-select: none;
        }

        .academic-topic-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08);
        }

        [data-theme='dark'] .academic-topic-card:hover {
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
        }

        .academic-topic-card.selected {
          border: 1.5px solid var(--color-accent);
          box-shadow: 0 8px 24px rgba(2, 140, 255, 0.14);
        }

        /* Figure Thumbnail Wrap */
        .card-figure-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background-color: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .card-figure-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.35s ease;
        }

        .academic-topic-card:hover .card-figure-thumb-img {
          transform: scale(1.03);
        }

        .card-pillar-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(11, 15, 20, 0.82);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 2.5px 8px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 2;
        }

        /* Card Content Body */
        .card-content-body {
          padding: 20px 22px 18px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 12px;
        }

        .card-topic-title {
          font-family: var(--font-heading);
          font-size: clamp(16px, 1.3vw, 18.5px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          line-height: 1.35;
          margin: 0;
          transition: color var(--transition-fast);
        }

        .academic-topic-card:hover .card-topic-title {
          color: var(--color-accent);
        }

        /* Research Question Box */
        .card-question-box {
          padding: 8px 12px;
          background-color: var(--color-bg-secondary);
          border-left: 2.5px solid var(--color-accent);
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
        }

        .card-question-text {
          font-family: var(--font-sans);
          font-size: 13px;
          font-style: italic;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .card-summary-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Highlights Box */
        .card-highlights-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-highlights-header {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .card-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-highlight-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 12.5px;
          line-height: 1.45;
          color: var(--color-text-secondary);
        }

        .card-bullet-pip {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--color-accent);
          flex-shrink: 0;
          position: relative;
          top: -2px;
        }

        /* Keywords Chips */
        .card-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 6px;
        }

        .card-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-muted);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 2px 7px;
          border-radius: var(--radius-xs);
          white-space: nowrap;
        }

        .card-chip-more {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-muted);
          padding: 2px 4px;
        }

        /* Action Link Footer */
        .card-action-footer {
          padding-top: 10px;
          border-top: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .card-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-accent);
          transition: transform var(--transition-fast);
        }

        .academic-topic-card:hover .card-arrow-icon {
          transform: translateX(3px);
        }

        /* Expanded Details Container */
        .topic-expanded-details {
          margin-top: 24px;
          padding: 36px 36px 40px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-top: 3px solid var(--color-accent);
          border-radius: var(--radius-sm);
          animation: detailsFadeIn 0.25s ease-out;
        }

        @keyframes detailsFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-top-bar {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .detail-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-text-muted);
          margin-bottom: 6px;
        }

        .detail-pillar-label {
          font-weight: 700;
          color: var(--color-accent);
        }

        .detail-divider {
          color: var(--color-border-strong);
        }

        .detail-meta-badge {
          letter-spacing: 0.05em;
        }

        .detail-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .detail-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .detail-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--color-text-muted);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          padding: 5px 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .detail-close-btn:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* Detail 2-Column Grid Layout */
        .detail-grid-layout {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 36px;
          align-items: start;
        }

        .detail-content-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-lead-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .detail-lead-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-lead-summary {
          font-size: 15px;
          line-height: 1.65;
          color: var(--color-text-primary);
          font-weight: 500;
          margin: 0;
        }

        .detail-rq-box {
          padding: 10px 14px;
          background-color: var(--color-bg-secondary);
          border-left: 3px solid var(--color-accent);
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
        }

        .detail-rq-prefix {
          display: block;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .detail-rq-text {
          font-size: 13.5px;
          font-style: italic;
          color: var(--color-text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        .detail-subheading {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
        }

        .detail-desc-group {
          display: flex;
          flex-direction: column;
        }

        .detail-desc-paragraph {
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0 0 10px 0;
        }

        .detail-desc-paragraph:last-child {
          margin-bottom: 0;
        }

        .detail-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-highlight-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-text-secondary);
        }

        .detail-highlight-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          position: relative;
          top: 2px;
        }

        /* Detail Tags */
        .detail-tags-group {
          padding-top: 14px;
          border-top: 1px solid var(--color-border-subtle);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-tags-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .detail-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .academic-keyword-chip {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-text-secondary);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 3px 9px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .academic-keyword-chip:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* Figure Column Frame */
        .detail-figure-col {
          display: flex;
          flex-direction: column;
        }

        .figure-card-frame {
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .figure-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .figure-bar-label {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .figure-external-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .figure-external-link:hover {
          text-decoration: underline;
        }

        .figure-image-wrapper {
          padding: 12px;
          background-color: var(--color-surface);
        }

        .figure-zoom-anchor {
          display: block;
          cursor: zoom-in;
          overflow: hidden;
          border-radius: var(--radius-xs);
          border: 1px solid var(--color-border-subtle);
        }

        .figure-primary-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .figure-zoom-anchor:hover .figure-primary-image {
          transform: scale(1.02);
        }

        .figure-academic-caption {
          font-size: 12.5px;
          line-height: 1.55;
          color: var(--color-text-secondary);
          padding: 10px 14px;
          background-color: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border-subtle);
          font-family: var(--font-sans);
        }

        /* Responsive Breakpoints */
        @media (min-width: 901px) {
          .mobile-topic-details {
            display: none !important;
          }
          .desktop-topic-details {
            display: block !important;
          }
        }

        @media (max-width: 900px) {
          .topics-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .desktop-topic-details {
            display: none !important;
          }

          .mobile-topic-details {
            display: block !important;
          }

          .topic-expanded-details {
            padding: 24px 18px;
            margin-top: 16px;
          }

          .detail-grid-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
};
