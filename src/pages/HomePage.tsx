import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { newsItems } from '../data/news';
import type { Publication } from '../types';
import { assetUrl } from '../utils/asset';
import { GithubIcon } from '../components/common/GithubIcon';

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

              <div className="hero-descriptors">
                Radar Sensing · Artificial Intelligence · Physical Intelligence
              </div>

              <div className="hero-actions-row">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('research');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="link-subtle hero-explore-btn"
                  style={{ fontSize: '15px' }}
                >
                  <span>Our Research</span>
                  <ArrowRight size={15} />
                </button>

                <span className="hero-action-sep" aria-hidden="true">·</span>

                <a
                  href="https://github.com/DGIST-IRSLab"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-github-btn"
                  title="Visit DGIST IRS Lab on GitHub (DGIST-IRSLab)"
                  aria-label="Visit DGIST IRS Lab on GitHub"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </div>
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
          2. RECRUITMENT CALLOUT (Clean horizontal editorial bar)
          ==================================================================== */}
      <section className="admissions-section">
        <div className="container admissions-bar">
          <div className="admissions-text-wrap">
            <h3 className="admissions-title">
              We are actively looking for <span style={{ color: 'var(--color-accent)' }}>passionate graduate students</span> (Ph.D. &amp; M.S.), undergraduate interns, and postdocs.
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
          flex: 1 1 54%;
          min-width: 0;
        }

        .hero-photo-col {
          flex: 1 1 46%;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 0;
        }

        .hero-photo-frame {
          position: relative;
          width: 100%;
          max-width: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-group-photo {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10.8;
          object-fit: cover;
          object-position: center 52%;
          display: block;
          mask-image: radial-gradient(ellipse 72% 64% at 50% 52%, black 84%, rgba(0, 0, 0, 0.25) 96%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 72% 64% at 50% 52%, black 84%, rgba(0, 0, 0, 0.25) 96%, transparent 100%);
          transition: transform var(--transition-normal);
        }

        .hero-group-photo:hover {
          transform: scale(1.02);
        }

        .hero-descriptors {
          font-family: var(--font-mono);
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          color: var(--color-accent);
          letter-spacing: 0.02em;
          margin-top: 14px;
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
            max-width: 420px;
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

        .hero-descriptors {
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .hero-photo-frame {
          animation: heroPhotoIn 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .hero-photo-frame:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .hero-group-photo {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-photo-frame:hover .hero-group-photo {
          transform: scale(1.02);
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

        .hero-actions-row {
          margin-top: var(--space-xl);
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          animation: heroFloatIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
        }

        .hero-action-sep {
          color: var(--color-border-strong);
          font-size: 16px;
          user-select: none;
        }

        .hero-github-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 13px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-github-btn:hover {
          color: var(--color-text-primary);
          background-color: var(--color-surface-hover);
          border-color: var(--color-accent-border);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(2, 140, 255, 0.08);
        }

        .hero-github-btn:active {
          transform: translateY(0) scale(0.97);
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
          padding: 16px 20px;
          border-radius: var(--radius-sm);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .admissions-bar:hover {
          border-color: var(--color-accent-border);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(2, 140, 255, 0.07);
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
