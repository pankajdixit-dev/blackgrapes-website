import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/Home';
import ServicesPage from './Pages/Services';
import InquiryModal from './components/InquiryModal';
import './App.css';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenInquiry = (serviceName = '') => {
    setSelectedService(serviceName);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
  };

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      {/* Sticky Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Page Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/services" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
          {/* Fallback to Services page */}
          <Route path="*" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Global Inquiry & Proposal Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen} 
        onClose={handleCloseInquiry}
        initialService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
