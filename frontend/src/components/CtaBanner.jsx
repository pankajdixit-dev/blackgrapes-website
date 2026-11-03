import React from 'react';
import { useHomePage } from '@backend/useContent';

export default function CtaBanner({ onOpenModal }) {
  const { home } = useHomePage();
  const cta = home?.ctaBanner || {};

  const badge = cta.badge || 'GET STARTED WITH BLACK GRAPES SOFTECH';
  const title = cta.title || 'Assess Your Business Potentials Now & Find Take Care of What Matters Most!';
  const subtitle = cta.subtitle || 'Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.';
  const primaryBtnText = cta.primaryBtnText || 'Get Started Now!';
  const secondaryBtnText = cta.secondaryBtnText || 'Get Free Consultation';

  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-glow"></div>

          <div className="cta-banner-content">
            <span className="cta-badge">{badge}</span>
            <h2 className="cta-banner-title" style={{ whiteSpace: 'pre-line' }}>
              {title}
            </h2>
            <p className="cta-banner-subtitle">
              {subtitle}
            </p>

            <div className="cta-btn-wrapper">
              <button
                type="button"
                className="btn btn-primary btn-xl"
                onClick={() => onOpenModal && onOpenModal(primaryBtnText)}
              >
                <span>{primaryBtnText}</span>
                <span className="btn-sparkle">🚀</span>
              </button>

              <button
                type="button"
                className="btn btn-outline btn-xl"
                onClick={() => onOpenModal && onOpenModal(secondaryBtnText)}
              >
                <span>{secondaryBtnText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
