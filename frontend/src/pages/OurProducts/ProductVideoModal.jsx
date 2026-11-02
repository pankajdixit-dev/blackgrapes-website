import React, { useEffect } from 'react';
import { X, Play, Sparkles, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProductVideoModal({ product, onClose, onOpenDemoModal }) {
  // Close on ESC key and lock body scroll
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleBookDemoClick = () => {
    onClose();
    if (onOpenDemoModal) onOpenDemoModal();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Black Grapes Softech, I am interested in a live demo and quotation for: ${product.title}`
  );

  return (
    <div className="product-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="product-modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="product-modal-header">
          <div className="product-modal-title-group">
            <span className={`product-badge badge-${product.badgeColor || 'orange'}`}>
              <Sparkles size={12} /> {product.badge}
            </span>
            <h3 className="modal-product-title">{product.title}</h3>
            <p className="modal-product-subtitle">{product.subtitle}</p>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close video demo"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="product-modal-video-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${product.youtubeId}?autoplay=1&rel=0`}
            title={`${product.title} Demo Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="product-youtube-iframe"
          />
        </div>

        {/* Modal Info & CTA Footer */}
        <div className="product-modal-body">
          <div className="modal-info-columns">
            <div className="modal-desc-col">
              <h4 className="modal-section-heading">Product Overview</h4>
              <p className="modal-product-desc">{product.summary}</p>
              
              <div className="modal-tech-stack">
                <span className="tech-label">Architecture:</span>
                <div className="tech-pill-list">
                  {product.techStack?.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-features-col">
              <h4 className="modal-section-heading">Key Capabilities</h4>
              <ul className="modal-features-list">
                {product.keyFeatures?.slice(0, 4).map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle2 size={16} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="product-modal-footer">
            <div className="deployment-pill">
              <ShieldCheck size={16} /> Ready in {product.deploymentDays} • 100% Source Code
            </div>

            <div className="modal-cta-buttons">
              <a
                href={`https://wa.me/917470997884?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={handleBookDemoClick}
                className="btn btn-primary"
              >
                <span>Request Custom Demo</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
