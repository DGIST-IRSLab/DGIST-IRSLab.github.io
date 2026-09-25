import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from '../common/SearchModal';
import { BibtexModal } from '../common/BibtexModal';
import type { Publication } from '../../types';

interface AppShellProps {
  children: (props: {
    currentPage: string;
    onNavigate: (page: string, anchorId?: string) => void;
    onOpenBibtex: (pub: Publication) => void;
  }) => React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    return hash || 'home';
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [activeBibtexPub, setActiveBibtexPub] = useState<Publication | null>(null);

  // Sync with browser back/forward buttons & URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (hash && hash !== currentPage) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: string, anchorId?: string) => {
    setCurrentPage(page);
    window.location.hash = anchorId ? `${page}#${anchorId}` : page;
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children({
          currentPage,
          onNavigate: handleNavigate,
          onOpenBibtex: (pub) => setActiveBibtexPub(pub),
        })}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <BibtexModal
        publication={activeBibtexPub}
        onClose={() => setActiveBibtexPub(null)}
      />
    </div>
  );
};
