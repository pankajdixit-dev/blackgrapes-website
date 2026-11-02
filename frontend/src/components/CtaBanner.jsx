import React, { useState, useEffect } from 'react';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function CtaBanner({ onOpenModal }) {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    getPageSections('home').then((sections) => {
      if (sections && sections.home_cta) {
        setCtaData(sections.home_cta.content);
      }
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home' && detail.sections?.home_cta) {
        setCtaData(detail.sections.home_cta.content);
      } else {
        getPageSections('home').then((sections) => {
          if (sections && sections.home_cta) {
            setCtaData(sections.home_cta.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const badge = ctaData?.badge || 'GET STARTED WITH BLACK GRAPES SOFTECH';
  const title = ctaData?.title || 'Assess Your Business Potentials Now & Find';
  const titleHighlight = ctaData?.titleHighlight || 'Take Care of What Matters Most!';
  const subtitle = ctaData?.subtitle || 'Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.';
  const primaryBtn = ctaData?.primaryBtnText || 'Get Started Now!';
  const secondaryBtn = ctaData?.secondaryBtnText || 'Get Free Consultation';

  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-glow"></div>

          <div className="cta-banner-content">
            <span className="cta-badge">{badge}</span>
            <h2 className="cta-banner-title">
              {title} <br />
              <span className="text-highlight">{titleHighlight}</span>
            </h2>
            <p className="cta-banner-subtitle">
              {subtitle}
            </p>

            <div className="cta-btn-wrapper">
              <button
                type="button"
                className="btn btn-primary btn-xl"
                onClick={() => onOpenModal(primaryBtn)}
              >
                <span>{primaryBtn}</span>
                <span className="btn-sparkle">🚀</span>
              </button>

              <button
                type="button"
                className="btn btn-outline btn-xl"
                onClick={() => onOpenModal(secondaryBtn)}
              >
                <span>{secondaryBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
