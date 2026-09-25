import React from 'react';

export const ResearchIntroQuote: React.FC = () => {
  return (
    <section className="research-intro-quote-section">
      <div className="container">
        <div className="intro-quote-container">
          {/* Top Decorative Quotation Mark */}
          <div className="quote-mark-decorative quote-mark-top" aria-hidden="true">
            &ldquo;
          </div>

          <blockquote className="intro-quote-body">
            {/* Lead Statement */}
            <p className="intro-quote-lead">
              Our goal is to develop new sensing technologies to see the world from an entirely new perspective, through{' '}
              <span className="quote-accent-highlight">AI-Driven Wireless+X Sensing</span>.
            </p>

            {/* Supporting Vision & Applications */}
            <p className="intro-quote-support">
              By integrating the power of AI with radio-frequency signal processing—and further expanding these capabilities through{' '}
              <span className="quote-accent-highlight">Sensor Fusion</span>—we aim to push the boundaries of human perceptual capabilities in diverse areas such as{' '}
              <span className="quote-domain-highlight">IoT</span>,{' '}
              <span className="quote-domain-highlight">Health Monitoring</span>,{' '}
              <span className="quote-domain-highlight">Autonomous Driving</span>,{' '}
              <span className="quote-domain-highlight">Defense/Remote Sensing</span>, and{' '}
              <span className="quote-domain-highlight">HCI</span>.
            </p>
          </blockquote>

          {/* Bottom Decorative Quotation Mark */}
          <div className="quote-mark-decorative quote-mark-bottom" aria-hidden="true">
            &rdquo;
          </div>
        </div>
      </div>

      <style>{`
        .research-intro-quote-section {
          padding-top: clamp(36px, 4vw, 56px);
          padding-bottom: clamp(28px, 3.2vw, 44px);
          background-color: var(--color-surface);
        }

        .intro-quote-container {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          padding: 0 12px;
        }

        .quote-mark-decorative {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(42px, 4.2vw, 54px);
          line-height: 0.8;
          color: var(--color-accent);
          opacity: 0.35;
          user-select: none;
          display: block;
        }

        .quote-mark-top {
          margin-bottom: 12px;
        }

        .quote-mark-bottom {
          margin-top: 14px;
        }

        .intro-quote-body {
          margin: 0;
          padding: 0;
          border: none;
        }

        .intro-quote-lead {
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          font-weight: 600;
          line-height: 1.55;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          margin: 0;
          overflow-wrap: break-word;
        }

        .intro-quote-support {
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--color-text-secondary);
          margin: 14px auto 0 auto;
          max-width: 760px;
          overflow-wrap: break-word;
        }

        .quote-accent-highlight {
          font-weight: 700;
          color: var(--color-accent);
          position: relative;
        }

        .quote-domain-highlight {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        @media (max-width: 768px) {
          .research-intro-quote-section {
            padding-top: 28px;
            padding-bottom: 20px;
          }
          .intro-quote-lead {
            font-size: 1.05rem;
            line-height: 1.5;
          }
          .intro-quote-support {
            font-size: 13.5px;
            line-height: 1.65;
            margin-top: 10px;
          }
          .quote-mark-top {
            margin-bottom: 8px;
          }
          .quote-mark-bottom {
            margin-top: 10px;
          }
        }
      `}</style>
    </section>
  );
};
