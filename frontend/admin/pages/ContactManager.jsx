import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Save,
  CheckCircle,
  Building,
  Globe,
  ExternalLink
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';

export default function ContactManager() {
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
    showToast('Contact coordinates saved and updated on live website.');
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading contact coordinates...</div>;
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
          <h1 className="admin-page-title">Contact & Location Coordinates</h1>
          <p className="admin-page-sub">
            Manage official office addresses, phone numbers, and support email addresses.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Coordinates'}</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Office Physical Address & Headquarter
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Registered Office Address</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={settings.office_address || ''}
              onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
            />
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
              Displayed on the top header, footer, contact placeholders, and demo confirmation.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary Hotline Phone</label>
              <input
                type="text"
                className="admin-input"
                value={settings.primary_phone || ''}
                onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary Hotline Phone</label>
              <input
                type="text"
                className="admin-input"
                value={settings.secondary_phone || ''}
                onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary Inbound Email</label>
              <input
                type="email"
                className="admin-input"
                value={settings.primary_email || ''}
                onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Support / Escalation Email</label>
              <input
                type="email"
                className="admin-input"
                value={settings.support_email || ''}
                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Social Media & Communication Links
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">LinkedIn Corporate URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_linkedin || ''}
                onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Twitter / X Handle URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_twitter || ''}
                onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Instagram Profile URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_instagram || ''}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">YouTube Official Channel URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_youtube || ''}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

