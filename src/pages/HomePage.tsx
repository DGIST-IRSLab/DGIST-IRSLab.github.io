import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { newsItems } from '../data/news';
import type { Publication } from '../types';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex?: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Category filter for News on the homepage
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filtered news items
  const filteredNews = selectedCategory === 'ALL'
    ? newsItems.slice(0, 8)
    : newsItems.filter((item) => item.category === selectedCategory).slice(0, 8);

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
          <h1 className="hero-title">
            Intelligent Radio Sensing Lab
            <br />
            <span className="hero-title-sub">@ DGIST</span>
          </h1>

          <p className="hero-statement">
            AI-driven radio sensing for understanding the physical world.
          </p>

          <div className="hero-descriptors">
            Radar Sensing · Artificial Intelligence · Physical Intelligence
          </div>

          <div style={{ marginTop: 'var(--space-xl)' }}>
            <button
              type="button"
              onClick={() => {
                onNavigate('research');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="link-subtle"
              style={{ fontSize: '15px' }}
            >
              <span>Explore Research</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. RECRUITMENT CALLOUT (Clean horizontal editorial bar)
          ==================================================================== */}
      <section className="admissions-section">
        <div className="container admissions-bar">
          <div className="admissions-text-wrap">
            <h3 className="admissions-title">
              We are actively looking for passionate graduate students (Ph.D. &amp; M.S.), undergraduate interns, and postdocs.
            </h3>
            <p className="admissions-subtext">
              Pioneering radio sensing, RF signal processing, and physical artificial intelligence at DGIST.
            </p>
          </div>
          <div className="admissions-action-wrap">
            <button
              type="button"
              onClick={() => {
                onNavigate('join');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="link-subtle"
              style={{ fontSize: '15px', whiteSpace: 'nowrap' }}
            >
              <span>View Openings</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. NEWS (Clean "News" heading only, no subheadings or descriptions)
          ==================================================================== */}
      <section className="news-section">
        <div className="container">
          {/* Section Header */}
          <div className="news-section-header">
            <h2 className="news-heading">News</h2>

            {/* Category Filter Pills */}
            <div className="news-filter-pills">
              {['ALL', 'PAPER', 'GRANT', 'AWARD', 'PEOPLE'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`news-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News List Items */}
          <div className="news-stream-container">
            {filteredNews.map((item) => (
              <div key={item.id} className="news-item-row">
                {/* Category */}
                <div className="news-item-cat">
                  <span className={`news-cat-pill ${getCategoryClass(item.category)}`}>
                    {item.category}
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

          {/* Footer of News Section: View All Link */}
          <div className="news-section-footer">
            <button
              type="button"
              onClick={() => {
                onNavigate('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="link-subtle"
              style={{ fontSize: '15px' }}
            >
              <span>View All News</span>
              <ArrowRight size={14} />
            </button>
          </div>
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

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.6vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
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

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Admissions Section (Clean horizontal bar) */
        .admissions-section {
          padding-top: clamp(2rem, 3.5vw, 2.75rem);
          padding-bottom: clamp(2rem, 3.5vw, 2.75rem);
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .admissions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-xl);
        }

        .admissions-title {
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .admissions-subtext {
          font-size: 14.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .admissions-action-wrap {
          flex-shrink: 0;
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

        .news-filter-pills {
          display: inline-flex;
          align-items: center;
          gap: var(--space-md);
        }

        .news-filter-btn {
          background: none;
          border: none;
          padding: 4px 0;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          border-bottom: 1px solid transparent;
        }

        .news-filter-btn:hover {
          color: var(--color-text-primary);
        }

        .news-filter-btn.active {
          color: var(--color-accent);
          border-bottom: 1px solid var(--color-accent);
        }

        .news-stream-container {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
        }

        .news-item-row {
          display: grid;
          grid-template-columns: 80px 80px 1fr;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid var(--color-border-subtle);
          gap: var(--space-md);
          transition: background-color var(--transition-fast);
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
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
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
          margin-top: var(--space-xl);
          display: flex;
          justify-content: flex-end;
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .admissions-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-md);
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
