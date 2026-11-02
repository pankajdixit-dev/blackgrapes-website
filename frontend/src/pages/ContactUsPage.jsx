import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_PAGE_DATA, REQUIREMENT_OPTIONS } from '../data/siteData';

export default function ContactUsPage({ onOpenModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: REQUIREMENT_OPTIONS[0],
    timeline: 'Immediate (< 2 Weeks)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState('head-office');
  const [activeFaq, setActiveFaq] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  const requirementPills = [
    { label: 'Website Development', icon: '🌐' },
    { label: 'Mobile App Development', icon: '📱' },
    { label: 'Software Development', icon: '💻' },
    { label: 'CRM Software Development', icon: '📊' },
    { label: 'MLM Software Development', icon: '🔗' },
    { label: 'Digital Marketing', icon: '📈' },
    { label: 'Graphic Designing', icon: '🎨' },
    { label: 'Game Development', icon: '🎮' },
    { label: 'Government / Private Tender', icon: '📑' },
    { label: 'Other Custom IT Requirement', icon: '✨' }
  ];

  const timelinePills = [
    'Immediate (< 2 Weeks)',
    '1-2 Months',
    '3+ Months',
    'Planning & Scoping Stage'
  ];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      requirement: REQUIREMENT_OPTIONS[0],
      timeline: 'Immediate (< 2 Weeks)',
      message: ''
    });
  };

  return (
    <div className="inner-page contact-page">
      {/* 1. Futuristic Contact Command Center Header */}
      <section className="page-hero-banner" role="banner">
        <div className="hero-grid-pattern" aria-hidden="true"></div>
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <span className="breadcrumb-icon">⌂</span> Home
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Contact Us</span>
          </nav>

          <div className="page-hero-content">
            <div className="page-hero-badge">
              <span className="badge-pulse-dot green"></span>
              <span>LIVE TECH DESK &bull; RESPONSE WITHIN 30 MINS</span>
            </div>

            <h1 className="page-hero-title">
              Let's Connect &amp; Digitalize Your Ideas into Success
            </h1>

            <p className="page-hero-subtitle">
              Have an ambitious vision or need mission-critical enterprise engineering? Reach out to our
              direct technical consultants for instant estimates, technological blueprints, and NDA protected discussions.
            </p>

            {/* Quick Action Contact Pills */}
            <div className="contact-quick-pills">
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                className="contact-quick-pill"
              >
                <span className="quick-pill-icon">📞</span>
                <span className="quick-pill-text">Call: {COMPANY_INFO.phones[0]}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Black%20Grapes%20Softech,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-quick-pill wa-pill"
              >
                <span className="quick-pill-icon">💬</span>
                <span className="quick-pill-text">WhatsApp: Instant Chat</span>
              </a>

              <a
                href="mailto:info@blackgrapessoftech.com"
                className="contact-quick-pill"
              >
                <span className="quick-pill-icon">✉️</span>
                <span className="quick-pill-text">info@blackgrapessoftech.com</span>
              </a>

              <div className="contact-quick-pill timing-pill">
                <span className="quick-pill-icon">⏱️</span>
                <span className="quick-pill-text">Mon - Sat: 9:00 AM - 8:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 Luxury Contact Cards Grid */}
      <section className="page-section contact-cards-section">
        <div className="container">
          <div className="contact-cards-grid">
            {/* Card 1: Registered Head Office */}
            <div className="contact-info-card card-glow-orange">
              <div className="card-top-indicator">
                <span className="card-badge-pill">HEADQUARTERS</span>
                <span className="beacon-live"></span>
              </div>

              <div className="contact-card-icon-wrap">
                <span className="contact-card-emoji">📍</span>
              </div>

              <h3 className="contact-card-title">Registered Head Office</h3>
              <p className="contact-card-address">
                252-F/H Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India
              </p>

              <div className="contact-card-meta">
                <span className="meta-landmark">🏛️ Landmark: Near Vijay Nagar Square &amp; C21 Mall</span>
              </div>

              <div className="contact-card-actions">
                <a
                  href="https://maps.app.goo.gl/8CGaCBy9xGM63Ryi7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-btn primary"
                >
                  <span>Google Maps</span>
                  <span className="btn-arrow">&rarr;</span>
                </a>
                <button
                  type="button"
                  className="contact-action-btn secondary"
                  onClick={() => handleCopy('252-F/H Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India', 'addr1')}
                >
                  {copiedKey === 'addr1' ? '✓ Copied' : '📋 Copy Address'}
                </button>
              </div>
            </div>

            {/* Card 2: Corporate Branch Office */}
            <div className="contact-info-card card-glow-purple">
              <div className="card-top-indicator">
                <span className="card-badge-pill purple">CORPORATE BRANCH</span>
                <span className="beacon-live purple"></span>
              </div>

              <div className="contact-card-icon-wrap accent-purple">
                <span className="contact-card-emoji">🏢</span>
              </div>

              <h3 className="contact-card-title">Corporate Tech Center</h3>
              <p className="contact-card-address">
                Office No. 1141, Scheme No. 114, Part-1, Vijay Nagar, Indore (M.P) - 452010
              </p>

              <div className="contact-card-meta">
                <span className="meta-landmark">🎓 Landmark: Scheme 114, Near Prestige Institute</span>
              </div>

              <div className="contact-card-actions">
                <a
                  href="https://maps.app.goo.gl/cLc1MrNRq74cPSmGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-btn primary"
                >
                  <span>Google Maps</span>
                  <span className="btn-arrow">&rarr;</span>
                </a>
                <button
                  type="button"
                  className="contact-action-btn secondary"
                  onClick={() => handleCopy('Office No. 1141, Scheme No. 114, Part-1, Vijay Nagar, Indore (M.P) - 452010', 'addr2')}
                >
                  {copiedKey === 'addr2' ? '✓ Copied' : '📋 Copy Address'}
                </button>
              </div>
            </div>

            {/* Card 3: Direct Email Desks */}
            <div className="contact-info-card card-glow-cyan">
              <div className="card-top-indicator">
                <span className="card-badge-pill cyan">OFFICIAL INBOX</span>
              </div>

              <div className="contact-card-icon-wrap accent-cyan">
                <span className="contact-card-emoji">✉️</span>
              </div>

              <h3 className="contact-card-title">Direct Email Desks</h3>
              <div className="contact-sub-items-list">
                <div className="sub-contact-row">
                  <div className="sub-meta">
                    <span className="sub-tag">General Inquiries:</span>
                    <a href="mailto:info@blackgrapessoftech.com" className="sub-link">
                      info@blackgrapessoftech.com
                    </a>
                  </div>
                  <button
                    type="button"
                    className="icon-copy-btn"
                    title="Copy Email"
                    onClick={() => handleCopy('info@blackgrapessoftech.com', 'email1')}
                  >
                    {copiedKey === 'email1' ? '✓' : '📋'}
                  </button>
                </div>

                <div className="sub-contact-row">
                  <div className="sub-meta">
                    <span className="sub-tag">Technical Director:</span>
                    <a href="mailto:blackgrapes.arpitjain@gmail.com" className="sub-link">
                      blackgrapes.arpitjain@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    className="icon-copy-btn"
                    title="Copy Email"
                    onClick={() => handleCopy('blackgrapes.arpitjain@gmail.com', 'email2')}
                  >
                    {copiedKey === 'email2' ? '✓' : '📋'}
                  </button>
                </div>

                <div className="sub-contact-row">
                  <div className="sub-meta">
                    <span className="sub-tag">Operations &amp; HR:</span>
                    <a href="mailto:blackgrapes.deepikajain@gmail.com" className="sub-link">
                      blackgrapes.deepikajain@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    className="icon-copy-btn"
                    title="Copy Email"
                    onClick={() => handleCopy('blackgrapes.deepikajain@gmail.com', 'email3')}
                  >
                    {copiedKey === 'email3' ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Hotline & Direct WhatsApp */}
            <div className="contact-info-card card-glow-emerald">
              <div className="card-top-indicator">
                <span className="card-badge-pill emerald">INSTANT HOTLINE</span>
                <span className="beacon-live green"></span>
              </div>

              <div className="contact-card-icon-wrap accent-emerald">
                <span className="contact-card-emoji">📞</span>
              </div>

              <h3 className="contact-card-title">Phone &amp; WhatsApp</h3>
              <div className="contact-sub-items-list">
                <div className="sub-contact-row">
                  <div className="sub-meta">
                    <span className="sub-tag">Primary Line &amp; WhatsApp:</span>
                    <a href="tel:+917470997884" className="sub-link highlight">
                      +91 7470997884
                    </a>
                  </div>
                  <button
                    type="button"
                    className="icon-copy-btn"
                    title="Copy Phone"
                    onClick={() => handleCopy('+917470997884', 'phone1')}
                  >
                    {copiedKey === 'phone1' ? '✓' : '📋'}
                  </button>
                </div>

                <div className="sub-contact-row">
                  <div className="sub-meta">
                    <span className="sub-tag">Consultation Helpline:</span>
                    <a href="tel:+916262414463" className="sub-link highlight">
                      +91 6262414463
                    </a>
                  </div>
                  <button
                    type="button"
                    className="icon-copy-btn"
                    title="Copy Phone"
                    onClick={() => handleCopy('+916262414463', 'phone2')}
                  >
                    {copiedKey === 'phone2' ? '✓' : '📋'}
                  </button>
                </div>

                <div className="hours-badge">
                  <span>⏱️ Mon - Sat: 9:00 AM - 8:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leave a Message Section with Modern Visual Form */}
      <section className="page-section contact-form-section">
        <div className="container">
          <div className="contact-split-grid">
            {/* Left: Why Contact Us & Direct WhatsApp Card */}
            <div className="contact-split-info">
              <div className="section-badge-wrap">
                <span className="badge-dot"></span>
                <span className="section-badge-text">2-HOUR PROMISE</span>
              </div>

              <h2 className="section-heading-gradient">
                Leave a message
              </h2>

              <p className="contact-split-lead">
                Feel free to contact us for any questions and doubts. Whether you're exploring customized IT solutions,
                requesting an enterprise quote, or planning an offshore engagement, our team provides transparent, actionable guidance.
              </p>

              {/* High-Tech Trust Pillars */}
              <div className="contact-guarantee-grid">
                <div className="guarantee-chip-item">
                  <span className="chip-icon">⚡</span>
                  <div className="chip-content">
                    <strong>Fast Technical Review (&lt; 2 Hours)</strong>
                    <p>Every submission is personally reviewed by our senior technical architects.</p>
                  </div>
                </div>

                <div className="guarantee-chip-item">
                  <span className="chip-icon">🔒</span>
                  <div className="chip-content">
                    <strong>100% Confidentiality &amp; NDA</strong>
                    <p>Your commercial ideas and technical specifications are safe with us.</p>
                  </div>
                </div>

                <div className="guarantee-chip-item">
                  <span className="chip-icon">📊</span>
                  <div className="chip-content">
                    <strong>Zero-Cost Architectural Estimate</strong>
                    <p>Receive a line-item sprint breakdown with transparent pricing and milestone roadmap.</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="direct-wa-callout">
                <div className="wa-icon-large">💬</div>
                <div className="wa-callout-text">
                  <strong>Prefer Live Messaging on WhatsApp?</strong>
                  <p>Skip the form and chat directly with Arpit Jain &amp; the engineering team for an instant response.</p>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Black%20Grapes%20Softech,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm wa-chat-btn"
                  >
                    <span>Open WhatsApp Chat</span>
                    <span className="btn-arrow">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: "Leave a message" Interactive Form Card */}
            <div className="contact-split-form-wrap">
              <div className="contact-form-card">
                <div className="form-card-header">
                  <span className="card-top-tag">DIRECT INQUIRY DESK</span>
                  <h3 className="form-card-title">Send a Message to Our Engineers</h3>
                  <p className="form-card-desc">
                    Tell us what you're building. We typically reply with a scope estimate within 2 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="form-success-card">
                    <div className="success-badge-icon">✓</div>
                    <h4 className="success-heading">Thank You, {formData.name || 'Valued Client'}!</h4>
                    <p className="success-text">
                      Your message regarding <strong>{formData.requirement}</strong> has been received by our lead consultant.
                      We will reach out to you at <strong>{formData.phone || formData.email}</strong> within 2 business hours.
                    </p>

                    <div className="success-meta-box">
                      <div className="meta-line">
                        <span>Email Confirmation:</span>
                        <strong>{formData.email}</strong>
                      </div>
                      <div className="meta-line">
                        <span>Target Timeline:</span>
                        <strong>{formData.timeline}</strong>
                      </div>
                      <div className="meta-line">
                        <span>Response Guarantee:</span>
                        <strong className="status-badge">Under 2 Hours</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline btn-full"
                      onClick={handleReset}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-actual-form">
                    {/* Visual Requirement Selector Chips */}
                    <div className="form-group">
                      <label className="form-label">Select Your Requirement *</label>
                      <div className="form-req-chips-grid">
                        {requirementPills.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`req-chip-btn ${formData.requirement === p.label ? 'active-chip' : ''}`}
                            onClick={() => setFormData({ ...formData, requirement: p.label })}
                          >
                            <span>{p.icon}</span>
                            <span>{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-form-name" className="form-label">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        placeholder="Name"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="contact-form-phone" className="form-label">
                          Mobile Number *
                        </label>
                        <input
                          id="contact-form-phone"
                          type="tel"
                          required
                          placeholder="Your Contact Number"
                          className="form-input"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-form-email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          id="contact-form-email"
                          type="email"
                          required
                          placeholder="Email"
                          className="form-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Timeline Expectation</label>
                      <div className="form-timeline-pills">
                        {timelinePills.map((t, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`timeline-pill-btn ${formData.timeline === t ? 'active-t-pill' : ''}`}
                            onClick={() => setFormData({ ...formData, timeline: t })}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-form-msg" className="form-label">
                        Message / Project Scope
                      </label>
                      <textarea
                        id="contact-form-msg"
                        rows="3"
                        placeholder="Your Message"
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-full submit-contact-btn"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message Now</span>
                          <span className="btn-sparkle">✨</span>
                        </>
                      )}
                    </button>

                    <p className="form-security-footnote">
                      🔒 Guaranteed 100% data privacy. No spam. Bilateral Non-Disclosure protection.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Dual Office Map Hub */}
      <section className="page-section contact-map-section">
        <div className="container">
          <div className="map-header-bar">
            <div>
              <span className="section-tag-glow">PHYSICAL HEADQUARTERS</span>
              <h2 className="section-main-heading">Visit Our Indore Offices</h2>
              <p className="section-lead-desc">
                Schedule an in-person meeting with our technical directors at either of our Vijay Nagar campuses.
              </p>
            </div>

            {/* Office Switcher Tabs */}
            <div className="map-office-tabs">
              <button
                type="button"
                className={`map-tab-btn ${activeOffice === 'head-office' ? 'tab-active' : ''}`}
                onClick={() => setActiveOffice('head-office')}
              >
                <span>📍 Scheme No 54 (Head Office)</span>
              </button>
              <button
                type="button"
                className={`map-tab-btn ${activeOffice === 'corporate-office' ? 'tab-active' : ''}`}
                onClick={() => setActiveOffice('corporate-office')}
              >
                <span>🏢 Scheme No 114 (Corporate Branch)</span>
              </button>
            </div>
          </div>

          <div className="map-container-card">
            {activeOffice === 'head-office' ? (
              <iframe
                title="Black Grapes Softech - Scheme 54 Head Office"
                src="https://maps.google.com/maps?q=Black%20Grapes%20Softech%2C%20252-F%2FH%2C%20Scheme%20No%2054%2C%20Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010&t=m&z=15&output=embed&iwloc=near"
                className="map-iframe"
                loading="lazy"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                title="Black Grapes Softech - Scheme 114 Corporate Branch"
                src="https://maps.google.com/maps?q=Office%20No.1141%2C%20Scheme%20No.114%2C%20Part-1%2C%20Vijay%20Nagar%2C%20Indore%20(M.P)-452010&t=m&z=15&output=embed&iwloc=near"
                className="map-iframe"
                loading="lazy"
                allowFullScreen
              ></iframe>
            )}

            <div className="map-overlay-info-pill">
              <div className="overlay-pin-block">
                <span className="map-pin-pulse"></span>
                <div className="overlay-text">
                  <strong>
                    {activeOffice === 'head-office'
                      ? 'Scheme No 54 Campus (Registered Headquarters)'
                      : 'Scheme No 114 Campus (Corporate Tech Center)'}
                  </strong>
                  <span>
                    {activeOffice === 'head-office'
                      ? '252-F/H Scheme No 54, Vijay Nagar, Indore - 452010'
                      : 'Office No. 1141, Scheme No. 114, Part-1, Vijay Nagar, Indore - 452010'}
                  </span>
                </div>
              </div>

              <div className="overlay-action-buttons">
                <a
                  href={
                    activeOffice === 'head-office'
                      ? 'https://maps.app.goo.gl/8CGaCBy9xGM63Ryi7'
                      : 'https://maps.app.goo.gl/cLc1MrNRq74cPSmGA'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Open in Google Maps App</span>
                  <span className="btn-arrow">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Inquiries Accordion */}
      <section className="page-section contact-faqs-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-glow">COMMON QUERIES</span>
            <h2 className="section-main-heading">Frequently Asked Questions</h2>
            <p className="section-lead-desc">
              Here are direct answers regarding estimates, technical consultations, and in-person visits.
            </p>
          </div>

          <div className="faqs-accordion-list">
            {CONTACT_PAGE_DATA.contactFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-accordion-item ${activeFaq === idx ? 'faq-item-open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question-row">
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-block">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
