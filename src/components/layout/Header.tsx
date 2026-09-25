import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Radio } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

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
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'people', label: 'People' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="header-lab-fullname"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)',
              }}
            >
              Intelligent Radio Sensing Lab, DGIST
            </span>
            <span
              className="header-lab-shortname"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)',
                display: 'none',
              }}
            >
              Intelligent Radio Sensing Lab
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
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
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              transition: 'color var(--transition-fast)',
              padding: 0,
            }}
          >
            <Search size={16} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
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
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
        @media (max-width: 1080px) {
          .header-lab-fullname {
            display: none !important;
          }
          .header-lab-shortname {
            display: inline !important;
          }
        }
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
