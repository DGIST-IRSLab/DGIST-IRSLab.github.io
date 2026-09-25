import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ResearchTopic } from '../../types';
import { assetUrl } from '../../utils/asset';

interface ResearchTopicCardProps {
  topic: ResearchTopic;
  onExplore?: () => void;
  editorial?: boolean;
}

export const ResearchTopicCard: React.FC<ResearchTopicCardProps> = ({
  topic,
  onExplore,
  editorial = false,
}) => {
  return (
    <article
      id={topic.id}
      className="research-topic-card"
      style={{
        display: 'grid',
        gridTemplateColumns: editorial ? '1fr 1fr' : '1fr',
        gap: 'var(--space-xl)',
        alignItems: 'center',
        padding: 'var(--space-xl)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      {/* Content Col */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <div>
          <h3
            className="h2-title"
            style={{
              fontSize: '22px',
              color: 'var(--color-text-primary)',
            }}
          >
            {topic.title}
          </h3>
        </div>

        {/* Scientific Core Question */}
        <div
          style={{
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--color-accent)',
            lineHeight: 1.5,
            paddingLeft: 'var(--space-sm)',
            borderLeft: '2px solid var(--color-accent)',
          }}
        >
          &ldquo;{topic.question}&rdquo;
        </div>

        <p className="body-text" style={{ fontSize: '14px', lineHeight: 1.6 }}>
          {topic.summary}
        </p>

        {/* Bullet Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
          {topic.highlights.map((hl, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <CheckCircle2
                size={14}
                style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}
              />
              <span>{hl}</span>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          {topic.keywords.join(' · ')}
        </div>

        {onExplore && (
          <div style={{ marginTop: 'var(--space-xs)' }}>
            <button
              type="button"
              onClick={onExplore}
              className="link-subtle"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '13.5px',
              }}
            >
              <span>Explore Themes & Projects</span>
              <ArrowRight size={14} className="icon-arrow" />
            </button>
          </div>
        )}
      </div>

      {/* Research Figure Col */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="research-figure-frame">
          <img
            src={assetUrl(topic.image)}
            alt={topic.title}
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div className="figure-caption">{topic.imageCaption}</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .research-topic-card {
            grid-template-columns: 1fr !important;
            gap: var(--space-lg) !important;
            padding: var(--space-md) !important;
          }
        }
      `}</style>
    </article>
  );
};
