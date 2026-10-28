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
      {/* Main Footer Directory */}
      <div className="container footer-main-content pt-5">
        <div className="footer-grid">
          {/* Column 1: Industries */}
          <div className="footer-col">
            <h4 className="footer-heading">Industries</h4>
            <ul className="footer-link-list">
              <li><Link to="/services">Healthcare</Link></li>
              <li><Link to="/services">Food Delivery</Link></li>
              <li><Link to="/services">E- Commerce</Link></li>
              <li><Link to="/services">Taxi and Transportation</Link></li>
              <li><Link to="/services">Home Services</Link></li>
              <li><Link to="/services">Education</Link></li>
              <li><Link to="/services">Real Estate</Link></li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/it-staffing">Careers</Link></li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
              </li>
              <li><Link to="/partnership">Privacy Policy</Link></li>
              <li><Link to="/partnership">Terms and Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="footer-heading">
              <Link to="/services" className="footer-heading-link">Services</Link>
            </h4>
            <ul className="footer-link-list">
              <li><Link to="/services">Web Designing and Development</Link></li>
              <li><Link to="/services">Graphic Designing</Link></li>
              <li><Link to="/services">Digital Marketing</Link></li>
              <li><Link to="/services">Mobile App Development</Link></li>
              <li><Link to="/services">Software Development</Link></li>
              <li><Link to="/services">MLM Software Development</Link></li>
              <li><Link to="/services">CRM Software Development</Link></li>
              <li><Link to="/services">Game Development</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">
              <Link to="/contact-us" className="footer-heading-link">Contact Us</Link>
            </h4>

            {/* Address */}
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon text-orange" />
              <div className="contact-details">
                <a
                  href="https://maps.app.goo.gl/8CGaCBy9xGM63Ryi7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-address text-white"
                >
                  252-F/H Scheme No 54, Vijaynagar, Indore-452010, Madhya Pradesh, India
                </a>
              </div>
            </div>

            {/* Emails */}
            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <div className="contact-details">
                <div>
                  <a href="mailto:info@blackgrapessoftech.com" className="contact-link">
                    info@blackgrapessoftech.com
                  </a>
                </div>
                <div>
                  <a href="mailto:blackgrapes.arpitjain@gmail.com" className="contact-link">
                    blackgrapes.arpitjain@gmail.com
                  </a>
                </div>
                <div>
                  <a href="mailto:blackgrapes.deepikajain@gmail.com" className="contact-link">
                    blackgrapes.deepikajain@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div className="contact-details">
                <a href="tel:+917470997884" className="contact-link">
                  +91 7470997884
                </a>
                <span className="text-dim">, </span>
                <a href="tel:+916262414463" className="contact-link">
                  +91 6262414463
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="social-links-row mt-3">
              <a href="https://www.facebook.com/blackgrapessoftech.fb" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-circle">fb</a>
              <a href="https://twitter.com/grapessoftech" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-circle">𝕏</a>
              <a href="https://www.instagram.com/blackgrapessoftech/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-circle">ig</a>
              <a href="https://www.linkedin.com/in/black-grapes-softech/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-circle">in</a>
              <a href="https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-circle">yt</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy-text">
            &copy; 2026 Black Grapes Softech
          </p>
          <div className="footer-bottom-links">
            <Link to="/">Home</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/about-us">About Us</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/services">Services</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/our-products">Our Products</Link>
            <span className="dot-sep">&bull;</span>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
