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
import { useProductsPage, useProducts } from '@backend/useContent';
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

  const { productsPageData } = useProductsPage();
  const { products } = useProducts();

  const productsList = (Array.isArray(products) && products.length > 0)
    ? products
    : PRODUCTS_LIST;

  const heroBadge = productsPageData?.badge || 'BLACK GRAPES SOFTECH PROPRIETARY SUITE';
  const heroTitle = productsPageData?.title || 'Our Products:';
  const heroTitleAccent = productsPageData?.titleAccent || 'Engineered to Transform Modern Business';
  const heroDesc = productsPageData?.subtitle || 'Explore our cutting-edge software solutions designed to transform the way you work and elevate your business to new heights. Our Products showcase a diverse range of powerful and user-friendly software applications tailored to meet the unique needs of modern businesses.';
  const heroStats = (Array.isArray(productsPageData?.stats) && productsPageData.stats.length > 0)
    ? productsPageData.stats
    : [
        { metric: '12+', label: 'Turnkey Products' },
        { metric: '100%', label: 'Source Code Ownership' },
        { metric: '7+', label: 'Core Industries' },
        { metric: '5-7', label: 'Days Deployment' }
      ];
  const primaryBtn = productsPageData?.primaryBtnText || 'Request Live Demo';
  const secondaryBtn = productsPageData?.secondaryBtnText || 'Browse All Products';
  const pillTitle = productsPageData?.pillTitle || 'Live Production Ready';
  const pillSub = productsPageData?.pillSub || 'Cloud Native • Web • iOS • Android';
  const pillBadge = productsPageData?.pillBadge || 'WHITE-LABEL';
  const heroImg = productsPageData?.image || productsHeroImg;

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const title = product.title || '';
      const subtitle = product.subtitle || '';
      const industry = product.industry || '';
      const summary = product.summary || '';
      const features = product.keyFeatures || product.key_features || [];
      const matchesSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q) ||
        industry.toLowerCase().includes(q) ||
        summary.toLowerCase().includes(q) ||
        features.some((feat) => typeof feat === 'string' && feat.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, productsList]);

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
              <span>{heroBadge}</span>
            </div>

            <h1 className="products-hero-title">
              {heroTitle} <br />
              <span className="text-gradient">{heroTitleAccent}</span>
            </h1>

            <p className="products-hero-desc">
              {heroDesc}
            </p>

            {/* Quick Metrics Bar */}
            <div className="hero-stats-row">
              {heroStats.map((stat, idx) => (
                <div key={idx} className="hero-stat-item">
                  <span className={`stat-metric ${idx % 2 === 0 ? 'text-gradient' : ''}`}>{stat.metric}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Action Row */}
            <div className="hero-cta-bar">
              <button
                onClick={onOpenDemoModal}
                className="btn btn-primary btn-pulse-glow"
              >
                <span>{primaryBtn}</span>
                <ArrowRight size={18} />
              </button>
              <a href="#catalog" className="btn btn-secondary">
                <span>{secondaryBtn} ({productsList.length})</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Display */}
          <div className="products-hero-visual">
            <div className="hero-image-frame">
              <img
                src={heroImg}
                alt="Black Grapes Softech Enterprise Products Suite"
                className="hero-showcase-img"
              />
              <div className="floating-glass-pill">
                <div className="pill-info">
                  <span className="live-indicator-dot"></span>
                  <div>
                    <div className="pill-title">{pillTitle}</div>
                    <div className="pill-sub">{pillSub}</div>
                  </div>
                </div>
                <span className="pill-badge-code">{pillBadge}</span>
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
              <span>of {productsList.length} Products</span>
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
                      ? productsList.length
                      : productsList.filter((p) => p.category === cat.id).length}
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
                      src={`https://img.youtube.com/vi/${product.youtubeId || product.youtube_id || 'GPuZ0QpRypw'}/hqdefault.jpg`}
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
                        {(product.keyFeatures || product.key_features || []).slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="card-feature-item">
                            <CheckCircle2 size={15} className="feature-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="card-tech-row">
                      {(product.techStack || product.tech_stack || []).slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-tag-mini">
                          {tech}
                        </span>
                      ))}
                      {(product.techStack || product.tech_stack || []).length > 3 && (
                        <span className="tech-tag-mini">+{(product.techStack || product.tech_stack || []).length - 3} more</span>
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
