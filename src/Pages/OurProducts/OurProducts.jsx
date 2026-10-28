import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Layers,
  Globe,
  Cpu,
  PhoneCall,
  Mail,
  MessageCircle,
  Activity,
  GraduationCap,
  ShoppingBag,
  Car,
  Building,
  Wrench,
  UtensilsCrossed,
  Code,
  Palette,
  CloudLightning,
  Smartphone,
  Headphones,
  Star,
  Check,
  Video
} from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_LIST,
  OFFICIAL_INDUSTRIES,
  PRODUCT_GUARANTEES
} from './productsData';
import ProductVideoModal from './ProductVideoModal';
import ProductEstimator from './ProductEstimator';
import productsHeroImg from '../../assets/products-hero.jpg';
import productsDevicesImg from '../../assets/products-devices.jpg';
import './OurProducts.css';

// Industry Icon Helper
const INDUSTRY_ICONS = {
  Healthcare: Activity,
  Education: GraduationCap,
  'E- Commerce': ShoppingBag,
  'Taxi and Transportation': Car,
  'Real Estate': Building,
  'Home Services': Wrench,
  'Food Delivery': UtensilsCrossed
};

// Guarantee Icon Helper
const GUARANTEE_ICONS = {
  Code: Code,
  Palette: Palette,
  ShieldCheck: ShieldCheck,
  CloudLightning: CloudLightning,
  Smartphone: Smartphone,
  Headphones: Headphones
};

