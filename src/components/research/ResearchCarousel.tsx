import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResearchSlide {
  id: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
}

const slides: ResearchSlide[] = [
  {
    id: "overview",
    image: "/images/research_home2.jpg",
    alt: "IRS Lab Overall Research Vision & Architecture",
    tag: "OVERVIEW",
    title: "IRS Lab Research Vision & System Architecture",
    caption: "Comprehensive system overview of IRS Lab — AI-driven wireless sensing pipelines connecting raw RF physical signals, neural representation learning, and multi-modal embodied perception."
  },
  {
    id: "pillar-1",
    image: "/images/research_1.jpg",
    alt: "Wireless-Centric AI",
    tag: "PILLAR 1",
    title: "Wireless-Centric AI & Foundation Models",
    caption: "Wireless-centric neural networks, physics-informed learning representations, and video-to-radar generative synthesis for RF feature extraction."
  },
  {
    id: "pillar-2",
    image: "/images/research_2.jpg",
    alt: "Innovative Wireless+X Perception Systems",
    tag: "PILLAR 2",
    title: "Innovative Wireless+X Perception Systems",
    caption: "Non-line-of-sight contactless physiological monitoring, UAV detection, satellite SAR remote sensing, and dense crowd localization."
  },
  {
    id: "pillar-3",
    image: "/images/research_3.jpg",
    alt: "Multi-Modal / Multi-Sensor Fusion & Physical AI",
    tag: "PILLAR 3",
    title: "Multi-Modal Sensor Fusion & Physical AI",
    caption: "Cross-modal sensor fusion uniting multi-frequency radar arrays, optical vision, infrared, and embodied AI for resilient perception."
  },
  {
    id: "applications",
    image: "/images/research_home.png",
    alt: "Radio + AI Application Domains",
    tag: "APPLICATIONS",
    title: "Radio + AI Real-World Application Domains",
    caption: "Translating foundational wireless AI breakthroughs into defense, satellite remote sensing, autonomous vehicles, healthcare, HCI, and smart IoT."
  }
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
      aria-label="Research vision and key pillars slideshow"
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
                src={slide.image}
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
          aria-label="Previous research slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="carousel-nav-btn next-btn"
          aria-label="Next research slide"
        >
          <ChevronRight size={18} />
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

      {/* Caption & Metadata Bar */}
      <div className="carousel-caption-bar">
        <div className="carousel-caption-header">
          <span className="carousel-tag">{slides[currentIndex].tag}</span>
          <span className="carousel-counter">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        <p className="carousel-caption-text">
          <strong className="carousel-caption-title">{slides[currentIndex].title}</strong>
          {' — '}
          <span>{slides[currentIndex].caption}</span>
        </p>
      </div>

      <style>{`
        .research-carousel-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: border-color var(--transition-fast);
        }

        .research-carousel-wrapper:hover {
          border-color: var(--color-border-hover);
        }

        .carousel-stage {
          position: relative;
          width: 100%;
          height: clamp(280px, 42vw, 440px);
          background-color: #ffffff;
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
          padding: 16px 20px;
          box-sizing: border-box;
          user-select: none;
        }

        .carousel-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* Nav Buttons */
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.94);
          color: #0f172a;
          border: 1px solid rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.88;
          transition: all var(--transition-fast);
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .carousel-nav-btn:hover {
          opacity: 1;
          background-color: #ffffff;
          border-color: rgba(0, 0, 0, 0.25);
          transform: translateY(-50%) scale(1.08);
          color: var(--color-accent);
        }

        .carousel-nav-btn.prev-btn {
          left: 14px;
        }

        .carousel-nav-btn.next-btn {
          right: 14px;
        }

        /* Dots */
        .carousel-dots-wrap {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 20px;
          background-color: rgba(15, 23, 42, 0.16);
          backdrop-filter: blur(4px);
        }

        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: rgba(15, 23, 42, 0.35);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .carousel-dot:hover {
          background-color: rgba(15, 23, 42, 0.65);
        }

        .carousel-dot.active {
          width: 18px;
          background-color: var(--color-accent);
        }

        /* Caption Bar */
        .carousel-caption-bar {
          padding: 16px 20px;
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
        }

        .carousel-caption-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .carousel-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--color-accent);
          text-transform: uppercase;
        }

        .carousel-counter {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .carousel-caption-text {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .carousel-caption-title {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        @media (max-width: 640px) {
          .carousel-stage {
            height: 240px;
          }
          .carousel-nav-btn {
            width: 30px;
            height: 30px;
          }
          .carousel-nav-btn.prev-btn {
            left: 8px;
          }
          .carousel-nav-btn.next-btn {
            right: 8px;
          }
          .carousel-caption-bar {
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
};
