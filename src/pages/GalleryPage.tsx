import React, { useState, useEffect } from 'react';
import { ArrowLeft, Images, ZoomIn } from 'lucide-react';
import { galleryFolders } from '../data/gallery';
import { ImageLightbox } from '../components/gallery/ImageLightbox';
import type { GalleryFolder } from '../types';
import { assetUrl } from '../utils/asset';

function setGalleryHash(hash: string) {
  if (typeof window !== 'undefined') {
    window.location.hash = hash;
  }
}

export const GalleryPage: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryFolder | null>(() => {
    const fullHash = window.location.hash.replace('#', '');
    const searchParams = new URLSearchParams(fullHash.includes('?') ? fullHash.split('?')[1] : '');
    const albumId = searchParams.get('album');
    if (albumId) {
      return galleryFolders.find((f) => f.id === albumId) || null;
    }
    return null;
  });

  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  // Sync state with URL hash
  useEffect(() => {
    const syncFromHash = () => {
      const fullHash = window.location.hash.replace('#', '');
      const searchParams = new URLSearchParams(fullHash.includes('?') ? fullHash.split('?')[1] : '');
      const albumId = searchParams.get('album');
      if (albumId) {
        const found = galleryFolders.find((f) => f.id === albumId);
        if (found) {
          setSelectedAlbum(found);
          return;
        }
      }
      setSelectedAlbum(null);
      setLightboxPhotoIndex(null);
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleOpenAlbum = (album: GalleryFolder) => {
    setSelectedAlbum(album);
    setLightboxPhotoIndex(null);
    setGalleryHash(`gallery?album=${album.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setLightboxPhotoIndex(null);
    setGalleryHash('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxPhotoIndex(null);
  };

  const handlePrev = () => {
    if (!selectedAlbum || lightboxPhotoIndex === null) return;
    setLightboxPhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : selectedAlbum.images.length - 1
    );
  };

  const handleNext = () => {
    if (!selectedAlbum || lightboxPhotoIndex === null) return;
    setLightboxPhotoIndex((prev) =>
      prev !== null && prev < selectedAlbum.images.length - 1 ? prev + 1 : 0
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

      {/* Main Content: Album Detail View OR Albums Grid */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          {selectedAlbum ? (
            /* Album Detail View: Photos Grid */
            <div className="album-detail-view">
              <div className="album-detail-header">
                <button
                  type="button"
                  onClick={handleBackToAlbums}
                  className="album-back-btn"
                  aria-label="Back to all albums"
                >
                  <ArrowLeft size={16} />
                  <span>All Albums</span>
                </button>

                <div className="album-detail-meta">
                  <span className="album-detail-date">{selectedAlbum.date}</span>
                  <span className="album-detail-count">
                    {selectedAlbum.images.length} {selectedAlbum.images.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {selectedAlbum.title}
                </h2>
              </div>

              {/* Photos Grid */}
              {selectedAlbum.images.length === 0 ? (
                <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-xl) 0' }}>
                  No photos found in this album.
                </div>
              ) : (
                <div className="album-photo-grid">
                  {selectedAlbum.images.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      className="album-photo-card"
                      onClick={() => handleOpenLightbox(idx)}
                      aria-label={`View photo ${idx + 1} of ${selectedAlbum.title}`}
                    >
                      <img
                        src={assetUrl(img.src)}
                        alt={`${selectedAlbum.title} - photo ${idx + 1}`}
                        loading="lazy"
                        className="album-photo-img"
                      />
                      <div className="album-photo-hover-overlay">
                        <ZoomIn size={22} />
                      </div>
                      <span className="album-photo-index-tag">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* All Albums Grid */
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
          )}
        </div>
      </section>

      {/* Lightbox / Slideshow Modal */}
      {selectedAlbum && lightboxPhotoIndex !== null && (
        <ImageLightbox
          isOpen={lightboxPhotoIndex !== null}
          albumTitle={selectedAlbum.title}
          albumDate={selectedAlbum.date}
          images={selectedAlbum.images}
          currentIndex={lightboxPhotoIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={(index) => setLightboxPhotoIndex(index)}
        />
      )}
    </div>
  );
};
