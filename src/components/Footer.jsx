import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import logoImg from '../assets/bgst-logo.png';
import { useSiteSettings, useServices } from '../services/useContent';
import '../Styles/Footer.css';

export default function Footer({ onOpenDemoModal }) {
  const { settings } = useSiteSettings();
  const { services } = useServices();

  const footerAboutText = settings?.footer_about_text ||
    'We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.';

  const officeAddress = settings?.office_address ||
    '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India';

  const primaryEmail = settings?.primary_email || 'info@blackgrapessoftech.com';
  const primaryPhone = settings?.primary_phone || '+91 7470997884';
  const secondaryPhone = settings?.secondary_phone || '+91 6262414463';

  const trustBadge = settings?.footer_trust_badge || 'ISO & Quality Assured Development Standards';
  const copyrightText = settings?.copyright_text || `© ${new Date().getFullYear()} Black Grapes Softech Pvt. Ltd. All rights reserved.`;

  const linkedinUrl = settings?.social_linkedin || 'https://www.linkedin.com/in/black-grapes-softech/';
  const twitterUrl = settings?.social_twitter || 'https://twitter.com/grapessoftech';
  const instagramUrl = settings?.social_instagram || 'https://www.instagram.com/blackgrapessoftech/';
  const youtubeUrl = settings?.social_youtube || 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ';

  const displayedServices = (services && services.length > 0)
    ? services.slice(0, 7)
    : [
        { title: 'Web App Architecture' },
        { title: 'Mobile App Development (iOS/Android)' },
        { title: 'Enterprise CRM Solutions' },
        { title: 'MLM Software Systems' },
        { title: 'Digital Growth & SEO' },
        { title: 'UI/UX & Brand Identity' },
        { title: 'Interactive Game Development' }
      ];

  return (
    <footer className="site-footer">
      {/* Top CTA Banner Strip inside Footer */}
      <div className="footer-top-cta">
        <div className="container">
          <div className="footer-cta-card">
            <div className="footer-cta-content">
              <span className="badge badge-purple">
                <Sparkles size={14} /> Ready to Transform Your Business?
              </span>
              <h3 className="footer-cta-title">Let’s Engineer Your Next Breakthrough Idea</h3>
              <p className="footer-cta-desc">
                Partner with Indore's top-tier tech powerhouse for custom software, mobile apps, CRM, and cloud platforms.
              </p>
            </div>
            <div className="footer-cta-action">
              <button onClick={onOpenDemoModal} className="btn btn-primary btn-glow">
                <span>Start Your Project</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <img src={settings?.logo_url || logoImg} alt="Black Grapes Softech" className="footer-logo-img" />
              <div>
                <span className="footer-brand-title">BLACK <span className="text-orange">GRAPES</span></span>
                <span className="footer-brand-sub">SOFTECH PVT. LTD.</span>
              </div>
            </Link>
            <p className="footer-about-text">
              {footerAboutText}
            </p>
            <div className="footer-trust-badge">
              <ShieldCheck size={20} className="trust-icon" />
              <span>{trustBadge}</span>
            </div>
          </div>

          {/* Column 2: Industries */}
          <div className="footer-col">
            <h4 className="footer-col-title">Industries</h4>
            <ul className="footer-link-list">
              <li><Link to="/services">Healthcare & MedTech</Link></li>
              <li><Link to="/services">Food & Quick Delivery</Link></li>
              <li><Link to="/services">E-Commerce Platforms</Link></li>
              <li><Link to="/services">Taxi & Transportation</Link></li>
              <li><Link to="/services">Real Estate & PropTech</Link></li>
              <li><Link to="/services">EdTech & Learning Portals</Link></li>
              <li><Link to="/services">Home Services & On-Demand</Link></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-link-list">
              {displayedServices.map((srv, idx) => (
                <li key={idx}>
                  <Link to="/services">{srv.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>{officeAddress}</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`}>{primaryPhone}</a>, <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`}>{secondaryPhone}</a>
              </div>
            </div>

            <div className="footer-social-box">
              <span className="social-label">Follow Us:</span>
              <div className="social-links-row">
                <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-circle">in</a>
                <a href={twitterUrl} target="_blank" rel="noreferrer" aria-label="Twitter" className="social-circle">𝕏</a>
                <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-circle">ig</a>
                <a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="social-circle">yt</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            {copyrightText}
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="dot-sep">•</span>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <span className="dot-sep">•</span>
            <span className="built-with">
              Crafted with <Heart size={13} className="heart-icon" /> in Indore, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
