import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/siteData';
import { useTestimonials } from '@backend/useContent';

export default function TestimonialsSection() {
  const { testimonials } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultTestimonials = TESTIMONIALS;
  const list = (testimonials && testimonials.length > 0)
    ? testimonials.map((t) => ({
        name: t.name,
        role: t.designation || t.role || 'Verified Client',
        quote: t.quote,
        avatar: t.avatar || (t.name ? t.name.slice(0, 2).toUpperCase() : 'BG')
      }))
    : defaultTestimonials;

  const currentIndex = activeIndex >= list.length ? 0 : activeIndex;

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const current = list[currentIndex] || list[0];

  return (
    <section className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>WHAT PEOPLE ARE SAYING</span>
          </div>
          <h2 className="section-title">
            Preparing For Your Success &bull; <span className="text-highlight">Trusted Source In IT Services</span>
          </h2>
          <p className="section-subtitle">
            See how Black Grapes Softech delivers real business transformation for leaders and founders.
          </p>
        </div>

        {/* Featured Testimonial Highlight */}
        <div className="testimonial-featured-card">
          <div className="quote-mark-icon">&ldquo;</div>

          <div className="testimonial-stars-row">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
            <span className="rating-score">5.0 / 5.0 Rating</span>
            <span className="verified-client-pill">✓ Verified Client</span>
          </div>

          <p className="testimonial-quote-text">
            {current?.quote}
          </p>

          <div className="testimonial-author-row">
            <div className="author-avatar-circle">
              {current?.avatar}
            </div>
            <div className="author-info">
              <strong className="author-name">{current?.name}</strong>
              <span className="author-role">{current?.role}</span>
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
                0{currentIndex + 1} / 0{list.length}
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
          {list.map((item, idx) => (
            <div
              key={idx}
              className={`testimonial-mini-card ${currentIndex === idx ? 'mini-card-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="mini-card-top">
                <div className="mini-avatar">{item.avatar}</div>
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
