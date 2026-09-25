import React from 'react';
import { ArrowRight, ChevronRight, FileText, ExternalLink } from 'lucide-react';
import { labInfo } from '../data/labInfo';
import { researchTopics } from '../data/research';
import { publications } from '../data/publications';
import { newsItems } from '../data/news';
import { PublicationItem } from '../components/publications/PublicationItem';
import { NewsListItem } from '../components/news/NewsListItem';
import { SectionHeader } from '../components/common/SectionHeader';
import { RadarArcVisual } from '../components/common/RadarArcVisual';
import type { Publication } from '../types';

interface HomePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
  onOpenBibtex: (pub: Publication) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBibtex }) => {
  // Selected publications for home display
  const selectedPubs = publications.filter((p) => p.selected).slice(0, 5);

  // Latest news items
  const recentNews = newsItems.slice(0, 7);

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
          4. FEATURED RESEARCH SHOWCASE (Editorial Layout)
          ==================================================================== */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="SELECTED RESEARCH SPOTLIGHT"
            title="Featured Projects & Results"
            description="Representative breakthroughs published in premier computer vision, signal processing, and machine learning venues."
          />

          {/* Featured Showcase Item 1: MVDoppler-Pose (CVPR 2025) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center',
              padding: 'var(--space-xl) 0',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
            className="featured-showcase-row"
          >
            <div className="research-figure-frame">
              <img
                src="/images/research_main.png"
                alt="MVDoppler-Pose mmWave Sensing"
                loading="lazy"
              />
              <div className="figure-caption">
                Figure: Multi-modal multi-view mmWave sensing pipeline for 3D human pose reconstruction under self-occlusion.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <span className="badge">CVPR 2025</span>
                <span className="badge badge-outline">TOP CONF.</span>
              </div>

              <h3 className="h3-title" style={{ fontSize: '20px', lineHeight: 1.35 }}>
                MVDoppler-Pose: Multi-Modal Multi-View mmWave Sensing for Long-Distance Self-Occluded Human Walking Pose Estimation
              </h3>

              <div className="metadata-text">
                Jae-Ho Choi*, Soheil Hor, Shubo Yang, Amin Arbabian
              </div>

              <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                Addresses fundamental visibility constraints in long-distance human motion tracking. By synchronously fusing multi-perspective radar micro-Doppler frequency trajectories with geometric backscatter models, our network recovers full-body articulated poses even when major limbs remain completely occluded to cameras.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: '4px' }}>
                <a
                  href="https://mvdoppler-pose.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                >
                  <ExternalLink size={13} />
                  <span>Project Page</span>
                </a>
                <a
                  href="https://openaccess.thecvf.com/content/CVPR2025/papers/Choi_MVDoppler-Pose_Multi-Modal_Multi-View_mmWave_Sensing_for_Long-Distance_Self-Occluded_Human_Walking_CVPR_2025_paper.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                >
                  <FileText size={13} />
                  <span>Paper PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Featured Showcase Item 2: RF-Vital & Fusion-Vital (AAAI 2024 / IEEE IoTJ) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center',
              padding: 'var(--space-xl) 0',
            }}
            className="featured-showcase-row reverse-mobile"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <span className="badge">AAAI 2024 / IoTJ</span>
                <span className="badge badge-outline">TOP 5%</span>
              </div>

              <h3 className="h3-title" style={{ fontSize: '20px', lineHeight: 1.35 }}>
                Fusion-Vital & RF-Vital: Contactless Respiration and Cardiac Monitoring of Free-Moving Individuals
              </h3>

              <div className="metadata-text">
                Jae-Ho Choi*, Ki-Bong Kang, Kyung-Tae Kim*
              </div>

              <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                Formulates a Video-RF cross-attention transformer that isolates millimeter-scale thoracic respiratory oscillations while individuals freely walk inside indoor clutter. Achieves accurate continuous vital sign tracking without requiring any wearable contact devices.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: '4px' }}>
                <a
                  href="https://ojs.aaai.org/index.php/AAAI/article/view/27898"
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                >
                  <FileText size={13} />
                  <span>AAAI Paper</span>
                </a>
                <a
                  href="https://ieeexplore.ieee.org/abstract/document/10304252"
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                >
                  <FileText size={13} />
                  <span>IEEE IoTJ Paper</span>
                </a>
              </div>
            </div>

            <div className="research-figure-frame">
              <img
                src="/images/research_2.jpg"
                alt="RF-Vital Contactless Respiration Monitoring"
                loading="lazy"
              />
              <div className="figure-caption">
                Figure: Contactless thoracic displacement extraction and physiological waveform recovery from raw RF phase data.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .featured-showcase-row {
              grid-template-columns: 1fr !important;
              gap: var(--space-lg) !important;
            }
            .featured-showcase-row.reverse-mobile {
              display: flex;
              flex-direction: column-reverse;
            }
          }
        `}</style>
      </section>

      {/* ====================================================================
          5. SELECTED PUBLICATIONS & ACTIVITY LOG (Asymmetric Two-Column)
          ==================================================================== */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 'var(--space-2xl)',
            }}
            className="home-pub-news-grid"
          >
            {/* Left: Selected Publications */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: 'var(--space-xs)',
                }}
              >
                <div>
                  <span className="eyebrow">SCHOLARSHIP</span>
                  <h2 className="h3-title" style={{ fontSize: '20px' }}>
                    Selected Publications
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('publications')}
                  className="link-subtle"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  <span>All Publications ({publications.length})</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div>
                {selectedPubs.map((pub) => (
                  <PublicationItem
                    key={pub.id}
                    publication={pub}
                    onOpenBibtex={onOpenBibtex}
                  />
                ))}
              </div>
            </div>

            {/* Right: Latest Activity News Log */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-md)',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: 'var(--space-xs)',
                }}
              >
                <div>
                  <span className="eyebrow">ACTIVITY LOG</span>
                  <h2 className="h3-title" style={{ fontSize: '20px' }}>
                    Recent Lab Updates
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="link-subtle"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  <span>All News</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recentNews.map((item) => (
                  <NewsListItem key={item.id} item={item} />
                ))}
              </div>

              {/* Callout box for Admission */}
              <div
                style={{
                  marginTop: 'var(--space-lg)',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '3px solid var(--color-accent)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                  Looking for Ph.D. / M.S. Students & Postdocs
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  We are actively recruiting passionate researchers in radar systems, signal processing, and physical AI.
                </p>
                <div style={{ marginTop: '2px' }}>
                  <button
                    type="button"
                    onClick={() => onNavigate('join')}
                    className="link-subtle"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    <span>Admission & Application Details</span>
                    <ArrowRight size={12} className="icon-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .home-pub-news-grid {
              grid-template-columns: 1fr !important;
              gap: var(--space-xl) !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};
