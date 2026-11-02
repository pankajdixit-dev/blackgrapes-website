import React from 'react';
import { COMPANY_INFO } from '../data/siteData';

export default function HeroSection({ onOpenModal }) {

  const techBadges = [
    { name: 'React', category: 'Frontend' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'AI & Data' },
    { name: 'Next.js', category: 'Full Stack' },
    { name: 'iOS / Swift', category: 'Native' },
    { name: 'Android / Kotlin', category: 'Native' },
    { name: 'AWS Cloud', category: 'DevOps' },
    { name: 'Custom CRM', category: 'Enterprise' },
    { name: 'MLM Engines', category: 'FinTech' }
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Headline & Action CTAs */}
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="badge-glow-dot"></span>
            <span className="badge-text">10+ Years of Proven IT Excellence &bull; Indore, India</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-prefix">Innovate. Integrate. Elevate.</span>
            <span className="hero-break">And Digitalize Your Ideas into Success via</span>
            <span className="hero-gradient-brand"> BLACK GRAPES SOFTECH</span>
            <span className="hero-suffix">, Where Innovation And ideas Meets Excellence.</span>
          </h1>

          <p className="hero-description">
            {COMPANY_INFO.consultationText}. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onOpenModal('Request a Demo')}
            >
              <span className="btn-icon">⚡</span>
              <span>Request a Demo</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => onOpenModal('Get the offer')}
            >
              <span className="btn-icon">🎁</span>
              <span>Get the offer</span>
            </button>

            <a href="#services" className="hero-link-btn">
              <span>View Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-grid">
            <div className="hero-metric-item">
              <span className="metric-number">10+</span>
              <span className="metric-label">Years Experience</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">100+</span>
              <span className="metric-label">Satisfied Clients</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">150+</span>
              <span className="metric-label">Projects Delivered</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">50+</span>
              <span className="metric-label">Tech Services</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Tech Showcase Card */}
        <div className="hero-visual">
          <div className="hero-glass-card">
            {/* Card Header with Mock Window Controls */}
            <div className="glass-card-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
            </div>

            {/* Showcase Card Content */}
            <div className="glass-card-body">
              <div className="tab-pane">
                <div className="code-header">
                  <span className="code-lang">FullStackApp.tsx</span>
                  <span className="code-status">● Live Production</span>
                </div>
                <pre className="code-block">
                  <code>{`// Modern React + Cloud Integration
import { BlackGrapesSoftech } from '@bgst/core';

export const EnterprisePortal = () => {
  const { deploy, performance } = BlackGrapesSoftech({
    speedScore: 99,
    securityShield: 'Active',
    uptime: '99.98%'
  });

  return <DigitalTransformation success={true} />;
};`}</code>
                </pre>

                <div className="card-kpis">
                  <div className="kpi-box">
                    <span className="kpi-val">99 / 100</span>
                    <span className="kpi-label">Lighthouse Score</span>
                  </div>
                  <div className="kpi-box">
                    <span className="kpi-val">&lt; 0.6s</span>
                    <span className="kpi-label">Load Time</span>
                  </div>
                  <div className="kpi-box">
                    <span className="kpi-val">100%</span>
                    <span className="kpi-label">Responsive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="floating-badge badge-bottom-left">
            <span className="floating-icon">🚀</span>
            <div className="floating-text">
              <strong>100+ Clients</strong>
              <span>Global Deliveries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee Strip */}
      <div className="tech-marquee-wrapper">
        <div className="marquee-label">Core Tech Stack:</div>
        <div className="marquee-track">
          {[...techBadges, ...techBadges].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span className="marquee-tech-name">{item.name}</span>
              <span className="marquee-category">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
