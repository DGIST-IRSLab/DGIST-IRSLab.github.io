import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { researchTopics } from '../../data/research';
import { assetUrl } from '../../utils/asset';

export const ResearchTopicsSection: React.FC = () => {
  return (
    <section className="research-topics-section">
      {/* Section Header */}
      <div className="topics-section-header">
        <h2 className="explore-heading">
          Explore our research
        </h2>
        <p className="explore-subtext">
          Our research investigates innovative directions uniting radio-frequency wave physics, foundation artificial intelligence, and physical-world multimodal sensing.
        </p>
      </div>

      {/* Sequential Editorial Sections */}
      <div className="themes-list">
        {researchTopics.map((topic, index) => {
          return (
            <article key={topic.id} id={topic.id} className="theme-article">
              {/* Theme Header */}
              <div className="theme-header">
                <div className="theme-title-row">
                  <span className="theme-index-num">0{index + 1}</span>
                  <h3 className="theme-title">{topic.title}</h3>
                </div>
                <p className="theme-lead-summary">{topic.summary}</p>
              </div>

              {/* Theme 2-Column Grid */}
              <div className="theme-content-grid">
                {/* Left: Narrative Description, Highlights, Keywords */}
                <div className="theme-text-col">
                  {/* Research Question */}
                  <div className="theme-question-quote">
                    <p className="theme-question-text">
                      &ldquo;{topic.question}&rdquo;
                    </p>
                  </div>

                  {/* Technical Description Paragraphs */}
                  <div className="theme-desc-block">
                    {topic.description.map((paragraph, pIdx) => (
                      <p key={pIdx} className="theme-desc-paragraph">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Key Contributions / Highlights */}
                  {topic.highlights && topic.highlights.length > 0 && (
                    <div className="theme-highlights-block">
                      <h4 className="theme-subheading">Key Contributions</h4>
                      <ul className="theme-highlights-list">
                        {topic.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="theme-highlight-item">
                            <CheckCircle2 size={16} className="theme-check-icon" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Keywords */}
                  <div className="theme-keywords-wrap">
                    {topic.keywords.map((kw, kwIdx) => (
                      <span key={kwIdx} className="theme-keyword-chip">
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: High-Resolution Figure Frame */}
                {topic.image && (
                  <div className="theme-figure-col">
                    <div className="theme-figure-frame">
                      <div className="theme-figure-bar">
                        <span className="theme-figure-title">Research Framework &amp; Overview</span>
                        <a
                          href={assetUrl(topic.image)}
                          target="_blank"
                          rel="noreferrer"
                          className="theme-figure-link"
                          title="Open high-resolution figure in new tab"
                        >
                          <span>View full image</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="theme-figure-img-wrap">
                        <a
                          href={assetUrl(topic.image)}
                          target="_blank"
                          rel="noreferrer"
                          title="Click to view full-resolution image"
                          className="theme-zoom-anchor"
                        >
                          <img
                            src={assetUrl(topic.image)}
                            alt={topic.title}
                            loading="lazy"
                            className="theme-figure-img"
                          />
                        </a>
                      </div>

                      {topic.imageCaption && (
                        <p className="theme-figure-caption">
                          {topic.imageCaption}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .topics-section-header {
          margin-bottom: clamp(32px, 4.5vw, 48px);
          padding-bottom: 20px;
          border-bottom: 1px solid var(--color-border);
        }

        .explore-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
          line-height: 1.25;
        }

        .explore-subtext {
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin: 0;
          max-width: 820px;
        }

        /* Themes List */
        .themes-list {
          display: flex;
          flex-direction: column;
        }

        .theme-article {
          padding-top: clamp(36px, 5vw, 56px);
          padding-bottom: clamp(36px, 5vw, 56px);
          border-bottom: 1px solid var(--color-border);
        }

        .theme-article:first-child {
          padding-top: 10px;
        }

        .theme-article:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* Theme Header */
        .theme-header {
          margin-bottom: 24px;
        }

        .theme-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .theme-index-num {
          font-family: var(--font-sans);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--color-accent);
          background-color: var(--color-accent-subtle);
          padding: 2.5px 8.5px;
          border-radius: var(--radius-xs, 3px);
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .theme-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .theme-lead-summary {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
          max-width: 900px;
        }

        /* 2-Column Content Grid */
        .theme-content-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(24px, 3.5vw, 44px);
          align-items: start;
        }

        /* Text Column */
        .theme-text-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .theme-question-quote {
          padding: 10px 16px;
          background-color: var(--color-bg-secondary);
          border-left: 3px solid var(--color-accent);
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
        }

        .theme-question-text {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-style: italic;
          color: var(--color-text-primary);
          line-height: 1.55;
          margin: 0;
        }

        .theme-desc-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .theme-desc-paragraph {
          font-family: var(--font-sans);
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .theme-highlights-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px 18px;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
        }

        .theme-subheading {
          font-family: var(--font-sans);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          margin: 0;
        }

        .theme-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .theme-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-secondary);
        }

        .theme-check-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .theme-keywords-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 4px;
        }

        .theme-keyword-chip {
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--color-text-secondary);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 3px 9px;
          border-radius: var(--radius-xs);
          white-space: nowrap;
        }

        /* Figure Column */
        .theme-figure-col {
          position: sticky;
          top: calc(var(--header-height, 64px) + 20px);
        }

        .theme-figure-frame {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        [data-theme='dark'] .theme-figure-frame {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .theme-figure-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          background-color: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .theme-figure-title {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .theme-figure-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .theme-figure-link:hover {
          color: var(--color-accent-hover);
        }

        .theme-figure-img-wrap {
          background-color: var(--color-bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .theme-zoom-anchor {
          display: block;
          width: 100%;
          cursor: zoom-in;
        }

        .theme-figure-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .theme-zoom-anchor:hover .theme-figure-img {
          transform: scale(1.015);
        }

        .theme-figure-caption {
          padding: 10px 14px 12px;
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.55;
          color: var(--color-text-muted);
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border-subtle);
          margin: 0;
        }

        /* Responsive layout */
        @media (max-width: 860px) {
          .theme-content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .theme-figure-col {
            position: static;
          }
        }
      `}</style>
    </section>
  );
};
