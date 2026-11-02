import React, { useState, useEffect } from 'react';
import { INDUSTRIES } from '../data/siteData';
import { getPageSections } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function IndustriesSection({ onOpenModal }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageSections('home').then((sections) => {
      if (sections && sections.home_industries) {
        setData(sections.home_industries.content);
      }
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'home' && detail.sections?.home_industries) {
        setData(detail.sections.home_industries.content);
      } else {
        getPageSections('home').then((sections) => {
          if (sections && sections.home_industries) {
            setData(sections.home_industries.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const badge = data?.badge || 'INDUSTRIES';
  const heading = data?.heading || 'Tailored IT Solutions Across High-Growth Industries';
  const subtitle = data?.subtitle || 'From regulated healthcare ecosystems to high-velocity on-demand logistics, we engineer software built for specific market dynamics.';
  const industriesList = data?.industries || INDUSTRIES;

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
            <span>{badge}</span>
          </div>
          <h2 className="section-title">
            {heading}
          </h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid">
          {industriesList.map((ind, idx) => (
            <div key={idx} className="industry-card">
              <div className="industry-icon-wrapper" style={{ margin: '0 auto 1.25rem' }}>
                <span className="industry-icon-emoji">{getIndustryIcon(ind.name)}</span>
              </div>
              <h3 className="industry-name">{ind.name}</h3>
              <p className="industry-desc">{ind.desc}</p>
              <button
                type="button"
                className="industry-explore-btn"
                onClick={() => onOpenModal && onOpenModal(`Industry Solution: ${ind.name}`)}
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
