import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  Building, 
  FileText 
} from 'lucide-react';
import { submitEnquiry } from '@backend/dataService';
import '../styles/Modal.css';

export default function InquiryModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    urgency: 'Normal',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service || 'Service Inquiry',
        scope: `${formData.company ? `Company: ${formData.company} | ` : ''}${formData.message}`,
        urgency: formData.urgency
      });
      if (res && res.ticket_id) {
        setTicketId(res.ticket_id);
      }
    } catch {
      // offline fallback
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge-pill">📋 Fast Response Consultation</span>
            <h3>{isSubmitted ? 'Inquiry Received' : 'Request Service Proposal & Quote'}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-green-400" />
            </div>
            <h4>Thank You for Connecting!</h4>
            <p>
              Your proposal request{ticketId ? ` (Ticket #${ticketId})` : ''} has been received. Our senior technology consultant will review your specifications and contact you within 2-4 business hours.
            </p>
            <div className="success-action">
              <button type="button" className="btn btn-primary" onClick={handleReset}>
                Done &amp; Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arpit Jain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 7470997884"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Company / Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech Solutions"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Service Domain Required</label>
                <input
                  type="text"
                  placeholder="e.g. Custom Software / Mobile App"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Project Timeline Urgency</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                >
                  <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                  <option value="Normal (1 Month)">Normal (1 Month)</option>
                  <option value="Exploratory / Roadmap">Exploratory / Roadmap</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Project Scope &amp; Brief Specifications</label>
              <textarea
                rows="3"
                placeholder="Share any key modules, preferred tech stack, user scale, or specific challenges..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Send size={15} />
                <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
