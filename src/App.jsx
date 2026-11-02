import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Global Visuals & Modals from main branch
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import DemoModal from './components/DemoModal';
import InquiryModal from './components/InquiryModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import FloatingWidgets from './components/FloatingWidgets';
import ScrollToTop from './components/ScrollToTop';

// Public Pages from main branch
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

// Code-Split Admin Panel for High Performance (Isolated in root /admin directory)
const AdminLayout = lazy(() => import('@admin/components/AdminLayout'));
const AdminLogin = lazy(() => import('@admin/pages/AdminLogin'));
const Dashboard = lazy(() => import('@admin/pages/Dashboard'));
const HomePageManager = lazy(() => import('@admin/pages/HomePageManager'));
const AboutPageManager = lazy(() => import('@admin/pages/AboutPageManager'));
const ServicesManager = lazy(() => import('@admin/pages/ServicesManager'));
const ProjectsManager = lazy(() => import('@admin/pages/ProjectsManager'));
const ClientsManager = lazy(() => import('@admin/pages/ClientsManager'));
const ITStaffingManager = lazy(() => import('@admin/pages/ITStaffingManager'));
const EcommerceManager = lazy(() => import('@admin/pages/EcommerceManager'));
const PartnershipManager = lazy(() => import('@admin/pages/PartnershipManager'));
const TeamManager = lazy(() => import('@admin/pages/TeamManager'));
const TestimonialsManager = lazy(() => import('@admin/pages/TestimonialsManager'));
const BlogManager = lazy(() => import('@admin/pages/BlogManager'));
const ContactManager = lazy(() => import('@admin/pages/ContactManager'));
const HeaderManager = lazy(() => import('@admin/pages/HeaderManager'));
const FooterManager = lazy(() => import('@admin/pages/FooterManager'));
const MenuManager = lazy(() => import('@admin/pages/MenuManager'));
const MediaLibrary = lazy(() => import('@admin/pages/MediaLibrary'));
const SeoManager = lazy(() => import('@admin/pages/SeoManager'));
const EnquiryManager = lazy(() => import('@admin/pages/EnquiryManager'));
const WebsiteSettings = lazy(() => import('@admin/pages/WebsiteSettings'));
const AdminUsersManager = lazy(() => import('@admin/pages/AdminUsersManager'));
const ActivityLogs = lazy(() => import('@admin/pages/ActivityLogs'));

import './App.css';

function AdminLoadingSpinner() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#090a0f',
        color: '#ff6b00',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        fontSize: '1rem',
        letterSpacing: '0.05em'
      }}
    >
      Loading Control Center...
    </div>
  );
}

function MainAppShell() {
  const location = useLocation();

  // State for interactive modals from main branch
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

  const isAdminRoute = location.pathname.startsWith('/admin');

  // If in /admin area, render clean admin architecture without public chrome
  if (isAdminRoute) {
    return (
      <Suspense fallback={<AdminLoadingSpinner />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<HomePageManager />} />
            <Route path="about" element={<AboutPageManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="clients" element={<ClientsManager />} />
            <Route path="it-staffing" element={<ITStaffingManager />} />
            <Route path="ecommerce" element={<EcommerceManager />} />
            <Route path="partnership" element={<PartnershipManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="contact" element={<ContactManager />} />
            <Route path="header" element={<HeaderManager />} />
            <Route path="footer" element={<FooterManager />} />
            <Route path="menus" element={<MenuManager />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="seo" element={<SeoManager />} />
            <Route path="enquiries" element={<EnquiryManager />} />
            <Route path="settings" element={<WebsiteSettings />} />
            <Route path="users" element={<AdminUsersManager />} />
            <Route path="logs" element={<ActivityLogs />} />
          </Route>
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    );
  }

  // Public Website Shell (100% UNTOUCHED DESIGN, LAYOUT & MAIN BRANCH FEATURES)
  return (
    <>
      <ScrollToTop />
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppShell />
    </BrowserRouter>
  );
}
