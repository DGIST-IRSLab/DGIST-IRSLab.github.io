import React, { useState, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { researchTopics } from '../../data/research';
import type { ResearchTopic } from '../../types';
import { assetUrl } from '../../utils/asset';
import { ResearchFigureModal } from './ResearchFigureModal';
import { LeKiwiMascot } from './LeKiwiMascot';

export const ResearchTopicsSection: React.FC = () => {
  const [modalState, setModalState] = useState<{
    topic: ResearchTopic;
    figureIndex: number;
  } | null>(null);

  const handleCloseModal = useCallback(() => {
    setModalState(null);
  }, []);

  const handleSelectFigure = useCallback((index: number) => {
    setModalState((prev) => (prev ? { ...prev, figureIndex: index } : null));
  }, []);

  return (
    <section className="research-topics-section">
      <div className="topics-section-header">
        <h2 className="explore-heading">
          Explore our research
        </h2>
        <LeKiwiMascot />
      </div>

      <div className="research-topics-list">
        {researchTopics.map((topic) => {
          const figCount = topic.figures?.length ?? 0;

          return (
            <article key={topic.id} id={topic.id} className="research-topic-item">
              {/* Unchanged Explanation Text Block */}
              <div className="topic-text-content">
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
              </div>

              {/* Clean Unified Figure Container */}
              {topic.figures && figCount > 0 ? (
                <div className="topic-diagram-container">
                  <div
                    className={`topic-figure-strip count-${Math.min(figCount, 4)}${
                      figCount % 2 === 1 && figCount > 1 ? ' has-odd-span' : ''
                    }`}
                  >
                    {topic.figures.map((fig, figIdx) => (
                      <figure key={figIdx} className="topic-subfig">
                        <button
                          type="button"
                          onClick={() => setModalState({ topic, figureIndex: figIdx })}
                          className="topic-subfig-trigger"
                          aria-label={`Open figure details: ${fig.label}`}
                        >
                          <img
                            src={assetUrl(fig.image)}
                            alt={fig.alt || fig.label}
                            className="topic-subfig-image"
                            loading="lazy"
                          />
                        </button>
                        <figcaption className="topic-subfig-caption">
                          <button
                            type="button"
                            onClick={() => setModalState({ topic, figureIndex: figIdx })}
                            className="topic-subfig-label-btn"
                          >
                            {fig.label}
                          </button>
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
                    <button
                      type="button"
                      onClick={() => setModalState({ topic, figureIndex: 0 })}
                      className="topic-diagram-trigger"
                      aria-label={`Open ${topic.title} diagram`}
                    >
                      <img
                        src={assetUrl(topic.image)}
                        alt={`${topic.title} framework diagram`}
                        className="topic-diagram-image"
                        loading="lazy"
                      />
                    </button>
                  </div>
                )
              )}
            </article>
          );
        })}
      </div>

      <ResearchFigureModal
        topic={modalState?.topic ?? null}
        figureIndex={modalState?.figureIndex ?? 0}
        onClose={handleCloseModal}
        onSelectFigure={handleSelectFigure}
      />

      <style>{`
        .research-topics-section {
          padding-top: var(--space-md);
        }

        .topics-section-header {
          position: relative;
          margin-bottom: clamp(16px, 2.5vw, 24px);
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
          overflow: visible;
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

        /* 3-Column Simultaneous Research Topics Layout (Pure Editorial, No Card Hover Shadow) */
        .research-topics-list {
          --topics-col-gap: clamp(28px, 3vw, 44px);
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: auto 1fr;
          column-gap: var(--topics-col-gap);
          align-items: stretch;
        }

        /* Subtle vertical column dividers between the 3 topics */
        .research-topics-list::before,
        .research-topics-list::after {
          content: '';
          position: absolute;
          top: 0.25rem;
          bottom: 0.25rem;
          width: 1px;
          background-color: var(--color-border);
          opacity: 0.7;
          pointer-events: none;
        }

        .research-topics-list::before {
          left: calc(33.3333% - var(--topics-col-gap) / 6);
        }

        .research-topics-list::after {
          left: calc(66.6667% + var(--topics-col-gap) / 6);
        }

        .research-topic-item {
          display: flex;
          flex-direction: column;
          padding: 0.35rem 0;
          background: transparent;
          position: relative;
        }

        @supports (grid-template-rows: subgrid) {
          .research-topic-item {
            display: grid;
            grid-row: span 2;
            grid-template-rows: subgrid;
          }
        }

        .topic-text-content {
          display: flex;
          flex-direction: column;
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
          margin: 0 0 22px 0;
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
          height: 100%;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          overflow: hidden;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .topic-figure-strip {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px 12px;
          align-items: stretch;
        }

        .topic-figure-strip.count-1 {
          grid-template-columns: 1fr;
        }

        .topic-figure-strip.has-odd-span .topic-subfig:last-child {
          grid-column: 1 / -1;
        }

        .topic-subfig {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .topic-subfig-trigger {
          flex: 1;
          width: 100%;
          min-height: 118px;
          padding: 0;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .topic-subfig-trigger:hover .topic-subfig-image {
          opacity: 0.86;
        }

        .topic-subfig-image {
          width: 100%;
          max-height: 122px;
          height: auto;
          display: block;
          object-fit: contain;
          transition: opacity 0.18s ease;
        }

        .topic-figure-strip.has-odd-span .topic-subfig:last-child .topic-subfig-image {
          max-height: 132px;
        }

        .topic-subfig-caption {
          margin-top: 8px;
          min-height: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 2px;
          text-align: center;
        }

        .topic-subfig-label-btn {
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.3;
          letter-spacing: -0.01em;
          cursor: pointer;
          text-align: center;
          transition: color 0.15s ease;
        }

        .topic-subfig-label-btn:hover {
          color: #0052cc;
        }

        .topic-subfig-papers {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 2px;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          line-height: 1.3;
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

        .topic-diagram-trigger {
          display: block;
          width: 100%;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
        }

        .topic-diagram-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Responsive fallback for narrow tablets & mobile */
        @media (max-width: 980px) {
          .research-topics-list {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            row-gap: 0;
          }

          .research-topics-list::before,
          .research-topics-list::after {
            display: none;
          }

          .research-topic-item {
            display: flex;
            grid-row: auto;
            padding: 1.35rem 0;
            border-bottom: 1px solid var(--color-border);
          }

          .research-topic-item:last-child {
            border-bottom: none;
          }

          .topic-diagram-container {
            height: auto;
            padding: clamp(14px, 2vw, 22px);
          }

          .topic-figure-strip.count-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .topic-figure-strip.count-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .topic-figure-strip.count-3.has-odd-span .topic-subfig:last-child {
            grid-column: auto;
          }

          .topic-subfig-image,
          .topic-figure-strip.has-odd-span .topic-subfig:last-child .topic-subfig-image {
            max-height: 190px;
          }
        }

        @media (max-width: 640px) {
          .topic-figure-strip.count-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .topic-figure-strip.count-3.has-odd-span .topic-subfig:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 460px) {
          .topic-figure-strip.count-4,
          .topic-figure-strip.count-3,
          .topic-figure-strip.count-2 {
            grid-template-columns: 1fr;
          }

          .topic-figure-strip.count-3.has-odd-span .topic-subfig:last-child {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
};
