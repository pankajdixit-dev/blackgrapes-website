import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_CONTENT } from '../data/siteData';

export default function AboutSection({ onOpenModal }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Block 1: ABOUT COMPANY */}
        <div className="about-grid mb-5">
          {/* Left Column: Visual Showcase */}
          <div className="about-visual-col">
            <div className="about-image-card">
              <div className="about-img-wrapper">
                <img
                  src="/images/services-infograph.png"
                  alt="Black Grapes Softech Innovation"
                  className="about-main-img"
                  onError={(e) => {
                    e.currentTarget.src = '/bgst-logo.png';
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
            </div>
          </div>

          {/* Right Column: ABOUT COMPANY Text */}
          <div className="about-text-col">
            <div className="about-narrative-card">
              <div className="section-badge mb-3">
                <span className="badge-sparkle">✦</span>
                <span>{ABOUT_CONTENT.badge}</span>
              </div>

              <h2 className="narrative-heading">
                We're Not Just Another Company; <span className="text-highlight">We’re Your Innovation Partner.</span>
              </h2>

              <p className="narrative-body">
                {ABOUT_CONTENT.primaryParagraph}
              </p>

              <div className="mt-4">
                <Link to="/about-us" className="btn btn-primary">
                  <span>Read More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: Secondary Banner - Best Website Development Company */}
        <div className="about-secondary-card glass-card p-4 p-md-5 mt-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge-pill mb-2">⭐ LEADING IT DEVELOPMENT COMPANY</span>
              <h3 className="h2 mb-3 text-white">
                {ABOUT_CONTENT.mainTitle}
              </h3>
              <h5 className="text-orange mb-3" style={{ color: 'var(--color-primary, #f86200)', fontSize: '1.1rem' }}>
                {ABOUT_CONTENT.subtitle}
              </h5>
              <p className="text-muted-light mb-4" style={{ color: 'var(--color-text-muted, #cbd5e1)', lineHeight: '1.8' }}>
                {ABOUT_CONTENT.secondaryParagraph}
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start mt-3 mt-lg-0">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onOpenModal('Ask a Question')}
              >
                <span>Ask a Question</span>
                <span className="btn-sparkle">💬</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
