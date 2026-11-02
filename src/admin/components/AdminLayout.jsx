import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import api from '../../api/client';
import '../styles/Admin.css';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);
  const location = useLocation();

  // Map route to human readable header title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('enquiries')) return 'Contact Enquiries & Leads';
    if (path.includes('services')) return 'Services Management';
    if (path.includes('projects')) return 'Portfolio Projects Management';
    if (path.includes('testimonials')) return 'Client Testimonials';
    if (path.includes('content')) return 'Dynamic Website Content';
    if (path.includes('settings')) return 'Admin Settings & Security';
    return 'Dashboard Overview';
  };

  useEffect(() => {
    // Fetch pending badge count
    const fetchNewCount = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        if (res.data?.success && res.data?.data?.enquiries?.new !== undefined) {
          setNewEnquiriesCount(res.data.data.enquiries.new);
        }
      } catch {}
    };
    fetchNewCount();
  }, [location.pathname]);

  return (
    <div className="admin-layout-root">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        newEnquiriesCount={newEnquiriesCount}
      />

      <div className="admin-main-wrap">
        <AdminTopbar
          title={getPageTitle()}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />

        <main className="admin-content-body">
          <Outlet context={{ refreshBadge: () => {} }} />
        </main>
      </div>
    </div>
  );
}

