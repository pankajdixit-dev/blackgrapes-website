import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import logoImg from '../assets/bgst-logo.png';
import '../Styles/Footer.css';

export default function Footer({ onOpenDemoModal }) {
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
              <img src={logoImg} alt="Black Grapes Softech" className="footer-logo-img" />
              <div>
                <span className="footer-brand-title">BLACK <span className="text-orange">GRAPES</span></span>
                <span className="footer-brand-sub">SOFTECH PVT. LTD.</span>
              </div>
            </Link>
            <p className="footer-about-text">
              We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.
            </p>
            <div className="footer-trust-badge">
              <ShieldCheck size={20} className="trust-icon" />
              <span>ISO & Quality Assured Development Standards</span>
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
              <li><Link to="/services">Web App Architecture</Link></li>
              <li><Link to="/services">Mobile App Development (iOS/Android)</Link></li>
              <li><Link to="/services">Enterprise CRM Solutions</Link></li>
              <li><Link to="/services">MLM Software Systems</Link></li>
              <li><Link to="/services">Digital Growth & SEO</Link></li>
              <li><Link to="/services">UI/UX & Brand Identity</Link></li>
              <li><Link to="/services">Interactive Game Development</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:info@blackgrapessoftech.com">info@blackgrapessoftech.com</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <a href="tel:+917470997884">+91 7470997884</a>, <a href="tel:+916262414463">+91 6262414463</a>
              </div>
            </div>

            <div className="footer-social-box">
              <span className="social-label">Follow Us:</span>
              <div className="social-links-row">
                <a href="https://www.linkedin.com/in/black-grapes-softech/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-circle">in</a>
                <a href="https://twitter.com/grapessoftech" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-circle">𝕏</a>
                <a href="https://www.instagram.com/blackgrapessoftech/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-circle">ig</a>
                <a href="https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-circle">yt</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Black Grapes Softech Pvt. Ltd. All rights reserved.
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
