import React, { useState } from 'react';
import { COMPANY_INFO, REQUIREMENT_OPTIONS } from '../data/siteData';

export default function ContactModal({ isOpen, onClose, modalTitle = 'Request a Demo' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: REQUIREMENT_OPTIONS[0],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      requirement: REQUIREMENT_OPTIONS[0],
      message: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pill-tag">BLACK GRAPES SOFTECH</span>
            <h3 className="modal-title">{modalTitle}</h3>
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

        {/* Modal Body */}
        <div className="modal-body">
          {isSubmitted ? (
            <div className="modal-success-state">
              <div className="success-icon-wrap">✓</div>
              <h4 className="success-title">Thank You, {formData.name || 'Valued Client'}!</h4>
              <p className="success-message">
                Your request for <strong>{formData.requirement}</strong> has been received by our technical team.
                Our consultant will contact you at <strong>{formData.phone || formData.email}</strong> within 2 business hours.
              </p>
              <div className="success-direct-contact">
                <span>Immediate Assistance:</span>
                <a href={`tel:${COMPANY_INFO.phones[0]}`}>{COMPANY_INFO.phones[0]}</a>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
              >
                Close &amp; Back to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <p className="form-lead-text">
                {COMPANY_INFO.consultationText}. Please fill out the details below.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="form-name">Your Name *</label>
                <input
                  id="form-name"
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="form-email">Email Address *</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-phone">Phone / WhatsApp *</label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="form-req">Your Requirement *</label>
                <select
                  id="form-req"
                  className="form-select"
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                >
                  {REQUIREMENT_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="form-msg">Project Details / Message</label>
                <textarea
                  id="form-msg"
                  rows="3"
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-full form-submit-btn"
              >
                {isSubmitting ? (
                  <span className="btn-loading-spinner">Submitting...</span>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <span className="btn-arrow">&rarr;</span>
                  </>
                )}
              </button>

              <div className="form-trust-guarantee">
                🔒 100% Confidentiality &bull; Non-Disclosure Agreement Guaranteed
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
