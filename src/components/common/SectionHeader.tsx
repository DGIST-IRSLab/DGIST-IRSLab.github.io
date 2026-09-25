import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div
      className={`section-header-block ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        marginBottom: 'var(--space-xl)',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
        }}
      >
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="h2-title" style={{ marginTop: eyebrow ? '2px' : '0' }}>
            {title}
          </h2>
        </div>

        {actionText && onActionClick && (
          <button
            type="button"
            onClick={onActionClick}
            className="link-subtle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '14px',
            }}
          >
            <span>{actionText}</span>
            <ArrowRight size={15} className="icon-arrow" />
          </button>
        )}
      </div>

      {description && (
        <p
          className="body-text"
          style={{
            maxWidth: '720px',
            marginTop: 'var(--space-2xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
