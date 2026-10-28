import React, { useState, useMemo, useEffect } from 'react';
import SoftechDropdownPicker from '../components/softech/SoftechDropdownPicker';
import SoftechSpotlightCard from '../components/softech/SoftechSpotlightCard';
import SoftechServiceCard from '../components/softech/SoftechServiceCard';
import SoftechDetailsModal from '../components/softech/SoftechDetailsModal';
import SoftechInquiryModal from '../components/softech/SoftechInquiryModal';
import SoftechTechMatrix from '../components/softech/SoftechTechMatrix';
import SoftechScopeEstimator from '../components/softech/SoftechScopeEstimator';
import { softechCategories, softechServices, softechStats } from '../data/softechServicesData';
import { 
  Search, 
  X, 
  Phone, 
  Mail, 
  ArrowRight, 
  SearchX, 
  Zap,
  Building2,
  ShoppingBag,
  Car,
  Home,
  GraduationCap,
  UtensilsCrossed,
  Stethoscope
} from 'lucide-react';
import '../Styles/CyberServices.css';

// Exact 7 Industries from original blackgrapessoftech.com/services/
const originalIndustries = [
  { name: 'Healthcare', icon: Stethoscope, tag: 'HIPAA & Telemed' },
  { name: 'Food Delivery', icon: UtensilsCrossed, tag: 'Real-time GPS' },
  { name: 'E-Commerce', icon: ShoppingBag, tag: 'High-Volume Carts' },
  { name: 'Taxi & Transport', icon: Car, tag: 'Fleet Dispatch' },
  { name: 'Home Services', icon: Home, tag: 'On-Demand Booking' },
  { name: 'Education', icon: GraduationCap, tag: 'LMS & Live Classes' },
  { name: 'Real Estate', icon: Building2, tag: 'MLS & CRM Portals' }
];

