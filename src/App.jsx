import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import About from './Pages/About';
import OurProducts from './Pages/OurProducts';
import OurClients from './Pages/OurClients';
import './App.css';

// Placeholder view for partners working on other routes
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

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Navigation Bar */}
        <Navbar onOpenDemoModal={handleOpenDemoModal} />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            {/* Primary About Us Page (Assigned Topic) */}
            <Route
              path="/about"
              element={<About onOpenDemoModal={handleOpenDemoModal} />}
            />
            <Route
              path="/about-us"
              element={<Navigate to="/about" replace />}
            />

            {/* Home Page: Shows About page directly or integrated showcase */}
            <Route
              path="/"
              element={<About onOpenDemoModal={handleOpenDemoModal} />}
            />

            {/* Services Page: Partner Route placeholder with instant link & About preview */}
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
    </BrowserRouter>
  );
}
