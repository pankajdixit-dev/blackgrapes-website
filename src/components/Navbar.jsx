import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layers, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  Code2,
  Building2,
  FileCheck2,
  TrendingUp
} from 'lucide-react';
import '../Styles/Navbar.css';

export default function Navbar({ onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrapper">
            <img 
              src="/images/black_grapes_emblem.jpg" 
              alt="Black Grapes Logo" 
              className="brand-icon-img" 
            />
            <div className="brand-dot-pulse"></div>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">BLACK <span className="gradient-text">GRAPES</span></span>
            <span className="brand-subtitle">GROUP &bull; INNOVATE &bull; ELEVATE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link 
            to="/services" 
            className={`nav-link services-nav-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            <span>Services</span>
            <span className="nav-badge">All Hub</span>
          </Link>

          <Link 
            to="/services?category=softech" 
            className="nav-link"
          >
            <Code2 size={15} className="nav-link-icon" />
            <span>IT & Softech</span>
          </Link>

          <Link 
            to="/services?category=valuation" 
            className="nav-link"
          >
            <Building2 size={15} className="nav-link-icon" />
            <span>Valuation & Engg</span>
          </Link>

          <Link 
            to="/it-staffing" 
            className={`nav-link ${location.pathname === '/it-staffing' ? 'active' : ''}`}
          >
            <span>Staffing</span>
          </Link>

          <Link 
            to="/ecommerce" 
            className={`nav-link ${location.pathname === '/ecommerce' ? 'active' : ''}`}
          >
            <span>E-Commerce</span>
          </Link>

          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            <span>Contact</span>
          </Link>
        </nav>

        {/* Action Button & Direct Contact */}
        <div className="navbar-actions">
          <a href="tel:+919893000000" className="nav-phone-link" title="Call Our Experts">
            <PhoneCall size={16} />
            <span>+91 (0731) Expert Desk</span>
          </a>

          <button 
            type="button" 
            className="btn-primary nav-cta-btn"
            onClick={() => onOpenInquiry && onOpenInquiry('General Consultation')}
          >
            <Sparkles size={16} />
            <span>Get Quote</span>
          </button>

          {/* Hamburger toggle for mobile */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <Link to="/" className="mobile-nav-link">
            Home
            <ChevronRight size={18} />
          </Link>
          <Link to="/services" className="mobile-nav-link highlighted">
            <div>
              <strong>All Services</strong>
              <p>Explore software, valuation, legal & real estate</p>
            </div>
            <ChevronRight size={18} />
          </Link>
          <Link to="/services?category=softech" className="mobile-nav-link">
            <span>IT & Software Development</span>
            <ChevronRight size={18} />
          </Link>
          <Link to="/services?category=valuation" className="mobile-nav-link">
            <span>Asset Valuation & Chartered Engg</span>
            <ChevronRight size={18} />
          </Link>
          <Link to="/services?category=advisory" className="mobile-nav-link">
            <span>Corporate Licensing & Legal</span>
            <ChevronRight size={18} />
          </Link>
          <Link to="/services?category=realestate" className="mobile-nav-link">
            <span>Real Estate & Investments</span>
            <ChevronRight size={18} />
          </Link>

          <Link to="/it-staffing" className="mobile-nav-link">
            <span>IT & Manpower Staffing</span>
            <ChevronRight size={18} />
          </Link>
          <Link to="/ecommerce" className="mobile-nav-link">
            <span>E-Commerce (Naya Purana Bazaar)</span>
            <ChevronRight size={18} />
          </Link>
          <Link to="/contact" className="mobile-nav-link">
            <span>Contact Black Grapes</span>
            <ChevronRight size={18} />
          </Link>

          <div className="mobile-cta-section">
            <button 
              type="button" 
              className="btn-primary w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry('General Consultation');
              }}
            >
              <Sparkles size={16} />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
