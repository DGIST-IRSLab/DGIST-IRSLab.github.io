import React, { useState } from 'react';
import { Images } from 'lucide-react';
import { galleryFolders } from '../data/gallery';
import { ImageLightbox } from '../components/gallery/ImageLightbox';
import type { GalleryFolder } from '../types';
import { assetUrl } from '../utils/asset';

export const GalleryPage: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryFolder | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleOpenAlbum = (album: GalleryFolder) => {
    setSelectedAlbum(album);
    setCurrentImgIndex(0);
  };

  const handleCloseLightbox = () => {
    setSelectedAlbum(null);
  };

  const handlePrev = () => {
    if (!selectedAlbum) return;
    setCurrentImgIndex((prev) =>
      prev > 0 ? prev - 1 : selectedAlbum.images.length - 1
    );
  };

  const handleNext = () => {
    if (!selectedAlbum) return;
    setCurrentImgIndex((prev) =>
      prev < selectedAlbum.images.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="gallery-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
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
          <h1 className="h1-title">Gallery</h1>
          <p
            style={{
              marginTop: '8px',
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
            }}
          >
            Moments, academic conferences, seminar sessions, and laboratory life at IRS Lab.
          </p>
        </div>
      </section>

      {/* Album Cards Grid */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="gallery-grid">
            {galleryFolders.map((album) => {
              const coverImage = album.images[0]?.src;
              return (
                <div
                  key={album.id}
                  className="gallery-card"
                  onClick={() => handleOpenAlbum(album)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenAlbum(album);
                    }
                  }}
                  aria-label={`Open album: ${album.title} (${album.date})`}
                >
                  {/* Card Cover Thumbnail */}
                  <div className="gallery-card-thumb-wrap">
                    {coverImage ? (
                      <img
                        src={assetUrl(coverImage)}
                        alt={album.title}
                        loading="lazy"
                        className="gallery-card-thumb"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <Images size={28} opacity={0.4} />
                      </div>
                    )}
                    <div className="gallery-card-count-badge">
                      <Images size={13} />
                      <span>{album.images.length}</span>
                    </div>
                  </div>

                  {/* Card Body: Date and Title */}
                  <div className="gallery-card-body">
                    <span className="gallery-card-date">{album.date}</span>
                    <h3 className="gallery-card-title">{album.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen React Portal Lightbox Modal */}
      {selectedAlbum && (
        <ImageLightbox
          isOpen={!!selectedAlbum}
          albumTitle={selectedAlbum.title}
          albumDate={selectedAlbum.date}
          images={selectedAlbum.images}
          currentIndex={currentImgIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={(index) => setCurrentImgIndex(index)}
        />
      )}
    </div>
  );
};
