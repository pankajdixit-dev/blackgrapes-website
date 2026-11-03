import React from 'react';
import { INDUSTRIES } from '../data/siteData';

export default function IndustriesSection({ onOpenModal }) {
  const getIndustryIcon = (name) => {
    switch (name) {
      case 'Healthcare': return '🏥';
      case 'Food Delivery': return '🍔';
      case 'E-Commerce': return '🛍️';
      case 'Taxi and Transportation': return '🚖';
      case 'Home Services': return '🔧';
      case 'Education': return '🎓';
      case 'Real Estate': return '🏢';
      default: return '💳';
    }
  };

  return (
    <section id="industries" className="section industries-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>INDUSTRIES</span>
          </div>
          <h2 className="section-title">
            Tailored IT Solutions Across <span className="text-highlight">High-Growth Industries</span>
          </h2>
          <p className="section-subtitle">
            From regulated healthcare ecosystems to high-velocity on-demand logistics, we engineer software built for specific market dynamics.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid">
          {INDUSTRIES.map((ind, idx) => (
            <div key={idx} className="industry-card">
              <div className="industry-icon-wrapper" style={{ margin: "0 auto 1.25rem" }}>
                <span className="industry-icon-emoji">{getIndustryIcon(ind.name)}</span>
              </div>
              <h3 className="industry-name">{ind.name}</h3>
              <p className="industry-desc">{ind.desc}</p>
              <button
                type="button"
                className="industry-explore-btn"
                onClick={() => onOpenModal(`Industry Solution: ${ind.name}`)}
              >
                <span>Request Case Studies</span>
                <span className="btn-arrow">&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
