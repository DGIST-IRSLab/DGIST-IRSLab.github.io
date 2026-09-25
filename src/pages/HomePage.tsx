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

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'AWARD':
        return '🏆';
      case 'PAPER':
        return '📝';
      case 'GRANT':
        return '💰';
      case 'PEOPLE':
        return '👥';
      case 'TALK':
        return '📢';
      default:
        return '📣';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'PAPER':
        return 'cat-badge-paper';
      case 'GRANT':
        return 'cat-badge-grant';
      case 'AWARD':
        return 'cat-badge-award';
      case 'PEOPLE':
        return 'cat-badge-people';
      case 'TALK':
        return 'cat-badge-talk';
      default:
        return 'cat-badge-default';
    }
  };

  return (
    <div className="homepage-root">
      {/* ====================================================================
          1. HERO SECTION: IRS LAB IDENTITY & SCIENTIFIC AGENDA
          ==================================================================== */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-text-col">
              <h1 className="hero-title">
                Intelligent Radio Sensing Lab
                <br />
                <span className="hero-title-sub">@ DGIST</span>
              </h1>

              <p className="hero-statement">
                AI-driven radio sensing for understanding the physical world.
              </p>
            </div>

            <div className="hero-photo-col">
              <div className="hero-photo-frame">
                <img
                  src={assetUrl('/images/main_group.jpg')}
                  alt="IRS Lab Members at DGIST"
                  className="hero-group-photo"
                  loading="eager"
                />
              </div>
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
              <div key={item.id} className="news-item-row">
                {/* Category with Emoji */}
                <div className="news-item-cat">
                  <span className={`news-cat-pill ${getCategoryClass(item.category)}`}>
                    <span className="news-cat-emoji">{getCategoryEmoji(item.category)}</span>
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Date */}
                <div className="news-item-date">
                  <span>{item.date}</span>
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
        /* Hero Section */
        .hero-section {
          position: relative;
          padding-top: clamp(3rem, 6vw, 4.8rem);
          padding-bottom: clamp(3rem, 6vw, 4.8rem);
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
        }

        .hero-rf-trace {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 160px;
          pointer-events: none;
          z-index: 0;
        }

        .rf-svg {
          width: 100%;
          height: 100%;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(2rem, 5vw, 4rem);
        }

        .hero-text-col {
          flex: 1 1 48%;
          min-width: 0;
        }

        .hero-photo-col {
          flex: 1 1 52%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: 0;
        }

        .hero-photo-frame {
          position: relative;
          width: 100%;
          max-width: 630px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: heroPhotoIn 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-photo-frame:hover {
          transform: translateY(-3px) scale(1.01);
        }

        .hero-group-photo {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10.6;
          object-fit: cover;
          object-position: center 50%;
          display: block;
          mask-image: radial-gradient(ellipse 90% 56% at 50% 50%, black 25%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.05) 90%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 56% at 50% 50%, black 25%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.05) 90%, transparent 100%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-photo-frame:hover .hero-group-photo {
          transform: scale(1.02);
        }

        @media (max-width: 860px) {
          .hero-grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.25rem;
          }

          .hero-photo-col {
            width: 100%;
            justify-content: center;
          }

          .hero-photo-frame {
            max-width: 520px;
            margin: 0 auto;
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

        .hero-statement {
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 600;
          line-height: 1.45;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
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
          grid-template-columns: 110px 75px 1fr;
          align-items: baseline;
          padding: 14px 12px;
          border-bottom: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs);
          gap: var(--space-md);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-item-row:hover {
          background-color: var(--color-surface-hover);
          transform: translateX(6px);
        }

        .news-item-row:last-child {
          border-bottom: 1px solid var(--color-border);
        }

        .news-item-date {
          display: inline-flex;
          align-items: baseline;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-text-muted);
        }

        .news-item-cat {
          display: inline-flex;
        }

        .news-cat-pill {
          display: inline-flex;
          align-items: center;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-item-row:hover .news-cat-pill {
          transform: scale(1.05);
        }
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .news-cat-emoji {
          font-size: 13px;
          line-height: 1;
        }

        .cat-badge-paper {
          color: var(--color-accent);
        }

        .cat-badge-grant {
          color: #059669;
        }

        [data-theme='dark'] .cat-badge-grant {
          color: #34d399;
        }

        .cat-badge-award {
          color: #d97706;
        }

        [data-theme='dark'] .cat-badge-award {
          color: #fbbf24;
        }

        .cat-badge-people {
          color: #6366f1;
        }

        [data-theme='dark'] .cat-badge-people {
          color: #818cf8;
        }

        .cat-badge-talk {
          color: #8b5cf6;
        }

        [data-theme='dark'] .cat-badge-talk {
          color: #a78bfa;
        }

        .cat-badge-default {
          color: var(--color-text-muted);
        }

        .news-item-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
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
            grid-template-columns: 75px 75px 1fr;
            gap: var(--space-sm);
          }
        }

        @media (max-width: 640px) {
          .news-item-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 12px 0;
          }
        }
      `}</style>
    </div>
  );
};
