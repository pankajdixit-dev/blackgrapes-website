import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Building2, 
  FileCheck2, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Users, 
  Cpu, 
  Award,
  ChevronRight
} from 'lucide-react';
import '../styles/Home.css';

export default function HomePage({ onOpenInquiry }) {
  const divisions = [
    {
      id: 'softech',
      title: 'Black Grapes Softech',
      subtitle: 'Information Technology & Software',
      icon: <Code2 size={28} className="div-icon" />,
      desc: 'Architecting custom enterprise ERPs, specialized MLM platforms, web portals, mobile apps, and private tender bidding solutions.',
      link: '/services?category=softech',
      highlights: ['Custom ERP & CRM Suites', 'MLM & Direct Sales Systems', 'Cross-Platform Mobile Apps']
    },
    {
      id: 'valuation',
      title: 'Black Grapes Valuers & Engineers',
      subtitle: 'Asset Valuation & Engineering',
      icon: <Building2 size={28} className="div-icon" />,
      desc: 'Government-approved, IBBI registered valuation of immovable properties, industrial machinery, and Chartered Engineer CE certifications.',
      link: '/services?category=valuation',
      highlights: ['Bank Collateral Valuations', 'Plant & Industrial Machinery', 'Chartered Engineer Certifications']
    },
    {
      id: 'advisory',
      title: 'Black Grapes Associates',
      subtitle: 'Corporate, Legal & Municipal Advisory',
      icon: <FileCheck2 size={28} className="div-icon" />,
      desc: 'Indore Nagar Nigam map approvals (Naksha Pass), IDA lease renewals, factory licensing (FSSAI, Drug), and land revenue legalities.',
      link: '/services?category=advisory',
      highlights: ['Municipal (Naksha Pass) Sanctions', 'Commercial Licensing (FSSAI/Drug)', 'Land Diversion & Title Search']
    },
    {
      id: 'realestate',
      title: 'Black Grapes Real Estate',
      subtitle: 'Strategic Property & Investments',
      icon: <TrendingUp size={28} className="div-icon" />,
      desc: 'Prime corporate office spaces, retail showrooms, and multi-acre industrial land acquisitions across Central India high-growth corridors.',
      link: '/services?category=realestate',
      highlights: ['Commercial Property Broking', 'High-Yield Pre-Leased Assets', 'Turnkey Industrial Land Aggregation']
    }
  ];

  return (
    <div className="home-root animate-fade-in">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container home-hero-content">
          <div className="home-badge">
            <span className="badge-pill">🍇 Welcome to Black Grapes Group</span>
          </div>

          <h1 className="home-title">
            Where Technology, Engineering &amp; <br />
            <span className="gradient-text">Strategic Advisory Converge</span>
          </h1>

          <p className="home-subtitle">
            A premier Indian conglomerate empowering enterprises with bespoke software platforms, bank-empaneled asset valuations, statutory municipal sanctions, and prime commercial investments.
          </p>

          <div className="home-hero-actions">
            <Link to="/services" className="btn-primary">
              <Sparkles size={18} />
              <span>Explore All Services</span>
              <ArrowRight size={18} />
            </Link>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => onOpenInquiry && onOpenInquiry('General Strategy Consultation')}
            >
              <span>Schedule Strategy Call</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="home-stats-grid">
            <div className="home-stat-card glass-card">
              <span className="stat-value">15+</span>
              <span className="stat-name">Years Industry Leadership</span>
            </div>
            <div className="home-stat-card glass-card">
              <span className="stat-value">1,200+</span>
              <span className="stat-name">Delivered Projects &amp; Reports</span>
            </div>
            <div className="home-stat-card glass-card">
              <span className="stat-value">50+</span>
              <span className="stat-name">Engineers &amp; Registered Valuers</span>
            </div>
            <div className="home-stat-card glass-card">
              <span className="stat-value">99.4%</span>
              <span className="stat-name">Client Satisfaction Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Group Divisions Showcase */}
      <section className="divisions-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="badge-pill">🏢 Group Pillars</span>
            <h2 className="section-title">
              Our Core <span className="gradient-text">Divisions of Excellence</span>
            </h2>
            <p className="section-desc">
              Discover specialized solutions designed to accelerate corporate momentum, ensure regulatory compliance, and expand market reach.
            </p>
          </div>

          <div className="divisions-grid">
            {divisions.map((div) => (
              <div key={div.id} className="division-card glass-card">
                <div className="div-icon-wrapper">
                  {div.icon}
                </div>
                <span className="div-tagline">{div.subtitle}</span>
                <h3 className="div-title">{div.title}</h3>
                <p className="div-desc">{div.desc}</p>

                <div className="div-highlights">
                  {div.highlights.map((h, i) => (
                    <div key={i} className="div-highlight-item">
                      <CheckCircle2 size={14} className="text-purple" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <Link to={div.link} className="div-explore-link">
                  <span>Explore Division Services</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="view-all-services-cta">
            <Link to="/services" className="btn-primary">
              <span>View All 15+ Services in Detail</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Callout */}
      <section className="home-callout-section">
        <div className="container">
          <div className="callout-card glass-card">
            <div className="callout-content">
              <span className="badge-pill">⚡ Single Window Advantage</span>
              <h3>Need Custom Software, Valuation, or Municipal Approvals?</h3>
              <p>
                Save time and eliminate vendor friction. Our multidisciplinary specialists work together to deliver end-to-end execution with guaranteed confidentiality and speed.
              </p>
              <div className="callout-buttons">
                <Link to="/services" className="btn-primary">
                  <span>Explore Services Directory</span>
                  <ArrowRight size={16} />
                </Link>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => onOpenInquiry && onOpenInquiry('Multidisciplinary Package')}
                >
                  <span>Book Free Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
