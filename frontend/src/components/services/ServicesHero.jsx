import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export default function ServicesHero({ 
  searchQuery, 
  setSearchQuery, 
  filteredCount, 
  totalCount 
}) {
  return (
    <section className="services-hero-black">
      <div className="hero-ambient-glow" />

      <div className="content-wrapper text-center">
        {/* Top Tag Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <span className="hero-top-pill">
            <Sparkles size={13} color="#f86200" />
            <span>BLACK GRAPES GROUP</span>
          </span>
        </div>

        {/* Exact Authentic Heading */}
        <h1 className="black-hero-title">
          Services Built Specifically
          <span className="hero-title-accent"> For Your Business</span>
        </h1>

        {/* Exact Authentic Subtitle */}
        <p className="black-hero-subtitle">
          Empowering businesses with tailored solutions to meet your unique needs.
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
