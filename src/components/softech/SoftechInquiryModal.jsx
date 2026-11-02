import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Phone, Mail, User, Briefcase } from 'lucide-react';
import { softechServices } from '../../data/softechServicesData';

export default function SoftechInquiryModal({ initialService, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: initialService ? initialService.title : 'Web Designing and Development',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: `Softech: ${formData.requirement}`,
          message: formData.message
        })
      });
    } catch {
      // Local graceful fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog-black" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="softech-inquiry-title"
      >
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(248, 98, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#f86200'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
              Inquiry Lodged with Black Grapes Softech!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name}</strong>. Our technical engineering lead for <strong>{formData.requirement}</strong> will connect with you within 2 business hours.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={onClose}
              style={{ width: '100%', maxWidth: '240px', margin: '0 auto', justifyContent: 'center' }}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
                  <Sparkles size={12} /> Black Grapes Softech Inquiry
                </span>
              </div>
              <h2 id="softech-inquiry-title" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.35rem' }}>
                Request IT Consultation & Quote
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Share your requirements to get a custom roadmap and proposal.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label className="form-label" htmlFor="sf-name">Full Name *</label>
                <div className="input-group">
                  <User size={16} className="input-icon" />
                  <input
                    id="sf-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="form-label" htmlFor="sf-email">Email Address *</label>
                  <div className="input-group">
                    <Mail size={16} className="input-icon" />
                    <input
                      id="sf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="sf-phone">Phone Number *</label>
                  <div className="input-group">
                    <Phone size={16} className="input-icon" />
                    <input
                      id="sf-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Your Contact Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Requirement Dropdown List (Exact Official Selector) */}
              <div>
                <label className="form-label" htmlFor="sf-req">
                  Select Your Requirement (Dropdown List) *
                </label>
                <div className="input-group">
                  <Briefcase size={16} className="input-icon" />
                  <select
                    id="sf-req"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="Web Designing and Development">Website Designing and Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="CRM Software Development">CRM Software Development</option>
                    <option value="MLM Software Development">MLM Software Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphic Designing">Graphic Designing</option>
                    <option value="Game Development">Game Development</option>
                    <option value="Private Tender Services">Private & Government Tender Services</option>
                    <option value="IT Staffing">IT Staffing & Dedicated Squads</option>
                    <option value="Other">Other Custom Requirement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="sf-msg">Project Scope / Details</label>
                <textarea
                  id="sf-msg"
                  name="message"
                  rows={3}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                {loading ? 'Submitting...' : 'Send Inquiry to Softech'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
