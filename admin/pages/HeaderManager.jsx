import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle, Bell, ArrowRight } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';

export default function HeaderManager() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getSiteSettings().then((res) => setSettings(res));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSiteSettings(settings);
    setSaving(false);
    showToast('Header configuration updated on live website.');
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading header settings...</div>;
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
          <h1 className="admin-page-title">Header & Notification Strip</h1>
          <p className="admin-page-sub">
            Customize the top announcement banner, brand logo, and header quick contact triggers.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Header'}</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Top Notification Strip
          </h3>

          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.top_strip_enabled !== false}
                onChange={(e) => setSettings({ ...settings, top_strip_enabled: e.target.checked })}
              />
              <span style={{ fontSize: '0.9rem', color: '#fff' }}>Enable Top Announcement Strip</span>
            </label>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Announcement Text</label>
            <input
              type="text"
              className="admin-input"
              value={settings.top_strip_text || ''}
              onChange={(e) => setSettings({ ...settings, top_strip_text: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Brand Identity & Logo
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Brand Logo Asset URL</label>
            <input
              type="text"
              className="admin-input"
              value={settings.logo_url || ''}
              onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Company Tagline / Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={settings.tagline || ''}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

