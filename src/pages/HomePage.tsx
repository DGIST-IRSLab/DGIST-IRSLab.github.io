import React, { useState } from 'react';
import { ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { newsItems } from '../data/news';
import type { NewsItem, Publication } from '../types';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex?: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Pagination for News stream (8 items per page)
  const [newsPage, setNewsPage] = useState(0);
  const pageSize = 8;
  const totalPages = Math.ceil(newsItems.length / pageSize);

  const displayedNews = newsItems.slice(newsPage * pageSize, (newsPage + 1) * pageSize);
  const currentCount = Math.min((newsPage + 1) * pageSize, newsItems.length);

  // Map category to icon & badge label matching reference screenshot
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case 'PAPER':
        return { icon: '📝', label: 'PAPER' };
      case 'GRANT':
        return { icon: '💲', label: 'FUND' };
      case 'AWARD':
        return { icon: '🏆', label: 'AWARD' };
      case 'PEOPLE':
        return { icon: '👥', label: 'PEOPLE' };
      case 'TALK':
        return { icon: '👔', label: 'SERVICE' };
      default:
        return { icon: '📢', label: 'NEWS' };
    }
  };

  // Concise single-line news description matching reference screenshot
  const renderNewsContent = (item: NewsItem) => {
    if (item.category === 'PAPER') {
      if (item.id === 'news-2026-02-cvpr') {
        return (
          <>
            Our paper &ldquo;Can Language Models Understand mmWave Data?&rdquo; accepted to <b>CVPR &apos;26 Findings</b>!
          </>
        );
      }
      if (item.id === 'news-2025-11-wacv') {
        return (
          <>
            Our paper &ldquo;ReFineVQA: Iterative Refinement of Video Description&rdquo; accepted to <b>IEEE/CVF WACV &apos;26</b>!
          </>
        );
      }
      if (item.id === 'news-2025-02-cvpr') {
        return (
          <>
            Our paper &ldquo;MVDoppler-Pose: Multi-Modal mmWave Sensing&rdquo; accepted to <b>CVPR &apos;25</b> (top-tier)!
          </>
        );
      }
      if (item.id === 'news-2024-12-icassp') {
        return (
          <>
            Our paper accepted to <b>IEEE ICASSP &apos;25</b> (🏆 Oral Presentation)!
          </>
        );
      }
    }

    if (item.category === 'GRANT') {
      if (item.id === 'news-2026-04-iitp') {
        return (
          <>
            Our lab is awarded a major long-term research grant by <b>IITP</b> (2026–2033)!
          </>
        );
      }
      if (item.id === 'news-2026-04-kiost') {
        return (
          <>
            Research project on AI maritime surveillance funded by <b>KIOST</b> (2026–2030)!
          </>
        );
      }
      if (item.id === 'news-2026-03-nrf') {
        return (
          <>
            Selected for <b>NRF Young Researcher Program Type B</b> (신진연구-유형B, 2026–2031)! 🚀
          </>
        );
      }
      if (item.id === 'news-2025-11-add') {
        return (
          <>
            Funded by <b>Agency for Defense Development (ADD)</b> Moonshot Project (2025–2026)!
          </>
        );
      }
      if (item.id === 'news-2025-06-starfellowship') {
        return (
          <>
            Prof. Jae-Ho Choi selected for <b>MSIT AI Star Fellowship</b> (AI 스타펠로우십, 2025–2030)! 🌟
          </>
        );
      }
      if (item.id === 'news-2025-06-innocore') {
        return (
          <>
            Selected for two national AI research initiatives by <b>MSIT InnoCORE</b> (2025–2029)!
          </>
        );
      }
      if (item.id === 'news-2025-09-nrf-seed') {
        return (
          <>
            Awarded <b>NRF Excellent Young Researcher Seed Grant</b> (2025–2026)!
          </>
        );
      }
    }

    if (item.category === 'AWARD') {
      if (item.id === 'news-2026-08-award') {
        return (
          <>
            Ji-Hyuck Hong received the <b>IEEE GRSS Seoul Chapter Chair Award</b> (🏆 GRSS Award)!
          </>
        );
      }
      if (item.id === 'news-2025-10-neurips-reviewer') {
        return (
          <>
            Prof. Jae-Ho Choi recognized as <b>Top Reviewer at NeurIPS 2025</b>!
          </>
        );
      }
    }

    if (item.category === 'TALK') {
      if (item.id === 'news-2026-04-neurips') {
        return (
          <>
            Prof. Jae-Ho Choi appointed as <b>Area Chair for NeurIPS 2026</b>!
          </>
        );
      }
    }

    if (item.category === 'PEOPLE') {
      if (item.id === 'news-2026-08-members') {
        return (
          <>
            Welcome Seongryeong Lee, Seungeun Kang, Minjae Kim, and Junhyung Gong to IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2026-07-interns') {
        return (
          <>
            Summer research interns Jaeone Yun and Junwon Choi joined IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2026-02-members') {
        return (
          <>
            Graduate students Donguk, Bumjoon, Minkyoung, Jeongwoo, and Yunjung joined IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2025-11-postdoc') {
        return (
          <>
            Dr. Dohyun Park joined IRS Lab as Postdoctoral Fellow!
          </>
        );
      }
      if (item.id === 'news-2025-09-members') {
        return (
          <>
            Dr. Yazdan Qadri and Jaeone Yun joined IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2025-08-postdocs') {
        return (
          <>
            Postdocs Dr. Jaehyun Park &amp; Dr. Jeongwan Shin joined IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2025-08-grads') {
        return (
          <>
            Graduate students Eunchan Kim &amp; Jihyuck Hong joined IRS Lab!
          </>
        );
      }
      if (item.id === 'news-2025-02-jaehyeon') {
        return (
          <>
            Jaehyeon Kim joined as the founding student of the IRS research group!
          </>
        );
      }
    }

    if (item.id === 'news-2024-12-launch') {
      return (
        <>
          Intelligent Radio Sensing (IRS) Lab officially opens at DGIST! 🚀
        </>
      );
    }

    return <>{item.description || item.title}</>;
  };

  return (
    <div className="homepage-root">
      {/* ====================================================================
          1. HERO SECTION (Reference: UNIST U*AI Lab Banner)
             - Authentic DGIST cherry blossom lab photo
             - Large bold title, quoted statement, research topic hashtags
          ==================================================================== */}
      <section className="hero-banner-section">
        <div className="hero-banner-frame">
          {/* Lab Group Photo (DGIST Cherry Blossoms) */}
          <img
            src="/images/gallery/202604/2.jpg"
            alt="IRS Lab Members under Cherry Blossoms at DGIST"
            className="hero-banner-photo"
          />

          {/* Top Soft Gradient Overlay for Optimal Text Legibility */}
          <div className="hero-banner-overlay" />

          {/* Foreground Hero Content */}
          <div className="container hero-banner-content">
            <h1 className="hero-main-title">
              Intelligent Radio Sensing Lab
            </h1>

            <p className="hero-quote-statement">
              &ldquo;AI-driven radio sensing for understanding the physical world.&rdquo;
            </p>

            <div className="hero-topic-tags">
              <span className="hero-tag">#Radar Sensing</span>
              <span className="hero-tag-sep">/</span>
              <span className="hero-tag">#AI for Wireless</span>
              <span className="hero-tag-sep">/</span>
              <span className="hero-tag">#Multimodal Perception</span>
              <span className="hero-tag-sep">/</span>
              <span className="hero-tag">#Physical Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. RECRUITMENT CALLOUT BANNER (Reference: Screenshot 3.53.49)
             - Direct, prominent recruitment statement
             - Clean "Joining Us →" button
             - Thin hairline divider
          ==================================================================== */}
      <section className="recruitment-banner-section">
        <div className="container">
          <div className="recruitment-banner-inner">
            <div className="recruitment-headline-wrap">
              <h2 className="recruitment-headline">
                We&apos;re looking for passionate and self-motivated students who are ready to sense the physical world with AI!
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                onNavigate('join');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="recruitment-action-btn"
            >
              <span>Joining Us</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. NEWS STREAM (Reference: Screenshot 3.53.49)
             - Category emoji badges (📝 PAPER, 💲 FUND, 🏆 AWARD, 👥 PEOPLE, 👔 SERVICE)
             - Format: YYYY.MM — description
             - Counter (08 / 18), paging controls, and "View All →" action
          ==================================================================== */}
      <section className="news-stream-section">
        <div className="container">
          {/* Section Header with Accent Bar & Controls */}
          <div className="news-stream-header">
            <div className="news-title-wrap">
              <h2 className="news-title">News</h2>
              <div className="news-title-underline" />
            </div>

            <div className="news-stream-controls">
              {/* Counter Display (e.g. 08 / 18) */}
              <span className="news-counter">
                {String(currentCount).padStart(2, '0')} / {newsItems.length}
              </span>

              {/* Navigation Arrows */}
              <div className="news-paging-btns">
                <button
                  type="button"
                  onClick={() => setNewsPage((p) => Math.max(0, p - 1))}
                  disabled={newsPage === 0}
                  className="news-page-btn"
                  aria-label="Previous news page"
                  title="Previous news page"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setNewsPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={newsPage >= totalPages - 1}
                  className="news-page-btn"
                  aria-label="Next news page"
                  title="Next news page"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* View All Button */}
              <button
                type="button"
                onClick={() => {
                  onNavigate('news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="news-view-all-btn"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* News Rows List */}
          <div className="news-stream-list">
            {displayedNews.map((item) => {
              const meta = getCategoryMeta(item.category);
              return (
                <div key={item.id} className="news-stream-row">
                  {/* Category Badge with Icon */}
                  <div className="news-cat-cell">
                    <span className="news-cat-icon">{meta.icon}</span>
                    <span className="news-cat-label">{meta.label}</span>
                  </div>

                  {/* Date & News Description */}
                  <div className="news-text-cell">
                    <span className="news-date">{item.date}</span>
                    <span className="news-sep">—</span>
                    <span className="news-body">{renderNewsContent(item)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom subtle link */}
          <div className="news-bottom-action">
            <button
              type="button"
              onClick={() => {
                onNavigate('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="news-archive-link"
            >
              <span>Explore full archive ({newsItems.length} updates)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SCOPED STYLING (Derived from Design System & Reference Screenshots)
          ==================================================================== */}
      <style>{`
        /* Hero Banner */
        .hero-banner-section {
          position: relative;
          width: 100%;
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-bg);
          overflow: hidden;
        }

        .hero-banner-frame {
          position: relative;
          width: 100%;
          min-height: 520px;
          height: clamp(520px, 68vh, 680px);
          display: flex;
          align-items: flex-start;
          overflow: hidden;
        }

        .hero-banner-photo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          z-index: 1;
        }

        .hero-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.88) 32%,
            rgba(255, 255, 255, 0.28) 65%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }

        [data-theme='dark'] .hero-banner-overlay {
          background: linear-gradient(
            180deg,
            rgba(11, 15, 20, 0.96) 0%,
            rgba(11, 15, 20, 0.90) 32%,
            rgba(11, 15, 20, 0.35) 65%,
            rgba(11, 15, 20, 0.12) 100%
          );
        }

        .hero-banner-content {
          position: relative;
          z-index: 3;
          padding-top: clamp(2.5rem, 5.5vw, 4.5rem);
          padding-bottom: 2rem;
          width: 100%;
        }

        .hero-main-title {
          font-family: var(--font-sans);
          font-size: clamp(2.3rem, 4.6vw, 3.8rem);
          font-weight: 750;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: var(--color-text-primary);
          margin: 0 0 12px 0;
        }

        .hero-quote-statement {
          font-family: var(--font-sans);
          font-size: clamp(1.05rem, 1.8vw, 1.28rem);
          line-height: 1.5;
          color: var(--color-text-secondary);
          margin: 0 0 18px 0;
          font-weight: 400;
          max-width: 820px;
        }

        .hero-topic-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          font-weight: 600;
        }

        .hero-tag {
          color: var(--color-accent);
          letter-spacing: -0.01em;
        }

        .hero-tag-sep {
          color: var(--color-text-dim);
          font-weight: 300;
          user-select: none;
        }

        /* Recruitment Banner */
        .recruitment-banner-section {
          padding-top: clamp(2rem, 3.5vw, 3rem);
          padding-bottom: clamp(2rem, 3.5vw, 3rem);
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-bg);
        }

        .recruitment-banner-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-xl);
        }

        .recruitment-headline-wrap {
          max-width: 820px;
        }

        .recruitment-headline {
          font-family: var(--font-sans);
          font-size: clamp(1.2rem, 2.1vw, 1.6rem);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .recruitment-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-accent);
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 14.5px;
          font-weight: 600;
          padding: 11px 22px;
          border-radius: var(--radius-sm);
          border: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
          flex-shrink: 0;
        }

        [data-theme='dark'] .recruitment-action-btn {
          color: #0b0f14;
        }

        .recruitment-action-btn:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
        }

        /* News Stream */
        .news-stream-section {
          padding-top: clamp(2.5rem, 4vw, 3.5rem);
          padding-bottom: clamp(3rem, 5vw, 4.5rem);
          background-color: var(--color-bg);
        }

        .news-stream-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-xs);
        }

        .news-title-wrap {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .news-title {
          font-family: var(--font-sans);
          font-size: clamp(1.75rem, 2.8vw, 2.2rem);
          font-weight: 750;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0 0 6px 0;
          line-height: 1.15;
        }

        .news-title-underline {
          width: 52px;
          height: 3px;
          background-color: var(--color-accent);
          border-radius: 1.5px;
        }

        .news-stream-controls {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .news-counter {
          font-family: var(--font-mono);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .news-paging-btns {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .news-page-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: var(--color-surface);
          border: none;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .news-page-btn:first-of-type {
          border-right: 1px solid var(--color-border);
        }

        .news-page-btn:hover:not(:disabled) {
          background-color: var(--color-bg-tertiary);
          color: var(--color-accent);
        }

        .news-page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .news-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-accent);
          background: transparent;
          border: 1px solid var(--color-accent-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .news-view-all-btn:hover {
          background-color: var(--color-accent-subtle);
          border-color: var(--color-accent);
        }

        /* News Rows */
        .news-stream-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
        }

        .news-stream-row {
          display: flex;
          align-items: baseline;
          padding: 14px 4px;
          border-bottom: 1px solid var(--color-border);
          transition: background-color var(--transition-fast);
          gap: var(--space-lg);
        }

        .news-stream-row:hover {
          background-color: var(--color-bg-secondary);
        }

        .news-cat-cell {
          width: 105px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--color-text-secondary);
          user-select: none;
        }

        .news-cat-icon {
          font-size: 12px;
        }

        .news-text-cell {
          flex: 1;
          display: inline-flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 14.5px;
          line-height: 1.55;
        }

        .news-date {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--color-text-primary);
          white-space: nowrap;
        }

        .news-sep {
          color: var(--color-text-dim);
          user-select: none;
          margin: 0 2px;
        }

        .news-body {
          color: var(--color-text-secondary);
        }

        .news-body b {
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .news-bottom-action {
          margin-top: var(--space-xl);
          display: flex;
          justify-content: flex-end;
        }

        .news-archive-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-accent);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color var(--transition-fast);
        }

        .news-archive-link:hover {
          color: var(--color-accent-hover);
          text-decoration: underline;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 820px) {
          .recruitment-banner-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .recruitment-action-btn {
            width: 100%;
            justify-content: center;
          }
          .news-stream-header {
            flex-wrap: wrap;
            gap: var(--space-md);
          }
        }

        @media (max-width: 640px) {
          .hero-banner-frame {
            min-height: 480px;
            height: auto;
          }
          .news-stream-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 12px 2px;
          }
          .news-cat-cell {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};
