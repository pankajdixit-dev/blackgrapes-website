import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoftechServicesPage from './pages/SoftechServicesPage';
import EcommercePage from './pages/EcommercePage';
import ITStaffingPage from './pages/ITStaffingPage';
import ContactPage from './pages/ContactPage';
import SoftechInquiryModal from './components/softech/SoftechInquiryModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('staffing'); // default to requested page or check hash
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [globalQuoteOpen, setGlobalQuoteOpen] = useState(false);

  // Sync with browser hash if present (e.g. #contact, #staffing, #ecommerce, #services)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('contact')) {
        setCurrentPage('contact');
      } else if (hash.includes('staffing') || hash.includes('manpower')) {
        setCurrentPage('staffing');
      } else if (hash.includes('ecommerce')) {
        setCurrentPage('ecommerce');
      } else if (hash.includes('service') || hash.includes('softech')) {
        setCurrentPage('softech');
      } else {
        setCurrentPage('staffing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('softech');
  };

  return (
    <div className="app-container">
      {/* Universal Luxury Navbar with Dropdown */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectService={handleSelectService}
        onOpenQuote={() => setGlobalQuoteOpen(true)}
      />

      {/* Black Grapes Softech Redesigned IT Staffing Page (https://blackgrapessoftech.com/it-staffing/) */}
      {currentPage === 'staffing' && (
        <ITStaffingPage 
          onOpenContact={() => handleNavigate('contact')}
        />
      )}

      {/* Black Grapes Softech Redesigned Ecommerce Page (https://blackgrapessoftech.com/ecommerce/) */}
      {currentPage === 'ecommerce' && (
        <EcommercePage 
          onOpenContact={() => handleNavigate('contact')}
        />
      )}

      {/* Black Grapes Softech Redesigned Services Page (https://blackgrapessoftech.com/services/) */}
      {currentPage === 'softech' && (
        <SoftechServicesPage 
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectService}
        />
      )}

      {/* Contact Page */}
      {currentPage === 'contact' && (
        <ContactPage />
      )}

      {/* Corporate Black Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenQuote={() => setGlobalQuoteOpen(true)}
      />

      {/* Global Inquire Modal */}
      {globalQuoteOpen && (
        <SoftechInquiryModal 
          onClose={() => setGlobalQuoteOpen(false)} 
        />
      )}
    </div>
  );
}
