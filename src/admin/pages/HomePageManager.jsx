import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Sparkles, Layers, Sliders, ShieldCheck } from 'lucide-react';
import AboutPageManager from './AboutPageManager';

export default function HomePageManager() {
  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(139, 92, 246, 0.1))',
          border: '1px solid var(--admin-border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-orange)', letterSpacing: '0.05em' }}>
            HOME ROUTE INTEGRATION
          </span>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: '0.2rem 0' }}>
            Home Page & Showcase Management
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
            The public Home Page (/) renders the showcase sections configured below. Any edits published here update both / and /about instantly.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/header" className="admin-btn admin-btn-secondary">
            <Sliders size={15} />
            <span>Top Banner & Header</span>
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-primary">
            <span>View Home</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Renders the full About & Showcase section editor */}
      <AboutPageManager />
    </div>
  );
}
