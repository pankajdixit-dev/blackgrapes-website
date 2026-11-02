import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Send, Sparkles } from 'lucide-react';

export default function ServiceCard({ service, onOpenInquiry }) {
  const [imgSrc, setImgSrc] = useState(service.image);

  const handleImageError = () => {
    // If local logo fails, try remoteImage or fallback to default logo
    if (imgSrc === service.image && service.remoteImage) {
      setImgSrc(service.remoteImage);
    } else {
      setImgSrc('/logo.jpg');
    }
  };

  return (
    <article className="black-service-card">
      <div className="black-service-card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${service.accentColor || '#f86200'}22, transparent 70%)` }} />
      
      {/* Top Header: Badge & Category */}
      <div className="card-top-bar">
        <span className="card-category-badge">
          <Sparkles size={12} color={service.accentColor || '#f86200'} />
          <span>{service.tagline}</span>
        </span>
        <span className="card-number-tag">0{service.id}</span>
      </div>

      {/* Brand Emblem / Logo presentation */}
      <div className="service-logo-container">
        <div className="service-logo-ring">
          <img 
            src={imgSrc} 
            alt={service.title}
            onError={handleImageError}
            className="service-logo-img"
            loading="lazy"
          />
        </div>
      </div>

      {/* Service Title */}
      <h3 className="black-service-title">{service.title}</h3>

      {/* Service Description (Strict Authentic Text) */}
      <p className="black-service-desc">{service.description}</p>

      {/* Card Action Buttons */}
      <div className="black-service-actions">
        {service.url ? (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-read-more"
            title={`Visit ${service.title}`}
          >
            <span>Read More</span>
            <ExternalLink size={15} />
          </a>
        ) : (
          <button
            type="button"
            className="btn-read-more"
            onClick={() => onOpenInquiry(service)}
          >
            <span>Read More</span>
            <ArrowRight size={15} />
          </button>
        )}

        <button
          type="button"
          className="btn-inquire"
          onClick={() => onOpenInquiry(service)}
          title="Submit inquiry for this service"
        >
          <span>Inquire</span>
          <Send size={13} />
        </button>
      </div>
    </article>
  );
}
