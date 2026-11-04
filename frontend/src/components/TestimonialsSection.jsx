import React, { useState } from 'react';
import { useHomePage } from '@backend/useContent';
import { TESTIMONIALS } from '../data/siteData';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { home } = useHomePage();

  const ts = home?.testimonialsSection || {};
  const badge = ts.badge || 'WHAT PEOPLE ARE SAYING';
  const titlePrefix = ts.titlePrefix !== undefined ? ts.titlePrefix : 'Preparing For Your Success • ';
  const titleHighlight = ts.titleHighlight !== undefined ? ts.titleHighlight : 'Trusted Source In IT Services';
  const subtitle = ts.subtitle || 'See how Black Grapes Softech delivers real business transformation for leaders and founders.';

  const testimonialsList = (Array.isArray(ts.testimonials) && ts.testimonials.length > 0)
    ? ts.testimonials
    : TESTIMONIALS;

  const currentIdx = (activeIndex >= testimonialsList.length) ? 0 : activeIndex;
  const currentItem = testimonialsList[currentIdx] || testimonialsList[0] || {};

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  // Helper to extract or display initials for avatar
  const getAvatarText = (item) => {
    if (item.avatar) return item.avatar;
    if (item.name) {
      const parts = item.name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return parts[0].slice(0, 2).toUpperCase();
    }
    return 'BG';
  };

  const starCount = typeof currentItem.rating === 'number' ? currentItem.rating : 5;

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{badge}</span>
          </div>
          <h2 className="section-title">
            {titlePrefix}<span className="text-highlight">{titleHighlight}</span>
          </h2>
          <p className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Featured Testimonial Highlight */}
        <div className="testimonial-featured-card">
          <div className="quote-mark-icon">&ldquo;</div>

          <div className="testimonial-stars-row">
            {[...Array(starCount)].map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
            <span className="rating-score">{currentItem.ratingScore || '5.0 / 5.0 Rating'}</span>
            <span className="verified-client-pill">{currentItem.verifiedBadge || '✓ Verified Client'}</span>
          </div>

          <p className="testimonial-quote-text">
            {currentItem.quote}
          </p>

          <div className="testimonial-author-row">
            <div className="author-avatar-circle">
              {getAvatarText(currentItem)}
            </div>
            <div className="author-info">
              <strong className="author-name">{currentItem.name}</strong>
              <span className="author-role">{currentItem.role}</span>
            </div>

            {/* Slider Controls */}
            <div className="testimonial-controls">
              <button
                type="button"
                className="control-arrow-btn"
                onClick={prevReview}
                aria-label="Previous review"
              >
                &larr;
              </button>
              <span className="control-fraction">
                {String(currentIdx + 1).padStart(2, '0')} / {String(testimonialsList.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="control-arrow-btn"
                onClick={nextReview}
                aria-label="Next review"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Mini Cards Grid */}
        <div className="testimonials-grid">
          {testimonialsList.map((item, idx) => (
            <div
              key={idx}
              className={`testimonial-mini-card ${currentIdx === idx ? 'mini-card-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="mini-card-top">
                <div className="mini-avatar">{getAvatarText(item)}</div>
                <div>
                  <h4 className="mini-name">{item.name}</h4>
                  <span className="mini-role">{item.role}</span>
                </div>
              </div>
              <p className="mini-quote">
                &ldquo;{(item.quote || '').slice(0, 110)}...&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
