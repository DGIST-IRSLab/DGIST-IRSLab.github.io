import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { assetUrl } from '../../utils/asset';

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
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & scroll locking (preserving layout & scroll position)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

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
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Keep active thumbnail visible in filmstrip
  useEffect(() => {
    if (!isOpen || !filmstripRef.current) return;
    const activeThumb = filmstripRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [isOpen, currentIndex]);

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    if (images[nextIdx]?.src) {
      const img1 = new Image();
      img1.src = assetUrl(images[nextIdx].src);
    }
    if (images[prevIdx]?.src) {
      const img2 = new Image();
      img2.src = assetUrl(images[prevIdx].src);
    }
  }, [isOpen, currentIndex, images]);

  // Handle backdrop click on the main stage
  const handleStageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen || images.length === 0) return null;
  if (typeof document === 'undefined') return null;

  const currentImg = images[currentIndex] || images[0];

  const modalContent = (
    <div
      className="lightbox-portal-root"
      role="dialog"
      aria-modal="true"
      aria-label={albumTitle ? `${albumTitle} viewer` : 'Image lightbox viewer'}
    >
      {/* Fixed Top Header Bar */}
      <header className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-title-group">
          {albumTitle && <h3 className="lightbox-title">{albumTitle}</h3>}
          {albumDate && <span className="lightbox-date">{albumDate}</span>}
        </div>

        <div className="lightbox-actions">
          <span className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="lightbox-close-btn"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Viewport-Fixed Left/Right Navigation Buttons */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photograph"
          className="lightbox-nav-btn lightbox-nav-prev"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photograph"
          className="lightbox-nav-btn lightbox-nav-next"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Main Centered Image Stage */}
      <div className="lightbox-stage" onClick={handleStageClick}>
        <div className="lightbox-image-wrap" onClick={(e) => e.stopPropagation()}>
          <img
            key={currentImg.src}
            src={assetUrl(currentImg.src)}
            alt={albumTitle ? `${albumTitle} - ${currentIndex + 1}` : 'Lab photograph'}
            className="lightbox-image"
          />
        </div>
      </div>

      {/* Fixed Bottom Filmstrip */}
      {images.length > 1 && (
        <footer className="lightbox-filmstrip-bar" onClick={(e) => e.stopPropagation()}>
          <div ref={filmstripRef} className="lightbox-filmstrip">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`lightbox-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
              >
                <img src={assetUrl(img.src)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </footer>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
};
