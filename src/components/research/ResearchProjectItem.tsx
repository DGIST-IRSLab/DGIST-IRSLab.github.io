import React from 'react';
import type { ResearchProject } from '../../types';

interface ResearchProjectItemProps {
  project: ResearchProject;
}

export const ResearchProjectItem: React.FC<ResearchProjectItemProps> = ({ project }) => {
  return (
    <div
      className="research-project-row"
      id={project.id}
      style={{
        paddingTop: 'var(--space-md)',
        paddingBottom: 'var(--space-md)',
        borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
        }}
      >
        {project.agencyBadge && (
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            {project.agencyBadge}
          </span>
        )}
        {project.agencyBadge && <span style={{ color: 'var(--color-text-muted)' }}>·</span>}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
          }}
        >
          {project.period}
        </span>
        <span style={{ color: 'var(--color-text-muted)' }}>·</span>
        <span
          style={{
            fontSize: '13px',
            color: project.status === 'ongoing' ? 'var(--color-accent)' : 'var(--color-text-dim)',
          }}
        >
          {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </span>
      </div>

      <h4
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.45,
          marginTop: '2px',
        }}
      >
        {project.title}
      </h4>

      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        Funding Agency: <span style={{ fontWeight: 500 }}>{project.agency}</span>
      </div>

      {project.description && (
        <p style={{ fontSize: '12.5px', color: 'var(--color-text-dim)', marginTop: '2px', lineHeight: 1.45 }}>
          {project.description}
        </p>
      )}
    </div>
  );
};
