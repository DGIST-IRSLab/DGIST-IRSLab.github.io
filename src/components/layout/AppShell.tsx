import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
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
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div key={currentPage} className="page-transition-wrap">
          {children({
            currentPage,
            onNavigate: handleNavigate,
            onOpenBibtex: (pub) => setActiveBibtexPub(pub),
          })}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Modals */}
      <BibtexModal
        publication={activeBibtexPub}
        onClose={() => setActiveBibtexPub(null)}
      />
    </div>
  );
};
