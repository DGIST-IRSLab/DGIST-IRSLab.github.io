import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { PeoplePage } from './pages/PeoplePage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { JoinUsPage } from './pages/JoinUsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppShell>
        {({ currentPage, onNavigate, onOpenBibtex }) => {
          switch (currentPage) {
            case 'research':
              return <ResearchPage onNavigate={onNavigate} />;
            case 'publications':
              return <PublicationsPage onOpenBibtex={onOpenBibtex} />;
            case 'people':
              return <PeoplePage onNavigate={onNavigate} />;
            case 'news':
              return <NewsPage />;
            case 'gallery':
              return <GalleryPage />;
            case 'join':
              return <JoinUsPage />;
            case 'home':
            default:
              return <HomePage onNavigate={onNavigate} onOpenBibtex={onOpenBibtex} />;
          }
        }}
      </AppShell>
    </ThemeProvider>
  );
};

export default App;
