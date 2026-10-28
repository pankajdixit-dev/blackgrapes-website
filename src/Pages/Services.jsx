import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SoftechServicesPage from './SoftechServices';
import ITStaffingPage from './ITStaffing';
import EcommercePage from './Ecommerce';
import { 
  Code2, 
  Users, 
  ShoppingBag, 
  Sparkles
} from 'lucide-react';
import '../Styles/Services.css';

export default function ServicesPage({ onOpenInquiry }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('softech'); // 'softech', 'staffing', 'ecommerce'

  // Sync tab from URL query parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const lower = tabParam.toLowerCase();
      if (['softech', 'staffing', 'ecommerce'].includes(lower)) {
        setActiveTab(lower);
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

  const handleOpenInquiryInternal = (service = null) => {
    if (onOpenInquiry) {
      onOpenInquiry(service ? (service.title || service) : 'General Softech Services Inquiry');
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
              className={`services-tab-btn ${activeTab === 'softech' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('softech')}
            >
              <Code2 size={16} />
              <span>IT &amp; Software Services Hub</span>
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

      {/* View 1: Black Grapes Softech Deep IT & Digital Solutions Hub */}
      {activeTab === 'softech' && (
        <div className="animate-fade-in">
          <SoftechServicesPage 
            onOpenInquiry={handleOpenInquiryInternal}
          />
        </div>
      )}

      {/* View 2: Black Grapes Softech IT & Manpower Staffing */}
      {activeTab === 'staffing' && (
        <div className="animate-fade-in">
          <ITStaffingPage 
            onOpenContact={() => handleOpenInquiryInternal({ title: 'IT Staffing Inquiry' })}
          />
        </div>
      )}

      {/* View 3: E-Commerce Platform (Naya Purana Bazaar) */}
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
