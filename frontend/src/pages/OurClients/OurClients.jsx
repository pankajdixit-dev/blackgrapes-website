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
