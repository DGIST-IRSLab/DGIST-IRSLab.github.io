import React from 'react';
import { Mail, Phone, MapPin, GraduationCap, ExternalLink, Award, FileText } from 'lucide-react';
import { professor } from '../../data/people';

export const ProfessorProfile: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(220px, 280px) 1fr',
        gap: 'var(--space-2xl)',
        padding: 'var(--space-xl)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-2xl)',
      }}
      className="professor-profile-grid"
    >
      {/* Portrait & Contacts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <img
            src={professor.photo}
            alt={professor.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block',
            }}
          />
        </div>

        {/* Contact list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
            <Mail size={14} style={{ color: 'var(--color-accent)' }} />
            <a
              href={`mailto:${professor.email}`}
              style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
            >
              {professor.email}
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
            <Phone size={14} style={{ color: 'var(--color-accent)' }} />
            <span>{professor.phone}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
            <MapPin size={14} style={{ color: 'var(--color-accent)' }} />
            <span>{professor.room}</span>
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
          {professor.cvUrl && (
            <a
              href={professor.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-academic"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <FileText size={12} />
              <span>Full CV</span>
              <ExternalLink size={10} />
            </a>
          )}

          {professor.googleScholar && (
            <a
              href={professor.googleScholar}
              target="_blank"
              rel="noreferrer"
              className="btn-academic"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <GraduationCap size={12} />
              <span>Google Scholar</span>
            </a>
          )}

          {professor.linkedin && (
            <a
              href={professor.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-academic"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 0 0-1.64 1.64 1.64 1.64 0 0 0 1.64 1.64 1.64 1.64 0 0 0 1.64-1.64 1.64 1.64 0 0 0-1.64-1.64Z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      {/* Bio, Experience, Education, Service */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div>
          <h2 className="h2-title" style={{ fontSize: '24px' }}>
            {professor.name} <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--color-text-muted)' }}>{professor.nameKr}</span>
          </h2>
          <div style={{ fontSize: '14px', color: 'var(--color-accent)', fontWeight: 500, marginTop: '2px' }}>
            {professor.title}, DGIST EECS & Department of Interdisciplinary Studies of AI
          </div>
        </div>

        {/* Narrative Bio */}
        <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.65 }}>
          {professor.bio}
        </p>

        {/* Two-column layout for Education & Experience */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-lg)',
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          {/* Education */}
          <div>
            <h4
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-xs)',
              }}
            >
              Education
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {professor.education?.map((edu, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.45,
                  }}
                >
                  • {edu}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-xs)',
              }}
            >
              Experience
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {professor.experience?.map((exp, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.45,
                  }}
                >
                  • {exp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Academic Service highlights */}
        <div
          style={{
            padding: 'var(--space-sm) var(--space-md)',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '2px solid var(--color-accent)',
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-sm)',
            fontSize: '13px',
          }}
        >
          <Award size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          <div>
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
              NeurIPS 2026 Area Chair
            </span>
            <span style={{ color: 'var(--color-text-secondary)', marginLeft: '6px' }}>
              • AAAI 2026 TPC • Top Reviewer at NeurIPS 2025 • Reviewer for CVPR, ICCV, ECCV, TPAMI, TIP, TGRS
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .professor-profile-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-lg) !important;
            padding: var(--space-md) !important;
          }
        }
      `}</style>
    </div>
  );
};
