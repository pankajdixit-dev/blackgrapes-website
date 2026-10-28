import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  ArrowRight,
  CheckCircle2,
  Globe,
  Building2,
  ShieldCheck,
  Star,
  Quote,
  Users,
  Check,
  PhoneCall,
  Mail,
  MessageCircle,
  Briefcase,
  Award,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  CLIENT_CATEGORIES,
  CLIENT_METRICS,
  CLIENTS_LIST,
  CLIENT_CASE_STUDIES,
  CLIENT_TESTIMONIALS,
  ENGAGEMENT_MODELS
} from './clientsData';
import ClientCaseStudyModal from './ClientCaseStudyModal';
import clientsNetworkImg from '../../assets/clients-network.jpg';
import clientsSummitImg from '../../assets/clients-summit.jpg';
import './OurClients.css';

export default function OurClients({ onOpenDemoModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return CLIENTS_LIST.filter((client) => {
      const matchesCat =
        activeCategory === 'all' || client.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        client.name.toLowerCase().includes(q) ||
        client.industry.toLowerCase().includes(q) ||
        client.region.toLowerCase().includes(q) ||
        client.services.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="clients-page">
      {/* ========================================================
          1. HERO SECTION: Global Reach & Corporate Prestige
          ======================================================== */}
      <section className="clients-hero-section">
        <div className="clients-glow-blob glow-orange-left"></div>
        <div className="clients-glow-blob glow-purple-right"></div>

        <div className="container clients-hero-grid">
          <div className="clients-hero-content">
            <div className="hero-eyebrow-pill">
              <Sparkles size={14} />
              <span>TRUSTED BY 150+ GLOBAL ENTERPRISES</span>
            </div>

            <h1 className="clients-hero-title">
              Our Clients: <br />
              <span className="text-gradient">Powering Leaders Across 15+ Nations</span>
            </h1>

            <p className="clients-hero-desc">
              At Black Grapes Softech, we take pride in our diverse and dynamic client portfolio. Our clients span various industries including finance, healthcare, e-commerce, education, and technology. We partner with both high-velocity startups and Fortune 500 enterprises to deliver innovative software solutions tailored to their unique needs.
            </p>

            {/* Metrics Counter Strip */}
            <div className="clients-metrics-row">
              {CLIENT_METRICS.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="metric-num text-gradient">{metric.number}</span>
                  <span className="metric-sub">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="clients-hero-actions">
              <button
                onClick={onOpenDemoModal}
                className="btn btn-primary btn-pulse-glow"
              >
                <span>Partner With Us</span>
                <ArrowRight size={18} />
              </button>

              <a href="#portfolio" className="btn btn-secondary">
                <span>Explore Client Brands ({CLIENTS_LIST.length})</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Display */}
          <div className="clients-hero-visual">
            <div className="clients-visual-frame">
              <img
                src={clientsNetworkImg}
                alt="Black Grapes Softech Global Client Footprint"
                className="clients-network-img"
              />
              <div className="floating-partners-badge">
                <div className="badge-inner-flex">
                  <span className="badge-live-pulse"></span>
                  <div>
                    <div className="badge-text-title">Active Global Deployments</div>
                    <div className="badge-text-sub">US • UK • Japan • EU • UAE • India</div>
                  </div>
                </div>
                <span className="badge-tag-pill">99% RETENTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FILTER & REAL-TIME SEARCH BAR (STICKY)
          ======================================================== */}
      <section id="portfolio" className="clients-controls-bar">
        <div className="container controls-flex-wrap">
          <div className="clients-search-row">
            {/* Search Input */}
            <div className="client-search-field">
              <Search size={18} className="search-field-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients by name, sector, or country (e.g. Mastercard, AI, Japan, Cloud)..."
                className="client-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-client-search"
                  aria-label="Clear client search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Counter */}
            <div className="clients-count-pill">
              <span>Showing:</span>
              <span className="count-highlight">{filteredClients.length}</span>
              <span>of {CLIENTS_LIST.length} Clients</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="client-category-tabs">
            {CLIENT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? CLIENTS_LIST.length
                  : CLIENTS_LIST.filter((c) => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="category-count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPREHENSIVE CLIENTS LOGO WALL GRID (48+ CLIENTS)
          ======================================================== */}
      <section className="clients-grid-section">
        <div className="container">
          {filteredClients.length === 0 ? (
            <div className="clients-empty-state">
              <h3 className="section-title-large">No clients found matching "{searchQuery}"</h3>
              <p className="section-desc-lead">
                Try searching for general keywords like "Enterprise", "Fintech", "Japan", or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn btn-primary mt-4"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="clients-portfolio-grid">
              {filteredClients.map((client) => (
                <article
                  key={client.id}
                  className="client-card"
                  onClick={() => setSelectedClient(client)}
                  title={`View case study and engagement details for ${client.name}`}
                >
                  {/* Clean Logo Frame */}
                  <div className="client-logo-frame">
                    <img
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      className="client-brand-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Meta Badges */}
                  <div className="client-card-meta-row">
                    <span className={`client-type-badge badge-${client.badgeColor || 'orange'}`}>
                      {client.badge}
                    </span>
                    <span className="client-region-tag">
                      <Globe size={11} /> {client.region}
                    </span>
                  </div>

                  <h3 className="client-company-title">{client.name}</h3>
                  <div className="client-industry-label">{client.industry}</div>
                  <p className="client-service-summary">{client.services}</p>

                  <div className="client-card-action-row">
                    <span>View Case Scope</span>
                    <ArrowRight size={15} className="card-action-arrow" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. FEATURED CASE STUDIES & IMPACT SPOTLIGHT
          ======================================================== */}
      <section className="case-studies-section">
        <div className="container">
          <div className="text-center max-w-700 mx-auto">
            <span className="section-eyebrow-center">
              <Award size={14} /> PROVEN TRACK RECORD
            </span>
            <h2 className="section-title-large">
              Architectural Case Studies That Drive Value
            </h2>
            <p className="section-desc-lead">
              Take a closer look at how Black Grapes Softech architects mission-critical digital systems for global fintech pioneers, healthcare networks, and smart utility grids.
            </p>
          </div>

          <div className="case-studies-grid">
            {CLIENT_CASE_STUDIES.map((study) => (
              <div key={study.id} className="case-study-card glass-card">
                <div className="case-header-eyebrow">
                  <span className="case-client-tag">{study.client}</span>
                  <span className="case-industry-pill">{study.industry}</span>
                </div>

                <h3 className="case-card-title">{study.title}</h3>
                <p className="case-card-desc">{study.desc}</p>

                <div className="case-metrics-grid">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="case-metric-pill">
                      <CheckCircle2 size={13} /> {m}
                    </div>
                  ))}
                </div>

                <div className="case-tech-chips">
                  {study.tech.map((t, idx) => (
                    <span key={idx} className="tech-chip">{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedClient(study)}
                  className="case-cta-btn"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. VERIFIED CLIENT TESTIMONIALS
          ======================================================== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center max-w-700 mx-auto">
            <span className="section-eyebrow-center">
              <Star size={14} /> CLIENT TESTIMONIALS
            </span>
            <h2 className="section-title-large">
              What Global Engineering Leaders Say About Us
            </h2>
            <p className="section-desc-lead">
              Our commitment to technical excellence and client satisfaction has earned us long-standing relationships with partners across 4 continents.
            </p>
          </div>

          <div className="testimonials-grid">
            {CLIENT_TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="testimonial-quote-card glass-card">
                <div className="rating-stars-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                  ))}
                </div>

                <Quote size={28} className="quote-icon-decor" />
                <p className="testimonial-quote-text">"{item.quote}"</p>

                <div className="testimonial-author-block">
                  <div className="author-info-col">
                    <h4>{item.author}</h4>
                    <p>{item.role}, {item.company}</p>
                  </div>
                  <span className="author-country-badge">{item.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ENGAGEMENT MODELS: HOW WE COLLABORATE
          ======================================================== */}
      <section className="engagement-models-section">
        <div className="container">
          <div className="text-center max-w-700 mx-auto">
            <span className="section-eyebrow-center">
              <Briefcase size={14} /> FLEXIBLE PARTNERSHIPS
            </span>
            <h2 className="section-title-large">
              Tailored Engagement Models for Every Stage
            </h2>
            <p className="section-desc-lead">
              Whether you need a dedicated offshore development squad, fixed-budget MVP delivery, or enterprise modernization, we adapt to your operational tempo.
            </p>
          </div>

          <div className="engagement-cards-grid">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div key={idx} className="engagement-card glass-card">
                <div className="engagement-icon-box">
                  {idx === 0 ? <Users size={24} /> : idx === 1 ? <Zap size={24} /> : <Cpu size={24} />}
                </div>

                <h3 className="engagement-card-title">{model.title}</h3>
                <span className="engagement-card-sub">{model.subtitle}</span>
                <p className="engagement-card-desc">{model.desc}</p>

                <ul className="engagement-points-list">
                  {model.points.map((pt, pIdx) => (
                    <li key={pIdx} className="engagement-point-item">
                      <CheckCircle2 size={15} className="point-check-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. BOTTOM CALL TO ACTION
          ======================================================== */}
      <section className="clients-cta-section">
        <div className="container">
          <div className="clients-cta-banner">
            <div className="cta-glow-backdrop"></div>
            <div className="cta-banner-content">
              <span className="hero-eyebrow-pill">
                <Sparkles size={14} /> JOIN OUR SATISFIED PARTNER ECOSYSTEM
              </span>
              <h2 className="cta-banner-heading">
                Ready to Experience the Black Grapes Softech Difference?
              </h2>
              <p className="cta-banner-lead">
                Join our ever-growing family of satisfied clients. Whether it's custom applications, cybersecurity, or advanced data analytics, our engineers are ready to drive your digital transformation.
              </p>

              <div className="cta-buttons-wrap">
                <button
                  onClick={onOpenDemoModal}
                  className="btn btn-primary btn-pulse-glow"
                >
                  <Sparkles size={18} />
                  <span>Schedule Consultation Call</span>
                </button>

                <a
                  href="https://wa.me/917470997884?text=Hello%20Black%20Grapes%20Softech,%20I%20would%20like%20to%20discuss%20a%20software%20partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Executive Line</span>
                </a>
              </div>

              <div className="cta-contact-strip">
                <span>Direct Executive Connect:</span>
                <a href="tel:+917470997884">
                  <PhoneCall size={14} /> +91 7470997884
                </a>
                <span>|</span>
                <a href="tel:+916262414463">
                  <PhoneCall size={14} /> +91 6262414463
                </a>
                <span>|</span>
                <a href="mailto:info@blackgrapessoftech.com">
                  <Mail size={14} /> info@blackgrapessoftech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CLIENT CASE STUDY POPUP MODAL
          ======================================================== */}
      {selectedClient && (
        <ClientCaseStudyModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onOpenDemoModal={onOpenDemoModal}
        />
      )}
    </div>
  );
}
