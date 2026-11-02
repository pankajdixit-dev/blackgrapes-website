import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2, MessageCircle, ArrowRight, Globe, ShieldCheck, Building2 } from 'lucide-react';

export default function ClientCaseStudyModal({ client, onClose, onOpenDemoModal }) {
  useEffect(() => {
    if (!client) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [client, onClose]);

  if (!client) return null;

  const handleConsultClick = () => {
    onClose();
    if (onOpenDemoModal) onOpenDemoModal();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Black Grapes Softech, I am interested in building a solution similar to your work for: ${client.name || client.client}`
  );

  const title = client.name || client.client;
  const industry = client.industry;
  const region = client.region || 'Global Enterprise';

  return (
    <div className="client-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="client-modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="client-modal-header">
          <div className="client-modal-brand-row">
            {client.logo && (
              <div className="client-modal-logo-frame">
                <img src={client.logo} alt={title} className="client-modal-logo-img" />
              </div>
            )}
            <div>
              <span className="client-modal-badge badge-orange">
                <Sparkles size={12} /> {client.badge || 'VERIFIED PARTNER'}
              </span>
              <h3 className="client-modal-title">{title}</h3>
              <div className="client-modal-meta">
                <span><Building2 size={13} /> {industry}</span>
                <span>•</span>
                <span><Globe size={13} /> {region}</span>
              </div>
            </div>
          </div>

          <button
            className="client-modal-close-btn"
            onClick={onClose}
            aria-label="Close client case study"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="client-modal-body">
          <div className="modal-section-card">
            <h4 className="modal-card-label">ENGAGEMENT SCOPE & SERVICES</h4>
            <p className="modal-card-text">
              {client.services || client.desc || 'Full-cycle enterprise software development, modern UI/UX design, cloud architecture, and ongoing DevOps support.'}
            </p>
          </div>

          <div className="modal-section-card">
            <h4 className="modal-card-label">MEASURABLE BUSINESS IMPACT</h4>
            <p className="modal-card-text highlight-text">
              {client.impact || client.desc || 'Accelerated deployment velocity, modernized legacy systems, and enhanced user adoption across international markets.'}
            </p>

            {client.metrics && (
              <div className="case-metrics-pills">
                {client.metrics.map((metric, idx) => (
                  <span key={idx} className="metric-pill">
                    <CheckCircle2 size={13} /> {metric}
                  </span>
                ))}
              </div>
            )}
          </div>

          {client.tech && (
            <div className="modal-section-card">
              <h4 className="modal-card-label">TECHNOLOGY STACK</h4>
              <div className="tech-tags-list">
                {client.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="client-modal-footer">
            <div className="confidentiality-notice">
              <ShieldCheck size={16} /> Enterprise NDA & Full Code Ownership Protected
            </div>

            <div className="modal-action-btns">
              <a
                href={`https://wa.me/917470997884?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={16} />
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                onClick={handleConsultClick}
                className="btn btn-primary"
              >
                <span>Discuss Similar Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
