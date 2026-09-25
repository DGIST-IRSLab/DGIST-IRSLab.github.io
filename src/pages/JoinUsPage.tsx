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
          backgroundColor: 'var(--color-bg)',
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        <div className="container">
          <h1 className="h1-title">
            Join Us
          </h1>
          <p
            style={{
              marginTop: '8px',
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              maxWidth: '720px',
              lineHeight: 1.6,
            }}
          >
            Opportunities for prospective graduate students, postdoctoral researchers, and undergraduate research interns at DGIST.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container container-editorial">
          <SectionHeader
            title="Open Positions"
          />

          <div className="positions-container">
            {/* Position 1: Graduate Students */}
            <article className="position-editorial-row">
              <div className="position-content-col">
                <h3 className="position-title">
                  Graduate Students (Ph.D. / M.S. / Integrated M.S./Ph.D.)
                </h3>
                <p className="position-desc">
                  Open to students with backgrounds in Electrical Engineering, Computer Science, Artificial Intelligence, Applied Physics, or Mathematics. Prior experience in signal processing, linear algebra, Python/PyTorch, or wireless systems is valued, but enthusiasm for foundational research is paramount.
                </p>

                <div className="position-guideline-box">
                  <div>&bull; DGIST EECS &amp; AI graduate admissions occur in Spring and Fall cycles.</div>
                  <div>&bull; Prospective applicants are encouraged to reach out 2–3 months before official deadlines.</div>
                </div>

                <div style={{ marginTop: 'var(--space-xs)' }}>
                  <a
                    href={labInfo.notionContactLink}
                    target="_blank"
                    rel="noreferrer"
                    className="link-subtle"
                    style={{ fontSize: '13.5px' }}
                  >
                    <FileText size={14} />
                    <span>Graduate Admission Guidelines (Notion)</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </article>

            {/* Position 2: Postdoctoral Scholars */}
            <article className="position-editorial-row">
              <div className="position-content-col">
                <h3 className="position-title">
                  Postdoctoral Research Scholars
                </h3>
                <p className="position-desc">
                  We are actively recruiting postdocs in wireless systems, radio signal processing, and physical AI, supported by national research initiatives (MSIT, NRF, ADD, IITP). Fellows lead high-impact publications and collaborate on cutting-edge research projects.
                </p>

                <div style={{ marginTop: 'var(--space-xs)' }}>
                  <a
                    href={labInfo.notionPostdocLink}
                    target="_blank"
                    rel="noreferrer"
                    className="link-subtle"
                    style={{ fontSize: '13.5px' }}
                  >
                    <FileText size={14} />
                    <span>Postdoc Hiring Document (Notion)</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </article>

            {/* Position 3: Undergraduate Interns */}
            <article className="position-editorial-row">
              <div className="position-content-col">
                <h3 className="position-title">
                  Undergraduate Research Interns
                </h3>
                <p className="position-desc">
                  DGIST and visiting undergraduate students are invited to join research projects during vacation periods or semester research modules to gain hands-on experimental research experience in radio sensing, deep learning, and hardware testbeds.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container container-editorial">
          <SectionHeader
            title="Contact &amp; Location"
          />

          <div className="contact-map-grid">
            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Prof. Jae-Ho Choi
                </h4>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  IRS Lab Director &middot; Assistant Professor
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} style={{ color: 'var(--color-text-muted)' }} />
                  <a
                    href="mailto:jhochoi@dgist.ac.kr"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                  >
                    jhochoi@dgist.ac.kr
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} style={{ color: 'var(--color-text-muted)' }} />
                  <span>{labInfo.phone}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <MapPin size={15} style={{ color: 'var(--color-text-muted)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ lineHeight: 1.5 }}>
                    Engineering Building E3, Room 406
                    <br />
                    DGIST, Daegu 42988, Republic of Korea
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 'var(--space-md)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  When emailing, please include:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <div>1. Curriculum Vitae &amp; academic transcripts</div>
                  <div>2. Brief statement of research interests and motivation</div>
                  <div>3. Target enrollment semester (e.g., Spring or Fall)</div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="map-frame">
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
      </section>

      <style>{`
        /* Positions List (Clean Editorial Rows) */
        .positions-container {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
        }

        .position-editorial-row {
          padding: 24px 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .position-content-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .position-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .position-desc {
          font-size: 14px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .position-guideline-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-top: 4px;
        }

        /* Contact & Map Grid */
        .contact-map-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          padding-top: var(--space-sm);
        }

        .map-frame {
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background-color: var(--color-bg-secondary);
        }

        @media (max-width: 800px) {
          .contact-map-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
