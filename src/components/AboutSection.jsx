import React, { useState } from 'react';
import { ABOUT_CONTENT } from '../data/siteData';

export default function AboutSection({ onOpenModal }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeValueTab, setActiveValueTab] = useState(0);

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{ABOUT_CONTENT.badge}</span>
          </div>
          <h2 className="section-title">
            Best Website Development Company <span className="title-gradient-separator">|</span> Best IT Software Company <span className="title-gradient-separator">|</span> Best Mobile App Development Company
          </h2>
          <p className="section-subtitle">
            {ABOUT_CONTENT.subtitle}
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
                  src="/images/blackgrapes-1.png"
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
                  <span className="stat-floating-number">10+ Years</span>
                  <span className="stat-floating-label">of IT &amp; Software Innovation</span>
                </div>
              </div>

              {/* Floating Technology Badge */}
              <div className="about-tech-floating-pill">
                <span className="pill-dot"></span>
                <span>Web &bull; Mobile &bull; Cloud &bull; AI</span>
              </div>
            </div>

            {/* Modern Technology Innovation Visual Card (Fills Left Side Beautifully) */}
            <div className="about-tech-visual-card">
              <div className="tech-visual-img-wrapper">
                <img
                  src="/images/tech-innovation.jpg"
                  alt="Modern Cloud Network and Software Engineering"
                  className="tech-visual-img"
                  loading="lazy"
                />
                <div className="tech-visual-overlay"></div>

                <div className="tech-visual-tag">
                  <span className="pulse-dot"></span>
                  <span>AI &amp; CLOUD ARCHITECTURE</span>
                </div>

                <div className="tech-visual-kpi-pill">
                  <span>⚡ 99.9% Uptime &bull; Global Data Flow</span>
                </div>
              </div>

              <div className="tech-visual-details">
                <div className="tech-visual-header">
                  <h4 className="tech-visual-title">High-Velocity Software Ecosystems</h4>
                  <span className="tech-visual-badge">Enterprise Ready</span>
                </div>
                <p className="tech-visual-desc">
                  Architecting resilient microservices, distributed cloud backends, and smart automation pipelines that empower modern digital enterprises.
                </p>
                <div className="tech-visual-chips">
                  <span className="tech-chip">Microservices</span>
                  <span className="tech-chip">Cloud Network</span>
                  <span className="tech-chip">API Gateways</span>
                  <span className="tech-chip">Automated CI/CD</span>
                </div>
              </div>
            </div>

            {/* Lifecycle Engineering Sub-Card */}
            <div className="about-sub-card">
              <div className="sub-card-header">
                <span className="sub-card-icon">⚡</span>
                <span className="sub-card-title">Full Lifecycle Engineering</span>
              </div>
              <p className="sub-card-text">
                From technical discovery to deployment and 24/7 proactive monitoring, we build software engineered to scale with your enterprise.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Narrative & Interactive Values */}
          <div className="about-text-col">
            <div className="about-narrative-card">
              <h3 className="narrative-heading">
                Transforming Your Boldest Visions Into <span className="text-highlight">High-Performance Reality</span>
              </h3>

              <p className="narrative-body">
                {ABOUT_CONTENT.primaryParagraph}
              </p>

              <p className="narrative-body secondary-paragraph">
                {ABOUT_CONTENT.secondaryParagraph}
              </p>
            </div>

            {/* Interactive Core Values Tabs */}
            <div className="values-tabs-wrapper">
              <div className="values-tab-buttons">
                {ABOUT_CONTENT.coreValues.map((val, idx) => (
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

              <div className="value-tab-content">
                <div className="value-tab-icon">🎯</div>
                <p>{ABOUT_CONTENT.coreValues[activeValueTab].desc}</p>
              </div>
            </div>

            {/* Strategic Q&A Accordion */}
            <div className="about-qa-wrapper">
              <div className="qa-section-title-row">
                <h4 className="qa-heading">Strategic Consultation Highlights</h4>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => onOpenModal('Ask a Question')}
                >
                  Ask a Question
                </button>
              </div>

              <div className="qa-accordion">
                {ABOUT_CONTENT.qaItems.map((item, idx) => (
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
