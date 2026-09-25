import React from 'react';
import { ArrowRight } from 'lucide-react';
import { labInfo } from '../data/labInfo';
import { researchTopics } from '../data/research';
import { newsItems } from '../data/news';
import { NewsListItem } from '../components/news/NewsListItem';
import { SectionHeader } from '../components/common/SectionHeader';
import { RadarArcVisual } from '../components/common/RadarArcVisual';
import type { Publication } from '../types';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex?: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Latest news items
  const recentNews = newsItems.slice(0, 9);

  return (
    <div className="homepage-root">
      {/* ====================================================================
          1. COMPACT HERO SECTION (Target ~75vh desktop)
          ==================================================================== */}
      <section
        className="hero-viewport radar-bg-pattern"
        style={{
          minHeight: 'calc(75vh - var(--header-height))',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg)',
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-2xl)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Academic Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Eyebrow */}
              <span className="eyebrow" style={{ letterSpacing: '0.12em' }}>
                INTELLIGENT RADIO SENSING LABORATORY
              </span>

              {/* Main Heading */}
              <h1
                className="display-title"
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                  lineHeight: 1.12,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                Intelligent Radio <br />
                Sensing Lab <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>@ DGIST</span>
              </h1>

              {/* Short Statement (1-2 lines) */}
              <p
                className="body-large"
                style={{
                  color: 'var(--color-text-secondary)',
                  maxWidth: '560px',
                  margin: 0,
                  fontSize: '18px',
                  lineHeight: 1.55,
                }}
              >
                {labInfo.tagline}
              </p>

              {/* Research Keywords */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--color-accent)',
                  paddingTop: '4px',
                }}
              >
                {labInfo.keywords.join('  ×  ')}
              </div>

              {/* Subtle Single Action Link */}
              <div style={{ paddingTop: 'var(--space-xs)' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('research')}
                  className="link-subtle"
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span>Explore Research</span>
                  <ArrowRight size={16} className="icon-arrow" />
                </button>
              </div>
            </div>

            {/* Right Column: Grounded Scientific Visual */}
            <div
              className="hero-visual-frame"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Radar Sensing Geometry Diagram & Ambient Trace */}
              <RadarArcVisual size={460} opacity={0.9} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: var(--space-xl) !important;
            }
            .hero-visual-frame {
              display: none !important;
            }
          }
        `}</style>
      </section>

      {/* ====================================================================
          2. LAB MISSION & AGENDA (Below the fold)
          ==================================================================== */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 320px) 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'start',
            }}
            className="mission-layout"
          >
            <div>
              <span className="eyebrow">RESEARCH MISSION</span>
              <h2 className="h2-title" style={{ fontSize: '24px' }}>
                Seeing Beyond Human Vision
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-sm)',
                  marginTop: 'var(--space-lg)',
                }}
              >
                {labInfo.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 'var(--space-xs) var(--space-sm)',
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--color-accent)',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-text-dim)',
                        marginTop: '2px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <p className="body-large" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {labInfo.mission}
              </p>
              <p className="body-text" style={{ color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
                Unlike conventional optical cameras that fail in adverse conditions such as occlusion, darkness, and smoke, or introduce significant privacy vulnerabilities, radio-frequency signals offer continuous, non-contact perceptual capabilities. Our research bridges electromagnetics, deep learning theory, and embodied robotics.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 820px) {
            .mission-layout {
              grid-template-columns: 1fr !important;
              gap: var(--space-lg) !important;
            }
          }
        `}</style>
      </section>

      {/* ====================================================================
          3. RESEARCH THEMES OVERVIEW
          ==================================================================== */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <SectionHeader
            eyebrow="CORE DIRECTIONS"
            title="Three Research Pillars"
            description="Our scientific inquiries are organized into three interconnected pillars spanning wave physics, perception systems, and multimodal physical intelligence."
            actionText="Detailed Research Page"
            onActionClick={() => onNavigate('research')}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-xl)',
            }}
          >
            {researchTopics.map((topic, index) => (
              <div
                key={topic.id}
                onClick={() => onNavigate('research', topic.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                {/* Visual Header */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <img
                    src={topic.image}
                    alt={topic.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform var(--transition-normal)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: 'var(--space-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: 'var(--space-xs)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                    }}
                  >
                    0{index + 1} / PILLAR
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.35,
                    }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    style={{
                      fontStyle: 'italic',
                      fontSize: '13px',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.45,
                    }}
                  >
                    &ldquo;{topic.question}&rdquo;
                  </p>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.55,
                      marginTop: '4px',
                    }}
                  >
                    {topic.summary}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      marginTop: 'auto',
                      paddingTop: 'var(--space-sm)',
                    }}
                  >
                    {topic.keywords.slice(0, 3).map((kw, ki) => (
                      <span key={ki} className="badge badge-outline" style={{ fontSize: '10.5px' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. NEWS & ACTIVITY LOG
          ==================================================================== */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <SectionHeader
            eyebrow="ACTIVITY LOG"
            title="News"
            description="Recent research milestones, grant awards, publication acceptances, and lab announcements."
            actionText="View All News"
            onActionClick={() => onNavigate('news')}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'start',
            }}
            className="home-news-layout"
          >
            {/* Left: News List */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 var(--space-lg)',
              }}
            >
              {recentNews.map((item) => (
                <NewsListItem key={item.id} item={item} />
              ))}
            </div>

            {/* Right: Lab Notice & Recruitment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div
                style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '3px solid var(--color-accent)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-xs)',
                }}
              >
                <span className="eyebrow" style={{ color: 'var(--color-accent)', marginBottom: 0 }}>
                  LAB ADMISSION
                </span>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.4,
                  }}
                >
                  Recruiting Graduate Students & Postdocs
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  We are actively looking for passionate students (<b>Ph.D. / M.S. students</b> and <b>Undergraduate interns</b>) and <b>Postdoctoral Fellows</b> in the fields of radio systems, signal processing, and AI.
                </p>
                <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginTop: '2px' }}>
                  우리 연구실에서는 열정 있는 대학원생(석/박사 과정) 및 학부 연구생, 박사후 연구원을 상시 모집하고 있습니다.
                </div>
                <div style={{ marginTop: 'var(--space-xs)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => onNavigate('join')}
                    className="btn-academic btn-academic-primary"
                    style={{ fontSize: '12.5px', justifyContent: 'center' }}
                  >
                    <span>Admission Information & Openings</span>
                    <ArrowRight size={13} />
                  </button>
                  <a
                    href="mailto:jhochoi@dgist.ac.kr"
                    className="link-subtle"
                    style={{ fontSize: '12.5px', justifyContent: 'center', marginTop: '4px' }}
                  >
                    <span>Contact: jhochoi@dgist.ac.kr</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .home-news-layout {
              grid-template-columns: 1fr !important;
              gap: var(--space-lg) !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};
