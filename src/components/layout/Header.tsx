import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { GithubIcon } from '../common/GithubIcon';
import { assetUrl } from '../../utils/asset';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
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
    { id: 'pi', label: 'P.I' },
    { id: 'members', label: 'Members' },
    { id: 'publications', label: 'Publications' },
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
          className="header-brand-wrap"
          title="IRS Lab — DGIST"
        >
          <img
            src={assetUrl('/images/logopic/lab_text_light.png')}
            alt="IRS Lab"
            className="header-lab-logo logo-light-only"
          />
          <img
            src={assetUrl('/images/logopic/lab_text_dark.png')}
            alt="IRS Lab"
            className="header-lab-logo logo-dark-only"
          />
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'members' && currentPage === 'people');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`desktop-nav-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-label-text">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utilities: GitHub & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>

          {/* GitHub Organization Link */}
          <a
            href="https://github.com/DGIST-IRSLab"
            target="_blank"
            rel="noreferrer"
            className="header-github-btn"
            title="DGIST IRS Lab on GitHub (DGIST-IRSLab)"
            aria-label="DGIST IRS Lab on GitHub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              color: 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast), transform var(--transition-fast)',
              borderRadius: 'var(--radius-xs)',
              textDecoration: 'none',
            }}
          >
            <GithubIcon size={18} />
          </a>

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
            const isActive = currentPage === item.id || (item.id === 'members' && currentPage === 'people');
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
                  background: 'transparent',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-text-primary)' : 'rgba(128, 128, 128, 0.85)',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        .header-brand-wrap {
          cursor: pointer;
          display: flex;
          align-items: center;
          user-select: none;
          transition: opacity var(--transition-fast), transform var(--transition-fast);
        }
        .header-brand-wrap:hover {
          opacity: 0.88;
          transform: translateY(-0.5px);
        }
        .header-lab-logo {
          height: clamp(17.5px, 2.333vw, 21.14px);
          width: auto;
          max-width: 138.6px;
          object-fit: contain;
          display: block;
          transition: opacity var(--transition-fast), transform var(--transition-fast);
        }
        .header-lab-logo.logo-light-only {
          display: block;
        }
        .header-lab-logo.logo-dark-only {
          display: none;
        }
        [data-theme='dark'] .header-lab-logo.logo-light-only {
          display: none;
        }
        [data-theme='dark'] .header-lab-logo.logo-dark-only {
          display: block;
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 6px;
        }

        .desktop-nav-link {
          position: relative;
          background: transparent;
          border: none;
          padding: 0.5rem 0.85rem;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.58);
          cursor: pointer;
          transition: color 0.2s ease;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        [data-theme='dark'] .desktop-nav-link {
          color: rgba(255, 255, 255, 0.58);
        }

        .desktop-nav-link .nav-label-text {
          position: relative;
          z-index: 1;
          transition: color 0.2s ease;
        }

        .desktop-nav-link:hover,
        .desktop-nav-link:focus-visible {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;
        }

        [data-theme='dark'] .desktop-nav-link:hover,
        [data-theme='dark'] .desktop-nav-link:focus-visible {
          color: rgba(255, 255, 255, 0.85);
          background-color: transparent;
        }

        .desktop-nav-link.is-active {
          color: rgba(0, 0, 0, 0.88);
          font-weight: 600;
          background-color: transparent;
        }

        [data-theme='dark'] .desktop-nav-link.is-active {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          background-color: transparent;
        }

        .desktop-nav-link.is-active:hover {
          color: rgba(0, 0, 0, 0.92);
          background-color: transparent;
        }

        [data-theme='dark'] .desktop-nav-link.is-active:hover {
          color: rgba(255, 255, 255, 0.95);
          background-color: transparent;
        }

        /* Underline grows from center outward via scaleX, matching original site */
        .desktop-nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0.7rem;
          right: 0.7rem;
          height: 2px;
          background-color: var(--color-accent-blue);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
          pointer-events: none;
        }

        .desktop-nav-link:hover::after,
        .desktop-nav-link:focus-visible::after {
          transform: scaleX(1);
        }


        .header-github-btn:hover {
          color: var(--color-text-primary) !important;
          transform: translateY(-1.5px) scale(1.08);
        }

        @media (max-width: 640px) {
          .header-lab-logo {
            height: 25.5px;
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
