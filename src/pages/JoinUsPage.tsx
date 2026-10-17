import React from 'react';
import { labInfo } from '../data/labInfo';

export const JoinUsPage: React.FC = () => {
  return (
    <div className="join-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Header */}
      <section
        style={{
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-md)',
        }}
      >
        <div className="container">
          <h1 className="h1-title">
            Join Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="container join-simple-content">
          <div className="join-prose-block">
            <p>
              <strong>
                We are currently looking for passionate students (PhD/MS students and Undergrad. interns) to join IRS Lab!
              </strong>
              <br />
              <strong>
                (
                <a
                  href={labInfo.notionContactLink}
                  target="_blank"
                  rel="noreferrer"
                  className="join-inline-link"
                >
                  See this
                </a>{' '}
                for more info!)
              </strong>
            </p>

            <p>
              <strong>
                We&apos;re also actively hiring Postdocs in the field of radio systems/signal processing and AI.
              </strong>
              <br />
              <strong>
                (Please refer to{' '}
                <a
                  href={labInfo.notionPostdocLink}
                  target="_blank"
                  rel="noreferrer"
                  className="join-inline-link"
                >
                  this link
                </a>{' '}
                for more details!)
              </strong>
            </p>

            <p>
              Our mission is to develop new sensing technologies that perceive the world through entirely new perspectives, prioritizing radio-frequency (RF) signals over conventional optical methods. To achieve this, we pursue interdisciplinary research in various research areas including AI, RF/Radar Signal Processing, Wireless Technologies, and Sensor Fusion.
              <br />
              If you are interested in joining our lab, please contact{' '}
              <strong>
                Prof. Jae-Ho Choi (
                <a href="mailto:jhochoi@dgist.ac.kr" className="join-inline-link">
                  <u>jhochoi@dgist.ac.kr</u>
                </a>
                ) along with your CV and a brief introduction
              </strong>
              .
            </p>
          </div>

          <div className="join-subsection">
            <h2 className="join-subheading">Contact Information</h2>
            <ul className="join-bullet-list">
              <li>Prof. Jae-Ho Choi</li>
              <li>
                E-mail:{' '}
                <a href="mailto:jhochoi@dgist.ac.kr" className="join-inline-link">
                  jhochoi@dgist.ac.kr
                </a>
              </li>
              <li>TEL: {labInfo.phone}</li>
              <li>Office: Engineering Building E3, Room 406, DGIST, Daegu 42988, Republic of Korea</li>
            </ul>
          </div>

          <div className="join-subsection">
            <h2 className="join-subheading">Location</h2>
            <div className="map-frame">
              <iframe
                title="DGIST IRS Lab Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d812.5!2d128.4533465!3d35.7060902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356f587a086a08df%3A0x8feff7c081d19e7c!2z7KCE6riw7KCE7J6Q7Lu07ZOo7YSw6rO17ZWZ6rO8IChFMyk!5e0!3m2!1sen!2skr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .join-simple-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: 1.7;
          color: var(--color-text-primary);
        }

        .join-prose-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .join-prose-block p {
          margin: 0;
        }

        .join-inline-link {
          color: var(--color-accent);
          text-decoration: none;
        }

        .join-inline-link:hover {
          text-decoration: underline;
        }

        .join-subsection {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .join-subheading {
          font-family: var(--font-heading);
          font-size: var(--text-h2);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .join-bullet-list {
          list-style: disc;
          padding-left: 22px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .map-frame {
          width: 100%;
          max-width: 700px;
          aspect-ratio: 16 / 9;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          background-color: var(--color-bg-secondary);
        }
      `}</style>
    </div>
  );
};

