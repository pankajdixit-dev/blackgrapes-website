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

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 800);
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

        {/* Body */}
        <div className="modal-body">
          {isSubmitted ? (
            <div className="inquiry-success-state">
              <div className="success-icon-badge">
                <CheckCircle2 size={48} className="text-emerald" />
              </div>
              <h4>Thank you, {formData.name || 'Valued Client'}!</h4>
              <p>
                Your consultation request for <strong>"{formData.service || 'Black Grapes Services'}"</strong> has been logged with our senior technical and advisory desk.
              </p>
              <div className="success-reference-box">
                <span>Direct Escalation Desk: <strong>+91 (0731) 400-GRAPES</strong></span>
                <span>Expected Response Window: <strong>Within 2-4 Business Hours</strong></span>
              </div>
              <button type="button" className="btn-primary" onClick={handleReset}>
                Done & Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="inquiry-form">
              <p className="modal-lead-desc">
                Fill in your project or consultation details. Our domain specialists in software, valuation, or corporate legalities will prepare a tailored proposal.
              </p>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Official Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Your Contact Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Company / Organization Name</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Selected Service of Interest *</label>
                  <select 
                    value={formData.service} 
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                  >
                    <option value="">-- Choose Relevant Service --</option>
                    <optgroup label="IT & Software (Black Grapes Softech)">
                      <option value="Custom Software & ERP Development">Custom Software & ERP Development</option>
                      <option value="MLM & Direct Selling Software">MLM & Direct Selling Software</option>
                      <option value="Web & Cloud Portal Engineering">Web & Cloud Portal Engineering</option>
                      <option value="Mobile App Development (iOS/Android)">Mobile App Development (iOS/Android)</option>
                      <option value="Private Tender & Bid Management">Private Tender & Bid Management</option>
                      <option value="Digital Branding & SEO Solutions">Digital Branding & SEO Solutions</option>
                    </optgroup>
                    <optgroup label="Valuation & Engineering (Black Grapes Valuers)">
                      <option value="Immovable Property & Asset Valuation">Immovable Property & Asset Valuation</option>
                      <option value="Plant, Machinery & Equipment Valuation">Plant, Machinery & Equipment Valuation</option>
                      <option value="Chartered Engineer TEV & Certifications">Chartered Engineer TEV & Certifications</option>
                    </optgroup>
                    <optgroup label="Corporate, Legal & Municipal Advisory">
                      <option value="Municipal (Nagar Nigam) & IDA Naksha Pass">Municipal (Nagar Nigam) & IDA Naksha Pass</option>
                      <option value="Industrial Licensing & Trade Compliance">Industrial Licensing & Trade Compliance</option>
                      <option value="Land Diversion, Registry & Title Search">Land Diversion, Registry & Title Search</option>
                    </optgroup>
                    <optgroup label="Real Estate & Investments">
                      <option value="Prime Commercial Property Broking">Prime Commercial Property Broking</option>
                      <option value="Strategic Land & Asset Acquisition">Strategic Land & Asset Acquisition</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timeline / Urgency</label>
                  <select 
                    value={formData.urgency} 
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  >
                    <option value="Immediate (< 1 week)">Immediate (&lt; 1 week)</option>
                    <option value="Normal (2 - 4 weeks)">Normal (2 - 4 weeks)</option>
                    <option value="Planning (1 - 3 months)">Planning (1 - 3 months)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Project Scope or Requirements Overview</label>
                <textarea 
                  rows="3"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry for Immediate Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
