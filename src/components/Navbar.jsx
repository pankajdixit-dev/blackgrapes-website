import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles, PhoneCall, Mail } from 'lucide-react';
import logoImg from '../assets/bgst-logo.png';
import '../Styles/Navbar.css';

export default function Navbar({ onOpenDemoModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Our Products', path: '/products' },
    { label: 'Our Clients', path: '/clients' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Notification / Contact Strip */}
      <div className="top-banner-strip">
        <div className="container top-strip-inner">
          <div className="strip-left">
            <span className="live-dot"></span>
            <span>Empowering Enterprises Worldwide with Next-Gen Tech</span>
          </div>
          <div className="strip-right">
            <a href="mailto:info@blackgrapessoftech.com" className="strip-link">
              <Mail size={13} />
              <span>info@blackgrapessoftech.com</span>
            </a>
            <span className="strip-divider">|</span>
            <a href="tel:+917470997884" className="strip-link">
              <PhoneCall size={13} />
              <span>+91 7470997884</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo">
            <img src={logoImg} alt="Black Grapes Softech" className="logo-img" />
            <div className="brand-text">
              <span className="brand-name">BLACK <span className="brand-highlight">GRAPES</span></span>
              <span className="brand-sub">SOFTECH PVT. LTD.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path === '/about' && location.pathname.startsWith('/about')) ||
                  (link.path === '/products' && (location.pathname.startsWith('/product') || location.pathname.startsWith('/our-product'))) ||
                  (link.path === '/clients' && (location.pathname.startsWith('/client') || location.pathname.startsWith('/our-client')));
                return (
                  <li key={link.label} className="nav-item">
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                      {isActive && <span className="active-glow-pill"></span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <button
              onClick={onOpenDemoModal}
              className="btn btn-primary nav-cta-btn"
            >
              <Sparkles size={16} />
              <span>Request Demo</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/about' && location.pathname.startsWith('/about')) ||
                (link.path === '/products' && (location.pathname.startsWith('/product') || location.pathname.startsWith('/our-product'))) ||
                (link.path === '/clients' && (location.pathname.startsWith('/client') || location.pathname.startsWith('/our-client')));
              return (
                <li key={link.label} className="mobile-nav-item">
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={18} className="mobile-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mobile-drawer-cta">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDemoModal) onOpenDemoModal();
              }}
              className="btn btn-primary w-full"
            >
              <Sparkles size={16} />
              <span>Request a Demo</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
