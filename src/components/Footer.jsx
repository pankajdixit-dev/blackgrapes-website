import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Sparkles 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export default function Footer({ onOpenModal, onOpenInquiry }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleOpenAction = (title = 'Request a Demo') => {
    if (onOpenModal) {
      onOpenModal(title);
    } else if (onOpenInquiry) {
      onOpenInquiry(title);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="site-footer">
      {/* Top CTA Banner */}
      <div className="container footer-cta-container">
        <div className="footer-cta-card">
          <div className="cta-left">
            <span className="badge-pill mb-2">✨ Transform Your Vision</span>
            <h3 className="footer-cta-title">
              Ready to Accelerate Your Business with <span className="text-gradient">Next-Gen Tech</span>?
            </h3>
            <p className="footer-cta-desc">
              From enterprise software engineering and bespoke mobile apps to certified asset valuation and statutory approvals.
            </p>
          </div>
          <div className="cta-right">
            <button
              type="button"
              className="btn btn-primary cta-btn"
              onClick={() => handleOpenAction('Free Consultation & Proposal')}
            >
              <Sparkles size={16} />
              <span>Request Free Consultation</span>
              <ArrowRight size={16} />
            </button>
            <Link to="/services" className="btn btn-secondary cta-btn">
              Explore All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Column 1: Brand & Profile */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand" aria-label="Black Grapes Softech">
              <div className="brand-logo-wrap">
                <img
                  src="/bgst-logo.png"
                  alt="Black Grapes Logo"
                  className="footer-logo-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
              </div>
              <div>
                <span className="footer-brand-title">BLACK <span className="text-orange">GRAPES</span></span>
                <span className="footer-brand-sub">SOFTECH &bull; GROUP</span>
              </div>
            </Link>

            <p className="footer-about-text">
              10+ Years of Proven IT Excellence. We engineer scalable custom software, iOS &amp; Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion portals.
            </p>

            <div className="footer-trust-badge">
              <ShieldCheck size={18} className="trust-icon" />
              <span>ISO 9001:2015 &amp; Quality Assured Engineering</span>
            </div>

            <div className="social-links-row mt-3">
              <a href="https://www.linkedin.com/in/black-grapes-softech/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-circle">in</a>
              <a href="https://twitter.com/grapessoftech" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-circle">𝕏</a>
              <a href="https://www.instagram.com/blackgrapessoftech/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-circle">ig</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-circle">fb</a>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="footer-col">
            <h4 className="footer-heading">
              <Link to="/services" className="footer-heading-link">Services Hub</Link>
            </h4>
            <ul className="footer-link-list">
              <li><Link to="/services">Software Development</Link></li>
              <li><Link to="/services">Mobile App Engineering</Link></li>
              <li><Link to="/services">Enterprise CRM &amp; ERP</Link></li>
              <li><Link to="/services">MLM Software Systems</Link></li>
              <li><Link to="/services">Web Portals &amp; Cloud Apps</Link></li>
              <li><Link to="/services">Digital Growth &amp; SEO</Link></li>
              <li><Link to="/services">UI/UX &amp; Brand Systems</Link></li>
              <li><Link to="/services">Interactive Game Dev</Link></li>
            </ul>
          </div>

          {/* Column 3: Proprietary Products & Solutions */}
          <div className="footer-col">
            <h4 className="footer-heading">Solutions &amp; Ecosystem</h4>
            <ul className="footer-link-list">
              <li><Link to="/products">Proprietary Software Catalog</Link></li>
              <li><Link to="/clients">Client Case Studies</Link></li>
              <li><Link to="/it-staffing">IT &amp; Technical Staffing</Link></li>
              <li><Link to="/ecommerce">E-Commerce &amp; Hardware</Link></li>
              <li><Link to="/partnership">Partner Program (ODC)</Link></li>
              <li><Link to="/about">About Black Grapes</Link></li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleOpenAction('Schedule Demo')}
                >
                  Request a Live Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">
              <Link to="/contact" className="footer-heading-link">Contact &amp; Offices</Link>
            </h4>

            {/* Address 1 */}
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon text-orange" />
              <div className="contact-details">
                <strong>Registered Office:</strong>
                <address className="contact-address">{COMPANY_INFO.address}</address>
              </div>
            </div>

            {/* Address 2 */}
            <div className="footer-contact-item">
              <Building2 size={18} className="contact-icon text-purple" />
              <div className="contact-details">
                <strong>Corporate Office:</strong>
                <address className="contact-address">
                  252-F/H Scheme No 54, Vijaynagar, Indore - 452010, MP
                </address>
              </div>
            </div>

            {/* Emails */}
            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <div className="contact-details">
                <strong>Direct Inquiries:</strong>
                <a href={`mailto:${COMPANY_INFO.emails[0]}`} className="contact-link">
                  {COMPANY_INFO.emails[0]}
                </a>
              </div>
            </div>

            {/* Phones */}
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div className="contact-details">
                <strong>Call / WhatsApp:</strong>
                <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`} className="contact-link">
                  {COMPANY_INFO.phones[0]}
                </a>
                <span className="text-dim">, </span>
                <a href={`tel:${COMPANY_INFO.phones[1].replace(/\s+/g, '')}`} className="contact-link">
                  {COMPANY_INFO.phones[1]}
                </a>
              </div>
            </div>

            {/* Quick newsletter */}
            <div className="footer-newsletter mt-3">
              <span className="newsletter-title text-sm font-semibold">Stay Updated:</span>
              {subscribed ? (
                <div className="subscribe-success text-green-400 flex items-center gap-1 text-xs">
                  <CheckCircle2 size={14} /> Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form mt-1">
                  <input
                    type="email"
                    placeholder="Enter business email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" aria-label="Subscribe to newsletter">
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
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
          <div className="footer-bottom-links">
            <Link to="/about">About Us</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/services">Services</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/products">Products</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/contact">Contact</Link>
            <span className="dot-sep">&bull;</span>
            <span className="built-with">
              Crafted with <Heart size={13} className="heart-icon text-red-500" /> in Indore, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
