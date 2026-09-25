import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ImageLightboxProps {
  isOpen: boolean;
  albumTitle?: string;
  albumDate?: string;
  images: { src: string; caption?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  albumTitle,
  albumDate,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}) => {
  // Keyboard navigation & scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      className="gallery-modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={albumTitle || 'Image slideshow'}
    >
      {/* Top Header: Album Title, Date, Counter & Close */}
      <div className="gallery-modal-header" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-title-group">
          {albumTitle && <h3 className="gallery-modal-title">{albumTitle}</h3>}
          {albumDate && <span className="gallery-modal-date">{albumDate}</span>}
        </div>

        <div className="gallery-modal-actions">
          <span className="gallery-modal-counter">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close slideshow"
            className="gallery-modal-close-btn"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="gallery-modal-stage" onClick={handleBackdropClick}>
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photograph"
            className="gallery-nav-btn gallery-nav-prev"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="gallery-modal-image-wrap" onClick={(e) => e.stopPropagation()}>
          <img
            key={currentImg.src}
            src={currentImg.src}
            alt={albumTitle ? `${albumTitle} - ${currentIndex + 1}` : 'Lab photograph'}
            className="gallery-modal-image"
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photograph"
            className="gallery-nav-btn gallery-nav-next"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Bottom Filmstrip Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-modal-filmstrip" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`gallery-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
            >
              <img src={img.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
