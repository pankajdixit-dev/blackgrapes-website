import React from 'react';

export default function ServiceDetailModal({ service, onClose, onOpenEstimate }) {
  if (!service) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container service-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pill-tag">SERVICE BLUEPRINT</span>
            <h3 className="modal-title">{service.title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="modal-body service-modal-body">
          <div className="service-modal-img-wrap">
            <img
              src={service.image}
              alt={service.title}
              className="service-modal-img"
              loading="lazy"
            />
          </div>

          <div className="service-modal-content">
            <h4 className="service-overview-heading">Architecture &amp; Scope Overview</h4>
            <p className="service-modal-desc">{service.fullDesc}</p>

            <div className="service-modal-tags-section">
              <span className="tags-label">Technologies &amp; Methodologies:</span>
              <div className="modal-tags-grid">
                {service.tags.map((tag, i) => (
                  <span key={i} className="service-tag-pill">{tag}</span>
                ))}
              </div>
            </div>

            <div className="service-modal-guarantee">
              <div className="guarantee-icon">🛡️</div>
              <div className="guarantee-text">
                <strong>Black Grapes Quality &amp; Security Assurance</strong>
                <p>Every milestone includes automated regression testing, source code ownership, and 30-day post-launch warranty.</p>
              </div>
            </div>

            <div className="service-modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onOpenEstimate(`Quote for ${service.title}`);
                }}
              >
                <span>Request Custom Quote</span>
                <span className="btn-sparkle">⚡</span>
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
