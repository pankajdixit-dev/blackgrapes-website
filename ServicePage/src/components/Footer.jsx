import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Mail,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { softechServices } from '../data/softechServicesData';

export default function Footer({ onNavigate, onOpenQuote }) {
  const handleServiceClick = (serviceId) => {
    if (onNavigate) onNavigate('softech');
    setTimeout(() => {
      const el = document.getElementById(serviceId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <footer className="footer-wrapper">
      <div className="content-wrapper">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img 
                src="/logo.jpg" 
                alt="Black Grapes Softech Emblem" 
                style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>BLACK GRAPES</div>
                <div style={{ fontSize: '0.72rem', color: '#f86200', letterSpacing: '0.1em', fontWeight: 700 }}>SOFTECH & SERVICES</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Full-cycle digital engineering and IT software firm. Architecting high-yield MLM software, custom CRM portals, cross-platform mobile apps, cloud web applications, and enterprise microservices.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge-pill" style={{ background: 'rgba(248, 98, 0, 0.12)', color: '#ff7a1a', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
                <ShieldCheck size={14} color="#f86200" /> Enterprise ISO-Standard Delivery
              </span>
            </div>
          </div>

          {/* 10 IT Services */}
          <div>
            <h4 className="footer-col-title">Our IT Services</h4>
            <ul className="footer-links-list">
              {softechServices.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="footer-link-item"
                    onClick={() => handleServiceClick(s.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional IT Services & Navigation */}
          <div>
            <h4 className="footer-col-title">Enterprise Solutions</h4>
            <ul className="footer-links-list">
              {softechServices.slice(6).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="footer-link-item"
                    onClick={() => handleServiceClick(s.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
              <li style={{ marginTop: '0.5rem' }}>
                <button 
                  type="button"
                  className="footer-link-item"
                  onClick={() => onNavigate && onNavigate('staffing')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#38bdf8', fontWeight: 700 }}
                >
                  IT Staffing & Manpower Solutions →
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  className="footer-link-item"
                  onClick={() => onNavigate && onNavigate('ecommerce')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#ff7a1a', fontWeight: 700 }}
                >
                  Ecommerce (Naya Purana Bazaar) →
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  className="footer-link-item"
                  onClick={() => onNavigate && onNavigate('contact')}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#f86200', fontWeight: 600 }}
                >
                  Contact Engineering Team →
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Connect */}
          <div>
            <h4 className="footer-col-title">Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="#f86200" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, MP, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="#f86200" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="tel:+917470997884" className="footer-link-item">+91 7470997884</a>
                  <a href="tel:+916262414463" className="footer-link-item">+91 6262414463</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="#f86200" style={{ flexShrink: 0 }} />
                <a href="mailto:info@blackgrapessoftech.com" className="footer-link-item">info@blackgrapessoftech.com</a>
              </div>
              <button 
                type="button" 
                className="btn-outline-gold"
                style={{ marginTop: '0.5rem', width: '100%', padding: '0.65rem', justifyContent: 'center' }}
                onClick={() => onOpenQuote()}
              >
                <span>Request Custom Quote</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#fff' }}>Black Grapes Softech</strong>. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Security & Compliance</span>
            <span style={{ color: 'var(--text-muted)' }}>Privacy Policy</span>
            <span style={{ color: 'var(--text-muted)' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
