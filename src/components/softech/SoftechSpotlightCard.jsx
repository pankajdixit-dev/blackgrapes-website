import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, X, Layers } from 'lucide-react';

export default function SoftechSpotlightCard({ service, onClose, onOpenInquiry, onOpenDetails }) {
  if (!service) return null;

  return (
    <div className="softech-spotlight-wrapper" id="spotlight-section">
      <div className="spotlight-card">
        <button 
          type="button" 
          className="spotlight-close-btn"
          onClick={onClose}
          title="Dismiss Spotlight"
        >
          <X size={18} />
        </button>

        <div className="spotlight-grid">
          {/* Left: Image Showcase */}
          <div className="spotlight-image-col">
            <div className="spotlight-image-frame">
              <img 
                src={service.image} 
                alt={service.title}
                className="spotlight-img"
              />
              <div className="spotlight-badge-overlay">
                <Sparkles size={12} color="#f86200" />
                <span>Selected Service Content</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="spotlight-info-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
                {service.badge || 'Enterprise'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Black Grapes Softech • {service.categoryLabel}
              </span>
            </div>

            <h2 className="spotlight-title">{service.title}</h2>
            <p className="spotlight-tagline">{service.tagline}</p>
            <p className="spotlight-desc">{service.description}</p>

            {/* Deliverables / Features */}
            <div className="spotlight-features">
              {(service.keyDeliverables || service.features || []).map((feat, idx) => (
                <div key={idx} className="spotlight-feat-item">
                  <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="spotlight-tech-stack">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="tech-tag-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="spotlight-actions">
              {onOpenDetails && (
                <button
                  type="button"
                  className="btn-softech-details"
                  onClick={() => onOpenDetails(service)}
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                >
                  <Layers size={15} />
                  <span>View Complete Inside Specs</span>
                </button>
              )}

              <button
                type="button"
                className="btn-primary"
                onClick={() => onOpenInquiry(service)}
              >
                <span>Request Custom Quote</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <span>Official Page</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
