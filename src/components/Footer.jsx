import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import '../Styles/Footer.css';

export default function Footer({ onOpenInquiry }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Top CTA Banner */}
        <div className="footer-cta-banner">
          <div className="cta-banner-text">
            <span className="badge-pill">✨ Transform Your Vision</span>
            <h2>Ready to Elevate Your Business with Black Grapes?</h2>
            <p>From cutting-edge digital platforms to certified asset valuations and corporate compliance.</p>
          </div>
          <div className="cta-banner-actions">
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => onOpenInquiry && onOpenInquiry('General Consultation')}
            >
              <span>Schedule a Free Strategy Call</span>
              <ArrowRight size={18} />
            </button>
            <Link to="/services" className="btn-secondary">
              Explore All Services
            </Link>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon-wrapper">
                <img 
                  src="/images/black_grapes_emblem.jpg" 
                  alt="Black Grapes Logo" 
                  className="brand-icon-img" 
                />
              </div>
              <span className="brand-title">BLACK <span className="gradient-text">GRAPES</span></span>
            </div>
            <p className="brand-bio">
              A premier integrated business conglomerate offering end-to-end IT engineering, government-approved asset valuation, chartered engineering certifications, and strategic corporate advisory.
            </p>
            <div className="cert-badge">
              <ShieldCheck size={18} className="cert-icon" />
              <span>Registered & ISO Compliant Group</span>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: IT & Softech Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Black Grapes Softech</h4>
            <ul className="footer-list">
              <li><Link to="/services?category=softech">Custom Software & ERP</Link></li>
              <li><Link to="/services?category=softech">Web & Cloud Platforms</Link></li>
              <li><Link to="/services?category=softech">Mobile App Development</Link></li>
              <li><Link to="/services?category=softech">MLM & Direct Sales Systems</Link></li>
              <li><Link to="/services?category=softech">Private Tender Services</Link></li>
              <li><Link to="/services?category=softech">Digital Marketing & SEO</Link></li>
            </ul>
          </div>

          {/* Col 3: Valuation & Engineering */}
          <div className="footer-col">
            <h4 className="footer-heading">Valuers & Advisory</h4>
            <ul className="footer-list">
              <li><Link to="/services?category=valuation">Immovable Property Valuation</Link></li>
              <li><Link to="/services?category=valuation">Plant & Machinery Valuation</Link></li>
              <li><Link to="/services?category=valuation">Chartered Engineer Certification</Link></li>
              <li><Link to="/services?category=valuation">TEV & Feasibility Studies</Link></li>
              <li><Link to="/services?category=advisory">Municipal / IDA Naksha Pass</Link></li>
              <li><Link to="/services?category=realestate">Prime Commercial Real Estate</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Corporate Headquarters</h4>
            <div className="contact-items">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>Indore, Madhya Pradesh, India - 452010</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <span>+91 (0731) 400-GRAPES / +91 98930 00000</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span>contact@blackgrapesgroup.com</span>
              </div>
            </div>

            <div className="footer-newsletter">
              <span className="newsletter-title">Subscribe for Strategic Insights</span>
              {subscribed ? (
                <div className="subscribe-success">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter official email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" aria-label="Subscribe">
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Black Grapes Group. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/services">Services Directory</Link>
            <span>&bull;</span>
            <a href="#privacy">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms">Terms of Engagement</a>
            <span>&bull;</span>
            <a href="#compliance">Regulatory Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
