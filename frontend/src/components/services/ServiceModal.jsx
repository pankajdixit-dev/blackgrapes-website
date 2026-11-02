import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function ServiceModal({ service, onClose, onSelectQuote }) {
  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-service-title"
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge-pill badge-purple">
              {service.division}
            </span>
            {service.badge && (
              <span className="badge-pill badge-gold">
                <Sparkles size={12} /> {service.badge}
              </span>
            )}
          </div>
          <h2 id="modal-service-title" style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
            {service.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.5' }}>
            {service.subtitle}
          </p>
        </div>

        {/* Deep Overview */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '1.25rem', 
          borderRadius: '0.85rem', 
          border: '1px solid var(--border-glass)',
          marginBottom: '1.75rem',
          fontSize: '0.92rem',
          color: 'var(--text-primary)',
          lineHeight: '1.6'
        }}>
          {service.description}
        </div>

        {/* Deliverables & Capabilities */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#ffffff" />
            <span>Guaranteed Deliverables & Outputs</span>
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {service.deliverables.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="#ffffff" />
            <span>Technical Capabilities</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.65rem' }}>
            {service.features.map((feat, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Specs Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
          padding: '1.25rem',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '0.85rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '1.75rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Clock size={14} /> TURNAROUND
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{service.turnaround}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Briefcase size={14} /> ENGAGEMENT
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{service.engagementModel}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Users size={14} /> SUITABLE FOR
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{service.clientTypes}</div>
          </div>
        </div>

        {/* Tech / Tooling Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Technologies & Frameworks Deployed
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {service.techStack.map((tech, idx) => (
              <span key={idx} className="tech-tag-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#f4f4f5' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            <span>Close</span>
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose();
              onSelectQuote(service);
            }}
          >
            <span>Inquire About This Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
