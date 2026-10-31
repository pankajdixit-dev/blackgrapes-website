import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/siteData';

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappHref = `https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Black Grapes Softech, I am interested in your IT & Software Development services.')}`;

  return (
    <div className="floating-widgets-container" aria-label="Quick Actions">
      {/* WhatsApp Floating Heartbeat Trigger */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn heartbeat-animation"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Us - Quick Consultation"
      >
        <span className="whatsapp-pulse-ring"></span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.857 3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.802 0-3.513-.481-5.008-1.328l-6.992 1.83 1.866-6.822c-.936-1.545-1.466-3.344-1.466-5.26 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
        </svg>
        <span className="whatsapp-tooltip">Chat with us!</span>
      </a>

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          className="floating-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}
