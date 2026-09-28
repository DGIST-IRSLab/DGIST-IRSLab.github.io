import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { newsItems } from '../data/news';
import type { Publication } from '../types';
import { assetUrl } from '../utils/asset';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex?: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const INITIAL_COUNT = 5;

  const displayedNews = isExpanded
    ? newsItems
    : newsItems.slice(0, INITIAL_COUNT);



  return (
    <div className="homepage-root">
      {/* ====================================================================
          1. HERO SECTION: IRS LAB IDENTITY & SCIENTIFIC AGENDA
          ==================================================================== */}
      <section className="hero-section">
        {/* Full-width uncropped group photo background (No vignetting) */}
        <div className="hero-bg-wrap">
          <img
            src={assetUrl('/images/main_group_wide.jpg')}
            alt="IRS Lab Members at DGIST"
            className="hero-bg-photo"
            loading="eager"
          />
          {/* Subtle left-side light gradient overlay: 아주 살짝 글자만 보이도록 */}
          <div className="hero-left-scrim" />
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Intelligent Radio Sensing Lab
              <br />
              <span className="hero-title-sub">@ DGIST</span>
            </h1>

            <div className="hero-statement-wrap">
              <button
                type="button"
                onClick={() => {
                  onNavigate('research');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hero-statement-link"
                title="Explore IRS Lab Research"
              >
                <span className="hero-statement-text">AI-Driven Wireless+X Sensing</span>
                <ArrowRight size={17} className="hero-statement-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. RECRUITMENT CALLOUT (Clean horizontal divider)
          ==================================================================== */}
      <section className="admissions-section">
        <div className="container admissions-bar">
          <div className="admissions-text-wrap">
            <h3 className="admissions-title">
              We are actively looking for <span style={{ color: 'var(--color-accent)' }}>passionate graduate students</span> (Ph.D. &amp; M.S.), undergraduate interns, and postdocs.
            </h3>
          </div>
          <div className="admissions-action-wrap">
            <button
              type="button"
              onClick={() => {
                onNavigate('join');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="admissions-join-btn"
            >
              <span>Join Us</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. NEWS (Clean "News" heading only, no category filter)
          ==================================================================== */}
      <section className="news-section">
        <div className="container">
          {/* Section Header */}
          <div className="news-section-header">
            <h2 className="news-heading">News</h2>
          </div>

          {/* News List Items */}
          <div className="news-stream-container">
            {displayedNews.map((item) => (
              <div
                key={item.id}
                className={`news-item-row news-row-${item.category.toLowerCase()}`}
              >
                {/* Date with subtle category indicator dot */}
                <div className="news-item-date" title={item.category}>
                  <span
                    className={`news-cat-dot dot-${item.category.toLowerCase()}`}
                    aria-hidden="true"
                  />
                  <span className="news-date-text">{item.date}</span>
                </div>

                {/* Content */}
                <div className="news-item-content">
                  <div className="news-item-title">
                    {item.title}
                  </div>
                  {item.description && item.description !== item.title && (
                    <div className="news-item-desc">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer of News Section: Expand / Collapse Toggle */}
          {newsItems.length > INITIAL_COUNT && (
            <div className="news-section-footer">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="link-subtle"
                style={{ fontSize: '14px', gap: '6px' }}
              >
                <span>
                  {isExpanded ? 'Collapse' : `Expand (${newsItems.length - INITIAL_COUNT} more)`}
                </span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          SCOPED STYLES
          ==================================================================== */}
      <style>{`
        /* Hero Section (Full-Width Photo Banner with Subtle Left Gradient) */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: clamp(380px, 46vw, 540px);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
          background-color: var(--color-bg);
        }

        .hero-bg-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-bg-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 38%;
          display: block;
        }

        /* Subtle left-side light gradient overlay: 아주 살짝 글자만 보이도록 */
        .hero-left-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.90) 0%,
            rgba(255, 255, 255, 0.76) 30%,
            rgba(255, 255, 255, 0.35) 48%,
            rgba(255, 255, 255, 0.05) 62%,
            transparent 74%
          );
        }

        [data-theme='dark'] .hero-left-scrim {
          background: linear-gradient(
            to right,
            rgba(11, 15, 20, 0.92) 0%,
            rgba(11, 15, 20, 0.78) 30%,
            rgba(11, 15, 20, 0.35) 48%,
            rgba(11, 15, 20, 0.05) 62%,
            transparent 74%
          );
        }

        .hero-container {
          position: relative;
          z-index: 1;
          width: 100%;
          padding-top: clamp(2.8rem, 5vw, 4.5rem);
          padding-bottom: clamp(2.8rem, 5vw, 4.5rem);
        }

        .hero-content {
          max-width: 660px;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 380px;
          }

          .hero-left-scrim {
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.92) 0%,
              rgba(255, 255, 255, 0.78) 50%,
              rgba(255, 255, 255, 0.22) 75%,
              transparent 100%
            );
          }

          [data-theme='dark'] .hero-left-scrim {
            background: linear-gradient(
              to bottom,
              rgba(11, 15, 20, 0.94) 0%,
              rgba(11, 15, 20, 0.80) 50%,
              rgba(11, 15, 20, 0.22) 75%,
              transparent 100%
            );
          }
        }

        @keyframes heroFloatIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroPhotoIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
          word-break: keep-all;
          overflow-wrap: break-word;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-title-sub {
          font-weight: 400;
          color: var(--color-text-muted);
        }

        .hero-statement-wrap {
          margin-bottom: 12px;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        .hero-statement-link {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 600;
          line-height: 1.45;
          color: var(--color-text-primary);
          text-align: left;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .hero-statement-text {
          position: relative;
          border-bottom: 1.5px solid transparent;
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .hero-statement-arrow {
          color: var(--color-accent);
          transition: transform var(--transition-fast);
          flex-shrink: 0;
        }

        .hero-statement-link:hover {
          color: var(--color-accent);
        }

        .hero-statement-link:hover .hero-statement-text {
          border-color: var(--color-accent);
        }

        .hero-statement-link:hover .hero-statement-arrow {
          transform: translateX(4px);
        }

        .hero-description {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.5vw, 1.1rem);
          line-height: 1.6;
          color: var(--color-text-secondary);
          max-width: 820px;
          margin: 0 0 24px 0;
        }

        .hero-focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .focus-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          border-radius: var(--radius-xs);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          letter-spacing: 0.02em;
        }

        /* Admissions Section (Clean horizontal divider) */
        .admissions-section {
          padding-top: clamp(1.75rem, 3vw, 2.25rem);
          padding-bottom: clamp(1.75rem, 3vw, 2.25rem);
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .admissions-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 16px;
          max-width: 840px;
          margin: 0 auto;
          padding: 0;
          background-color: transparent;
          border: none;
        }

        .admissions-title {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 1.8vw, 1.35rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.45;
          margin: 0;
          text-align: center;
          word-break: keep-all;
        }

        .admissions-action-wrap {
          display: flex;
          justify-content: center;
        }

        .admissions-join-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background-color: var(--color-accent);
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-xs);
          cursor: pointer;
          white-space: nowrap;
          transition: background-color var(--transition-fast), border-color var(--transition-fast);
        }

        .admissions-join-btn:hover {
          background-color: var(--color-accent-hover);
          border-color: var(--color-accent-hover);
        }

        [data-theme='dark'] .admissions-join-btn {
          color: #0b0f14;
          background-color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* News Section */
        .news-section {
          padding-top: clamp(2.5rem, 4vw, 4rem);
          padding-bottom: clamp(3rem, 5vw, 4.5rem);
          background-color: var(--color-bg);
        }

        .news-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
          gap: var(--space-lg);
          flex-wrap: wrap;
        }

        .news-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 2.8vw, 2.3rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.15;
        }

        .news-stream-container {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
        }

        .news-item-row {
          display: grid;
          grid-template-columns: 95px 1fr;
          align-items: baseline;
          padding: 13px 14px;
          border-bottom: 1px solid var(--color-border-subtle);
          border-left: 3px solid transparent;
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
          gap: var(--space-md);
          transition: background-color var(--transition-fast), border-left-color var(--transition-fast), transform var(--transition-fast);
        }

        .news-item-row:hover {
          background-color: var(--color-surface-hover);
          transform: translateX(4px);
        }

        .news-item-row:last-child {
          border-bottom: 1px solid var(--color-border);
        }

        /* Category Left Accent Lines */
        .news-row-paper { border-left-color: rgba(2, 140, 255, 0.45); }
        .news-row-paper:hover { border-left-color: #028cff; }

        .news-row-award { border-left-color: rgba(245, 158, 11, 0.5); }
        .news-row-award:hover { border-left-color: #f59e0b; }

        .news-row-grant { border-left-color: rgba(16, 185, 129, 0.5); }
        .news-row-grant:hover { border-left-color: #10b981; }

        .news-row-people { border-left-color: rgba(99, 102, 241, 0.45); }
        .news-row-people:hover { border-left-color: #6366f1; }

        .news-row-talk { border-left-color: rgba(139, 92, 246, 0.45); }
        .news-row-talk:hover { border-left-color: #8b5cf6; }

        .news-row-news { border-left-color: rgba(100, 116, 139, 0.35); }
        .news-row-news:hover { border-left-color: #64748b; }

        [data-theme='dark'] .news-row-paper { border-left-color: rgba(56, 189, 248, 0.4); }
        [data-theme='dark'] .news-row-paper:hover { border-left-color: #38bdf8; }

        [data-theme='dark'] .news-row-award { border-left-color: rgba(251, 191, 36, 0.45); }
        [data-theme='dark'] .news-row-award:hover { border-left-color: #fbbf24; }

        [data-theme='dark'] .news-row-grant { border-left-color: rgba(52, 211, 153, 0.45); }
        [data-theme='dark'] .news-row-grant:hover { border-left-color: #34d399; }

        [data-theme='dark'] .news-row-people { border-left-color: rgba(129, 140, 248, 0.4); }
        [data-theme='dark'] .news-row-people:hover { border-left-color: #818cf8; }

        [data-theme='dark'] .news-row-talk { border-left-color: rgba(167, 139, 250, 0.4); }
        [data-theme='dark'] .news-row-talk:hover { border-left-color: #a78bfa; }

        [data-theme='dark'] .news-row-news { border-left-color: rgba(148, 163, 184, 0.35); }
        [data-theme='dark'] .news-row-news:hover { border-left-color: #94a3b8; }

        /* Date with Category Dot */
        .news-item-date {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-text-muted);
          flex-shrink: 0;
          cursor: default;
        }

        .news-cat-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }

        .news-item-row:hover .news-cat-dot {
          transform: scale(1.3);
        }

        .dot-paper {
          background-color: #028cff;
          box-shadow: 0 0 0 2px rgba(2, 140, 255, 0.2);
        }
        .dot-award {
          background-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }
        .dot-grant {
          background-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        .dot-people {
          background-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .dot-talk {
          background-color: #8b5cf6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
        .dot-news {
          background-color: #64748b;
          box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.2);
        }

        [data-theme='dark'] .dot-paper {
          background-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
        }
        [data-theme='dark'] .dot-award {
          background-color: #fbbf24;
          box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.25);
        }
        [data-theme='dark'] .dot-grant {
          background-color: #34d399;
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.25);
        }
        [data-theme='dark'] .dot-people {
          background-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
        }
        [data-theme='dark'] .dot-talk {
          background-color: #a78bfa;
          box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.25);
        }
        [data-theme='dark'] .dot-news {
          background-color: #94a3b8;
          box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.25);
        }

        .news-item-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .news-item-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.45;
        }

        .news-item-desc {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .news-section-footer {
          margin-top: var(--space-lg);
          display: flex;
          justify-content: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .admissions-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
          }
          .news-item-row {
            grid-template-columns: 90px 1fr;
            gap: var(--space-sm);
          }
        }

        @media (max-width: 640px) {
          .news-item-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            padding: 12px 10px;
          }
        }
      `}</style>
    </div>
  );
};
