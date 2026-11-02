import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import HomePageManager from './pages/HomePageManager';
import AboutPageManager from './pages/AboutPageManager';
import ServicesManager from './pages/ServicesManager';
import ProjectsManager from './pages/ProjectsManager';
import TeamManager from './pages/TeamManager';
import TestimonialsManager from './pages/TestimonialsManager';
import BlogManager from './pages/BlogManager';
import ContactManager from './pages/ContactManager';
import HeaderManager from './pages/HeaderManager';
import FooterManager from './pages/FooterManager';
import MenuManager from './pages/MenuManager';
import MediaLibrary from './pages/MediaLibrary';
import PageContentManager from './pages/PageContentManager';
import SeoManager from './pages/SeoManager';
import EnquiryManager from './pages/EnquiryManager';
import WebsiteSettings from './pages/WebsiteSettings';
import AdminUsersManager from './pages/AdminUsersManager';
import ActivityLogs from './pages/ActivityLogs';
import './admin.css';

export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Direct Authentication Routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Redirect root '/' directly to '/admin' */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Modules */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<HomePageManager />} />
          <Route path="about" element={<AboutPageManager />} />
          <Route path="pages" element={<PageContentManager />} />
          <Route path="pages/:pageSlug" element={<PageContentManager />} />
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

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

