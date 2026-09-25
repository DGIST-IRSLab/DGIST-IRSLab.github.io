import React from 'react';
import { labInfo } from '../../data/labInfo';
import { Mail, Phone, MapPin, ExternalLink, Radio } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-xl)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-xl)',
            paddingBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          {/* Col 1: Identity & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-accent-border)',
                  backgroundColor: 'var(--color-accent-subtle)',
                  color: 'var(--color-accent)',
                }}
              >
                <Radio size={14} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '15.5px', color: 'var(--color-text-primary)' }}>
                {labInfo.name}
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              {labInfo.tagline}
            </p>

            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {labInfo.fullAffiliation}
              <br />
              <a
                href="https://www.dgist.ac.kr/eng/index.do"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
              >
                {labInfo.university}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <span className="eyebrow">NAVIGATION</span>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: 'var(--space-xs)',
              }}
            >
              {[
                { label: 'Home', id: 'home' },
                { label: 'Research Themes', id: 'research' },
                { label: 'Publications Index', id: 'publications' },
                { label: 'Members & Alumni', id: 'people' },
                { label: 'Activity News', id: 'news' },
                { label: 'Lab Gallery', id: 'gallery' },
                { label: 'Join IRS Lab (Openings)', id: 'join' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13.5px',
                      color: 'var(--color-text-secondary)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Research Pillars */}
          <div>
            <span className="eyebrow">RESEARCH PILLARS</span>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: 'var(--space-xs)',
              }}
            >
              {[
                'Wireless-Centric AI',
                'Radar Signal Processing',
                'RF-Vital Physiological Sensing',
                'Micro-Doppler Kinematics',
                'Synthetic Aperture Radar (SAR)',
                'Multi-Modal Physical AI',
              ].map((topic, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent)', marginRight: '6px' }}>#</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <span className="eyebrow">CONTACT & LOCATION</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <MapPin size={15} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  {labInfo.building}
                  <br />
                  {labInfo.location}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <Mail size={15} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a
                  href={`mailto:${labInfo.email}`}
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  {labInfo.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <Phone size={15} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span>{labInfo.phone}</span>
              </div>
              <div style={{ marginTop: 'var(--space-2xs)' }}>
                <a
                  href={labInfo.notionContactLink}
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                  style={{ fontSize: '12.5px' }}
                >
                  <span>Admission Information (Notion)</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Coordinates */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)',
            paddingTop: 'var(--space-md)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Intelligent Radio Sensing (IRS) Laboratory, DGIST. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <span>LOC: 35.7061° N, 128.4533° E</span>
            <span>SYSTEM: REACT + TS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
