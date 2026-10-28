import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { softechServices } from '../data/softechServicesData';

export default function Navbar({ currentPage, onNavigate, onSelectService, onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNavDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLinkClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setNavDropdownOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="content-wrapper">
        <div className="navbar-inner">
          {/* Logo & Brand Identity */}
          <button 
            type="button"
            onClick={() => handleLinkClick('softech')}
            className="nav-brand"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <img 
              src="/logo.jpg" 
              alt="Black Grapes Softech Emblem" 
              className="nav-brand-logo"
            />
            <div>
              <div className="nav-brand-title">BLACK GRAPES</div>
              <div className="nav-brand-subtitle">SOFTECH</div>
            </div>
          </button>

          {/* Navigation Links (Clean: Services Dropdown, About, Contact) */}
          <nav>
            <ul className="nav-links">
              {/* Services Dropdown (opens on mouse hover or click, strictly "Services ▾") */}
              <li 
                className="nav-item-dropdown" 
                ref={dropdownRef}
                onMouseEnter={() => setNavDropdownOpen(true)}
                onMouseLeave={() => setNavDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link-btn dropdown-btn ${currentPage === 'softech' ? 'active' : ''}`}
                  onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                  aria-expanded={navDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown size={14} className={`nav-chevron ${navDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {/* Dropdown Menu Panel */}
                {navDropdownOpen && (
                  <div 
                    className="nav-dropdown-panel"
                    onMouseEnter={() => setNavDropdownOpen(true)}
                    onMouseLeave={() => setNavDropdownOpen(false)}
                  >
                    <div className="nav-dropdown-header">
                      <Sparkles size={12} color="#f86200" />
                      <span>All Services (Hover or Click to View)</span>
                    </div>

                    <div className="nav-dropdown-grid">
                      {softechServices.map((svc) => (
                        <button
                          key={svc.id}
                          type="button"
                          className="nav-dropdown-link"
                          onClick={() => {
                            handleLinkClick('softech');
                            if (onSelectService) onSelectService(svc.id);
                            setTimeout(() => {
                              const el = document.getElementById(svc.id);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 120);
                          }}
                        >
                          <div className="nav-dropdown-item-title">{svc.title}</div>
                          <div className="nav-dropdown-item-desc">{svc.tagline}</div>
                        </button>
                      ))}
                    </div>

                    <div className="nav-dropdown-footer">
                      <button
                        type="button"
                        className="nav-dropdown-all-btn"
                        onClick={() => {
                          handleLinkClick('softech');
                          if (onSelectService) onSelectService(null);
                        }}
                      >
                        <span>View All 10 Services Overview</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </li>

              {/* Ecommerce Page (Naya Purana Bazaar) */}
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${currentPage === 'ecommerce' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('ecommerce')}
                >
                  Ecommerce
                </button>
              </li>

              {/* IT Staffing Page */}
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${currentPage === 'staffing' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('staffing')}
                >
                  IT Staffing
                </button>
              </li>

              {/* Contact Us */}
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="nav-actions">
            <a 
              href="tel:+917470997884" 
              className="nav-phone-link"
              title="Call Black Grapes Softech"
            >
              <Phone size={14} color="#f86200" />
              <span>+91 7470997884</span>
            </a>

            <button 
              type="button" 
              className="btn-primary"
              onClick={() => onOpenQuote()}
            >
              <span>Quick Quote</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Button */}
            <button 
              type="button" 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <button 
              type="button"
              className={`nav-link-item ${currentPage === 'softech' ? 'active' : ''}`}
              onClick={() => handleLinkClick('softech')}
              style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
            >
              Services (10 IT Services)
            </button>
            <button 
              type="button"
              className={`nav-link-item ${currentPage === 'ecommerce' ? 'active' : ''}`}
              onClick={() => handleLinkClick('ecommerce')}
              style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
            >
              Ecommerce (Naya Purana Bazaar)
            </button>
            <button 
              type="button"
              className={`nav-link-item ${currentPage === 'staffing' ? 'active' : ''}`}
              onClick={() => handleLinkClick('staffing')}
              style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
            >
              IT Staffing & Manpower
            </button>
            <button 
              type="button"
              className={`nav-link-item ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => handleLinkClick('contact')}
              style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%' }}
            >
              Contact Us
            </button>
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a 
                href="tel:+917470997884" 
                className="nav-phone-link"
                style={{ padding: '0.6rem', justifyContent: 'center' }}
              >
                <Phone size={14} color="#f86200" />
                <span>+91 7470997884</span>
              </a>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                style={{ justifyContent: 'center' }}
              >
                <span>Request Consultation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
