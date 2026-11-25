import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { newsItems } from '../data/news';
import type { Publication } from '../types';
import { HeroRfCanvas } from '../components/home/HeroRfCanvas';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex?: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const INITIAL_COUNT = 10;

  const displayedNews = isExpanded
    ? newsItems
    : newsItems.slice(0, INITIAL_COUNT);



  return (
    <div className="homepage-root">
      {/* ====================================================================
          1. HERO SECTION: MINIMAL TYPOGRAPHY + LIVE RF WAVEFIELD
          ==================================================================== */}
      <section className="hero-section">
        <HeroRfCanvas />

        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Intelligent Radio
              <br />
              Sensing Lab
            </h1>

            <div className="hero-footer-row">
              <button
                type="button"
                className="hero-explore-btn"
                onClick={() => {
                  onNavigate('research');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Explore our research</span>
                <ArrowRight size={16} className="hero-explore-arrow" />
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
                className="news-item-row"
              >
                {/* Date (Desktop column) */}
                <div className="news-item-date">
                  <span className="news-date-text">{item.date}</span>
                </div>

                {/* Content */}
                <div className="news-item-content">
                  <div className="news-item-title">
                    <span className="news-mobile-date-prefix">{item.date} - </span>
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
        /* Hero Section (Minimal Monumental Typography + Live RF Wavefield) */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: clamp(380px, 48vh, 520px);
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
          background-color: var(--color-bg);
        }

        .hero-rf-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          display: block;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          width: 100%;
          padding-top: clamp(3.4rem, 7vw, 5.4rem);
          padding-bottom: clamp(3.4rem, 7vw, 5.4rem);
        }

        .hero-content {
          max-width: 660px;
        }

        @keyframes heroFloatIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.45rem, 5.4vw, 4.35rem);
          font-weight: 700;
          letter-spacing: -0.038em;
          line-height: 1.07;
          color: var(--color-text-primary);
          margin: 0 0 30px 0;
          word-break: keep-all;
          animation: heroFloatIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-footer-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          animation: heroFloatIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .hero-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 18px;
          line-height: 1.25;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          color: #ffffff;
          background-color: #111827;
          border: 1px solid #111827;
          border-radius: 999px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .hero-explore-btn:hover {
          background-color: var(--key-blue-1);
          border-color: var(--key-blue-1);
          transform: translateY(-1px);
        }

        [data-theme='dark'] .hero-explore-btn {
          color: #0b0f14;
          background-color: #f8fafc;
          border-color: #f8fafc;
        }

        [data-theme='dark'] .hero-explore-btn:hover {
          color: #ffffff;
          background-color: var(--key-blue-2);
          border-color: var(--key-blue-2);
        }

        .hero-explore-arrow {
          transition: transform 0.2s ease;
        }

        .hero-explore-btn:hover .hero-explore-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: 340px;
          }
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
          max-width: 100%;
          margin: 0 auto;
          background-color: transparent;
          border: none;
        }

        .admissions-text-wrap {
          width: 100%;
          padding-inline: clamp(8px, 3vw, 24px);
        }

        .admissions-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.5;
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
          font-size: var(--text-body);
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
          color: #ffffff;
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
          font-size: var(--text-h1);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.2;
        }

        .news-stream-container {
          display: flex;
          flex-direction: column;
        }

        .news-item-row {
          display: grid;
          grid-template-columns: 95px 1fr;
          align-items: baseline;
          padding: 0.6rem 1rem;
          margin: 0 -1rem;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          border-radius: 8px;
          position: relative;
          gap: var(--space-md);
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }

        .news-item-row:last-child {
          border-bottom: none;
        }

        .news-item-row:hover {
          box-shadow: var(--card-hover-shadow);
          transform: translateY(-3px);
          border-bottom-color: transparent;
          z-index: 1;
        }

        .news-item-row:has(+ .news-item-row:hover) {
          border-bottom-color: transparent;
        }

        .news-item-date {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-sans);
          font-size: var(--text-body);
          color: var(--color-text-primary);
          line-height: 1.65;
          flex-shrink: 0;
          cursor: default;
        }

        .news-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .news-item-title {
          font-size: var(--text-body);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.65;
        }

        .news-item-desc {
          font-size: var(--text-body);
          color: var(--color-text-primary);
          line-height: 1.65;
        }

        .news-section-footer {
          margin-top: var(--space-lg);
          display: flex;
          justify-content: center;
        }

        .news-mobile-date-prefix {
          display: none;
          font-weight: 400;
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
            display: block;
            padding: 0.6rem 10px;
          }
          .news-item-date {
            display: none;
          }
          .news-mobile-date-prefix {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
};
