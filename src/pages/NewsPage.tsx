import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { newsItems } from '../data/news';
import { NewsListItem } from '../components/news/NewsListItem';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'PAPER', 'AWARD', 'GRANT', 'PEOPLE', 'TALK', 'NEWS'];
  const years = ['ALL', '2026', '2025', '2024'];

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

      // Year filter
      if (selectedYear !== 'ALL' && !item.date.startsWith(selectedYear)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  return (
    <div className="news-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
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
          <span className="eyebrow">LABORATORY LOGBOOK</span>
          <h1 className="h1-title" style={{ marginTop: '4px' }}>
            News & Research Activity
          </h1>
          <p
            className="body-large"
            style={{
              maxWidth: '800px',
              marginTop: 'var(--space-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            A chronological research activity log documenting grant milestones, paper acceptances, student distinctions, and group developments.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 10,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
            paddingTop: 'var(--space-sm)',
            paddingBottom: 'var(--space-sm)',
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-accent-subtle)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year & Search Inputs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter news by year"
              style={{
                height: '32px',
                padding: '0 8px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                outline: 'none',
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'ALL' ? 'All Years' : y}
                </option>
              ))}
            </select>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '32px',
                padding: '0 8px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <Search size={13} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                aria-label="Search news"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-sans)',
                  width: '130px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Activity List */}
      <section style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0 var(--space-lg)',
            }}
          >
            {filteredNews.length === 0 ? (
              <div style={{ padding: 'var(--space-2xl) 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No news entries found matching your filter criteria.
              </div>
            ) : (
              filteredNews.map((item) => <NewsListItem key={item.id} item={item} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
