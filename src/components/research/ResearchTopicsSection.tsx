import React from 'react';
import { researchTopics } from '../../data/research';
import { assetUrl } from '../../utils/asset';

export const ResearchTopicsSection: React.FC = () => {
  return (
    <section className="research-topics-section">
      <div className="topics-section-header">
        <h2 className="explore-heading">
          Explore our research
        </h2>
      </div>

      <div className="research-topics-list">
        {researchTopics.map((topic) => {
          return (
            <article key={topic.id} id={topic.id} className="research-topic-item">
              {/* Topic Title */}
              <h3 className="topic-title">{topic.title}</h3>

              {/* Core Scientific Question */}
              <p className="topic-question">&ldquo;{topic.question}&rdquo;</p>

              {/* Clean Bullet Points */}
              <ul className="topic-bullet-list">
                {topic.highlights.map((bullet, idx) => (
                  <li key={idx} className="topic-bullet-item">
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Research Diagram Banner */}
              {topic.image && (
                <div className="topic-diagram-container">
                  <a
                    href={assetUrl(topic.image)}
                    target="_blank"
                    rel="noreferrer"
                    className="topic-diagram-link"
                    title={`Click to view full-resolution ${topic.title} diagram`}
                  >
                    <img
                      src={assetUrl(topic.image)}
                      alt={`${topic.title} framework diagram`}
                      className="topic-diagram-image"
                      loading="lazy"
                    />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .topics-section-header {
          margin-bottom: clamp(24px, 3.5vw, 36px);
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .explore-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .research-topics-list {
          display: flex;
          flex-direction: column;
        }

        .research-topic-item {
          padding-top: clamp(36px, 5vw, 56px);
          padding-bottom: clamp(36px, 5vw, 56px);
          border-bottom: 1px solid var(--color-border);
        }

        .research-topic-item:first-child {
          padding-top: 8px;
        }

        .research-topic-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .topic-title {
          font-family: var(--font-heading);
          font-size: clamp(1.45rem, 2.2vw, 1.85rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .topic-question {
          font-family: var(--font-sans);
          font-size: clamp(15px, 1.4vw, 17px);
          font-style: italic;
          font-weight: 500;
          color: var(--color-accent);
          line-height: 1.5;
          margin: 0 0 18px 0;
        }

        .topic-bullet-list {
          list-style: disc;
          padding-left: 22px;
          margin: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .topic-bullet-item {
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-text-primary);
        }

        .topic-diagram-container {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          padding: clamp(10px, 1.8vw, 18px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        [data-theme='dark'] .topic-diagram-container {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .topic-diagram-container:hover {
          border-color: var(--color-accent);
          box-shadow: 0 6px 20px rgba(2, 140, 255, 0.1);
        }

        .topic-diagram-link {
          display: block;
          width: 100%;
          cursor: zoom-in;
        }

        .topic-diagram-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
      `}</style>
    </section>
  );
};
