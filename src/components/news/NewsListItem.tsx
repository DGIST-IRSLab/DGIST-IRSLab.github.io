import React from 'react';
import type { NewsItem } from '../../types';

interface NewsListItemProps {
  item: NewsItem;
}

export const NewsListItem: React.FC<NewsListItemProps> = ({ item }) => {
  // Category styling color mappings
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'AWARD':
        return 'badge-award';
      case 'PAPER':
        return 'badge-paper';
      case 'GRANT':
        return 'badge-grant';
      case 'PEOPLE':
        return 'badge-people';
      case 'TALK':
        return 'badge-talk';
      default:
        return 'badge-outline';
    }
  };

  return (
    <div
      className="news-activity-row"
      id={item.id}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 85px 1fr',
        alignItems: 'baseline',
        gap: 'var(--space-md)',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--color-border-subtle)',
        fontSize: '13.5px',
        lineHeight: 1.5,
        transition: 'background-color var(--transition-fast)',
      }}
    >
      {/* Date */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12.5px',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
        }}
      >
        {item.date}
      </span>

      {/* Category Pill */}
      <div>
        <span
          className={`badge ${getCategoryClass(item.category)}`}
          style={{ fontSize: '10.5px', padding: '1px 6px' }}
        >
          {item.category}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <span
          style={{
            fontWeight: item.highlight ? 600 : 400,
            color: 'var(--color-text-primary)',
          }}
        >
          {item.title}
        </span>
        {item.description && (
          <p
            style={{
              fontSize: '12.5px',
              color: 'var(--color-text-dim)',
              marginTop: '2px',
              lineHeight: 1.45,
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .news-activity-row {
            grid-template-columns: 75px 1fr !important;
            gap: var(--space-xs) !important;
          }
          .news-activity-row > div:first-of-type {
            grid-column: 2;
          }
          .news-activity-row > div:last-of-type {
            grid-column: 1 / -1;
            margin-top: 2px;
          }
        }
      `}</style>
    </div>
  );
};
