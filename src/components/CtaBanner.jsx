import React from 'react';

export default function CtaBanner({ onOpenModal }) {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-glow"></div>

          <div className="cta-banner-content">
            <span className="cta-badge">GET STARTED WITH BLACK GRAPES SOFTECH</span>
            <h2 className="cta-banner-title">
              Assess Your Business Potentials Now &amp; Find <br />
              <span className="text-highlight">Take Care of What Matters Most!</span>
            </h2>
            <p className="cta-banner-subtitle">
              Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.
            </p>

            <div className="cta-btn-wrapper">
              <button
                type="button"
                className="btn btn-primary btn-xl"
                onClick={() => onOpenModal('Assess Business Potentials')}
              >
                <span>Get Started Now!</span>
                <span className="btn-sparkle">🚀</span>
              </button>

              <button
                type="button"
                className="btn btn-outline btn-xl"
                onClick={() => onOpenModal('Get Free Consultation')}
              >
                <span>Get Free Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
