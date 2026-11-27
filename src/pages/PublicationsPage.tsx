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

  // Canonical reverse-chronological numbering within the active tab
  const pubNumberMap = useMemo(() => {
    const tabPubs = publications.filter((pub) => {
      if (activeTab === 'international' && pub.isDomestic) return false;
      if (activeTab === 'domestic' && !pub.isDomestic) return false;
      return true;
    });
    const total = tabPubs.length;
    const map = new Map<string, number>();
    tabPubs.forEach((pub, idx) => {
      map.set(pub.id, total - idx);
    });
    return map;
  }, [activeTab]);

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
      {/* Header */}
      <section
        style={{
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-sm)',
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
          backgroundColor: 'var(--color-bg)',
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 10,
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              paddingTop: 'var(--space-sm)',
              paddingBottom: 'var(--space-sm)',
              borderBottom: '1px solid var(--color-border)',
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
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-primary)',
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
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
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
              <Search size={14} style={{ color: 'var(--color-text-primary)' }} />
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
                  fontSize: 'var(--text-body)',
                  fontFamily: 'var(--font-sans)',
                  width: '160px',
                }}
              />
            </div>
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
                color: 'var(--color-text-primary)',
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
              <div key={year} className="pub-year-section">
                {/* Full-width Top Year Header in Black */}
                <div className="pub-year-header">
                  <h2 className="pub-year-heading">{year}</h2>
                </div>

                {/* List of Publication Items */}
                <div className="pub-year-list">
                  {items.map((pub) => (
                    <PublicationItem
                      key={pub.id}
                      publication={pub}
                      number={pubNumberMap.get(pub.id)}
                      onOpenBibtex={onOpenBibtex}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <style>{`
          .pub-year-section {
            margin-bottom: var(--space-2xl);
          }

          .pub-year-section:last-child {
            margin-bottom: 0;
          }

          .pub-year-header {
            padding-bottom: 10px;
            margin-bottom: var(--space-xs);
            border-bottom: 1.5px solid var(--color-border-strong);
          }

          .pub-year-heading {
            margin: 0;
            font-family: var(--font-heading);
            font-size: var(--text-h1);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.25;
            color: var(--color-text-primary);
          }
        `}</style>
      </section>
    </div>
  );
};
