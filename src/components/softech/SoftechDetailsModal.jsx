import React from 'react';
import { X, CheckCircle2, Clock, Users, Layers, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

export default function SoftechDetailsModal({ service, onClose, onOpenQuote }) {
  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog-black softech-details-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="details-title"
      >
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Banner Image */}
        <div className="modal-banner-wrap">
          <img 
            src={service.image} 
            alt={service.title}
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay" />
          <div className="modal-banner-badge">
            <Sparkles size={12} color="#f86200" />
            <span>{service.badge}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.82rem', color: '#f86200', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
            {service.categoryLabel}
          </div>
          <h2 id="details-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', lineHeight: '1.2' }}>
            {service.title}
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            {service.tagline}
          </p>
        </div>

        {/* Core Overview */}
        <div className="modal-overview-box">
          {service.description}
        </div>

        {/* Key Deliverables */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="modal-section-title">
            <Layers size={17} color="#f86200" />
            <span>Engineering Deliverables & Scope</span>
          </h3>
          <div className="modal-deliverables-list">
            {service.keyDeliverables.map((item, idx) => (
              <div key={idx} className="modal-deliverable-item">
                <CheckCircle2 size={16} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem', fontWeight: 700 }}>
            Recommended Technology Stack
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {service.techStack.map((tech, idx) => (
              <span key={idx} className="tech-tag-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline & Ideal Clients Grid */}
        <div className="modal-meta-grid">
          <div className="modal-meta-box">
            <div className="modal-meta-icon"><Clock size={16} color="#f86200" /></div>
            <div>
              <div className="modal-meta-label">Delivery Timeline</div>
              <div className="modal-meta-val">{service.timeline}</div>
            </div>
          </div>

          <div className="modal-meta-box">
            <div className="modal-meta-icon"><Users size={16} color="#f86200" /></div>
            <div>
              <div className="modal-meta-label">Ideal For</div>
              <div className="modal-meta-val">{service.clientTypes}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions-bar">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose();
              onOpenQuote(service);
            }}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <span>Request Proposal for this Service</span>
            <ArrowRight size={15} />
          </button>

          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '0.65rem 1rem' }}
            title="Open on official website"
          >
            <span>Official Portal</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
