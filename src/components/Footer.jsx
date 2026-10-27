import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, SERVICES, INDUSTRIES } from '../data/siteData';

export default function Footer({ onOpenModal }) {
  return (
    <footer id="contact" className="site-footer">
      {/* Top Footer Strip */}
      <div className="footer-top-strip">
        <div className="container footer-strip-container">
          <div className="strip-left">
            <span className="strip-sparkle">✨</span>
            <span className="strip-heading">Ready to scale your next digital product or enterprise system?</span>
          </div>
          <div className="strip-right">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onOpenModal('Footer Consultation')}
            >
              Get Free Consultation
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Black%20Grapes%20Softech,%20I%20would%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm footer-whatsapp-btn"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Column 1: Brand Info & About */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-wrapper">
              <img
                src="/bgst-logo.png"
                alt="Black Grapes Softech"
                className="footer-logo-img"
              />
              <div className="footer-brand-title">
                <span className="name">BLACK GRAPES</span>
                <span className="sub">SOFTECH &bull; INDORE</span>
              </div>
            </Link>

            <p className="footer-about-text">
              {COMPANY_INFO.tagline}. {COMPANY_INFO.subTagline} Extending premium IT services in custom software development, mobile apps, CRM, MLM, and offshore technical partnerships.
            </p>

            <div className="footer-trust-chips">
              <span className="trust-chip">⭐ 10+ Years</span>
              <span className="trust-chip">🛡️ 100% Secure</span>
              <span className="trust-chip">🚀 150+ Projects</span>
            </div>
          </div>

          {/* Column 2: Services Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to="/#services" className="footer-link">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Strategic Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home Page</Link></li>
              <li><Link to="/#about" className="footer-link">About Company</Link></li>
              <li><Link to="/partnership" className="footer-link highlight-footer-link">Partnership Program</Link></li>
              <li><Link to="/contact-us" className="footer-link highlight-footer-link">Contact Us</Link></li>
              <li><Link to="/#projects" className="footer-link">Our Projects</Link></li>
              <li><Link to="/#industries" className="footer-link">Industries</Link></li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => onOpenModal('Careers Inquiry')}
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => onOpenModal('Request a Demo')}
                >
                  Request a Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (Direct from Live Site) */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">
              <Link to="/contact-us" className="footer-heading-link">Contact Us</Link>
            </h4>

            {/* Address 1 */}
            <div className="footer-contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-details">
                <strong>Registered Office:</strong>
                <address className="contact-address">{COMPANY_INFO.address}</address>
              </div>
            </div>

            {/* Address 2 */}
            <div className="footer-contact-item">
              <span className="contact-icon">🏢</span>
              <div className="contact-details">
                <strong>Corporate Branch:</strong>
                <address className="contact-address">
                  Office No. 1141, Scheme No. 114, Part-1, Vijay Nagar, Indore - 452010
                </address>
              </div>
            </div>

            {/* Emails */}
            <div className="footer-contact-item">
              <span className="contact-icon">✉️</span>
              <div className="contact-details">
                <strong>Official Inquiries:</strong>
                {COMPANY_INFO.emails.map((email, i) => (
                  <a key={i} href={`mailto:${email}`} className="contact-link">
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Phones */}
            <div className="footer-contact-item">
              <span className="contact-icon">📞</span>
              <div className="contact-details">
                <strong>Direct Call / WhatsApp:</strong>
                {COMPANY_INFO.phones.map((phone, i) => (
                  <a key={i} href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-link">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy-text">
            {COMPANY_INFO.copyright}
          </p>
          <div className="footer-bottom-badge">
            <span>⚡ Next-Generation Digital Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
