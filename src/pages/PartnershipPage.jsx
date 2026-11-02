import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import '../styles/Partnership.css';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      contact: '',
      city: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="partnership-page-container">
      <div className="container">
        {/* Top Header */}
        <div className="partner-page-header">
          <div className="partner-eyebrow">
            <Sparkles size={14} />
            <span>PARTNERSHIP</span>
          </div>
          <h1 className="partner-page-title"><span className="text-gradient">Partnership</span></h1>
          <p className="partner-page-subtitle">
            Cultivating long-term strategic relationships and delivering high-velocity offshore technology development.
          </p>
        </div>

        {/* 2-Column Split Layout: Partner With Us Content + Form */}
        <div className="partner-with-us-grid">
          {/* Left Column: Authentic Content from https://blackgrapessoftech.com/partnership/ */}
          <div className="partner-content-card">
            <h2 className="partner-heading-main">Partner With Us</h2>
            <p className="partner-desc-text">
              If you are an IT or web software development company and are eager to expand your operations here in India, we are ready to help you as your development centre. Our business community is focused on cultivating long-term relationships with our clients and offers excellent experiences covering the strategic insights. Partnering with us enables you to provide endless growth and development. You can share our resources for your project requirements to work on technical areas that directly affect the growth of the organization.
            </p>

            <div className="partner-img-wrapper">
              <img
                src="/partners/partner_with_us.webp"
                alt="Partner With Us - Black Grapes Softech"
                className="partner-feature-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://blackgrapessoftech.com/wp-content/uploads/elementor/thumbs/download-qgt1jk7bs4228h6seuo0sgqmw7vet6s2p2wi6s411u.webp";
                }}
              />
            </div>
          </div>

          {/* Right Column: Please tell us a bit about yourself Form */}
          <div className="partner-form-box">
            <h3 className="form-card-title">Please tell us a bit about yourself</h3>
            <p className="form-card-sub">
              Fill in your details below to explore development centre partnerships with our team.
            </p>

            {isSubmitted ? (
              <div className="partner-success-box">
                <div className="success-icon-badge">✓</div>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Thank you, {formData.name}!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  Your partnership details have been received successfully. Our director and partnership desk will connect with you at <strong>{formData.email}</strong> or <strong>{formData.contact}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="partner-form-fields">
                <div className="partner-input-wrap">
                  <label htmlFor="partner-name" className="partner-input-label">
                    Name
                  </label>
                  <input
                    id="partner-name"
                    type="text"
                    required
                    className="partner-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="partner-input-wrap">
                  <label htmlFor="partner-email" className="partner-input-label">
                    Your Email
                  </label>
                  <input
                    id="partner-email"
                    type="email"
                    required
                    className="partner-input"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="partner-input-wrap">
                  <label htmlFor="partner-contact" className="partner-input-label">
                    Your Contact
                  </label>
                  <input
                    id="partner-contact"
                    type="tel"
                    required
                    className="partner-input"
                    placeholder="Your Contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>

                <div className="partner-input-wrap">
                  <label htmlFor="partner-city" className="partner-input-label">
                    Your City
                  </label>
                  <input
                    id="partner-city"
                    type="text"
                    required
                    className="partner-input"
                    placeholder="Your City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="partner-input-wrap">
                  <label htmlFor="partner-message" className="partner-input-label">
                    Message
                  </label>
                  <textarea
                    id="partner-message"
                    rows="4"
                    className="partner-textarea"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary partner-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>100% Confidentiality &amp; Quick Response Guaranteed</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
