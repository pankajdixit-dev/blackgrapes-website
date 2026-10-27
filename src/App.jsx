import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import PartnershipPage from './pages/PartnershipPage';
import ContactUsPage from './pages/ContactUsPage';

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: 'Request a Demo'
  });
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
        <Navbar onOpenModal={handleOpenModal} />

        {/* Main Routed Content */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenModal={handleOpenModal}
                  onSelectService={(service) => setSelectedService(service)}
                />
              }
            />
            <Route
              path="/partnership"
              element={<PartnershipPage onOpenModal={handleOpenModal} />}
            />
            <Route
              path="/contact-us"
              element={<ContactUsPage onOpenModal={handleOpenModal} />}
            />
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Site Footer */}
        <Footer onOpenModal={handleOpenModal} />

        {/* Interactive Modals */}
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
        <FloatingWidgets />
      </div>
    </BrowserRouter>
  );
}

export default App;
