import React, { useState } from 'react';
import { useHomePage } from '@backend/useContent';
import { SERVICES as FALLBACK_SERVICES } from '../data/siteData';

export default function ServicesSection({ onOpenModal, onSelectService }) {
  const [hoveredService, setHoveredService] = useState(null);
  const { home } = useHomePage();
  const servicesSec = home?.servicesSection || {};

  const badge = servicesSec.badge || 'WHAT WE DO';
  const titlePrefix = servicesSec.titlePrefix !== undefined ? servicesSec.titlePrefix : 'We Provide Best Quality Services & Products At ';
  const titleHighlight = servicesSec.titleHighlight !== undefined ? servicesSec.titleHighlight : 'Affordable Price';
  const subtitle = servicesSec.subtitle || 'Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business.';

  const services = (Array.isArray(servicesSec.services) && servicesSec.services.length > 0)
    ? servicesSec.services
    : FALLBACK_SERVICES;

  const tendering = servicesSec.tendering || {};
  const tendBadge = tendering.badge || 'GOVERNMENT & PRIVATE TENDERS';
  const tendTitle = tendering.title || 'Specialized Tendering & e-Procurement Technical Services';
  const tendDesc = tendering.desc || 'Black Grapes Softech provides end-to-end technical documentation, GeM portal technical bidding, architecture compliance, and software delivery for government and corporate procurement tenders.';
  const tendPills = Array.isArray(tendering.pills) && tendering.pills.length > 0
    ? tendering.pills
    : ['✓ GeM Portal Compliance', '✓ Technical RFP Preparation', '✓ Enterprise Security Certification'];
  const tendBtnText = tendering.btnText || 'Consult Tender Experts';

  return (
    <section id="services" className="section services-section">
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

        {/* Services Cards Grid */}
        <div className="services-grid">
          {services.map((service, index) => {
            const tags = Array.isArray(service.tags)
              ? service.tags
              : (typeof service.tags === 'string' ? service.tags.split(',').map((t) => t.trim()).filter(Boolean) : []);

            return (
              <div
                key={service.id || index}
                className={`service-card ${hoveredService === (service.id || index) ? 'service-card-active' : ''}`}
                onMouseEnter={() => setHoveredService(service.id || index)}
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
                      e.currentTarget.src = '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                    }}
                  />
                  <div className="service-card-img-overlay"></div>
                  <div className="service-index-badge">{String(index + 1).padStart(2, '0')}</div>
                </div>

                {/* Service Details */}
                <div className="service-card-content">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.shortDesc}</p>

                  {/* Tech Pills */}
                  <div className="service-tags-list">
                    {tags.map((tag, tIdx) => (
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
                      onClick={() => onSelectService && onSelectService(service)}
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
                      onClick={() => onOpenModal && onOpenModal(`Quote: ${service.title}`)}
                    >
                      Get Estimate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tendering Callout Section */}
        <div id="tendering" className="tendering-callout-card">
          <div className="tendering-content">
            <div className="tendering-badge">{tendBadge}</div>
            <h3 className="tendering-title">{tendTitle}</h3>
            <p className="tendering-desc">
              {tendDesc}
            </p>
            <div className="tendering-pills">
              {tendPills.map((pill, pIdx) => (
                <span key={pIdx} className="tend-pill">{pill}</span>
              ))}
            </div>
          </div>
          <div className="tendering-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenModal && onOpenModal('Tendering Services')}
            >
              {tendBtnText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
