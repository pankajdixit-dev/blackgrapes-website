import React, { useState, useMemo } from 'react';
import ServicesHero from '../components/services/ServicesHero';
import CategoryFilter from '../components/services/CategoryFilter';
import ServiceCard from '../components/services/ServiceCard';
import InquiryQuoteModal from '../components/services/InquiryQuoteModal';
import { serviceCategories, servicesData } from '../data/servicesData';
import { SearchX, Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function ServicesPage({ onOpenGlobalQuote }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryService, setInquiryService] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: servicesData.length };
    serviceCategories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = servicesData.filter((s) => s.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.tagline.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenInquiry = (service = null) => {
    setInquiryService(service);
    setIsInquiryOpen(true);
  };

  return (
    <main className="services-page-main">
      {/* Hero Section */}
      <ServicesHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredServices.length}
        totalCount={servicesData.length}
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={serviceCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Services Grid Section */}
      <section className="services-grid-section" id="services-grid">
        <div className="content-wrapper">
          {filteredServices.length > 0 ? (
            <div className="black-services-grid">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpenInquiry={handleOpenInquiry}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="empty-search-state">
              <SearchX size={44} color="#f86200" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', color: '#fff' }}>
                No Services Matched
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.25rem', fontSize: '0.9rem' }}>
                No service found matching "<strong>{searchQuery}</strong>". Try clearing your search or switching categories.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Quick Direct Contact Strip */}
          <div className="services-quick-contact">
            <div className="quick-contact-info">
              <div className="quick-contact-tag">Direct Group Assistance</div>
              <div className="quick-contact-title">Have questions about our services?</div>
              <div className="quick-contact-numbers">
                <a href="tel:+919039397884" className="quick-contact-link">
                  <Phone size={15} /> +91 9039397884
                </a>
                <span className="contact-sep">•</span>
                <a href="tel:+917470997884" className="quick-contact-link">
                  <Phone size={15} /> +91 7470997884
                </a>
                <span className="contact-sep">•</span>
                <a href="tel:+916262414463" className="quick-contact-link">
                  <Phone size={15} /> +91 6262414463
                </a>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => handleOpenInquiry(null)}
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry Consultation Modal */}
      {isInquiryOpen && (
        <InquiryQuoteModal
          initialService={inquiryService}
          onClose={() => {
            setIsInquiryOpen(false);
            setInquiryService(null);
          }}
        />
      )}
    </main>
  );
}
