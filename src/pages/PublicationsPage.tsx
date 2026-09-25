import React, { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { publications } from '../data/publications';
import { PublicationItem } from '../components/publications/PublicationItem';
import type { Publication } from '../types';

interface PublicationsPageProps {
  onOpenBibtex: (pub: Publication) => void;
}

type FilterTab = 'international' | 'domestic' | 'all';

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onOpenBibtex }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('international');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const intlCount = useMemo(() => publications.filter((p) => !p.isDomestic).length, []);
  const domCount = useMemo(() => publications.filter((p) => p.isDomestic).length, []);

  // Filtered publications
  const filteredPubs = useMemo(() => {
    return publications.filter((pub) => {
      // Tab filter
      if (activeTab === 'international' && pub.isDomestic) return false;
      if (activeTab === 'domestic' && !pub.isDomestic) return false;

      // Year filter
      if (selectedYear !== 'all' && pub.year.toString() !== selectedYear) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = pub.title.toLowerCase().includes(q);
        const matchesAuthor = pub.authors.some((a) => a.toLowerCase().includes(q));
        const matchesVenue = pub.venue.toLowerCase().includes(q);
        const matchesYear = pub.year.toString().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesVenue && !matchesYear) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, searchQuery, selectedYear]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups: { [year: number]: Publication[] } = {};
    filteredPubs.forEach((pub) => {
      if (!groups[pub.year]) {
        groups[pub.year] = [];
      }
      groups[pub.year].push(pub);
    });

    // Sort descending by year
    return Object.keys(groups)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        items: groups[year],
      }));
  }, [filteredPubs]);

  // Available years for dropdown
  const allYears = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <div className="publications-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
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
          <h1 className="h1-title">
            Publications
          </h1>
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
          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            {[
              { id: 'international', label: `International (${intlCount})` },
              { id: 'domestic', label: `Domestic (${domCount})` },
              { id: 'all', label: `All (${publications.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterTab)}
                style={{
                  padding: '4px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                  fontSize: '14px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Year Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter by publication year"
              style={{
                height: '34px',
                padding: '0 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12.5px',
                outline: 'none',
              }}
            >
              <option value="all">All Years</option>
              {allYears.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>

            {/* Keyword Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter title or author..."
                aria-label="Filter publications by title or author"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  width: '150px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Publications Listing Grouped by Year */}
      <section style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {groupedByYear.length === 0 ? (
            <div
              style={{
                padding: 'var(--space-3xl) 0',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              <BookOpen size={28} style={{ opacity: 0.5, marginBottom: '8px' }} />
              <p className="body-text">No publications found matching the active criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                  setSelectedYear('all');
                  setSearchQuery('');
                }}
                className="link-subtle"
                style={{
                  marginTop: 'var(--space-xs)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            groupedByYear.map(({ year, items }) => (
              <div
                key={year}
                style={{
                  marginBottom: 'var(--space-2xl)',
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr',
                  gap: 'var(--space-xl)',
                  alignItems: 'start',
                }}
                className="year-group-row"
              >
                {/* Year Marker */}
                <div
                  style={{
                    position: 'sticky',
                    top: 'calc(var(--header-height) + 60px)',
                    paddingTop: 'var(--space-md)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      display: 'block',
                    }}
                  >
                    {year}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-text-dim)',
                    }}
                  >
                    {items.length} {items.length === 1 ? 'paper' : 'papers'}
                  </span>
                </div>

                {/* List of Publication Items */}
                <div>
                  {items.map((pub) => (
                    <PublicationItem
                      key={pub.id}
                      publication={pub}
                      onOpenBibtex={onOpenBibtex}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .year-group-row {
              grid-template-columns: 1fr !important;
              gap: var(--space-xs) !important;
            }
            .year-group-row > div:first-of-type {
              position: static !important;
              border-bottom: 2px solid var(--color-accent);
              padding-bottom: 4px;
            }
          }
        `}</style>
      </section>
    </div>
  );
};
