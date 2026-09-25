import React from 'react';
import { Mail, MapPin, ExternalLink, FileText, Phone } from 'lucide-react';
import { labInfo } from '../data/labInfo';
import { SectionHeader } from '../components/common/SectionHeader';

export const JoinUsPage: React.FC = () => {
  return (
    <div className="join-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Header Banner */}
      <section
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        <div className="container">
          <h1 className="h1-title">
            Join Us
          </h1>
        </div>
      </section>

      {/* Intro Editorial Statement */}
      <section style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-md)' }}>
        <div className="container container-editorial">
          <p
            className="body-text"
            style={{
              fontSize: '15.5px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '820px',
              margin: '0',
            }}
          >
            We welcome motivated graduate students (Ph.D., M.S., and Integrated M.S./Ph.D.), undergraduate research interns, and postdoctoral researchers who are passionate about radio sensing, RF signal processing, and physical artificial intelligence.
          </p>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container container-editorial">
          <SectionHeader
            title="Open Positions"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* Position 1: Graduate Students (Ph.D. / M.S.) */}
            <div
              style={{
                padding: 'var(--space-lg)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Graduate Students (Ph.D. / M.S. / Integrated M.S./Ph.D.)
                </h3>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Open for Admission</span>
              </div>

              <p className="body-text" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                Open to students with backgrounds in Electrical Engineering, Computer Science, Artificial Intelligence, Mathematics, or Physics. Prior experience in signal processing, linear algebra, Python/PyTorch, or wireless systems is valued but enthusiasm for learning is most paramount.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <div>• DGIST EECS & AI graduate admissions cycles occur in Spring and Fall.</div>
                <div>• Prospective students are encouraged to reach out at least 2–3 months before the official application deadline.</div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-xs)', flexWrap: 'wrap' }}>
                <a
                  href={labInfo.notionContactLink}
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                  style={{ fontSize: '14px' }}
                >
                  <FileText size={14} />
                  <span>Graduate Admission Guidelines</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Position 2: Postdoctoral Fellows */}
            <div
              style={{
                padding: 'var(--space-lg)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Postdoctoral Research Fellows
                </h3>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Actively Hiring</span>
              </div>

              <p className="body-text" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                We are actively recruiting postdocs in wireless systems, radio signal processing, and physical AI, supported by national research initiatives (MSIT, NRF, ADD, IITP). Fellows will lead high-impact publications and collaborate on cutting-edge research projects.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-xs)', flexWrap: 'wrap' }}>
                <a
                  href={labInfo.notionPostdocLink}
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                  style={{ fontSize: '14px' }}
                >
                  <FileText size={14} />
                  <span>Postdoc Hiring Document</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Position 3: Undergraduate Research Interns */}
            <div
              style={{
                padding: 'var(--space-lg)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Undergraduate Research Interns
                </h3>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)' }}>Summer &amp; Winter Cohorts</span>
              </div>

              <p className="body-text" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                DGIST and visiting undergraduate students are invited to join research projects during summer/winter vacations or semester sessions. Interns participate in testbed experiments, algorithm implementations, and weekly paper readings.
              </p>
            </div>
          </div>

          {/* Korean Notice Box */}
          <div
            style={{
              marginTop: 'var(--space-xl)',
              padding: 'var(--space-md) var(--space-lg)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '3px solid var(--color-accent)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '13.5px',
              lineHeight: 1.65,
              color: 'var(--color-text-secondary)',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              [국문 지원 안내]
            </div>
            우리 연구실에서는 열정 있는 대학원생(석사/박사/석박통합 과정), 박사후 연구원 및 학부 연구생을 상시 모집하고 있습니다. 무선 통신/신호처리, 컴퓨터 비전, 인공지능에 관심이 있으신 분은 간략한 자기소개 및 이력서(CV, 성적증명서 포함)와 함께 최재호 교수(
            <a href="mailto:jhochoi@dgist.ac.kr" style={{ color: 'var(--color-accent)' }}>
              jhochoi@dgist.ac.kr
            </a>
            )에게 이메일로 연락 주시길 바랍니다.
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container container-editorial">
          <SectionHeader
            title="Contact & Visit"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-xl)',
              padding: 'var(--space-lg)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
            }}
            className="contact-map-grid"
          >
            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Prof. Jae-Ho Choi
                </h4>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  IRS Lab Director & Assistant Professor
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} style={{ color: 'var(--color-accent)' }} />
                  <a
                    href="mailto:jhochoi@dgist.ac.kr"
                    style={{ color: 'var(--color-text-primary)', fontWeight: 500, textDecoration: 'none' }}
                  >
                    jhochoi@dgist.ac.kr
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} style={{ color: 'var(--color-accent)' }} />
                  <span>{labInfo.phone}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <MapPin size={15} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                  <span>
                    Engineering Building E3, Room 406
                    <br />
                    DGIST, Daegu 42988, Republic of Korea
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-sm)' }}>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                  When emailing, please include:
                  <br />
                  1. Current CV & Transcript
                  <br />
                  2. Brief statement of research interests
                  <br />
                  3. Tentative target enrollment semester
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <iframe
                title="DGIST IRS Lab Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d812.5!2d128.4533465!3d35.7060902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356f587a086a08df%3A0x8feff7c081d19e7c!2z7KCE6riw7KCE7J6Q7Lu07ZOo7YSw6rO17ZWZ6rO8IChFMyk!5e0!3m2!1sen!2skr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            .contact-map-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};
