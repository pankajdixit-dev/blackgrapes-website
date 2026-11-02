import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import About from './Pages/About';
import OurProducts from './Pages/OurProducts';
import OurClients from './Pages/OurClients';

// Code-Split Admin Panel for High Performance (Isolated in root /admin directory)
const AdminLayout = lazy(() => import('@admin/components/AdminLayout'));
const AdminLogin = lazy(() => import('@admin/pages/AdminLogin'));
const Dashboard = lazy(() => import('@admin/pages/Dashboard'));
const HomePageManager = lazy(() => import('@admin/pages/HomePageManager'));
const AboutPageManager = lazy(() => import('@admin/pages/AboutPageManager'));
const ServicesManager = lazy(() => import('@admin/pages/ServicesManager'));
const ProjectsManager = lazy(() => import('@admin/pages/ProjectsManager'));
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

// Placeholder view for services/contact partner routes
function PartnerRoutePlaceholder({ title, description, onOpenDemoModal }) {
  return (
    <div className="container partner-placeholder-section">
      <div className="partner-placeholder-card glass-card text-center">
        <span className="badge badge-purple mb-3">COLLABORATIVE WORKSPACE</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle mb-4">{description}</p>
        <div className="partner-actions">
          <a href="/about" className="btn btn-primary">
            Explore About Us Page
          </a>
          <button onClick={onOpenDemoModal} className="btn btn-secondary">
            Request Demo
          </button>
        </div>
      </div>
      {/* Also show About Us preview below for comprehensive showcase */}
      <div className="placeholder-about-preview">
        <About onOpenDemoModal={onOpenDemoModal} />
      </div>
    </div>
  );
}

function MainAppShell() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

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

  // Public Website Shell (100% UNTOUCHED DESIGN & LAYOUT)
  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          {/* Primary About Us Page */}
          <Route
            path="/about"
            element={<About onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/about-us"
            element={<Navigate to="/about" replace />}
          />

          {/* Home Page */}
          <Route
            path="/"
            element={<About onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* Services Page */}
          <Route
            path="/services"
            element={
              <PartnerRoutePlaceholder
                title="Services & Solutions Hub"
                description="Our service ecosystem covers Custom Software, Mobile Apps, CRM, MLM, Web Architecture, and Digital Marketing."
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />

          {/* Products Page - Black Grapes Proprietary Products */}
          <Route
            path="/products"
            element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/our-products"
            element={<OurProducts onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* Clients Page - Global Client Portfolio & Case Studies */}
          <Route
            path="/clients"
            element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
          />
          <Route
            path="/our-clients"
            element={<OurClients onOpenDemoModal={handleOpenDemoModal} />}
          />

          {/* Contact Page */}
          <Route
            path="/contact"
            element={
              <PartnerRoutePlaceholder
                title="Contact Black Grapes Softech"
                description="Office: 252-F/H Scheme No 54, Vijaynagar, Indore-452010. Direct Line: +91 7470997884."
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />

          {/* Fallback to About */}
          <Route
            path="*"
            element={<Navigate to="/about" replace />}
          />
        </Routes>
      </main>

      {/* Universal Footer */}
      <Footer onOpenDemoModal={handleOpenDemoModal} />

      {/* Universal Interactive Demo / Quote Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemoModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppShell />
    </BrowserRouter>
  );
}
