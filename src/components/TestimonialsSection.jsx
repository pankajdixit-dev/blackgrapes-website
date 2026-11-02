import React, { useState, useEffect } from 'react';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data/siteData';
import { getTestimonials } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(DEFAULT_TESTIMONIALS || []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = () => {
      getTestimonials()
        .then((data) => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setReviews(data);
          }
        })
        .catch(() => {});
    };

    fetchReviews();
    window.addEventListener('bgst_content_updated', fetchReviews);
    return () => {
      isMounted = false;
      window.removeEventListener('bgst_content_updated', fetchReviews);
    };
  }, []);

  const safeReviews = Array.isArray(reviews) && reviews.length > 0 ? reviews : (DEFAULT_TESTIMONIALS || []);
  const validIndex = activeIndex >= 0 && activeIndex < safeReviews.length ? activeIndex : 0;
  const currentReview = safeReviews[validIndex] || safeReviews[0] || {};
  const currentQuote = currentReview.quote || currentReview.review || currentReview.content || 'Exceptional software engineering and proactive project management.';
  const currentAuthor = currentReview.name || currentReview.clientName || 'Enterprise Partner';
  const currentRole = currentReview.role || currentReview.designation || currentReview.company || 'Satisfied Client';
  const currentAvatar = currentReview.avatar || '👤';

  const prevReview = () => {
    setActiveIndex((prev) => (prev <= 0 ? safeReviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev >= safeReviews.length - 1 ? 0 : prev + 1));
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
            {currentQuote}
          </p>

          <div className="testimonial-author-row">
            <div className="author-avatar-circle">
              {currentAvatar}
            </div>
            <div className="author-info">
              <strong className="author-name">{currentAuthor}</strong>
              <span className="author-role">{currentRole}</span>
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
                0{validIndex + 1} / 0{safeReviews.length}
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
          {safeReviews.map((item, idx) => {
            const itemQuote = item.quote || item.review || item.content || '';
            const itemName = item.name || item.clientName || `Client ${idx + 1}`;
            const itemRole = item.role || item.designation || item.company || 'Partner';
            const itemAvatar = item.avatar || '👤';

            return (
              <div
                key={item.id || item._id || idx}
                className={`testimonial-mini-card ${validIndex === idx ? 'mini-card-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="mini-card-top">
                  <div className="mini-avatar">{itemAvatar}</div>
                  <div>
                    <h4 className="mini-name">{itemName}</h4>
                    <span className="mini-role">{itemRole}</span>
                  </div>
                </div>
                <p className="mini-quote">
                  &ldquo;{itemQuote.slice(0, 110)}{itemQuote.length > 110 ? '...' : ''}&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
