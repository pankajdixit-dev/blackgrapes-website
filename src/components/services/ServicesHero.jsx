import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { getPageSections } from '@backend/dataService.js';
import '../../utils/realtimeSync';

export default function ServicesHero({ 
  searchQuery, 
  setSearchQuery, 
  filteredCount, 
  totalCount 
}) {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    getPageSections('services').then((secs) => {
      if (secs && secs.services_hero) {
        setHeroData(secs.services_hero.content);
      }
    });

    const handleUpdate = (e) => {
      const detail = e.detail || {};
      if (detail.pageSlug === 'services' && detail.sections?.services_hero) {
        setHeroData(detail.sections.services_hero.content);
      } else {
        getPageSections('services').then((secs) => {
          if (secs && secs.services_hero) {
            setHeroData(secs.services_hero.content);
          }
        });
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const badge = heroData?.badge || 'BLACK GRAPES GROUP';
  const title = heroData?.title || 'Services Built Specifically';
  const highlight = heroData?.highlight || 'For Your Business';
  const subtitle = heroData?.subtitle || 'Empowering businesses with tailored solutions to meet your unique needs.';

  return (
    <section className="services-hero-black">
      <div className="hero-ambient-glow" />

      <div className="content-wrapper text-center">
        {/* Top Tag Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <span className="hero-top-pill">
            <Sparkles size={13} color="#f86200" />
            <span>{badge}</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="black-hero-title">
          {title}{' '}
          <span className="hero-title-accent">{highlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="black-hero-subtitle">
          {subtitle}
        </p>

        {/* Clean Interactive Search Filter */}
        <div className="black-hero-search-wrapper">
          <div className="black-search-bar">
            <Search size={18} color="#cbd5e1" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (Softech, Real Estate, Valuers, Investment, Insurance)..."
              className="black-search-input"
              aria-label="Search Black Grapes Services"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="btn-search-clear"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <span className="search-count-pill">
              {filteredCount} / {totalCount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
