import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import type { Publication } from '../../types';

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ publication, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!publication || !publication.bibtex) return null;

  const handleCopy = () => {
    if (publication.bibtex) {
      navigator.clipboard.writeText(publication.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (publication.bibtex) {
      const blob = new Blob([publication.bibtex], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${publication.id}.bib`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bibtex-title"
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0 }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-md) var(--space-lg)',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <div>
            <h3
              id="bibtex-title"
              className="h3-title"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              BibTeX Citation
            </h3>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                marginTop: '2px',
                maxWidth: '520px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {publication.title}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close BibTeX dialog"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* BibTeX Code Area */}
        <div style={{ padding: 'var(--space-lg)', overflowY: 'auto' }}>
          <pre
            style={{
              margin: 0,
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-code-bg)',
              color: 'var(--color-code-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              border: '1px solid var(--color-border)',
            }}
          >
            {publication.bibtex}
          </pre>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--space-sm)',
            padding: 'var(--space-md) var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <button
            type="button"
            onClick={handleDownload}
            className="btn-academic"
          >
            <Download size={14} />
            <span>Download .bib</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-academic btn-academic-primary"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy BibTeX</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
