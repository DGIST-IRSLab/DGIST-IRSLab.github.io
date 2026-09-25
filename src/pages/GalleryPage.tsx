import React, { useState } from 'react';
import { galleryFolders } from '../data/gallery';
import { ImageLightbox } from '../components/gallery/ImageLightbox';

export const GalleryPage: React.FC = () => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeAlbumImages, setActiveAlbumImages] = useState<{ src: string; caption?: string }[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleOpenLightbox = (images: { src: string; caption?: string }[], index: number) => {
    setActiveAlbumImages(images);
    setCurrentImgIndex(index);
    setLightboxOpen(true);
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
          <span className="eyebrow">LAB COMMUNITY & LIFE</span>
          <h1 className="h1-title" style={{ marginTop: '4px' }}>
            Laboratory Gallery
          </h1>
          <p
            className="body-large"
            style={{
              maxWidth: '800px',
              marginTop: 'var(--space-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            Moments from academic conferences, experimental testbed calibrations, reading seminars, and group fellowship.
          </p>
        </div>
      </section>

      {/* Albums Section */}
      <section style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
          {galleryFolders.map((album) => (
            <div key={album.id} id={album.id}>
              {/* Album Sub-header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: 'var(--space-xs)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <h3 className="h3-title" style={{ fontSize: '18px' }}>
                  {album.title}
                </h3>
                <span className="metadata-text">{album.date}</span>
              </div>

              {/* Album Image Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 'var(--space-md)',
                }}
              >
                {album.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenLightbox(album.images, idx)}
                    className="research-figure-frame"
                    style={{
                      cursor: 'pointer',
                      aspectRatio: '4 / 3',
                      backgroundColor: 'var(--color-bg-secondary)',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.caption || album.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {img.caption && (
                      <div
                        className="figure-caption"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(11, 15, 20, 0.75)',
                          color: '#ffffff',
                          backdropFilter: 'blur(3px)',
                          fontSize: '11.5px',
                          padding: '4px 8px',
                          borderTop: 'none',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={activeAlbumImages}
        currentIndex={currentImgIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : activeAlbumImages.length - 1))
        }
        onNext={() =>
          setCurrentImgIndex((prev) => (prev < activeAlbumImages.length - 1 ? prev + 1 : 0))
        }
      />
    </div>
  );
};
