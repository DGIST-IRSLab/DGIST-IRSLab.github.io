import React from 'react';
import { labInfo } from '../../data/labInfo';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Logos Row (IRS Lab, DGIST, and slots for future department logos) */}
        <div className="footer-logos-row">
          {/* IRS Lab Logo */}
          <div className="footer-logo-item" title="Intelligent Radio Sensing Laboratory">
            <img
              src="/images/logopic/lab_logo_light.png"
              alt="IRS Lab Logo"
              className="footer-logo-img logo-light-only"
            />
            <img
              src="/images/logopic/lab_logo_dark.png"
              alt="IRS Lab Logo"
              className="footer-logo-img logo-dark-only"
            />
          </div>

          {/* DGIST University Logo */}
          <div className="footer-logo-item" title="Daegu Gyeongbuk Institute of Science and Technology (DGIST)">
            <img
              src="/images/logopic/dgist_logo.png"
              alt="DGIST Logo"
              className="footer-logo-img dgist-logo"
            />
          </div>

          {/* DGIST EECS Department Logo */}
          <div className="footer-logo-item" title="DGIST Department of Electrical Engineering & Computer Science (EECS)">
            <img
              src="/images/logopic/eecs_logo.png"
              alt="DGIST EECS Logo"
              className="footer-logo-img eecs-logo"
            />
          </div>
        </div>

        {/* Concise Academic Affiliation & Address */}
        <div className="footer-info-block">
          <p className="footer-address-line">
            Intelligent Radio Sensing Lab (#E3-406, DGIST), Department of Electrical Engineering and Computer Science (EECS) &amp; Department of Interdisciplinary Studies of Artificial Intelligence (AI), Daegu Gyeongbuk Institute of Science and Technology (DGIST), Republic of Korea
          </p>
          <p className="footer-copyright-line">
            Copyright &copy; {new Date().getFullYear()} {labInfo.name}
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: auto;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-bg-secondary);
          padding-top: clamp(2rem, 3.5vw, 3rem);
          padding-bottom: clamp(2rem, 3.5vw, 3rem);
        }

        .footer-logos-row {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .footer-logo-item {
          display: inline-flex;
          align-items: center;
        }

        .footer-logo-img {
          height: 38px;
          width: auto;
          max-width: 180px;
          object-fit: contain;
          display: block;
          opacity: 0.9;
          transition: opacity var(--transition-fast);
        }

        .footer-logo-img:hover {
          opacity: 1;
        }

        .logo-light-only {
          display: block;
        }

        .logo-dark-only {
          display: none;
        }

        [data-theme='dark'] .logo-light-only {
          display: none;
        }

        [data-theme='dark'] .logo-dark-only {
          display: block;
        }

        [data-theme='dark'] .dgist-logo {
          filter: brightness(1.2) contrast(1.05);
        }

        [data-theme='dark'] .eecs-logo {
          background-color: #ffffff;
          padding: 3px 6px;
          border-radius: var(--radius-xs);
        }

        .footer-info-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 980px;
        }

        .footer-address-line {
          font-family: var(--font-sans);
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .footer-copyright-line {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-muted);
          margin: 0;
        }
      `}</style>
    </footer>
  );
};
