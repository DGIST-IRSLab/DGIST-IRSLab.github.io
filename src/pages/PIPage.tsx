import React, { useState } from 'react';
import { professorData } from '../data/professorData';
import { assetUrl } from '../utils/asset';

interface PIPageProps {
  onNavigate?: (page: string, anchorId?: string) => void;
}

export const PIPage: React.FC<PIPageProps> = () => {
  const [photoError, setPhotoError] = useState(false);

  const renderOrgWithBoldInst = (org: string) => {
    const lastCommaIdx = org.lastIndexOf(',');
    if (lastCommaIdx === -1) {
      return <strong>{org}</strong>;
    }
    const dept = org.slice(0, lastCommaIdx + 1);
    const inst = org.slice(lastCommaIdx + 1).trim();
    return (
      <>
        {dept} <strong>{inst}</strong>
      </>
    );
  };

  return (
    <div className="pi-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container pi-simple-content">
          {/* Top Profile Row */}
          <div className="pi-profile-row">
            <div className="pi-photo-col">
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

            <div className="pi-info-col">
              <h1 className="pi-full-name">{professorData.name}</h1>

              <div className="pi-bio-prose">
                <p>
                  I am an Assistant Professor at Department of Electrical Engineering and Computer Science (EECS) and Department of Interdisciplinary Studies of Artificial Intelligence (AI),{' '}
                  <a href="https://www.dgist.ac.kr/eng/index.do" target="_blank" rel="noreferrer">
                    DGIST
                  </a>
                  , Daegu, Korea, since 2024.
                </p>
                <p>
                  From 2023 to 2024, I was a Postdoctoral Scholar in{' '}
                  <a href="https://ee.stanford.edu/" target="_blank" rel="noreferrer">
                    Department of Electrical Engineering
                  </a>{' '}
                  (advised by Prof.{' '}
                  <a href="https://arbabianlab.stanford.edu/" target="_blank" rel="noreferrer">
                    Amin Arbabian
                  </a>
                  ) at{' '}
                  <a href="https://www.stanford.edu/" target="_blank" rel="noreferrer">
                    Stanford University
                  </a>
                  , Stanford, CA, US. I received the M.S. and Ph.D. degree in Electrical Engineering from{' '}
                  <a href="https://postech.ac.kr/eng/" target="_blank" rel="noreferrer">
                    POSTECH
                  </a>{' '}
                  (advised by Prof.{' '}
                  <a href="http://iras.postech.ac.kr/main/index.php" target="_blank" rel="noreferrer">
                    Kyung-Tae Kim
                  </a>
                  ), Pohang, Korea, in 2019 and 2023, respectively. I completed the B.S. degree in Computer Science from{' '}
                  <a href="https://www.korea.edu/sites/en/index.do" target="_blank" rel="noreferrer">
                    Korea University
                  </a>
                  , Seoul, Korea, in 2017.
                </p>
                <p className="pi-inline-links">
                  <a href={professorData.cvUrl} target="_blank" rel="noreferrer">
                    CV
                  </a>{' '}
                  /{' '}
                  <a href={professorData.googleScholar} target="_blank" rel="noreferrer">
                    Google Scholar
                  </a>{' '}
                  /{' '}
                  <a href={professorData.linkedin} target="_blank" rel="noreferrer">
                    Linkedin
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="pi-section-block">
            <h2 className="pi-section-heading">Experience</h2>
            <ul className="pi-plain-list">
              {professorData.experience.map((exp, idx) => (
                <li key={idx} className="pi-plain-item">
                  {exp.role}, {renderOrgWithBoldInst(exp.organization)}, {exp.period}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="pi-section-block">
            <h2 className="pi-section-heading">Education</h2>
            <ul className="pi-plain-list">
              {professorData.education.map((edu, idx) => (
                <li key={idx} className="pi-plain-item">
                  {edu.degree}, {edu.field}, <strong>{edu.institution}</strong>, {edu.period}
                </li>
              ))}
            </ul>
          </div>

          {/* Research Interests */}
          <div className="pi-section-block">
            <h2 className="pi-section-heading">Research Interests</h2>
            <p className="pi-interests-intro">{professorData.researchIntro}</p>
            <ul className="pi-plain-list">
              {professorData.researchInterests.map((interest, idx) => (
                <li key={idx} className="pi-plain-item">
                  <strong>{interest.title}</strong>: {interest.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div id="pi-projects" className="pi-section-block">
            <h2 className="pi-section-heading">Projects</h2>
            <ul className="pi-plain-list">
              {professorData.projects.map((proj, idx) => (
                <li key={proj.id || idx} className="pi-plain-item">
                  {proj.title} - {proj.agencyBadge} - {proj.period}
                  {proj.totalPeriod && proj.totalPeriod !== proj.period && ` (${proj.totalPeriod})`}
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Service */}
          <div className="pi-section-block">
            <h2 className="pi-section-heading">Academic Service</h2>
            <div className="pi-service-section">
              <div className="pi-service-group">
                <h3 className="pi-service-heading">Area Chair</h3>
                <ul className="pi-plain-list">
                  {professorData.academicService.areaChair.map((item, idx) => (
                    <li key={idx} className="pi-plain-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pi-service-group">
                <h3 className="pi-service-heading">Technical Program Committee</h3>
                <ul className="pi-plain-list">
                  {professorData.academicService.tpc.map((item, idx) => (
                    <li key={idx} className="pi-plain-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pi-service-group">
                <h3 className="pi-service-heading">Reviewer</h3>
                <ul className="pi-plain-list">
                  {professorData.academicService.reviewerConferences.map((item, idx) => (
                    <li key={idx} className="pi-plain-item">
                      {item}
                    </li>
                  ))}
                  {professorData.academicService.reviewerJournals.map((item, idx) => (
                    <li key={idx} className="pi-plain-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Invited Talks */}
          <div className="pi-section-block">
            <h2 className="pi-section-heading">Invited Talks</h2>
            <ul className="pi-plain-list">
              {professorData.invitedTalks.map((talk, idx) => (
                <li key={idx} className="pi-plain-item">
                  &ldquo;{talk.title}&rdquo;, {talk.venue}, {talk.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .pi-page-root {
          background-color: var(--color-bg);
          color: var(--color-text-primary);
        }

        .pi-simple-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--color-text-primary);
        }

        .pi-profile-row {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: var(--space-xl);
          align-items: start;
        }

        .pi-photo-col {
          text-align: center;
        }

        .pi-portrait-img {
          width: 95%;
          height: auto;
          border-radius: 6px;
          display: inline-block;
        }

        .pi-photo-fallback {
          width: 95%;
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
        }

        .pi-info-col {
          padding-top: 2%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pi-full-name {
          font-family: var(--font-heading);
          font-size: var(--text-h2);
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0;
          color: var(--color-text-primary);
        }

        .pi-bio-prose {
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--color-text-primary);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pi-bio-prose p {
          margin: 0;
        }

        .pi-bio-prose a {
          color: var(--color-accent);
          text-decoration: none;
        }

        .pi-bio-prose a:hover {
          text-decoration: underline;
        }

        .pi-section-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pi-section-heading {
          font-family: var(--font-heading);
          font-size: var(--text-h2);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .pi-interests-intro {
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--color-text-primary);
          margin: 0;
        }

        .pi-plain-list {
          list-style: disc;
          padding-left: 22px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pi-plain-item {
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--color-text-primary);
        }

        .pi-service-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pi-service-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pi-service-heading {
          font-family: var(--font-heading);
          font-size: var(--text-h3);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .pi-profile-row {
            grid-template-columns: 1fr;
          }

          .pi-photo-col {
            max-width: 240px;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

