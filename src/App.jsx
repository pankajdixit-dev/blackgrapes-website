import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Public Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/Home';
import ServicesPage from './Pages/Services';
import ITStaffingPage from './Pages/ITStaffing';
import EcommercePage from './Pages/Ecommerce';
import ContactPage from './Pages/Contact';
import InquiryModal from './components/InquiryModal';

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

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Website Layout Component
function PublicWebsiteLayout() {
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
      {/* Sticky Public Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Public Page Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/services" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/it-staffing" element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />} />
          <Route path="/staffing" element={<ITStaffingPage onOpenContact={() => handleOpenInquiry('IT Staffing')} />} />
          <Route path="/ecommerce" element={<EcommercePage onOpenContact={() => handleOpenInquiry('E-Commerce')} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          {/* Fallback to Services page */}
          <Route path="*" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
        </Routes>
      </main>

      {/* Global Public Footer */}
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
      <AuthProvider>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Management Portal */}
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
