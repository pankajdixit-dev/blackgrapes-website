import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Building, Mail, Phone, User, MessageSquare } from 'lucide-react';
import '../Styles/DemoModal.css';

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: 'CRM Software Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      requirement: 'CRM Software Development',
      message: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="success-icon" />
            </div>
            <h3 className="success-title">Enquiry Received!</h3>
            <p className="success-desc">
              Thank you, <strong>{formData.name}</strong>. Our technical architecture team at Black Grapes Softech will reach out within 2 hours.
            </p>
            <button onClick={handleReset} className="btn btn-primary mt-4">
              Close Window
            </button>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-header">
              <span className="badge badge-purple">
                <Sparkles size={13} /> Direct Connect
              </span>
              <h3 className="modal-title">Request a Live Demo / Quote</h3>
              <p className="modal-subtitle">
                Discuss your custom software, web, mobile, or enterprise application with our engineering leaders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">
                  <User size={15} /> Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={15} /> Business Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={15} /> Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your Contact Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Building size={15} /> Required Service Domain
                </label>
                <select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="CRM Software Development">CRM Software Development</option>
                  <option value="MLM Software Development">MLM Software Development</option>
                  <option value="Custom Software Development">Enterprise Software Development</option>
                  <option value="Mobile App Development">Mobile App Development (iOS & Android)</option>
                  <option value="Web Designing & Development">Modern Web Application Architecture</option>
                  <option value="Digital Marketing & SEO">Digital Marketing & Growth Engine</option>
                  <option value="Graphic Designing & UI/UX">Graphic Designing & UI/UX Product Design</option>
                  <option value="Game Development">Game & Interactive Experience Development</option>
                  <option value="Tendering Services">Government & Private Tender Services</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={15} /> Project Brief / Requirements
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary modal-submit-btn"
              >
                {loading ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Schedule Free Technical Consultation</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
