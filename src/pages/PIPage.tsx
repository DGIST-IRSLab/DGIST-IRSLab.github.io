import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText
} from 'lucide-react';
import { professorData } from '../data/professorData';
import { SectionHeader } from '../components/common/SectionHeader';
import { assetUrl } from '../utils/asset';

interface PIPageProps {
  onNavigate?: (page: string, anchorId?: string) => void;
}

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const PIPage: React.FC<PIPageProps> = () => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="pi-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Main Profile & Contact Block */}
      <section style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div className="container">
          <div className="pi-profile-grid">
            {/* Left: Photo & Action Icons */}
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

              {/* Action Icons: Curriculum Vitae, Google Scholar, LinkedIn */}
              <div className="pi-icon-links-row">
                <a
                  href={professorData.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-icon-btn"
                  title="Curriculum Vitae"
                  aria-label="Curriculum Vitae"
                >
                  <FileText size={18} />
                </a>

                <a
                  href={professorData.googleScholar}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-icon-btn"
                  title="Google Scholar"
                  aria-label="Google Scholar"
                >
                  <GraduationCap size={18} />
                </a>

                <a
                  href={professorData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="pi-icon-btn"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={17} />
                </a>
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
            <div>
              <SectionHeader title="Experience" />
              <div className="pi-history-list">
                {professorData.experience.map((exp, idx) => (
                  <div key={idx} className="pi-history-item">
                    {exp.logo && (
                      <div className="pi-history-cube">
                        <img
                          src={assetUrl(exp.logo)}
                          alt={exp.organization}
                          className="pi-history-logo"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="pi-history-body">
                      <div className="pi-history-headline">
                        <span className="pi-history-role">{exp.role}</span>
                        <span className="pi-history-sep">, </span>
                        <span className="pi-history-org">{exp.organization}</span>
                      </div>
                      <div className="pi-history-period">{exp.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <SectionHeader title="Education" />
              <div className="pi-history-list">
                {professorData.education.map((edu, idx) => (
                  <div key={idx} className="pi-history-item">
                    {edu.logo && (
                      <div className="pi-history-cube">
                        <img
                          src={assetUrl(edu.logo)}
                          alt={edu.institution}
                          className="pi-history-logo"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="pi-history-body">
                      <div className="pi-history-headline">
                        <span className="pi-history-role">{edu.degree}</span>
                        <span className="pi-history-sep">, </span>
                        <span className="pi-history-field">{edu.field}</span>
                        <span className="pi-history-sep">, </span>
                        <span className="pi-history-org">{edu.institution}</span>
                      </div>
                      <div className="pi-history-period">{edu.period}</div>
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
          <SectionHeader title="Research Interests" />
          <p className="pi-interests-intro">
            {professorData.researchIntro}
          </p>
          <ul className="pi-plain-list" style={{ marginTop: '14px' }}>
            {professorData.researchInterests.map((interest, idx) => (
              <li key={idx} className="pi-plain-item">
                <span className="pi-plain-title">{interest.title}:</span> {interest.description}
              </li>
            ))}
          </ul>
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
          border-radius: 8px;
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

        .pi-icon-links-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .pi-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pi-icon-btn:hover {
          background-color: var(--color-surface-hover);
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
          gap: clamp(2rem, 4vw, 3.5rem);
        }

        /* Experience & Education History with Rounded Square Logo Cubes */
        .pi-history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pi-history-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 10px;
          border-radius: var(--radius-xs);
          transition: background-color var(--transition-fast);
        }

        .pi-history-item:hover {
          background-color: var(--color-surface-hover);
        }

        .pi-history-cube {
          width: 48px;
          height: 48px;
          min-width: 48px;
          min-height: 48px;
          border-radius: 12px;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          box-sizing: border-box;
          flex-shrink: 0;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .pi-history-item:hover .pi-history-cube {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        [data-theme='dark'] .pi-history-cube {
          background-color: #ffffff;
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        }

        .pi-history-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .pi-history-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .pi-history-headline {
          font-family: var(--font-body);
          font-size: 14.5px;
          line-height: 1.45;
          color: var(--color-text-secondary);
          word-break: keep-all;
        }

        .pi-history-role {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .pi-history-org,
        .pi-history-field {
          color: var(--color-text-secondary);
        }

        .pi-history-sep {
          color: var(--color-text-muted);
        }

        .pi-history-period {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-text-muted);
          line-height: 1.3;
        }

        .pi-interests-intro {
          font-size: 15px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0;
        }

        /* Plain Academic Lists (Projects, Experience, Education, Service, Talks) */
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
          font-weight: 600;
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
            max-width: 280px;
            margin: 0 auto;
            width: 100%;
          }

          .pi-twocol-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
        }
      `}</style>
    </div>
  );
};
