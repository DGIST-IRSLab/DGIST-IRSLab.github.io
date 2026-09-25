import React from 'react';
import { labInfo } from '../../data/labInfo';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        {/* Left Column: Institutional Logos (DGIST + EECS) & Affiliation Info */}
        <div className="footer-left-col">
          {/* Institutional Logos: DGIST + EECS side-by-side */}
          <div className="footer-inst-logos">
            <div className="footer-logo-item" title="Daegu Gyeongbuk Institute of Science and Technology (DGIST)">
              <img
                src="/images/logopic/dgist_logo.png"
                alt="DGIST Logo"
                className="footer-logo-img dgist-logo"
              />
            </div>

            <div className="footer-logo-item" title="DGIST Department of Electrical Engineering &amp; Computer Science (EECS)">
              <img
                src="/images/logopic/eecs_logo.png"
                alt="DGIST EECS Logo"
                className="footer-logo-img eecs-logo"
              />
            </div>
          </div>

          {/* Academic Affiliation & Address */}
          <div className="footer-info-block">
            <p className="footer-address-line">
              Intelligent Radio Sensing Lab (#E3-406, DGIST), Department of Electrical Engineering and Computer Science (EECS) &amp; Department of Interdisciplinary Studies of Artificial Intelligence (AI), Daegu Gyeongbuk Institute of Science and Technology (DGIST), Republic of Korea
            </p>
            <p className="footer-copyright-line">
              Copyright &copy; {new Date().getFullYear()} {labInfo.name}
            </p>
          </div>
        </div>

        {/* Right Column: Prominent Large IRS Lab Brand Logo */}
        <div className="footer-right-col">
          <div className="footer-lab-logo-wrap" title="Intelligent Radio Sensing Laboratory">
            <img
              src="/images/logopic/lab_logo_light.png"
              alt="IRS Lab Logo"
              className="footer-lab-logo-img logo-light-only"
            />
            <img
              src="/images/logopic/lab_logo_dark.png"
              alt="IRS Lab Logo"
              className="footer-lab-logo-img logo-dark-only"
            />
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: auto;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-bg-secondary);
          padding-top: clamp(2.2rem, 3.8vw, 3.2rem);
          padding-bottom: clamp(2.2rem, 3.8vw, 3.2rem);
        }

        .footer-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(2rem, 4vw, 4rem);
        }

        /* Left Column */
        .footer-left-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 820px;
        }

        .footer-inst-logos {
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .footer-logo-item {
          display: inline-flex;
          align-items: center;
        }

        .footer-logo-img {
          height: 38px;
          width: auto;
          max-width: 190px;
          object-fit: contain;
          display: block;
          opacity: 0.95;
          transition: opacity var(--transition-fast);
        }

        .footer-logo-img:hover {
          opacity: 1;
        }

        [data-theme='dark'] .dgist-logo {
          filter: brightness(1.2) contrast(1.05);
        }

        [data-theme='dark'] .eecs-logo {
          background-color: #ffffff;
          padding: 3px 8px;
          border-radius: var(--radius-xs);
        }

        .footer-info-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-address-line {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .footer-copyright-line {
          font-family: var(--font-sans);
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Right Column: Prominent Lab Logo */
        .footer-right-col {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .footer-lab-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .footer-lab-logo-img {
          height: clamp(68px, 8vw, 88px);
          width: auto;
          max-width: 280px;
          object-fit: contain;
          display: block;
          transition: transform var(--transition-fast), opacity var(--transition-fast);
        }

        .footer-lab-logo-img:hover {
          transform: scale(1.02);
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

        /* Responsive */
        @media (max-width: 860px) {
          .footer-layout {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 24px;
          }

          .footer-right-col {
            justify-content: flex-start;
          }

          .footer-lab-logo-img {
            height: 60px;
          }
        }
      `}</style>
    </footer>
  );
};
