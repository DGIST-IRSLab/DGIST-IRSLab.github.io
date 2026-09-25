import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, User, Radio, Newspaper, ArrowRight } from 'lucide-react';
import { publications } from '../../data/publications';
import { researchTopics, researchProjects } from '../../data/research';
import { professor, postdocs, graduateStudents, undergraduateResearchers, alumni } from '../../data/people';
import { newsItems } from '../../data/news';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, anchorId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchingPubs = cleanQuery
    ? publications.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.authors.some((a) => a.toLowerCase().includes(cleanQuery)) ||
          p.venue.toLowerCase().includes(cleanQuery) ||
          p.year.toString().includes(cleanQuery)
      ).slice(0, 5)
    : [];

  const allPeople = [
    professor,
    ...postdocs,
    ...graduateStudents,
    ...undergraduateResearchers,
    ...alumni,
  ];

  const matchingPeople = cleanQuery
    ? allPeople.filter(
        (person) =>
          person.name.toLowerCase().includes(cleanQuery) ||
          (person.nameKr && person.nameKr.includes(cleanQuery)) ||
          person.role.toLowerCase().includes(cleanQuery) ||
          person.researchInterests?.some((i) => i.toLowerCase().includes(cleanQuery))
      ).slice(0, 4)
    : [];

  const matchingTopics = cleanQuery
    ? researchTopics.filter(
        (t) =>
          t.title.toLowerCase().includes(cleanQuery) ||
          t.summary.toLowerCase().includes(cleanQuery) ||
          t.keywords.some((k) => k.toLowerCase().includes(cleanQuery))
      ).slice(0, 3)
    : [];

  const matchingProjects = cleanQuery
    ? researchProjects.filter(
        (pr) =>
          pr.title.toLowerCase().includes(cleanQuery) ||
          pr.agency.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchingNews = cleanQuery
    ? newsItems.filter(
        (n) =>
          n.title.toLowerCase().includes(cleanQuery) ||
          (n.description && n.description.toLowerCase().includes(cleanQuery))
      ).slice(0, 4)
    : [];

  const totalResults =
    matchingPubs.length +
    matchingPeople.length +
    matchingTopics.length +
    matchingProjects.length +
    matchingNews.length;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search IRS Lab"
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '80vh',
          borderRadius: 'var(--radius-md)',
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            padding: 'var(--space-md) var(--space-lg)',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, people, research topics, grants, news..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              padding: '2px 6px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
          }}
        >
          {cleanQuery && totalResults === 0 && (
            <div
              style={{
                padding: 'var(--space-xl) 0',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              <p className="body-text">No results found for &ldquo;{query}&rdquo;.</p>
              <p className="metadata-text" style={{ marginTop: 'var(--space-xs)' }}>
                Try searching for &quot;radar&quot;, &quot;CVPR&quot;, &quot;Choi&quot;, &quot;diffusion&quot;, or &quot;IITP&quot;.
              </p>
            </div>
          )}

          {!cleanQuery && (
            <div style={{ color: 'var(--color-text-secondary)', padding: 'var(--space-sm) 0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
                Quick Shortcuts
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: 'var(--space-xs)',
                  marginTop: 'var(--space-xs)',
                }}
              >
                {[
                  { label: 'Research Topics', page: 'research' },
                  { label: 'Publications', page: 'publications' },
                  { label: 'Lab Members', page: 'people' },
                  { label: 'Join IRS Lab', page: 'join' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      onNavigate(item.page);
                      onClose();
                    }}
                    className="btn-academic"
                    style={{ justifyContent: 'space-between', fontSize: '13px' }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Research Topics Results */}
          {matchingTopics.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                <Radio size={14} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Research Themes</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                {matchingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onNavigate('research', topic.id);
                      onClose();
                    }}
                    style={{
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                      {topic.title}
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {topic.summary}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications Results */}
          {matchingPubs.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                <FileText size={14} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Publications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                {matchingPubs.map((pub) => (
                  <div
                    key={pub.id}
                    onClick={() => {
                      onNavigate('publications', pub.id);
                      onClose();
                    }}
                    style={{
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                      {pub.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        marginTop: '3px',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <span>{pub.venueShort}</span>
                      <span>•</span>
                      <span>{pub.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* People Results */}
          {matchingPeople.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                <User size={14} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>People</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                {matchingPeople.map((person) => (
                  <div
                    key={person.id}
                    onClick={() => {
                      onNavigate('people', person.id);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                        {person.name} {person.nameKr ? `(${person.nameKr})` : ''}
                      </span>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {person.title}
                      </div>
                    </div>
                    {person.email && (
                      <span className="metadata-text" style={{ fontSize: '12px' }}>
                        {person.email}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Results */}
          {matchingNews.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                <Newspaper size={14} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>News</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                {matchingNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigate('home', item.id);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'var(--space-sm)',
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <span className="badge" style={{ flexShrink: 0 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
