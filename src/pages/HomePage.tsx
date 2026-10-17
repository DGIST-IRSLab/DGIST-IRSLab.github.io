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

  const INITIAL_COUNT = 10;

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
              <button
                type="button"
                className="hero-title-trigger"
                onClick={() => {
                  onNavigate('research');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title="Explore IRS Lab Research"
              >
                <span className="hero-title-main">
                  Intelligent <br className="hero-mobile-br" />
                  Radio <br className="hero-mobile-br" />
                  Sensing Lab
                </span>
                <span className="hero-title-hover-hint">
                  <span className="hero-title-hint-text">Our Research</span>
                </span>
              </button>
            </h1>

            <div className="hero-affiliation">
              <a
                href="https://www.dgist.ac.kr"
                target="_blank"
                rel="noreferrer"
                className="hero-dgist-link"
                title="DGIST (Daegu Gyeongbuk Institute of Science and Technology)"
              >
                <img
                  src={assetUrl('/images/logopic/dgist_logo.png')}
                  alt="DGIST"
                  className="hero-dgist-logo logo-light-only"
                />
                <img
                  src={assetUrl('/images/logopic/dgist_logo_dark.png')}
                  alt="DGIST"
                  className="hero-dgist-logo logo-dark-only"
                />
              </a>
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
        /* Hero Section (Full-Width Photo Banner with Subtle Left Gradient) */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: clamp(330px, 37vw, 660px);
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
          object-position: center 35%;
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
          max-width: 680px;
        }

        .hero-mobile-br {
          display: none;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 380px;
          }
          .hero-mobile-br {
            display: inline;
          }
          .hero-left-scrim {
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.90) 0%,
              rgba(255, 255, 255, 0.76) 35%,
              rgba(255, 255, 255, 0.35) 58%,
              rgba(255, 255, 255, 0.05) 75%,
              transparent 88%
            );
          }

          [data-theme='dark'] .hero-left-scrim {
            background: linear-gradient(
              to right,
              rgba(11, 15, 20, 0.92) 0%,
              rgba(11, 15, 20, 0.78) 35%,
              rgba(11, 15, 20, 0.35) 58%,
              rgba(11, 15, 20, 0.05) 75%,
              transparent 88%
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
          line-height: 1.15;
          color: var(--color-text-primary);
          margin: 0 0 14px 0;
          word-break: keep-all;
          overflow-wrap: break-word;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-title-trigger {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font: inherit;
          color: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          text-align: left;
          cursor: pointer;
          display: inline;
        }

        .hero-title-main {
          transition: color var(--transition-fast), text-shadow var(--transition-fast);
          display: inline;
        }

        .hero-title-trigger:hover .hero-title-main,
        .hero-title-trigger:focus-visible .hero-title-main {
          color: var(--color-accent);
          text-shadow: 0 2px 14px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.18);
        }

        [data-theme='dark'] .hero-title-trigger:hover .hero-title-main,
        [data-theme='dark'] .hero-title-trigger:focus-visible .hero-title-main {
          color: var(--key-blue-2);
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.85);
        }

        .hero-title-hover-hint {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin-left: 16px;
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 600;
          line-height: 1.45;
          letter-spacing: 0;
          color: var(--color-accent);
          vertical-align: baseline;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.24s ease, transform 0.24s ease;
          white-space: nowrap;
          pointer-events: none;
          text-shadow: 0 2px 14px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.18);
          z-index: 1;
        }

        [data-theme='dark'] .hero-title-hover-hint {
          color: var(--key-blue-2);
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.95), 0 0 28px rgba(0, 0, 0, 0.85);
        }

        .hero-title-hint-text {
          position: relative;
          display: inline-block;
        }

        .hero-title-hint-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 2px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1) 0.05s;
        }

        .hero-title-trigger:hover .hero-title-hover-hint,
        .hero-title-trigger:focus-visible .hero-title-hover-hint {
          opacity: 1;
          transform: translateX(0);
        }

        .hero-title-trigger:hover .hero-title-hint-text::after,
        .hero-title-trigger:focus-visible .hero-title-hint-text::after {
          transform: scaleX(1);
        }

        .hero-affiliation {
          display: flex;
          align-items: center;
          margin-bottom: 22px;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }

        .hero-dgist-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: opacity var(--transition-fast), transform var(--transition-fast);
        }

        .hero-dgist-link:hover {
          opacity: 0.82;
          transform: translateY(-1px);
        }

        .hero-dgist-logo {
          height: clamp(26px, 3.8vw, 42px);
          width: auto;
          object-fit: contain;
          display: block;
        }

        .hero-dgist-logo.logo-light-only {
          display: block;
        }
        .hero-dgist-logo.logo-dark-only {
          display: none;
        }

        [data-theme='dark'] .hero-dgist-logo.logo-light-only {
          display: none;
        }
        [data-theme='dark'] .hero-dgist-logo.logo-dark-only {
          display: block;
          filter: brightness(0) invert(0.96);
          opacity: 0.95;
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
          font-family: var(--font-sans);
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
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
          background-color: transparent;
          border: none;
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
