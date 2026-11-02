import React from 'react';
import { Menu, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminTopbar({ onToggleMobile, title = 'Dashboard Overview' }) {
  const { admin } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button 
          type="button" 
          className="admin-menu-toggle" 
          onClick={onToggleMobile} 
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="admin-page-heading">{title}</h1>
      </div>

      <div className="admin-topbar-right">
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="admin-live-site-btn"
          title="Open Public Website in new tab"
        >
          <span>View Site</span>
          <ExternalLink size={14} />
        </a>

        <div className="admin-user-pill">
          <div className="admin-user-avatar">
            {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="admin-user-info">
            <span className="admin-user-name">{admin?.name || 'Administrator'}</span>
            <span className="admin-user-role">
              {admin?.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

