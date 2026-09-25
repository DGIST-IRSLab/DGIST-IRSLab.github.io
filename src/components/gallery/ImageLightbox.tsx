import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: { src: string; caption?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2000 }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          style={{
            position: 'absolute',
            top: '-40px',
            right: '0',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <X size={24} />
        </button>

        {/* Image with container */}
        <div
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <img
            src={currentImg.src}
            alt={currentImg.caption || 'Lab photograph'}
            style={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Caption & Navigation Controls */}
        <div
          style={{
            width: '100%',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#f1f5f9',
          }}
        >
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photograph"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div style={{ textAlign: 'center', padding: '0 16px' }}>
            {currentImg.caption && (
              <p style={{ fontSize: '13.5px', color: '#e2e8f0', margin: 0 }}>
                {currentImg.caption}
              </p>
            )}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                color: '#94a3b8',
                marginTop: '4px',
                display: 'inline-block',
              }}
            >
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next photograph"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
