import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  ArrowRight,
  FileText
} from 'lucide-react';
import '../Styles/Modal.css';

export default function ServiceModal({ service, onClose, onSelectForInquiry }) {
  if (!service) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge-pill">{service.categoryName}</span>
            <h3>{service.title}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p className="modal-lead-desc">{service.detailedDescription || service.description}</p>

          <div className="modal-highlights-grid">
            <div className="modal-highlight-box">
              <Clock size={20} className="modal-h-icon" />
              <div>
                <span className="modal-h-label">Estimated Timeline</span>
                <span className="modal-h-val">{service.turnaround || '2 - 6 Weeks'}</span>
              </div>
            </div>
            <div className="modal-highlight-box">
              <ShieldCheck size={20} className="modal-h-icon" />
              <div>
                <span className="modal-h-label">Compliance & Quality</span>
                <span className="modal-h-val">{service.compliance || 'Govt / ISO Standards'}</span>
              </div>
            </div>
            <div className="modal-highlight-box">
              <Layers size={20} className="modal-h-icon" />
              <div>
                <span className="modal-h-label">Delivery Scope</span>
                <span className="modal-h-val">{service.deliverablesCount || 'Turnkey Solution'}</span>
              </div>
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="modal-section">
            <h4 className="modal-subtitle">
              <CheckCircle2 size={18} className="text-purple" />
              <span>Key Deliverables & Specifications</span>
            </h4>
            <div className="deliverables-grid">
              {service.deliverables && service.deliverables.map((item, index) => (
                <div key={index} className="deliverable-item">
                  <span className="check-bullet">&bull;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack / Standards */}
          {service.tags && (
            <div className="modal-section">
              <h4 className="modal-subtitle">
                <FileText size={18} className="text-purple" />
                <span>Technologies & Frameworks / Certifications</span>
              </h4>
              <div className="tags-container">
                {service.tags.map((tag, idx) => (
                  <span key={idx} className="service-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => {
              onClose();
              if (onSelectForInquiry) onSelectForInquiry(service.title);
            }}
          >
            <Sparkles size={16} />
            <span>Enquire About This Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
