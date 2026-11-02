import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function HeroSection({ onOpenModal }) {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    // Initial fetch from backend / local cache
    getPageSections('home').then((sections) => {
      if (sections && sections.home_hero) {
        setHeroData(sections.home_hero.content);
      }
    });

    // Real-time synchronization event listener (via WebSockets / BroadcastChannel)
    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home' && detail.sections?.home_hero) {
        setHeroData(detail.sections.home_hero.content);
      } else {
        getPageSections('home').then((sections) => {
          if (sections && sections.home_hero) {
            setHeroData(sections.home_hero.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

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

  // Dynamic values with elegant fallbacks
  const eyebrowBadge = heroData?.eyebrowBadge || '10+ Years of Proven IT Excellence • Indore, India';
  const prefix = heroData?.prefix || 'Innovate. Integrate. Elevate.';
  const title = heroData?.title || 'And Digitalize Your Ideas into Success via';
  const brandHighlight = heroData?.brandHighlight || ' BLACK GRAPES SOFTECH';
  const suffix = heroData?.suffix || ', Where Innovation And ideas Meets Excellence.';
  const description = heroData?.lead || `${COMPANY_INFO.consultationText}. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.`;
  const primaryBtn = heroData?.primaryBtnText || 'Request a Demo';
  const secondaryBtn = heroData?.secondaryBtnText || 'Get the offer';
  const linkBtn = heroData?.linkBtnText || 'View Services';

  const stat1Num = heroData?.stat1Num || '10+';
  const stat1Label = heroData?.stat1Label || 'Years Experience';
  const stat2Num = heroData?.stat2Num || '100+';
  const stat2Label = heroData?.stat2Label || 'Satisfied Clients';
  const stat3Num = heroData?.stat3Num || '150+';
  const stat3Label = heroData?.stat3Label || 'Projects Shipped';
  const stat4Num = heroData?.stat4Num || '50+';
  const stat4Label = heroData?.stat4Label || 'Tech Services';

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Headline & Action CTAs */}
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="badge-glow-dot"></span>
            <span className="badge-text">{eyebrowBadge}</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-prefix">{prefix}</span>
            <span className="hero-break">{title}</span>
            <span className="hero-gradient-brand"> {brandHighlight}</span>
            <span className="hero-suffix">{suffix}</span>
          </h1>

          <p className="hero-description">{description}</p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onOpenModal(primaryBtn)}
            >
              <span className="btn-icon">⚡</span>
              <span>{primaryBtn}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => onOpenModal(secondaryBtn)}
            >
              <span className="btn-icon">🎁</span>
              <span>{secondaryBtn}</span>
            </button>

            <a href="#services" className="hero-link-btn">
              <span>{linkBtn}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-grid">
            <div className="hero-metric-item">
              <span className="metric-number">{stat1Num}</span>
              <span className="metric-label">{stat1Label}</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">{stat2Num}</span>
              <span className="metric-label">{stat2Label}</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">{stat3Num}</span>
              <span className="metric-label">{stat3Label}</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">{stat4Num}</span>
              <span className="metric-label">{stat4Label}</span>
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
              {heroData?.customImage ? (
                <div style={{ padding: '0.75rem' }}>
                  <img
                    src={heroData.customImage}
                    alt="Black Grapes Softech Showcase"
                    style={{ width: '100%', borderRadius: '8px', maxHeight: '320px', objectFit: 'cover' }}
                  />
                </div>
              ) : (
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
              )}
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
