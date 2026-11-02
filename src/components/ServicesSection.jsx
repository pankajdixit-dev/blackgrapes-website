import React, { useState } from 'react';
import { SERVICES } from '../data/siteData';

export default function ServicesSection({ onOpenModal, onSelectService }) {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>WHAT WE DO</span>
          </div>
          <h2 className="section-title">
            We Provide Best Quality Services & Products At <span className="text-highlight">Affordable Price</span>
          </h2>
          <p className="section-subtitle">
            Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'service-card-active' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Image & Overlay Header */}
              <div className="service-card-img-wrapper">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-img"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to digital marketing or general software
                    e.currentTarget.src = '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                  }}
                />
                <div className="service-card-img-overlay"></div>
                <div className="service-index-badge">0{index + 1}</div>
              </div>

              {/* Service Details */}
              <div className="service-card-content">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.shortDesc}</p>

                {/* Tech Pills */}
                <div className="service-tags-list">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="service-card-actions">
                  <button
                    type="button"
                    className="service-details-btn"
                    onClick={() => onSelectService(service)}
                  >
                    <span>Learn More</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="service-quote-btn"
                    onClick={() => onOpenModal(`Quote: ${service.title}`)}
                  >
                    Get Estimate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tendering Callout Section (From original site menu: Tendering Services) */}
        <div id="tendering" className="tendering-callout-card">
          <div className="tendering-content">
            <div className="tendering-badge">GOVERNMENT & PRIVATE TENDERS</div>
            <h3 className="tendering-title">Specialized Tendering & e-Procurement Technical Services</h3>
            <p className="tendering-desc">
              Black Grapes Softech provides end-to-end technical documentation, GeM portal technical bidding, architecture compliance, and software delivery for government and corporate procurement tenders.
            </p>
            <div className="tendering-pills">
              <span className="tend-pill">✓ GeM Portal Compliance</span>
              <span className="tend-pill">✓ Technical RFP Preparation</span>
              <span className="tend-pill">✓ Enterprise Security Certification</span>
            </div>
          </div>
          <div className="tendering-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenModal('Tendering Services')}
            >
              Consult Tender Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
