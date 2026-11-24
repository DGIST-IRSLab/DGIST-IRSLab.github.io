import React from 'react';
import { ArrowUpRight } from 'lucide-react';
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

                {/* Clean Unified Figure Strip (Academic Paper Style, No Cards) */}
                {topic.figures && topic.figures.length > 0 ? (
                  <div className="topic-diagram-container">
                    <div
                      className={`topic-figure-strip cols-${Math.min(topic.figures.length, 4)}`}
                    >
                      {topic.figures.map((fig, figIdx) => (
                        <figure key={figIdx} className="topic-subfig">
                          <a
                            href={assetUrl(fig.image)}
                            target="_blank"
                            rel="noreferrer"
                            className="topic-subfig-link"
                            title={`Click to view full-resolution: ${fig.label}`}
                          >
                            <img
                              src={assetUrl(fig.image)}
                              alt={fig.alt || fig.label}
                              className="topic-subfig-image"
                              loading="lazy"
                            />
                          </a>
                          <figcaption className="topic-subfig-caption">
                            <span className="topic-subfig-label">{fig.label}</span>
                            {fig.papers && fig.papers.length > 0 && (
                              <span className="topic-subfig-papers">
                                {fig.papers.map((paper, pIdx) => (
                                  <React.Fragment key={pIdx}>
                                    {pIdx > 0 && <span className="topic-subfig-sep"> · </span>}
                                    {paper.url ? (
                                      <a
                                        href={paper.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="topic-subfig-paper-link"
                                      >
                                        <span>{paper.label}</span>
                                        <ArrowUpRight size={11} className="topic-subfig-paper-icon" />
                                      </a>
                                    ) : (
                                      <span className="topic-subfig-paper-text">{paper.label}</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </span>
                            )}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : (
                  topic.image && (
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
                  )
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
          padding: clamp(16px, 2.2vw, 26px);
        }

        .topic-figure-strip {
          display: grid;
          gap: clamp(18px, 2.2vw, 28px);
          align-items: stretch;
        }

        .topic-figure-strip.cols-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .topic-figure-strip.cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .topic-figure-strip.cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .topic-figure-strip.cols-1 {
          grid-template-columns: 1fr;
        }

        .topic-subfig {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .topic-subfig-link {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-in;
          text-decoration: none;
        }

        .topic-subfig-image {
          width: 100%;
          max-height: 255px;
          height: auto;
          display: block;
          object-fit: contain;
          transition: opacity 0.18s ease;
        }

        .topic-figure-strip.cols-3 .topic-subfig-image {
          max-height: 290px;
        }

        .topic-subfig-link:hover .topic-subfig-image {
          opacity: 0.88;
        }

        .topic-subfig-caption {
          margin-top: 12px;
          min-height: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 3px;
          text-align: center;
        }

        .topic-subfig-label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .topic-subfig-papers {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 2px;
          font-family: var(--font-sans);
          font-size: 0.77rem;
          line-height: 1.35;
          color: #64748b;
        }

        .topic-subfig-sep {
          color: #94a3b8;
          margin: 0 2px;
        }

        .topic-subfig-paper-link {
          display: inline-flex;
          align-items: center;
          gap: 1px;
          color: #0052cc;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .topic-subfig-paper-link:hover {
          color: #1791ff;
          text-decoration: underline;
        }

        .topic-subfig-paper-icon {
          flex-shrink: 0;
          opacity: 0.75;
        }

        .topic-subfig-paper-text {
          color: #64748b;
          font-weight: 500;
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

        @media (max-width: 960px) {
          .topic-figure-strip.cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 28px;
          }
        }

        @media (max-width: 720px) {
          .topic-figure-strip.cols-3 {
            grid-template-columns: 1fr;
            row-gap: 28px;
          }
        }

        @media (max-width: 560px) {
          .topic-figure-strip.cols-4,
          .topic-figure-strip.cols-2 {
            grid-template-columns: 1fr;
            row-gap: 28px;
          }
        }
      `}</style>
    </section>
  );
};
