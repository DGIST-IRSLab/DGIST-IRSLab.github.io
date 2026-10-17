import React from 'react';
import type { NewsItem } from '../../types';

interface NewsListItemProps {
  item: NewsItem;
}

export const NewsListItem: React.FC<NewsListItemProps> = ({ item }) => {
  return (
    <div
      className="news-activity-row"
      id={item.id}
      style={{
        display: 'grid',
        gridTemplateColumns: '95px 1fr',
        alignItems: 'baseline',
        gap: 'var(--space-md)',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-border-subtle)',
        fontSize: '14.5px',
        lineHeight: 1.5,
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-fast)',
      }}
    >
      {/* Date */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14.5px',
          color: 'var(--color-text-primary)',
          fontWeight: 400,
        }}
      >
        {item.date}
      </span>

      {/* Title & Description */}
      <div>
        <div
          style={{
            fontSize: '14.5px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.5,
          }}
        >
          {item.title}
        </div>
        {item.description && (
          <p
            style={{
              fontSize: '14.5px',
              color: 'var(--color-text-primary)',
              marginTop: '3px',
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      <style>{`
        .news-activity-row {
          padding: 1.1rem 1rem !important;
          margin: 0 -1rem;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border) !important;
          border-radius: 8px;
          position: relative;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease !important;
        }
        .news-activity-row:last-child {
          border-bottom: none !important;
        }
        .news-activity-row:hover {
          box-shadow: var(--card-hover-shadow);
          transform: translateY(-3px);
          border-bottom-color: transparent !important;
          z-index: 1;
        }
        .news-activity-row:has(+ .news-activity-row:hover) {
          border-bottom-color: transparent !important;
        }
        @media (max-width: 640px) {
          .news-activity-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </div>
  );
};
