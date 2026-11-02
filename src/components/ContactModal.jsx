import React, { useState } from 'react';
import { COMPANY_INFO, REQUIREMENT_OPTIONS } from '../data/siteData';
import { submitEnquiry } from '@backend/dataService';

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
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.requirement,
        message: formData.message,
        scope: modalTitle
      });
      if (res && res.ticket_id) {
        setTicketId(res.ticket_id);
      }
    } catch {
      // offline fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
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
            <div className="modal-success-pane text-center">
              <div className="success-icon-badge">✓</div>
              <h4 className="success-title">Thank You, {formData.name}!</h4>
              <p className="success-desc">
                Your request has been registered in our system{ticketId ? ` (Ref: ${ticketId})` : ''}. Our solution architect will connect with you within 2 hours.
              </p>
              <div className="quick-contact-pill">
                <span>Immediate Assistance: </span>
                <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}>
                  {COMPANY_INFO.phones[0]}
                </a>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block mt-4"
                onClick={handleReset}
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-name">Full Name *</label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="modal-email">Business Email *</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-phone">Phone / WhatsApp *</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-req">Core Requirement *</label>
                <select
                  id="modal-req"
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                >
                  {REQUIREMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="modal-msg">Project Details / Scope (Optional)</label>
                <textarea
                  id="modal-msg"
                  rows="3"
                  placeholder="Tell us briefly about your goals, timeline, and preferred technology..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-action-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="btn-loading">Submitting Request...</span>
                  ) : (
                    <span>Submit &amp; Schedule Call</span>
                  )}
                </button>
              </div>

              <p className="modal-disclaimer">
                🔒 We respect your privacy. No spam guaranteed. Strict bilateral NDAs honored.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
