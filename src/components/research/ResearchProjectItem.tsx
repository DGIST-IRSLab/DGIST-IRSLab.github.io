import React from 'react';
import type { ResearchProject } from '../../types';

interface ResearchProjectItemProps {
  project: ResearchProject;
}

export const ResearchProjectItem: React.FC<ResearchProjectItemProps> = ({ project }) => {
  return (
    <article className="project-editorial-row" id={project.id}>
      {/* Left Column: Period & Funding Agency */}
      <div className="project-meta-col">
        <span className="project-period">{project.period}</span>
        <div className="project-agency-info">
          {project.agencyBadge && (
            <span className="project-agency-badge">{project.agencyBadge}</span>
          )}
          <span className="project-agency-name">{project.agency}</span>
        </div>
      </div>

      {/* Right Column: Project Title, Description & Status */}
      <div className="project-content-col">
        <div className="project-title-row">
          <h4 className="project-title">{project.title}</h4>
          <span className={`project-status-tag ${project.status}`}>
            <span className="status-dot" aria-hidden="true" />
            {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </span>
        </div>

        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
      </div>

      <style>{`
        .project-editorial-row {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 36px;
          padding: 24px 0;
          border-bottom: 1px solid var(--color-border-subtle);
          align-items: start;
          transition: background-color var(--transition-fast);
        }

        .project-editorial-row:last-child {
          border-bottom: none;
        }

        /* Left Meta Column */
        .project-meta-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-period {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        .project-agency-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .project-agency-badge {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: 0.02em;
        }

        .project-agency-name {
          font-size: 12.5px;
          line-height: 1.4;
          color: var(--color-text-secondary);
        }

        /* Right Content Column */
        .project-content-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .project-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .project-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.45;
          letter-spacing: -0.015em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .project-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .project-status-tag.ongoing {
          color: var(--color-accent);
        }

        .project-status-tag.completed {
          color: var(--color-text-muted);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
        }

        .project-description {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin: 0;
        }

        @media (max-width: 820px) {
          .project-editorial-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 20px 0;
          }

          .project-title-row {
            flex-direction: column;
            gap: 6px;
          }

          .project-meta-col {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
          }

          .project-agency-info {
            flex-direction: row;
            align-items: center;
            gap: 6px;
          }
        }
      `}</style>
    </article>
  );
};
