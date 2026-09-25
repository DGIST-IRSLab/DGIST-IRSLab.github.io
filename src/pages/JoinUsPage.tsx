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
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              maxWidth: '820px',
              margin: '0',
            }}
          >
            We welcome motivated <strong style={{ color: 'var(--color-text-primary)' }}>graduate students (Ph.D., M.S., and Integrated M.S./Ph.D.)</strong>, <strong style={{ color: 'var(--color-text-primary)' }}>undergraduate research interns</strong>, and <strong style={{ color: 'var(--color-text-primary)' }}>postdoctoral researchers</strong> who are passionate about <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>radio sensing, RF signal processing, and physical artificial intelligence</span>.
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Graduate Students (Ph.D. / M.S. / Integrated M.S./Ph.D.)
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '2.5px 8px',
                    borderRadius: 'var(--radius-xs, 3px)',
                    backgroundColor: 'var(--color-badge-bg)',
                    color: 'var(--color-badge-text)',
                    border: '1px solid var(--color-badge-border)',
                  }}
                >
                  ● Open for Admission
                </span>
              </div>

              <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                Open to students with backgrounds in <strong style={{ color: 'var(--color-text-primary)' }}>Electrical Engineering, Computer Science, Artificial Intelligence, Mathematics, or Physics</strong>. Prior experience in <strong style={{ color: 'var(--color-text-primary)' }}>signal processing, linear algebra, Python/PyTorch, or wireless systems</strong> is valued, but <strong style={{ color: 'var(--color-accent)' }}>enthusiasm for learning is most paramount</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13.5px', color: 'var(--color-text-secondary)' }}>
                <div>• DGIST EECS &amp; AI graduate admissions cycles occur in <strong style={{ color: 'var(--color-text-primary)' }}>Spring and Fall</strong>.</div>
                <div>• Prospective students are strongly encouraged to reach out at least <strong style={{ color: 'var(--color-accent)' }}>2–3 months before</strong> the official application deadline.</div>
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
                  <span>Graduate Admission Guidelines (Korean)</span>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Postdoctoral Research Fellows
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '2.5px 8px',
                    borderRadius: 'var(--radius-xs, 3px)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#059669',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  ● Actively Hiring
                </span>
              </div>

              <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                We are actively recruiting postdocs in <strong style={{ color: 'var(--color-text-primary)' }}>wireless systems, radio signal processing, and physical AI</strong>, supported by national research initiatives (<strong style={{ color: 'var(--color-text-primary)' }}>MSIT, NRF, ADD, IITP</strong>). Fellows will lead <strong style={{ color: 'var(--color-accent)' }}>high-impact publications</strong> and collaborate on cutting-edge research projects.
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  Undergraduate Research Interns
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '2.5px 8px',
                    borderRadius: 'var(--radius-xs, 3px)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  ● Summer &amp; Winter Cohorts
                </span>
              </div>

              <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>DGIST and visiting undergraduate students</strong> are invited to join research projects during <strong style={{ color: 'var(--color-accent)' }}>summer/winter vacations</strong> or <strong style={{ color: 'var(--color-text-primary)' }}>semester sessions</strong>. Interns participate in <strong style={{ color: 'var(--color-text-primary)' }}>testbed experiments, algorithm implementations, and weekly paper readings</strong>.
              </p>
            </div>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <div>1. <strong style={{ color: 'var(--color-text-primary)' }}>Current CV &amp; Transcript</strong></div>
                  <div>2. <strong style={{ color: 'var(--color-text-primary)' }}>Brief statement</strong> of research interests &amp; motivation</div>
                  <div>3. <strong style={{ color: 'var(--color-accent)' }}>Target enrollment semester</strong> (e.g., Spring 2027)</div>
                </div>
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
