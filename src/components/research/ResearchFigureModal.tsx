import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ResearchTopic, ResearchFigure } from '../../types';
import { assetUrl } from '../../utils/asset';

export interface ResearchFigureModalProps {
  topic: ResearchTopic | null;
  figureIndex: number;
  onClose: () => void;
  onSelectFigure: (index: number) => void;
}

export const ResearchFigureModal: React.FC<ResearchFigureModalProps> = ({
  topic,
  figureIndex,
  onClose,
  onSelectFigure,
}) => {
  const figures: ResearchFigure[] = topic
    ? topic.figures && topic.figures.length > 0
      ? topic.figures
      : topic.image
        ? [
            {
              label: topic.title,
              image: topic.image,
              alt: `${topic.title} framework diagram`,
              description: topic.summary || topic.imageCaption,
            },
          ]
        : []
    : [];

  const isOpen = Boolean(topic && figures.length > 0);
  const safeIndex = figures.length > 0 ? ((figureIndex % figures.length) + figures.length) % figures.length : 0;
  const currentFig = figures[safeIndex];

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && figures.length > 1) {
        onSelectFigure((safeIndex - 1 + figures.length) % figures.length);
      } else if (e.key === 'ArrowRight' && figures.length > 1) {
        onSelectFigure((safeIndex + 1) % figures.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, figures.length, safeIndex, onClose, onSelectFigure]);

  if (!isOpen || !topic || !currentFig || typeof document === 'undefined') {
    return null;
  }

  const hasFooter = Boolean(currentFig.papers?.length) || figures.length > 1;

  const modalNode = (
    <div
      className="research-fig-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-fig-modal-title"
    >
      <div
        className="research-fig-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="research-fig-modal-header">
          <div className="research-fig-modal-heading-group">
            <span className="research-fig-modal-topic">{topic.title}</span>
            <h3 id="research-fig-modal-title" className="research-fig-modal-title">
              {currentFig.label}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="research-fig-modal-close"
            aria-label="Close figure dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Figure Image Stage */}
        <div className="research-fig-modal-stage">
          {figures.length > 1 && (
            <button
              type="button"
              onClick={() => onSelectFigure((safeIndex - 1 + figures.length) % figures.length)}
              className="research-fig-modal-nav prev"
              aria-label="Previous figure"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <img
            key={currentFig.image}
            src={assetUrl(currentFig.image)}
            alt={currentFig.alt || currentFig.label}
            className="research-fig-modal-img"
          />

          {figures.length > 1 && (
            <button
              type="button"
              onClick={() => onSelectFigure((safeIndex + 1) % figures.length)}
              className="research-fig-modal-nav next"
              aria-label="Next figure"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Related Papers & Counter Footer (Description hidden for now) */}
        {hasFooter && (
          <div className="research-fig-modal-body">
            <div className="research-fig-modal-footer">
              <div className="research-fig-modal-papers">
                {currentFig.papers?.map((paper, idx) =>
                  paper.url ? (
                    <a
                      key={idx}
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      className="research-fig-modal-paper-pill link"
                    >
                      <span>{paper.label}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span key={idx} className="research-fig-modal-paper-pill">
                      {paper.label}
                    </span>
                  )
                )}
              </div>

              {figures.length > 1 && (
                <span className="research-fig-modal-counter">
                  {safeIndex + 1} / {figures.length}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes researchModalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes researchModalWindowIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .research-fig-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background-color: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 3vw, 32px);
          animation: researchModalBackdropIn 0.18s ease-out both;
        }

        [data-theme='dark'] .research-fig-modal-backdrop {
          background-color: rgba(2, 6, 14, 0.76);
        }

        .research-fig-modal-window {
          width: 100%;
          max-width: 760px;
          max-height: min(88vh, 820px);
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: researchModalWindowIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .research-fig-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 22px 14px;
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-surface-elevated);
          flex-shrink: 0;
        }

        .research-fig-modal-heading-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .research-fig-modal-topic {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--irs-blue-500);
          letter-spacing: 0.01em;
        }

        .research-fig-modal-title {
          font-family: var(--font-heading);
          font-size: 1.12rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.3;
          margin: 0;
        }

        .research-fig-modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--color-text-primary);
          opacity: 0.65;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
        }

        .research-fig-modal-close:hover {
          opacity: 1;
          background-color: var(--color-bg-tertiary);
          border-color: var(--color-border);
        }

        .research-fig-modal-stage {
          position: relative;
          background-color: #ffffff;
          padding: clamp(18px, 2.8vw, 28px) clamp(20px, 5vw, 52px);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          overflow: hidden;
        }

        .research-fig-modal-img {
          max-width: 100%;
          max-height: min(62vh, 540px);
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .research-fig-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background-color: rgba(255, 255, 255, 0.92);
          color: #1e293b;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
        }

        .research-fig-modal-nav:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-50%) scale(1.06);
        }

        .research-fig-modal-nav.prev {
          left: 12px;
        }

        .research-fig-modal-nav.next {
          right: 12px;
        }

        .research-fig-modal-body {
          padding: 12px 22px 14px;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-surface-elevated);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .research-fig-modal-desc {
          font-family: var(--font-sans);
          font-size: 0.93rem;
          line-height: 1.65;
          color: var(--color-text-primary);
          margin: 0;
        }

        .research-fig-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .research-fig-modal-papers {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .research-fig-modal-paper-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--color-text-primary);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          text-decoration: none;
        }

        .research-fig-modal-paper-pill.link {
          color: #0052cc;
          background-color: rgba(23, 145, 255, 0.08);
          border-color: rgba(23, 145, 255, 0.25);
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        .research-fig-modal-paper-pill.link:hover {
          background-color: rgba(23, 145, 255, 0.15);
          border-color: rgba(23, 145, 255, 0.45);
        }

        [data-theme='dark'] .research-fig-modal-paper-pill.link {
          color: #60a5fa;
          background-color: rgba(59, 130, 246, 0.14);
          border-color: rgba(59, 130, 246, 0.32);
        }

        [data-theme='dark'] .research-fig-modal-paper-pill.link:hover {
          background-color: rgba(59, 130, 246, 0.24);
        }

        .research-fig-modal-counter {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--color-text-primary);
          opacity: 0.55;
          margin-left: auto;
        }

        @media (max-width: 640px) {
          .research-fig-modal-header {
            padding: 14px 16px 12px;
          }
          .research-fig-modal-stage {
            padding: 16px 38px;
          }
          .research-fig-modal-nav {
            width: 28px;
            height: 28px;
          }
          .research-fig-modal-nav.prev {
            left: 6px;
          }
          .research-fig-modal-nav.next {
            right: 6px;
          }
          .research-fig-modal-body {
            padding: 14px 16px 16px;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(modalNode, document.body);
};
