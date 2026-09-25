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
            src={assetUrl('/images/logopic/lab_logo_light.png')}
            alt="IRS Lab"
            className="header-lab-logo logo-light-only"
          />
          <img
            src={assetUrl('/images/logopic/lab_logo_dark.png')}
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
          height: 42px;
          width: auto;
          max-width: 170px;
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
          padding: 8px 14px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .desktop-nav-link .nav-label-text {
          position: relative;
          z-index: 1;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .desktop-nav-link:hover {
          color: var(--color-text-primary);
          background-color: var(--color-surface-hover);
          transform: translateY(-1.5px);
        }

        .desktop-nav-link:active {
          transform: translateY(0) scale(0.97);
        }

        .desktop-nav-link.is-active {
          color: var(--color-accent);
          font-weight: 600;
          background-color: var(--color-accent-subtle);
        }

        .desktop-nav-link.is-active:hover {
          color: var(--color-accent);
          background-color: var(--color-accent-subtle);
          transform: translateY(-1px);
        }

        /* Animated underline indicator */
        .desktop-nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background-color: var(--color-accent);
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
          opacity: 0;
          pointer-events: none;
        }

        .desktop-nav-link:hover::after {
          transform: scaleX(0.7);
          opacity: 0.65;
        }

        .desktop-nav-link.is-active::after {
          transform: scaleX(1);
          opacity: 1;
          box-shadow: 0 1px 4px rgba(2, 132, 199, 0.4);
        }


        .header-github-btn:hover {
          color: var(--color-text-primary) !important;
          transform: translateY(-1.5px) scale(1.08);
        }

        @media (max-width: 640px) {
          .header-lab-logo {
            height: 35px;
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
