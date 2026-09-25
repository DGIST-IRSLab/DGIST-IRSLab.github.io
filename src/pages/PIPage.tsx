import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Calendar,
  FileText,
  User,
  Radio
} from 'lucide-react';
import { professorData } from '../data/professorData';
import { SectionHeader } from '../components/common/SectionHeader';

interface PIPageProps {
  onNavigate?: (page: string, anchorId?: string) => void;
}

export const PIPage: React.FC<PIPageProps> = ({ onNavigate }) => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="pi-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-accent)',
                letterSpacing: '0.04em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Principal Investigator
            </span>
          </div>
          <h1 className="h1-title">
            Jae-Ho Choi, Ph.D.
          </h1>
          <p
            style={{
              marginTop: '6px',
              color: 'var(--color-text-secondary)',
              fontSize: '16px',
            }}
          >
            최재호 교수 &middot; Assistant Professor @ DGIST EECS &amp; AI
          </p>
        </div>
      </section>

      {/* Main Profile & Contact Block */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="pi-profile-grid">
            {/* Left: Photo & Quick Links */}
            <div className="pi-photo-col">
              <div className="pi-photo-wrapper">
                {!photoError ? (
                  <img
                    src={professorData.photo}
                    alt={professorData.name}
                    onError={() => setPhotoError(true)}
                    className="pi-portrait-img"
                  />
                ) : (
                  <div className="pi-photo-fallback">
                    <span>Prof. Jae-Ho Choi</span>
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="pi-quick-actions">
                <a
                  href={professorData.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-action-btn"
                >
                  <FileText size={15} />
                  <span>Curriculum Vitae</span>
                  <ExternalLink size={12} className="pi-external-icon" />
                </a>

                <a
                  href={professorData.googleScholar}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-action-btn"
                >
                  <GraduationCap size={15} />
                  <span>Google Scholar</span>
                  <ExternalLink size={12} className="pi-external-icon" />
                </a>

                <a
                  href={professorData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-action-btn"
                >
                  <ExternalLink size={15} />
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="pi-external-icon" />
                </a>

                {onNavigate && (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigate('members')}
                      className="pi-action-btn"
                      style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    >
                      <User size={15} />
                      <span>Lab Members</span>
                      <ExternalLink size={12} className="pi-external-icon" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('research')}
                      className="pi-action-btn"
                      style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    >
                      <Radio size={15} />
                      <span>Lab Research</span>
                      <ExternalLink size={12} className="pi-external-icon" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right: Bio & Key Information */}
            <div className="pi-info-col">
              <div className="pi-header-group">
                <div className="pi-name-row">
                  <h2 className="pi-full-name">{professorData.name}</h2>
                  <span className="pi-name-kr">({professorData.nameKr})</span>
                  <span className="pi-title-badge">{professorData.title}</span>
                </div>
                <div className="pi-affiliation-text">
                  Department of Electrical Engineering and Computer Science (EECS)
                  <br />
                  Department of Interdisciplinary Studies of Artificial Intelligence (AI)
                  <br />
                  <a
                    href="https://www.dgist.ac.kr/eng/index.do"
                    target="_blank"
                    rel="noreferrer"
                    className="pi-institution-link"
                  >
                    DGIST (Daegu Gyeongbuk Institute of Science and Technology)
                  </a>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="pi-bio-prose">
                <p>
                  I am an Assistant Professor at Department of Electrical Engineering and Computer Science (EECS) and Department of Interdisciplinary Studies of Artificial Intelligence (AI), <a href="https://www.dgist.ac.kr/eng/index.do" target="_blank" rel="noreferrer">DGIST</a>, Daegu, Korea, since 2024.
                </p>
                <p>
                  From 2023 to 2024, I was a Postdoctoral Scholar in <a href="https://ee.stanford.edu/" target="_blank" rel="noreferrer">Department of Electrical Engineering</a> (advised by Prof. <a href="https://arbabianlab.stanford.edu/" target="_blank" rel="noreferrer">Amin Arbabian</a>) at <a href="https://www.stanford.edu/" target="_blank" rel="noreferrer">Stanford University</a>, Stanford, CA, US. I received the M.S. and Ph.D. degree in Electrical Engineering from <a href="https://postech.ac.kr/eng/" target="_blank" rel="noreferrer">POSTECH</a> (advised by Prof. <a href="http://iras.postech.ac.kr/main/index.php" target="_blank" rel="noreferrer">Kyung-Tae Kim</a>), Pohang, Korea, in 2019 and 2023, respectively. I completed the B.S. degree in Computer Science from <a href="https://www.korea.edu/sites/en/index.do" target="_blank" rel="noreferrer">Korea University</a>, Seoul, Korea, in 2017.
                </p>
              </div>

              {/* Contacts Grid */}
              <div className="pi-contact-list">
                <div className="pi-contact-item">
                  <Mail size={16} className="pi-contact-icon" />
                  <span className="pi-contact-label">Email:</span>
                  <a href={`mailto:${professorData.email}`} className="pi-contact-value">
                    {professorData.email}
                  </a>
                </div>
                <div className="pi-contact-item">
                  <Phone size={16} className="pi-contact-icon" />
                  <span className="pi-contact-label">Phone:</span>
                  <span className="pi-contact-value">{professorData.phone}</span>
                </div>
                <div className="pi-contact-item">
                  <MapPin size={16} className="pi-contact-icon" />
                  <span className="pi-contact-label">Office:</span>
                  <span className="pi-contact-value">Room 406, Engineering Building E3, DGIST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="pi-twocol-grid">
            {/* Experience */}
            <div className="pi-card-block">
              <div className="pi-card-header">
                <Briefcase size={18} className="pi-section-icon" />
                <h3 className="pi-section-title">Experience</h3>
              </div>
              <div className="pi-timeline">
                {professorData.experience.map((exp, idx) => (
                  <div key={idx} className="pi-timeline-item">
                    <div className="pi-timeline-dot" />
                    <div className="pi-timeline-content">
                      <div className="pi-timeline-top">
                        <span className="pi-timeline-role">{exp.role}</span>
                        <span className="pi-timeline-period">{exp.period}</span>
                      </div>
                      <div className="pi-timeline-org">{exp.organization}</div>
                      {exp.detail && <div className="pi-timeline-detail">{exp.detail}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="pi-card-block">
              <div className="pi-card-header">
                <GraduationCap size={18} className="pi-section-icon" />
                <h3 className="pi-section-title">Education</h3>
              </div>
              <div className="pi-timeline">
                {professorData.education.map((edu, idx) => (
                  <div key={idx} className="pi-timeline-item">
                    <div className="pi-timeline-dot" />
                    <div className="pi-timeline-content">
                      <div className="pi-timeline-top">
                        <span className="pi-timeline-role">
                          {edu.degree} in {edu.field}
                        </span>
                        <span className="pi-timeline-period">{edu.period}</span>
                      </div>
                      <div className="pi-timeline-org">{edu.institution}</div>
                      {edu.advisor && <div className="pi-timeline-detail">{edu.advisor}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Research Interests"
            description="Developing new sensing technologies to perceive the physical world from entirely new perspectives, relying primarily on radio-frequency signals."
          />

          <div className="pi-interests-grid">
            {professorData.researchInterests.map((interest, idx) => (
              <div key={idx} className="pi-interest-card">
                <div className="pi-interest-number">0{idx + 1}</div>
                <h4 className="pi-interest-title">{interest.title}</h4>
                <p className="pi-interest-desc">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funded Research Projects Section (과제정보) */}
      <section id="pi-projects" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Projects"
            description="Funded national and industrial research initiatives led and contributed by Prof. Jae-Ho Choi"
          />

          <div className="pi-projects-list">
            {professorData.projects.map((proj, idx) => (
              <div key={proj.id || idx} className="pi-project-row">
                {/* Left Meta: Period & Agency */}
                <div className="pi-proj-meta">
                  <span className="pi-proj-agency-badge">{proj.agencyBadge}</span>
                  <div className="pi-proj-period-wrap">
                    <span className="pi-proj-period">{proj.period}</span>
                    {proj.totalPeriod && (
                      <span className="pi-proj-total-period">({proj.totalPeriod})</span>
                    )}
                  </div>
                </div>

                {/* Right Body: Title & Details */}
                <div className="pi-proj-body">
                  <div className="pi-proj-header">
                    <h4 className="pi-proj-title">{proj.title}</h4>
                  </div>
                  <div className="pi-proj-footer-info">
                    <span className="pi-proj-agency-name">{proj.agency}</span>
                    {proj.role && (
                      <>
                        <span className="pi-proj-bullet">&bull;</span>
                        <span className="pi-proj-role">{proj.role}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Service Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Academic Service"
            description="Professional contributions to international machine learning and signal processing communities"
          />

          <div className="pi-service-grid">
            {/* Area Chair */}
            <div className="pi-service-box">
              <div className="pi-service-box-header">
                <span className="pi-service-type">Area Chair</span>
              </div>
              <ul className="pi-service-items">
                {professorData.academicService.areaChair.map((item, idx) => (
                  <li key={idx} className="pi-service-badge-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Program Committee */}
            <div className="pi-service-box">
              <div className="pi-service-box-header">
                <span className="pi-service-type">Technical Program Committee</span>
              </div>
              <ul className="pi-service-items">
                {professorData.academicService.tpc.map((item, idx) => (
                  <li key={idx} className="pi-service-badge-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conference Reviewer */}
            <div className="pi-service-box">
              <div className="pi-service-box-header">
                <span className="pi-service-type">Conference Reviewer</span>
              </div>
              <p className="pi-service-text">
                {professorData.academicService.reviewerConferences.join(', ')}
              </p>
            </div>

            {/* Journal Reviewer */}
            <div className="pi-service-box">
              <div className="pi-service-box-header">
                <span className="pi-service-type">Journal Reviewer</span>
              </div>
              <ul className="pi-journal-list">
                {professorData.academicService.reviewerJournals.map((journal, idx) => (
                  <li key={idx} className="pi-journal-item">
                    {journal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Invited Talks Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Invited Talks"
            description="Selected keynote speeches, technical seminars, and invited presentations"
          />

          <div className="pi-talks-list">
            {professorData.invitedTalks.map((talk, idx) => (
              <div key={idx} className="pi-talk-row">
                <div className="pi-talk-date">
                  <Calendar size={14} className="pi-talk-icon" />
                  <span>{talk.date}</span>
                </div>
                <div className="pi-talk-body">
                  <div className="pi-talk-title">{talk.title}</div>
                  <div className="pi-talk-venue">{talk.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoped Styles for PIPage */}
      <style>{`
        .pi-page-root {
          background-color: var(--color-bg);
          color: var(--color-text-primary);
        }

        .pi-profile-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          align-items: start;
        }

        .pi-photo-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pi-photo-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background-color: var(--color-bg-secondary);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .pi-portrait-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        .pi-photo-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-dim);
          font-family: var(--font-mono);
        }

        .pi-quick-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pi-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-primary);
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .pi-action-btn:hover {
          background-color: var(--color-surface-hover);
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .pi-external-icon {
          margin-left: auto;
          opacity: 0.6;
        }

        .pi-info-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pi-name-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 8px;
        }

        .pi-full-name {
          font-size: clamp(1.8rem, 3vw, 2.3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--color-text-primary);
        }

        .pi-name-kr {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .pi-title-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 999px;
          background-color: var(--color-accent-subtle);
          color: var(--color-accent);
          border: 1px solid var(--color-accent-border);
        }

        .pi-affiliation-text {
          font-size: 15px;
          line-height: 1.55;
          color: var(--color-text-secondary);
        }

        .pi-institution-link {
          color: var(--color-text-primary);
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px dotted var(--color-border-dark);
          transition: color var(--transition-fast);
        }

        .pi-institution-link:hover {
          color: var(--color-accent);
        }

        .pi-bio-prose {
          font-size: 15.5px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pi-bio-prose a {
          color: var(--color-accent);
          text-decoration: none;
          font-weight: 500;
        }

        .pi-bio-prose a:hover {
          text-decoration: underline;
        }

        .pi-contact-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          font-size: 14px;
        }

        .pi-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-secondary);
        }

        .pi-contact-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .pi-contact-label {
          font-weight: 600;
          color: var(--color-text-primary);
          min-width: 60px;
        }

        .pi-contact-value {
          color: var(--color-text-secondary);
          text-decoration: none;
        }

        .pi-contact-value:hover {
          color: var(--color-accent);
        }

        /* 2-Column Experience & Education */
        .pi-twocol-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
        }

        .pi-card-block {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--space-xl);
        }

        .pi-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--space-lg);
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .pi-section-icon {
          color: var(--color-accent);
        }

        .pi-section-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .pi-timeline {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .pi-timeline-item {
          position: relative;
          padding-left: 18px;
          border-left: 2px solid var(--color-border);
        }

        .pi-timeline-dot {
          position: absolute;
          left: -5px;
          top: 5px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-accent);
        }

        .pi-timeline-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pi-timeline-role {
          font-weight: 600;
          font-size: 14.5px;
          color: var(--color-text-primary);
        }

        .pi-timeline-period {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--color-text-muted);
        }

        .pi-timeline-org {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin-top: 2px;
        }

        .pi-timeline-detail {
          font-size: 13px;
          color: var(--color-text-dim);
          margin-top: 2px;
        }

        /* Research Interests Grid */
        .pi-interests-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        .pi-interest-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color var(--transition-fast);
        }

        .pi-interest-card:hover {
          border-color: var(--color-accent-border);
        }

        .pi-interest-number {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: var(--color-accent);
        }

        .pi-interest-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .pi-interest-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
        }

        /* Projects List (과제정보) */
        .pi-projects-list {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background-color: var(--color-surface);
          overflow: hidden;
        }

        .pi-project-row {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: var(--space-lg);
          padding: 18px 24px;
          border-bottom: 1px solid var(--color-border-subtle);
          align-items: baseline;
          transition: background-color var(--transition-fast);
        }

        .pi-project-row:last-child {
          border-bottom: none;
        }

        .pi-project-row:hover {
          background-color: var(--color-surface-hover);
        }

        .pi-proj-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pi-proj-agency-badge {
          display: inline-block;
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--radius-xs);
          background-color: var(--color-accent-subtle);
          color: var(--color-accent);
          border: 1px solid var(--color-accent-border);
          letter-spacing: 0.04em;
        }

        .pi-proj-period-wrap {
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .pi-proj-total-period {
          font-size: 11px;
          color: var(--color-text-dim);
        }

        .pi-proj-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pi-proj-title {
          font-size: 15px;
          font-weight: 600;
          line-height: 1.45;
          margin: 0;
          color: var(--color-text-primary);
        }

        .pi-proj-footer-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--color-text-secondary);
          flex-wrap: wrap;
        }

        .pi-proj-agency-name {
          color: var(--color-text-secondary);
        }

        .pi-proj-bullet {
          color: var(--color-text-dim);
        }

        .pi-proj-role {
          font-family: var(--font-mono);
          color: var(--color-accent);
          font-weight: 500;
        }

        /* Academic Service */
        .pi-service-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .pi-service-box {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--space-lg);
        }

        .pi-service-box-header {
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .pi-service-type {
          font-family: var(--font-mono);
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-accent);
        }

        .pi-service-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pi-service-badge-item {
          display: inline-block;
          font-size: 13.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
        }

        .pi-service-text {
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .pi-journal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pi-journal-item {
          font-size: 13.5px;
          line-height: 1.45;
          color: var(--color-text-secondary);
          padding-left: 14px;
          position: relative;
        }

        .pi-journal-item::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--color-text-dim);
        }

        /* Invited Talks */
        .pi-talks-list {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background-color: var(--color-surface);
          overflow: hidden;
        }

        .pi-talk-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: var(--space-md);
          padding: 16px 20px;
          border-bottom: 1px solid var(--color-border-subtle);
          align-items: baseline;
          transition: background-color var(--transition-fast);
        }

        .pi-talk-row:last-child {
          border-bottom: none;
        }

        .pi-talk-row:hover {
          background-color: var(--color-surface-hover);
        }

        .pi-talk-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent);
        }

        .pi-talk-icon {
          opacity: 0.8;
        }

        .pi-talk-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pi-talk-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .pi-talk-venue {
          font-size: 13.5px;
          color: var(--color-text-secondary);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .pi-profile-grid {
            grid-template-columns: 1fr;
          }

          .pi-photo-col {
            max-width: 300px;
            margin: 0 auto;
            width: 100%;
          }

          .pi-twocol-grid,
          .pi-interests-grid,
          .pi-service-grid {
            grid-template-columns: 1fr;
          }

          .pi-project-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .pi-talk-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};
