import React, { useState } from 'react';
import { useHomePage } from '@backend/useContent';
import { ABOUT_CONTENT } from '../data/siteData';

export default function AboutSection({ onOpenModal }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeValueTab, setActiveValueTab] = useState(0);
  const { home } = useHomePage();
  const about = home?.aboutSection || {};

  const badge = about.badge || ABOUT_CONTENT.badge || 'ABOUT COMPANY';
  const mainTitle = about.mainTitle || ABOUT_CONTENT.mainTitle || 'Best Website Development Company | Best IT Software Company | Best Mobile App Development Company';
  const subtitle = about.subtitle || ABOUT_CONTENT.subtitle || 'Black Grapes Softech – Best Website Development Company, App Development, MLM Software, Digital Marketing Services in Indore at Affordable price and best services';
  const narrativeHeading = about.narrativeHeading || 'Transforming Your Boldest Visions Into High-Performance Reality';
  const primaryParagraph = about.primaryParagraph || ABOUT_CONTENT.primaryParagraph;
  const secondaryParagraph = about.secondaryParagraph || ABOUT_CONTENT.secondaryParagraph;

  const coreValues = (Array.isArray(about.coreValues) && about.coreValues.length > 0)
    ? about.coreValues
    : ABOUT_CONTENT.coreValues;

  const qaItems = (Array.isArray(about.qaItems) && about.qaItems.length > 0)
    ? about.qaItems
    : ABOUT_CONTENT.qaItems;

  const showcaseImage = about.showcaseImage || '/images/blackgrapes-1.png';
  const experienceYears = about.experienceYears || '10+ Years';
  const experienceLabel = about.experienceLabel || 'of IT & Software Innovation';
  const techBadgeText = about.techBadgeText || 'Web • Mobile • Cloud • AI';

  const innovationImage = about.innovationImage || '/images/tech-innovation.jpg';
  const innovationTag = about.innovationTag || 'AI & CLOUD ARCHITECTURE';
  const innovationKpi = about.innovationKpi || '⚡ 99.9% Uptime • Global Data Flow';
  const innovationTitle = about.innovationTitle || 'High-Velocity Software Ecosystems';
  const innovationBadge = about.innovationBadge || 'Enterprise Ready';
  const innovationDesc = about.innovationDesc || 'Architecting resilient microservices, distributed cloud backends, and smart automation pipelines that empower modern digital enterprises.';
  const innovationChips = (Array.isArray(about.innovationChips) && about.innovationChips.length > 0)
    ? about.innovationChips
    : ['Microservices', 'Cloud Network', 'API Gateways', 'Automated CI/CD'];

  const lifecycleTitle = about.lifecycleTitle || 'Full Lifecycle Engineering';
  const lifecycleDesc = about.lifecycleDesc || 'From technical discovery to deployment and 24/7 proactive monitoring, we build software engineered to scale with your enterprise.';

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{badge}</span>
          </div>
          <h2 className="section-title">
            {mainTitle.includes('|') ? (
              mainTitle.split('|').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part.trim()}
                  {i < arr.length - 1 && <span className="title-gradient-separator"> | </span>}
                </React.Fragment>
              ))
            ) : (
              mainTitle
            )}
          </h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="about-grid">
          {/* Left Column: Visual Infographic & Modern Technology Visual Card */}
          <div className="about-visual-col">
            {/* Top Showcase Card */}
            <div className="about-image-card">
              <div className="about-img-wrapper">
                <img
                  src={showcaseImage}
                  alt="Black Grapes Softech Team & Architecture"
                  className="about-main-img"
                  onError={(e) => {
                    e.currentTarget.src = '/images/services-infograph.png';
                  }}
                />
                <div className="img-overlay-gradient"></div>
              </div>

              {/* Floating Experience Card */}
              <div className="about-stat-floating-card">
                <div className="stat-floating-icon">🏆</div>
                <div className="stat-floating-content">
                  <span className="stat-floating-number">{experienceYears}</span>
                  <span className="stat-floating-label">{experienceLabel}</span>
                </div>
              </div>

              {/* Floating Technology Badge */}
              <div className="about-tech-floating-pill">
                <span className="pill-dot"></span>
                <span>{techBadgeText}</span>
              </div>
            </div>

            {/* Modern Technology Innovation Visual Card */}
            <div className="about-tech-visual-card">
              <div className="tech-visual-img-wrapper">
                <img
                  src={innovationImage}
                  alt="Modern Cloud Network and Software Engineering"
                  className="tech-visual-img"
                  loading="lazy"
                />
                <div className="tech-visual-overlay"></div>

                <div className="tech-visual-tag">
                  <span className="pulse-dot"></span>
                  <span>{innovationTag}</span>
                </div>

                <div className="tech-visual-kpi-pill">
                  <span>{innovationKpi}</span>
                </div>
              </div>

              <div className="tech-visual-details">
                <div className="tech-visual-header">
                  <h4 className="tech-visual-title">{innovationTitle}</h4>
                  <span className="tech-visual-badge">{innovationBadge}</span>
                </div>
                <p className="tech-visual-desc">
                  {innovationDesc}
                </p>
                <div className="tech-visual-chips">
                  {innovationChips.map((chip, cIdx) => (
                    <span key={cIdx} className="tech-chip">{chip}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lifecycle Engineering Sub-Card */}
            <div className="about-sub-card">
              <div className="sub-card-header">
                <span className="sub-card-icon">⚡</span>
                <span className="sub-card-title">{lifecycleTitle}</span>
              </div>
              <p className="sub-card-text">
                {lifecycleDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Interactive Values */}
          <div className="about-text-col">
            <div className="about-narrative-card">
              <h3 className="narrative-heading">
                {narrativeHeading}
              </h3>

              <p className="narrative-body" style={{ whiteSpace: 'pre-line' }}>
                {primaryParagraph}
              </p>

              <p className="narrative-body secondary-paragraph" style={{ whiteSpace: 'pre-line' }}>
                {secondaryParagraph}
              </p>
            </div>

            {/* Interactive Core Values Tabs */}
            <div className="values-tabs-wrapper">
              <div className="values-tab-buttons">
                {coreValues.map((val, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`value-tab-btn ${activeValueTab === idx ? 'value-tab-active' : ''}`}
                    onClick={() => setActiveValueTab(idx)}
                  >
                    <span>0{idx + 1}.</span> {val.title}
                  </button>
                ))}
              </div>

              {coreValues[activeValueTab] && (
                <div className="value-tab-content">
                  <div className="value-tab-icon">🎯</div>
                  <p>{coreValues[activeValueTab].desc}</p>
                </div>
              )}
            </div>

            {/* Strategic Q&A Accordion */}
            <div className="about-qa-wrapper">
              <div className="qa-section-title-row">
                <h4 className="qa-heading">Strategic Consultation Highlights</h4>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => onOpenModal && onOpenModal('Ask a Question')}
                >
                  Ask a Question
                </button>
              </div>

              <div className="qa-accordion">
                {qaItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`qa-item ${openFaq === idx ? 'qa-item-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="qa-question-btn"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <span className="qa-q-text">{item.q}</span>
                      <span className="qa-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    {openFaq === idx && (
                      <div className="qa-answer-pane">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
