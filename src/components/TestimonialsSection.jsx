import React, { useState, useEffect } from 'react';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data/siteData';
import { getTestimonials } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(DEFAULT_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getTestimonials().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setReviews(data);
      }
    });

    const handleUpdate = () => {
      getTestimonials().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      });
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

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
            {reviews[activeIndex]?.quote || reviews[0]?.quote}
          </p>

          <div className="testimonial-author-row">
            <div className="author-avatar-circle">
              {reviews[activeIndex]?.avatar || '👤'}
            </div>
            <div className="author-info">
              <strong className="author-name">{reviews[activeIndex]?.name || reviews[0]?.name}</strong>
              <span className="author-role">{reviews[activeIndex]?.role || reviews[0]?.role}</span>
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
                0{activeIndex + 1} / 0{reviews.length}
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
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className={`testimonial-mini-card ${activeIndex === idx ? 'mini-card-active' : ''}`}
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
                &ldquo;{item.quote.slice(0, 110)}...&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
