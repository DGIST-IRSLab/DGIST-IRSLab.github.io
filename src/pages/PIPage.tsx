import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  FileText,
  User,
  Radio
} from 'lucide-react';
import { professorData } from '../data/professorData';
import { SectionHeader } from '../components/common/SectionHeader';
import { assetUrl } from '../utils/asset';

interface PIPageProps {
  onNavigate?: (page: string, anchorId?: string) => void;
}

export const PIPage: React.FC<PIPageProps> = ({ onNavigate }) => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="pi-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Main Profile & Contact Block */}
      <section style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div className="container">
          <div className="pi-profile-grid">
            {/* Left: Photo & Quick Links */}
            <div className="pi-photo-col">
              <div className="pi-photo-wrapper">
                {!photoError ? (
                  <img
                    src={assetUrl(professorData.photo)}
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
                  <h1 className="pi-full-name">{professorData.name}</h1>
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

      {/* Projects Section */}
      <section id="pi-projects" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Projects"
          />

          <ul className="pi-plain-list">
            {professorData.projects.map((proj, idx) => (
              <li key={proj.id || idx} className="pi-plain-item">
                <span className="pi-plain-title">{proj.title}</span>
                <span className="pi-plain-dash"> - </span>
                <span className="pi-plain-agency">{proj.agencyBadge}</span>
                <span className="pi-plain-dash"> - </span>
                <span className="pi-plain-period">
                  {proj.period}
                  {proj.totalPeriod && proj.totalPeriod !== proj.period && ` (${proj.totalPeriod})`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Academic Service Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <SectionHeader
            title="Academic Service"
          />

          <div className="pi-service-section">
            <div className="pi-service-group">
              <h3 className="pi-service-heading">Area Chair</h3>
              <ul className="pi-plain-list">
                {professorData.academicService.areaChair.map((item, idx) => (
                  <li key={idx} className="pi-plain-item">{item}</li>
                ))}
              </ul>
            </div>

            <div className="pi-service-group">
              <h3 className="pi-service-heading">Technical Program Committee</h3>
              <ul className="pi-plain-list">
                {professorData.academicService.tpc.map((item, idx) => (
                  <li key={idx} className="pi-plain-item">{item}</li>
                ))}
              </ul>
            </div>

            <div className="pi-service-group">
              <h3 className="pi-service-heading">Reviewer</h3>
              <ul className="pi-plain-list">
                {professorData.academicService.reviewerConferences.map((item, idx) => (
                  <li key={idx} className="pi-plain-item">{item}</li>
                ))}
                {professorData.academicService.reviewerJournals.map((item, idx) => (
                  <li key={idx} className="pi-plain-item">{item}</li>
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
          />

          <ul className="pi-plain-list">
            {professorData.invitedTalks.map((talk, idx) => (
              <li key={idx} className="pi-plain-item">
                &ldquo;{talk.title}&rdquo;, {talk.venue}, {talk.date}
              </li>
            ))}
          </ul>
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
          font-family: var(--font-sans);
        }

        .pi-quick-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pi-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-primary);
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          text-decoration: none;
          transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
        }

        .pi-action-btn:hover {
          background-color: var(--color-surface-hover);
          border-color: var(--color-border-dark);
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
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.2vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--color-text-primary);
        }

        .pi-name-kr {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .pi-title-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: var(--radius-xs);
          background-color: var(--color-bg-secondary);
          color: var(--color-accent);
          border: 1px solid var(--color-border);
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
          font-size: 15px;
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
          padding: 14px 16px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          font-size: 13.5px;
        }

        .pi-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-secondary);
        }

        .pi-contact-icon {
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .pi-contact-label {
          font-weight: 600;
          color: var(--color-text-primary);
          min-width: 55px;
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
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
        }

        .pi-interest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
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

        /* Plain Academic Lists (Projects, Service, Talks) */
        .pi-plain-list {
          list-style: disc;
          padding-left: 20px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pi-plain-item {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        .pi-plain-title {
          color: var(--color-text-primary);
        }

        .pi-plain-agency {
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .pi-plain-period {
          color: var(--color-text-secondary);
        }

        .pi-plain-dash {
          color: var(--color-text-muted);
          user-select: none;
        }

        .pi-service-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pi-service-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pi-service-heading {
          font-family: var(--font-sans);
          font-size: 15.5px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
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
          .pi-interests-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
