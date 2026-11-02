import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Public Visual Components & Modals
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import DemoModal from './components/DemoModal';
import InquiryModal from './components/InquiryModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollToTop from './components/ScrollToTop';

// Public Pages from Live Website (main branch)
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

// Admin Panel Context, Guards & Pages
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEnquiries from './admin/pages/AdminEnquiries';
import AdminServices from './admin/pages/AdminServices';
import AdminProjects from './admin/pages/AdminProjects';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminContent from './admin/pages/AdminContent';
import AdminSettings from './admin/pages/AdminSettings';

import './App.css';

// Public Layout containing all interactive modals and visual elements
function PublicWebsiteLayout() {
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
    <div className="app-layout">
      {/* Dynamic Animated Background Particle Canvas */}
      <ParticleCanvas />

      {/* Ambient Radial Lights / Glow Meshes */}
      <div className="ambient-glow-wrapper" aria-hidden="true">
        <div className="ambient-glow glow-top-left"></div>
        <div className="ambient-glow glow-hero-center"></div>
        <div className="ambient-glow glow-mid-right"></div>
        <div className="ambient-glow glow-bottom-left"></div>
      </div>

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

          {/* About Us Pages */}
          <Route
            path="/about"
            element={<About onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/about-us"
            element={<About onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* Services Pages */}
          <Route
            path="/services"
            element={<ServicesPage onOpenInquiry={handleOpenInquiry} />}
          />
          <Route
            path="/softech-services"
            element={<SoftechServicesPage onOpenInquiry={handleOpenInquiry} />}
          />

          {/* Products Pages */}
          <Route
            path="/products"
            element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/our-products"
            element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* Clients Pages */}
          <Route
            path="/clients"
            element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/our-clients"
            element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* IT Staffing Solutions */}
          <Route
            path="/it-staffing"
            element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />}
          />
          <Route
            path="/staffing"
            element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />}
          />

          {/* E-Commerce Solutions */}
          <Route
            path="/ecommerce"
            element={<EcommercePage onOpenContact={() => handleOpenInquiry('E-Commerce Solutions')} />}
          />

          {/* Contact Pages */}
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Portal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Public Website Shell */}
          <Route path="/*" element={<PublicWebsiteLayout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
