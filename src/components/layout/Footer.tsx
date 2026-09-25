import React from 'react';
import { labInfo } from '../../data/labInfo';
import { assetUrl } from '../../utils/asset';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        {/* Left Column: Institutional Logos (DGIST + EECS) & Affiliation Info */}
        <div className="footer-left-col">
          {/* Institutional Logos: DGIST + EECS optically aligned side-by-side */}
          <div className="footer-inst-logos">
            <div className="footer-logo-wrap" title="Daegu Gyeongbuk Institute of Science and Technology (DGIST)">
              <img
                src={assetUrl('/images/logopic/dgist_logo.png')}
                alt="DGIST Logo"
                className="footer-inst-logo dgist-logo"
              />
            </div>

            <div className="footer-logo-divider" aria-hidden="true" />

            <div className="footer-logo-wrap" title="DGIST Department of Electrical Engineering &amp; Computer Science (EECS)">
              <img
                src={assetUrl('/images/logopic/eecs_logo.png')}
                alt="DGIST EECS Logo"
                className="footer-inst-logo eecs-logo"
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
              src={assetUrl('/images/logopic/lab_logo_light.png')}
              alt="IRS Lab Logo"
              className="footer-lab-logo-img logo-light-only"
            />
            <img
              src={assetUrl('/images/logopic/lab_logo_dark.png')}
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
          padding-top: clamp(2.4rem, 4vw, 3.4rem);
          padding-bottom: clamp(2.4rem, 4vw, 3.4rem);
        }

        .footer-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(2rem, 5vw, 4.5rem);
        }

        /* Left Column */
        .footer-left-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 820px;
        }

        .footer-inst-logos {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .footer-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
        }

        .footer-logo-divider {
          width: 1px;
          height: 22px;
          background-color: var(--color-border);
          flex-shrink: 0;
        }

        .footer-inst-logo {
          width: auto;
          object-fit: contain;
          display: block;
          transition: opacity var(--transition-fast);
        }

        /* Optical Size Balancing: DGIST 30px, EECS 33px */
        .dgist-logo {
          height: 30px;
          max-width: 130px;
          opacity: 0.95;
        }

        .eecs-logo {
          height: 33px;
          max-width: 160px;
          opacity: 0.92;
        }

        .footer-inst-logo:hover {
          opacity: 1;
        }

        [data-theme='dark'] .dgist-logo {
          filter: brightness(1.2) contrast(1.05);
        }

        [data-theme='dark'] .eecs-logo {
          filter: brightness(0) invert(0.92);
          opacity: 0.88;
        }

        .footer-info-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-address-line {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.65;
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

        /* Right Column: Prominent Large Lab Logo */
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
          height: clamp(80px, 9vw, 98px);
          width: auto;
          max-width: 300px;
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

        /* Responsive Breakpoints */
        @media (max-width: 880px) {
          .footer-layout {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 24px;
          }

          .footer-right-col {
            justify-content: flex-start;
          }

          .footer-lab-logo-img {
            height: 72px;
          }
        }
      `}</style>
    </footer>
  );
};