export default function SoftechServicesPage({ selectedServiceId = null, onSelectService = null }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDropdownServiceId, setSelectedDropdownServiceId] = useState(selectedServiceId);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailsModal, setActiveDetailsModal] = useState(null);
  const [inquiryService, setInquiryService] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Sync external selection from navbar
  useEffect(() => {
    if (selectedServiceId !== undefined) {
      setSelectedDropdownServiceId(selectedServiceId);
      if (selectedServiceId) {
        setTimeout(() => {
          const el = document.getElementById(selectedServiceId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    }
  }, [selectedServiceId]);

  // Filter services by category and live search
  const filteredServices = useMemo(() => {
    return softechServices.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.tagline.toLowerCase().includes(q) ||
        service.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Find currently spotlighted service from dropdown
  const spotlightService = useMemo(() => {
    if (!selectedDropdownServiceId) return null;
    return softechServices.find((s) => s.id === selectedDropdownServiceId) || null;
  }, [selectedDropdownServiceId]);

  const handleOpenInquiry = (service = null) => {
    setInquiryService(service);
    setIsInquiryOpen(true);
  };

  const handleSelectService = (id) => {
    setSelectedDropdownServiceId(id);
    if (onSelectService) onSelectService(id);
    if (id) {
      const target = softechServices.find((s) => s.id === id);
      if (target) setSelectedCategory('all');
      setTimeout(() => {
        const el = document.getElementById('spotlight-section') || document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <main className="softech-page-main">
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow" />

      {/* Hero Header */}
      <section className="softech-hero">
        <div className="content-wrapper text-center">
          {/* Centered Top Badge */}
          <div className="hero-badge-wrap">
            <span className="hero-top-pill">
              <Zap size={13} color="#f86200" />
              <span>BLACK GRAPES SOFTECH • WHAT WE DO</span>
            </span>
          </div>

          {/* Centered Main Title */}
          <h1 className="black-hero-title">
            Engineering Next-Gen
            <span className="hero-title-accent"> Digital Products & Software</span>
          </h1>

          {/* Centered Subtitle with Original Website Copy */}
          <div className="black-hero-subtitle">
            <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
              We Provide best Quality services and products in affordable price. Here is the list of services that we provide.
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '0 auto', maxWidth: '780px' }}>
              From modern MERN cloud architectures and native mobile apps to AI-enabled CRM, high-yield MLM platforms, and enterprise software. Engineered for maximum speed, security, and real business ROI.
            </p>
          </div>

          {/* Centered Dropdown Selector (Opens on Mouse Hover or Click) */}
          <div className="hero-dropdown-wrapper">
            <SoftechDropdownPicker
              services={softechServices}
              selectedServiceId={selectedDropdownServiceId}
              onSelectService={handleSelectService}
            />
          </div>

          {/* Centered Search Bar */}
          <div className="black-hero-search-wrapper">
            <div className="black-search-bar">
              <Search size={18} color="#a1a1aa" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. Website, Flutter, CRM, MLM, Python, SEO)..."
                className="black-search-input"
                aria-label="Search Softech services"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn-search-clear"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <span className="search-count-pill">
                {filteredServices.length} / {softechServices.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="softech-stats-bar">
        <div className="content-wrapper">
          <div className="softech-stats-grid">
            {softechStats.map((st, idx) => (
              <div key={idx} className="softech-stat-card">
                <div className="stat-card-value">{st.value}</div>
                <div className="stat-card-label">{st.label}</div>
                <div className="stat-card-sub">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Spotlight Card (Rendered when selected via Dropdown) */}
      {spotlightService && (
        <section className="content-wrapper" style={{ marginBottom: '3rem' }}>
          <SoftechSpotlightCard
            service={spotlightService}
            onClose={() => handleSelectService(null)}
            onOpenInquiry={handleOpenInquiry}
            onOpenDetails={(s) => setActiveDetailsModal(s)}
          />
        </section>
      )}

      {/* Category Filter Pills */}
      <div className="black-filter-bar">
        <div className="content-wrapper">
          <div className="black-filter-scroll">
            {softechCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? softechServices.length
                  : softechServices.filter((s) => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`black-filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedDropdownServiceId(null);
                  }}
                >
                  <span>{cat.label}</span>
                  <span className="pill-counter">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="services-grid-section" id="services-grid">
        <div className="content-wrapper">
          {filteredServices.length > 0 ? (
            <div className="softech-services-grid">
              {filteredServices.map((service) => (
                <SoftechServiceCard
                  key={service.id}
                  service={service}
                  onOpenDetails={(s) => setActiveDetailsModal(s)}
                  onOpenInquiry={handleOpenInquiry}
                />
              ))}
            </div>
          ) : (
            <div className="empty-search-state">
              <SearchX size={44} color="#f86200" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', color: '#fff' }}>
                No Services Matched Your Filter
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.25rem', fontSize: '0.9rem' }}>
                No service found matching "<strong>{searchQuery}</strong>". Try clearing your search or switching categories.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Industries We Serve Section (Directly from Original Website) */}
      <section className="softech-industries-section">
        <div className="content-wrapper">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
              <span className="hero-top-pill">
                <Briefcase size={13} color="#f86200" />
                <span>SECTORS & VERTICALS</span>
              </span>
            </div>
            <h2 className="black-hero-title" style={{ fontSize: '2.25rem' }}>
              Industries We <span className="hero-title-accent">Empower</span>
            </h2>
            <p className="black-hero-subtitle" style={{ maxWidth: '620px' }}>
              Delivering high-performance digital products and custom software tailored to the unique operational demands of 7+ core industries.
            </p>
          </div>

          <div className="industries-grid">
            {originalIndustries.map((ind, idx) => {
              const IconComp = ind.icon;
              return (
                <div key={idx} className="industry-card">
                  <div className="industry-icon-wrap">
                    <IconComp size={24} color="#f86200" />
                  </div>
                  <div className="industry-title">{ind.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{ind.tag}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix Section */}
      <SoftechTechMatrix />

      {/* Interactive Project Cost & Timeline Estimator */}
      <div className="content-wrapper">
        <SoftechScopeEstimator onOpenInquiry={handleOpenInquiry} />
      </div>

      {/* Direct Softech Contact Strip */}
      <section className="content-wrapper" style={{ paddingBottom: '5rem' }}>
        <div className="services-quick-contact">
          <div className="quick-contact-info">
            <div className="quick-contact-tag">Direct Black Grapes Softech Line</div>
            <div className="quick-contact-title">Ready to launch or scale your digital project?</div>
            <div className="quick-contact-numbers">
              <a href="tel:+917470997884" className="quick-contact-link">
                <Phone size={15} /> +91 7470997884
              </a>
              <span className="contact-sep">•</span>
              <a href="tel:+916262414463" className="quick-contact-link">
                <Phone size={15} /> +91 6262414463
              </a>
              <span className="contact-sep">•</span>
              <a href="mailto:info@blackgrapessoftech.com" className="quick-contact-link">
                <Mail size={15} /> info@blackgrapessoftech.com
              </a>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => handleOpenInquiry(null)}
          >
            <span>Request Custom Proposal</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Service Details Drawer / Modal */}
      {activeDetailsModal && (
        <SoftechDetailsModal
          service={activeDetailsModal}
          onClose={() => setActiveDetailsModal(null)}
          onOpenQuote={(s) => handleOpenInquiry(s)}
        />
      )}

      {/* Inquiry Quote Modal */}
      {isInquiryOpen && (
        <SoftechInquiryModal
          initialService={inquiryService}
          onClose={() => {
            setIsInquiryOpen(false);
            setInquiryService(null);
          }}
        />
      )}

      {/* Floating WhatsApp Us Button (Original Website Feature) */}
      <a 
        href="https://wa.me/917470997884?text=Hello%20Black%20Grapes%20Softech,%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp (+91 7470997884)"
      >
        <MessageCircle size={18} />
        <span>WhatsApp Us</span>
      </a>
    </main>
  );
}
