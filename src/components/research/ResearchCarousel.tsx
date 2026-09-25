import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assetUrl } from '../../utils/asset';

const slides = [
  { id: 'homepic-1', image: '/images/homepic/dgist_1.jpg', alt: 'IRS Lab & DGIST 1' },
  { id: 'homepic-2', image: '/images/homepic/dgist_2.jpg', alt: 'IRS Lab & DGIST 2' },
  { id: 'homepic-3', image: '/images/homepic/dgist_3.jpg', alt: 'IRS Lab & DGIST 3' },
  { id: 'homepic-4', image: '/images/homepic/dgist_4.jpg', alt: 'IRS Lab & DGIST 4' },
  { id: 'homepic-5', image: '/images/homepic/dgist_5.jpg', alt: 'IRS Lab & DGIST 5' },
  { id: 'homepic-6', image: '/images/homepic/dgist_6.jpg', alt: 'IRS Lab & DGIST 6' },
];

export const ResearchCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play interval (5s), pause on hover or focus
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="research-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Research and Laboratory Slideshow"
    >
      {/* Visual Image Stage */}
      <div className="carousel-stage">
        {/* Slides Track */}
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="carousel-slide"
              aria-hidden={idx !== currentIndex}
            >
              <img
                src={assetUrl(slide.image)}
                alt={slide.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                className="carousel-image"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="carousel-nav-btn prev-btn"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="carousel-nav-btn next-btn"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Floating Indicator Dots overlay on image bottom */}
        <div className="carousel-dots-wrap">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .research-carousel-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .research-carousel-wrapper:hover {
          border-color: var(--color-border-hover);
        }

        .carousel-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 1;
          background-color: var(--color-bg-secondary);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .carousel-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Nav Buttons */
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.85;
          transition: all var(--transition-fast);
          z-index: 2;
        }

        .carousel-nav-btn:hover {
          opacity: 1;
          background-color: rgba(15, 23, 42, 0.85);
          transform: translateY(-50%) scale(1.08);
          color: #ffffff;
        }

        .carousel-nav-btn.prev-btn {
          left: 16px;
        }

        .carousel-nav-btn.next-btn {
          right: 16px;
        }

        /* Dots */
        .carousel-dots-wrap {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 7px;
          z-index: 2;
          padding: 5px 12px;
          border-radius: 20px;
          background-color: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .carousel-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .carousel-dot:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }

        .carousel-dot.active {
          width: 22px;
          border-radius: 4px;
          background-color: #ffffff;
        }

        @media (max-width: 640px) {
          .carousel-nav-btn {
            width: 32px;
            height: 32px;
          }
          .carousel-nav-btn.prev-btn {
            left: 8px;
          }
          .carousel-nav-btn.next-btn {
            right: 8px;
          }
          .carousel-dots-wrap {
            bottom: 8px;
            padding: 3px 8px;
          }
        }
      `}</style>
    </div>
  );
};
