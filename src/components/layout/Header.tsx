import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Radio } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { labInfo } from '../../data/labInfo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'people', label: 'People' },
    { id: 'news', label: 'News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'join', label: 'Join Us' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        height: 'var(--header-height)',
        backgroundColor: scrolled ? 'var(--color-surface)' : 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(8px)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Identity & Affiliation */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--color-accent-border)',
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
            }}
          >
            <Radio size={15} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '16.5px',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
              }}
            >
              IRS Lab
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              @ {labInfo.affiliation}
            </span>
          </div>
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-md)',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  padding: '8px 6px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '6px',
                      right: '6px',
                      height: '2px',
                      backgroundColor: 'var(--color-accent)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utilities: Search & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="search-shortcut-btn"
            aria-label="Search site (⌘K)"
            title="Search site (⌘K)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '34px',
              padding: '0 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontFamily: 'var(--font-sans)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Search size={14} />
            <span className="search-key-badge" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              ⌘K
            </span>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              padding: 0,
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-md) var(--space-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
