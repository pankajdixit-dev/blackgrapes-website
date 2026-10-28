import React from 'react';
import { ExternalLink, Send, CheckCircle2, Sparkles, Layers, ArrowRight } from 'lucide-react';

export default function SoftechServiceCard({ service, onOpenDetails, onOpenInquiry }) {
  return (
    <article className="softech-card" id={service.id}>
      {/* Clickable Image Banner to view inside content */}
      <div 
        className="softech-card-image-wrap" 
        onClick={() => onOpenDetails(service)}
        style={{ cursor: 'pointer' }}
        title={`Click to view inside content of ${service.title}`}
      >
        <img 
          src={service.image} 
          alt={service.title}
          className="softech-card-img"
          loading="lazy"
        />
        <div className="softech-card-img-overlay" />
        
        {/* Top Badges */}
        <div className="softech-card-badge-row">
          <span className="softech-pill-badge">
            <Sparkles size={11} color="#f86200" />
            <span>{service.badge}</span>
          </span>
          <span className="card-number-tag">
            {service.number}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="softech-card-body">
        <div className="softech-card-tagline">{service.tagline}</div>
        <h3 
          className="softech-card-title" 
          onClick={() => onOpenDetails(service)}
          style={{ cursor: 'pointer' }}
          title={`Click to view inside content of ${service.title}`}
        >
          {service.title}
        </h3>
        <p className="softech-card-desc">{service.description}</p>

        {/* Feature Highlights */}
        <div className="softech-features-list">
          {service.keyDeliverables.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="softech-feat-item">
              <CheckCircle2 size={14} color="#f86200" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="softech-tech-row">
          {service.techStack.map((tech, idx) => (
            <span key={idx} className="tech-tag-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer Actions */}
        <div className="softech-card-footer">
          <button
            type="button"
            className="btn-softech-details"
            onClick={() => onOpenDetails(service)}
            title={`View inside content & technical specifications for ${service.title}`}
          >
            <span>View Inside Details</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            className="btn-softech-inquire"
            onClick={() => onOpenInquiry(service)}
            title={`Send inquiry for ${service.title}`}
          >
            <span>Inquire</span>
            <Send size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