export default function OurProducts({ onOpenDemoModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoProduct, setActiveVideoProduct] = useState(null);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS_LIST.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.industry.toLowerCase().includes(q) ||
        product.summary.toLowerCase().includes(q) ||
        product.keyFeatures.some((feat) => feat.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="products-page">
      {/* ========================================================
          1. HERO SECTION: Sleek Glassmorphism & Visual Powerhouse
          ======================================================== */}
      <section className="products-hero-section">
        <div className="hero-glow-blob glow-orange"></div>
        <div className="hero-glow-blob glow-purple"></div>

        <div className="container products-hero-grid">
          <div className="products-hero-content">
            <div className="hero-eyebrow-badge">
              <Sparkles size={14} />
              <span>BLACK GRAPES SOFTECH PROPRIETARY SUITE</span>
            </div>

            <h1 className="products-hero-title">
              Our Products: <br />
              <span className="text-gradient">Engineered to Transform Modern Business</span>
            </h1>

            <p className="products-hero-desc">
              Explore our cutting-edge software solutions designed to transform the way you work and elevate your business to new heights. Our Products showcase a diverse range of powerful and user-friendly software applications tailored to meet the unique needs of modern businesses.
            </p>

            {/* Quick Metrics Bar */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="stat-metric text-gradient">12+</span>
                <span className="stat-label">Turnkey Products</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-metric">100%</span>
                <span className="stat-label">Source Code Ownership</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-metric text-gradient">7+</span>
                <span className="stat-label">Core Industries</span>
              </div>
              <div className="hero-stat-item">
                <span className="stat-metric">5-7</span>
                <span className="stat-label">Days Deployment</span>
              </div>
            </div>

            {/* CTA Action Row */}
            <div className="hero-cta-bar">
              <button
                onClick={onOpenDemoModal}
                className="btn btn-primary btn-pulse-glow"
              >
                <span>Request Live Demo</span>
                <ArrowRight size={18} />
              </button>
              <a href="#catalog" className="btn btn-secondary">
                <span>Browse All Products ({PRODUCTS_LIST.length})</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Display */}
          <div className="products-hero-visual">
            <div className="hero-image-frame">
              <img
                src={productsHeroImg}
                alt="Black Grapes Softech Enterprise Products Suite"
                className="hero-showcase-img"
              />
              <div className="floating-glass-pill">
                <div className="pill-info">
                  <span className="live-indicator-dot"></span>
                  <div>
                    <div className="pill-title">Live Production Ready</div>
                    <div className="pill-sub">Cloud Native • Web • iOS • Android</div>
                  </div>
                </div>
                <span className="pill-badge-code">WHITE-LABEL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FILTER & REAL-TIME SEARCH SECTION (STICKY CONTROLS)
          ======================================================== */}
      <section id="catalog" className="catalog-controls-section">
        <div className="container controls-inner-wrap">
          <div className="search-and-count-row">
            {/* Real-time Search Input */}
            <div className="product-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, industry, or feature (e.g. Hospital, Gymzy, Biometric)..."
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Live Count Pill */}
            <div className="products-counter-badge">
              <span>Showing:</span>
              <span className="counter-num">{filteredProducts.length}</span>
              <span>of {PRODUCTS_LIST.length} Products</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-filter-tabs">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="tab-badge-count">
                    {cat.id === 'all'
                      ? PRODUCTS_LIST.length
                      : PRODUCTS_LIST.filter((p) => p.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPREHENSIVE PRODUCTS CATALOG GRID (12 PRODUCTS)
          ======================================================== */}
      <section className="products-catalog-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="empty-catalog-state">
              <h3 className="empty-state-title">No products found matching "{searchQuery}"</h3>
              <p className="empty-state-sub">
                Try searching for general keywords like "Management", "App", "Billing", or clear the filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  {/* Video Thumbnail with Hover Overlay & Duration */}
                  <div
                    className="card-video-preview"
                    onClick={() => setActiveVideoProduct(product)}
                    title={`Watch live demo of ${product.title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${product.youtubeId}/hqdefault.jpg`}
                      alt={product.title}
                      className="video-thumb-img"
                      loading="lazy"
                    />
                    <div className="video-thumb-overlay">
                      <div className="play-action-circle">
                        <Play size={24} fill="#ffffff" />
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="card-top-badges">
                      <span className={`product-badge badge-${product.badgeColor || 'orange'}`}>
                        <Sparkles size={11} /> {product.badge}
                      </span>
                      <span className="industry-chip">{product.industry}</span>
                    </div>

                    {/* Duration Badge */}
                    <span className="video-duration-tag">
                      <Video size={12} /> Watch Video Demo
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="card-content-wrap">
                    <div className="card-title-group">
                      <h3 className="product-item-title">{product.title}</h3>
                      <span className="product-item-sub">{product.subtitle}</span>
                    </div>

                    <p className="product-item-desc">{product.summary}</p>

                    {/* Key Features Block */}
                    <div className="card-features-block">
                      <div className="card-features-heading">Core Capabilities:</div>
                      <ul className="card-feature-list">
                        {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="card-feature-item">
                            <CheckCircle2 size={15} className="feature-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="card-tech-row">
                      {product.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag-mini">
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 3 && (
                        <span className="tech-tag-mini">+{product.techStack.length - 3} more</span>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="card-action-footer">
                      <button
                        onClick={() => setActiveVideoProduct(product)}
                        className="btn-watch-demo"
                      >
                        <Play size={14} />
                        <span>Watch Demo</span>
                      </button>

                      <button
                        onClick={onOpenDemoModal}
                        className="btn-get-quote"
                      >
                        <span>Get Started</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. OFFICIAL INDUSTRIES SOLUTIONS (FROM BLACKGRAPESSOFTECH.COM)
          ======================================================== */}
      <section className="industries-showcase-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-badge-pill">
              <Globe size={14} /> INDUSTRY COVERAGE
            </span>
            <h2 className="section-main-heading">
              Tailored Digital Solutions Across 7 Key Verticals
            </h2>
            <p className="section-main-sub">
              Directly aligned with our core business domains, our software architectures are customized to tackle the specific regulatory and workflow challenges of your industry.
            </p>
          </div>

          <div className="industries-grid">
            {OFFICIAL_INDUSTRIES.map((ind) => {
              const IconComp = INDUSTRY_ICONS[ind.name] || Activity;
              return (
                <div key={ind.id} className="industry-showcase-card">
                  <div className="industry-card-icon-wrap">
                    <IconComp size={24} />
                  </div>
                  <h3 className="industry-card-name">{ind.name}</h3>
                  <p className="industry-card-desc">{ind.description}</p>
                  <ul className="industry-solutions-list">
                    {ind.solutions.map((sol, idx) => (
                      <li key={idx} className="industry-solution-pill">
                        <Check size={13} /> {sol}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. INTERACTIVE PRODUCT SOLUTION CONFIGURATOR & ESTIMATOR
          ======================================================== */}
      <section className="estimator-section">
        <div className="container">
          <ProductEstimator onOpenDemoModal={onOpenDemoModal} />
        </div>
      </section>

      {/* ========================================================
          6. WHY CHOOSE BLACK GRAPES PRODUCTS (ENTERPRISE GUARANTEES)
          ======================================================== */}
      <section className="guarantees-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-badge-pill">
              <ShieldCheck size={14} /> ARCHITECTURE & ADVANTAGE
            </span>
            <h2 className="section-main-heading">
              Why Global Businesses Choose Our Software Products
            </h2>
            <p className="section-main-sub">
              Unlike rigid SaaS with recurring monthly per-seat licenses, Black Grapes Softech delivers complete freedom, proprietary IP ownership, and bespoke adaptability.
            </p>
          </div>

          <div className="guarantees-grid">
            {PRODUCT_GUARANTEES.map((item, idx) => {
              const IconComp = GUARANTEE_ICONS[item.icon] || ShieldCheck;
              return (
                <div key={idx} className="guarantee-card glass-card">
                  <div className="guarantee-icon-box">
                    <IconComp size={22} />
                  </div>
                  <h3 className="guarantee-title">{item.title}</h3>
                  <p className="guarantee-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. BOTTOM CALL TO ACTION
          ======================================================== */}
      <section className="products-cta-section">
        <div className="container">
          <div className="products-cta-card">
            <div className="cta-ambient-circle"></div>
            <div className="cta-content-inner">
              <span className="hero-eyebrow-badge">
                <Sparkles size={14} /> ACCELERATE YOUR GO-TO-MARKET
              </span>
              <h2 className="cta-heading">
                Ready to Deploy Your Enterprise Software in Under 7 Days?
              </h2>
              <p className="cta-lead">
                Book a live 1-on-1 architecture walkthrough with our engineering leads. We customize workflows, branding, and server deployment to match your exact specifications.
              </p>

              <div className="cta-buttons-group">
                <button
                  onClick={onOpenDemoModal}
                  className="btn btn-primary btn-pulse-glow"
                >
                  <Sparkles size={18} />
                  <span>Request Full Software Demo</span>
                </button>

                <a
                  href="https://wa.me/917470997884?text=Hello%20Black%20Grapes%20Softech,%20I%20would%20like%20to%20inquire%20about%20your%20software%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>Instant WhatsApp Consultation</span>
                </a>
              </div>

              <div className="cta-phone-links">
                <span>Direct Executive Lines:</span>
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
          8. PRODUCT DEMO VIDEO MODAL (POPUP)
          ======================================================== */}
      {activeVideoProduct && (
        <ProductVideoModal
          product={activeVideoProduct}
          onClose={() => setActiveVideoProduct(null)}
          onOpenDemoModal={onOpenDemoModal}
        />
      )}
    </div>
  );
}
