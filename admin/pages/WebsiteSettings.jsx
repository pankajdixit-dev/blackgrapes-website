import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  Save,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';
import { checkBackendHealth } from '@backend/dataService';

export default function WebsiteSettings() {
  const [settings, setSettings] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);
  const [saving, setSaving] = useState(false);
  const [testingDb, setTestingDb] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    getSiteSettings().then((res) => setSettings(res));
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setTestingDb(true);
    const health = await checkBackendHealth();
    setDbHealth(health);
    setTestingDb(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSiteSettings(settings);
    setSaving(false);
    showToast('Global website configuration saved.');
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading settings...</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Website Settings & Database Architecture</h1>
          <p className="admin-page-sub">
            Configure global website meta, maintenance modes, and Persistent JSON integration.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Persistent Database Connection Status Panel */}
      <div className="admin-card" style={{ borderLeft: '4px solid var(--admin-orange)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Database size={22} color="var(--admin-orange)" />
            <div>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>
                Persistent JSON Database Connection
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                Live backend health and schema status
              </span>
            </div>
          </div>

          <button
            onClick={runHealthCheck}
            disabled={testingDb}
            className="admin-btn admin-btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            <RefreshCw size={13} className={testingDb ? 'animate-spin' : ''} />
            <span>{testingDb ? 'Checking...' : 'Test Connection'}</span>
          </button>
        </div>

        {dbHealth && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '8px',
              background: dbHealth.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              border: `1px solid ${dbHealth.connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: dbHealth.connected ? '#10b981' : '#f59e0b'
                }}
              />
              <strong style={{ color: '#fff', fontSize: '0.9rem' }}>
                {dbHealth.connected ? 'Connected to Persistent JSON' : 'Local Storage Fallback Mode'}
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1d5db' }}>
              {dbHealth.message}
            </p>
          </div>
        )}

        <div style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6 }}>
          <strong style={{ color: '#fff' }}>How to connect your Persistent Database project:</strong>
          <ol style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
            <li>
              Go to your Persistent Database project dashboard (or create a new free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: 'var(--admin-orange)' }}>supabase.com</a>).
            </li>
            <li>
              Open the <strong>SQL Editor</strong> in Persistent Database and paste the contents of <code style={{ color: '#38bdf8' }}>supabase/schema.sql</code> and <code style={{ color: '#38bdf8' }}>supabase/seed.sql</code>, then click <strong>Run</strong>.
            </li>
            <li>
              Add your credentials to your project's <code style={{ color: '#38bdf8' }}>.env</code> or deployment environment variables:
              <pre style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.75rem', borderRadius: '6px', color: '#e5e7eb', marginTop: '0.5rem', overflowX: 'auto' }}>
                {`VITE_SUPABASE_URL=https://your-project-id.supabase.co\nVITE_SUPABASE_ANON_KEY=your-supabase-anon-key`}
              </pre>
            </li>
          </ol>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Website General Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Official Legal Business Name</label>
              <input
                type="text"
                className="admin-input"
                value={settings.site_name || ''}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Favicon Path</label>
              <input
                type="text"
                className="admin-input"
                value={settings.favicon_url || ''}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Google Analytics / Tag Manager ID</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. G-XXXXXXXXXX"
              value={settings.google_analytics_id || ''}
              onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={Boolean(settings.maintenance_mode)}
                onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
              />
              <span style={{ fontSize: '0.9rem', color: '#fff' }}>
                Maintenance Mode (Only logged-in admins can view site when active)
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

