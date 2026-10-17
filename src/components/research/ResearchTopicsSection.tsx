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
        {researchTopics.map((topic, index) => {
          return (
            <React.Fragment key={topic.id}>
              {index > 0 && <hr className="research-topic-divider" />}
              <article id={topic.id} className="research-topic-item">
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
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .topics-section-header {
          margin-bottom: clamp(16px, 2.5vw, 24px);
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }

        .explore-heading {
          font-family: var(--font-heading);
          font-size: var(--text-h1);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .research-topics-list {
          display: flex;
          flex-direction: column;
        }

        .research-topic-divider {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 0.75rem 0;
          opacity: 0.6;
        }

        .research-topic-item {
          padding: 1.25rem 1.25rem;
          margin: 0.75rem -1.25rem;
          background-color: var(--color-bg);
          border-radius: 10px;
          position: relative;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .research-topic-item:hover {
          box-shadow: var(--card-hover-shadow);
          transform: translateY(-3px);
        }

        .topic-title {
          font-family: var(--font-heading);
          font-size: var(--text-h2);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .topic-question {
          font-family: var(--font-sans);
          font-size: 1.05rem;
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
          font-size: var(--text-body);
          line-height: 1.6;
          color: var(--color-text-primary);
        }

        .topic-diagram-container {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          overflow: hidden;
          padding: clamp(10px, 1.8vw, 18px);
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
