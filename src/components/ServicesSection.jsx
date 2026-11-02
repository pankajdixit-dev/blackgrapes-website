import React, { useState, useEffect } from 'react';
import { SERVICES as DEFAULT_SERVICES } from '../data/siteData';
import { getServices } from '@backend/dataService.js';
import '../utils/realtimeSync';

export default function ServicesSection({ onOpenModal, onSelectService }) {
  const [servicesList, setServicesList] = useState(DEFAULT_SERVICES || []);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = () => {
      getServices()
        .then((data) => {
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setServicesList(data);
          }
        })
        .catch(() => {});
    };

    fetchServices();
    window.addEventListener('bgst_content_updated', fetchServices);
    return () => {
      isMounted = false;
      window.removeEventListener('bgst_content_updated', fetchServices);
    };
  }, []);

  const safeServices = Array.isArray(servicesList) && servicesList.length > 0 ? servicesList : (DEFAULT_SERVICES || []);

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
            We Provide Best Quality Services &amp; Products At <span className="text-highlight">Affordable Price</span>
          </h2>
          <p className="section-subtitle">
            Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid">
          {safeServices.map((service, index) => {
            const serviceId = service.id || service._id || `srv-${index}`;
            const serviceTitle = service.title || 'Specialized IT Service';
            const serviceDesc = service.shortDesc || service.description || '';
            const serviceImage = service.image || '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
            const serviceTags = Array.isArray(service.tags) && service.tags.length > 0
              ? service.tags
              : (Array.isArray(service.deliverables) ? service.deliverables : []);

            return (
              <div
                key={serviceId}
                className={`service-card ${hoveredService === serviceId ? 'service-card-active' : ''}`}
                onMouseEnter={() => setHoveredService(serviceId)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Image & Overlay Header */}
                <div className="service-card-img-wrapper">
                  <img
                    src={serviceImage}
                    alt={serviceTitle}
                    className="service-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                    }}
                  />
                  <div className="service-card-img-overlay"></div>
                  <div className="service-index-badge">0{index + 1}</div>
                </div>

                {/* Service Details */}
                <div className="service-card-content">
                  <h3 className="service-card-title">{serviceTitle}</h3>
                  <p className="service-card-desc">{serviceDesc}</p>

                  {/* Tech Pills */}
                  {serviceTags.length > 0 && (
                    <div className="service-tags-list">
                      {serviceTags.map((tag, tIdx) => (
                        <span key={tIdx} className="service-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link & CTA */}
                  <div className="service-card-footer">
                    <button
                      type="button"
                      className="service-explore-btn"
                      onClick={() => {
                        if (onSelectService) {
                          onSelectService(service);
                        } else if (onOpenModal) {
                          onOpenModal(`Service Inquiry: ${serviceTitle}`);
                        }
                      }}
                    >
                      <span>Explore Service</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="service-quote-btn"
                      onClick={() => onOpenModal && onOpenModal(`Quick Quote: ${serviceTitle}`)}
                    >
                      <span>Get Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
