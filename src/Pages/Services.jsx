import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServicesHero from '../components/services/ServicesHero';
import CategoryFilter from '../components/services/CategoryFilter';
import ServiceCard from '../components/services/ServiceCard';
import InquiryQuoteModal from '../components/services/InquiryQuoteModal';
import SoftechServicesPage from './SoftechServices';
import ITStaffingPage from './ITStaffing';
import EcommercePage from './Ecommerce';
import { serviceCategories, servicesData } from '../data/servicesData';
import { 
  SearchX, 
  Phone, 
  ArrowUpRight, 
  Building2, 
  Code2, 
  Users, 
  ShoppingBag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import '../Styles/Services.css';
import '../Styles/CyberServices.css';

export default function ServicesPage({ onOpenInquiry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('group'); // 'group', 'softech', 'staffing', 'ecommerce'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryService, setInquiryService] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Sync tab and category from URL query parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const categoryParam = searchParams.get('category');

    if (tabParam) {
      if (['group', 'staffing', 'ecommerce'].includes(tabParam.toLowerCase())) {
        setActiveTab(tabParam.toLowerCase());
      }
    } else if (categoryParam) {
      const catLower = categoryParam.toLowerCase();
      if (catLower === 'softech' || catLower === 'it') {
        setSelectedCategory('softech');
      } else if (catLower === 'valuation' || catLower === 'valuers') {
        setSelectedCategory('valuers');
      } else if (catLower === 'advisory' || catLower === 'associates') {
        setSelectedCategory('associates');
      } else if (catLower === 'realestate' || catLower === 'real-estate') {
        setSelectedCategory('realestate');
      } else if (catLower === 'investment' || catLower === 'securities') {
        setSelectedCategory('investment');
      } else if (catLower === 'insurance') {
        setSelectedCategory('insurance');
      }
    }
  }, [searchParams]);

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tabKey);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleOpenInquiryInternal = (service = null) => {
    if (onOpenInquiry) {
      onOpenInquiry(service ? service.title : 'General Services Inquiry');
    } else {
      setInquiryService(service);
      setIsInquiryOpen(true);
    }
  };

  return (
    <div className="services-page-root">
      {/* Top Switcher Navigation Bar */}
      <section className="services-tab-navigation">
        <div className="content-wrapper">
          <div className="services-tab-track">
            <button
              type="button"
              className={`services-tab-btn ${activeTab === 'group' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('group')}
            >
              <Building2 size={16} />
              <span>Group Companies (6 Core)</span>
            </button>

            <button
              type="button"
              className={`services-tab-btn ${activeTab === 'staffing' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('staffing')}
            >
              <Users size={16} />
              <span>IT Staffing Solutions</span>
            </button>

            <button
              type="button"
              className={`services-tab-btn ${activeTab === 'ecommerce' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('ecommerce')}
            >
              <ShoppingBag size={16} />
              <span>E-Commerce (Naya Purana Bazaar)</span>
            </button>
          </div>
        </div>
      </section>

      {/* View 1: Authentic Black Grapes Group Services (https://www.blackgrapesgroup.com/services) */}
      {activeTab === 'group' && (
        <main className="services-page-main animate-fade-in">
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
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.set('category', catId);
                return next;
              });
            }}
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
                      onOpenInquiry={handleOpenInquiryInternal}
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

              

              </div>
          </section>

          {/* Internal Inquiry Consultation Modal if used standalone */}
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
      )}

      {/* View 3: Black Grapes Softech IT & Manpower Staffing */}
      {activeTab === 'staffing' && (
        <div className="animate-fade-in">
          <ITStaffingPage 
            onOpenContact={() => handleOpenInquiryInternal({ title: 'IT Staffing Inquiry' })}
          />
        </div>
      )}

      {/* View 4: E-Commerce Platform (Naya Purana Bazaar) */}
      {activeTab === 'ecommerce' && (
        <div className="animate-fade-in">
          <EcommercePage 
            onOpenContact={() => handleOpenInquiryInternal({ title: 'E-Commerce Platform Inquiry' })}
          />
        </div>
      )}
    </div>
  );
}
