import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

// Social Channel SVG Icons
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer({ onOpenModal, onOpenInquiry }) {
  const location = useLocation();
  const hideTopCta = ['/services', '/products', '/our-products', '/softech-services'].some(p => 
    location.pathname.toLowerCase().startsWith(p)
  );
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
      {/* Top CTA Banner (Hidden on Services and Products pages as requested) */}
      

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
              <a
                href="https://www.linkedin.com/in/black-grapes-softech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="social-circle"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://twitter.com/grapessoftech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                title="Twitter / X"
                className="social-circle"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.instagram.com/blackgrapessoftech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="social-circle"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/blackgrapessoftech.fb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="social-circle"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="social-circle"
              >
                <YoutubeIcon />
              </a>
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
