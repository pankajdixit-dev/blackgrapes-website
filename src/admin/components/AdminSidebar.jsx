import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Layers, 
  Briefcase, 
  MessageSquareQuote, 
  Sliders, 
  Settings, 
  LogOut, 
  X,
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar({ mobileOpen, onCloseMobile, newEnquiriesCount = 0 }) {
  const { logout } = useAuth();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/enquiries', icon: Inbox, label: 'Enquiries & Leads', badge: newEnquiriesCount > 0 ? newEnquiriesCount : null },
    { to: '/admin/services', icon: Layers, label: 'Services Manager' },
    { to: '/admin/projects', icon: Briefcase, label: 'Projects & Portfolio' },
    { to: '/admin/testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
    { to: '/admin/content', icon: Sliders, label: 'Dynamic Content' },
    { to: '/admin/settings', icon: Settings, label: 'Settings & Security' },
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          className="admin-modal-overlay" 
          style={{ zIndex: 99 }} 
          onClick={onCloseMobile} 
        />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <img 
            src="/images/black_grapes_emblem.jpg" 
            alt="Black Grapes Emblem" 
            className="admin-brand-icon"
            onError={(e) => {
              e.target.src = '/favicon.svg';
            }}
          />
          <div style={{ flex: 1 }}>
            <div className="admin-brand-title">Black Grapes</div>
            <span className="admin-brand-tag">Admin Management</span>
          </div>
          {mobileOpen && (
            <button 
              type="button" 
              onClick={onCloseMobile} 
              style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="admin-nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <div className="admin-nav-item-left">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="admin-badge-count">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="admin-sidebar-footer">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-admin-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
          >
            <span>Live Website</span>
            <ExternalLink size={14} />
          </a>

          <button 
            type="button" 
            onClick={logout} 
            className="admin-logout-btn"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

