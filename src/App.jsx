import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import DemoModal from './components/DemoModal';
import InquiryModal from './components/InquiryModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import About from './pages/About';
import OurProducts from './pages/OurProducts';
import OurClients from './pages/OurClients';
import ServicesPage from './pages/Services';
import SoftechServicesPage from './pages/SoftechServices';
import ITStaffingPage from './pages/ITStaffing';
import EcommercePage from './pages/Ecommerce';
import ContactPage from './pages/Contact';
import PartnershipPage from './pages/PartnershipPage';
import BusinessPartnersPage from './pages/BusinessPartnersPage';
import './App.css';

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: 'Request a Demo'
  });
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState('');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (title = 'Request a Demo') => {
    setModalState({
      isOpen: true,
      title
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      title: 'Request a Demo'
    });
  };

  const handleOpenInquiry = (serviceName = '') => {
    setInquiryService(serviceName);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInquiryService('');
  };

  const handleOpenDemoModal = () => {
    setDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setDemoModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        {/* Dynamic Animated Background Particle Canvas */}
        <ParticleCanvas />

        {/* Ambient Radial Lights / Glow Meshes */}
        <div className="ambient-glow glow-top-left" aria-hidden="true"></div>
        <div className="ambient-glow glow-hero-center" aria-hidden="true"></div>
        <div className="ambient-glow glow-mid-right" aria-hidden="true"></div>
        <div className="ambient-glow glow-bottom-left" aria-hidden="true"></div>

        {/* Top Navbar */}
        <Navbar 
          onOpenModal={handleOpenModal} 
          onOpenInquiry={handleOpenInquiry}
          onOpenDemoModal={handleOpenDemoModal}
        />

        {/* Main Routed Content */}
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <HomePage
                  onOpenModal={handleOpenModal}
                  onOpenInquiry={handleOpenInquiry}
                  onSelectService={(service) => setSelectedService(service)}
                />
              }
            />

            {/* About Us Pages (Mahesh's complete page) */}
            <Route
              path="/about"
              element={<About onOpenDemoModal={handleOpenDemoModal} />}
            />
            <Route
              path="/about-us"
              element={<About onOpenDemoModal={handleOpenDemoModal} />}
            />

            {/* Services Pages (Abadh's complete hub) */}
            <Route
              path="/services"
              element={<ServicesPage onOpenInquiry={handleOpenInquiry} />}
            />
            <Route
              path="/softech-services"
              element={<SoftechServicesPage onOpenInquiry={handleOpenInquiry} />}
            />

            {/* Products Pages (Mahesh's proprietary catalog) */}
            <Route
              path="/products"
              element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
            />
            <Route
              path="/our-products"
              element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
            />

            {/* Clients Pages (Mahesh's global portfolio) */}
            <Route
              path="/clients"
              element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
            />
            <Route
              path="/our-clients"
              element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
            />

            {/* IT Staffing Solutions (Abadh's full staffing page) */}
            <Route
              path="/it-staffing"
              element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />}
            />
            <Route
              path="/staffing"
              element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />}
            />

            {/* E-Commerce Solutions (Abadh's full ecommerce page) */}
            <Route
              path="/ecommerce"
              element={<EcommercePage onOpenContact={() => handleOpenInquiry('E-Commerce Solutions')} />}
            />

            {/* Contact Pages (Abadh's full contact page) */}
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            <Route
              path="/contact-us"
              element={<ContactPage />}
            />

            {/* Partnership Pages */}
            <Route
              path="/partnership"
              element={<PartnershipPage onOpenModal={handleOpenModal} />}
            />
            <Route
              path="/business-partners"
              element={<BusinessPartnersPage onOpenModal={handleOpenModal} />}
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer 
          onOpenModal={handleOpenModal} 
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Global Interactive Modals */}
        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={handleCloseInquiry}
          initialService={inquiryService}
        />

        <DemoModal
          isOpen={demoModalOpen}
          onClose={handleCloseDemoModal}
        />

        <ContactModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          modalTitle={modalState.title}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenEstimate={handleOpenModal}
        />

        {/* Floating Action Buttons */}
        <FloatingWidgets onOpenContact={() => handleOpenInquiry('Direct Desk')} />
      </div>
    </BrowserRouter>
  );
}
