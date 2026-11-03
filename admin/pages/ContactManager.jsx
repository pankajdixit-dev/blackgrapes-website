import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Save,
  CheckCircle,
  Building,
  Globe,
  ExternalLink,
  Clock
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings, getContactPage, saveContactPage } from '@backend/dataService';

export default function ContactManager() {
  const [settings, setSettings] = useState(null);
  const [contactPage, setContactPage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    Promise.all([getSiteSettings(), getContactPage()]).then(([sRes, cRes]) => {
      setSettings(sRes);
      setContactPage(cRes);
    });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await Promise.all([
      updateSiteSettings(settings),
      saveContactPage(contactPage)
    ]);
    setSaving(false);
    showToast('Contact coordinates & addresses published live via WebSocket!');
  };

  if (!settings || !contactPage) {
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
            Manage official registered office, development center, hotline phone numbers, and support email addresses across all pages.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live contact page"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Office Locations */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Office Physical Addresses
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Address 1 (Registered Headquarter)</label>
            <textarea
              rows={2}
              className="admin-textarea"
              value={contactPage.address1Text || settings.office_address || ''}
              onChange={(e) => {
                setSettings({ ...settings, office_address: e.target.value });
                setContactPage({ ...contactPage, address1Text: e.target.value });
              }}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Address 1 Google Maps Link</label>
            <input
              type="text"
              className="admin-input"
              value={contactPage.address1MapUrl || ''}
              onChange={(e) => setContactPage({ ...contactPage, address1MapUrl: e.target.value })}
            />
          </div>

          <div className="admin-form-group" style={{ marginTop: '1rem' }}>
            <label className="admin-label">Address 2 (Development Centre)</label>
            <textarea
              rows={2}
              className="admin-textarea"
              value={contactPage.address2Text || ''}
              onChange={(e) => setContactPage({ ...contactPage, address2Text: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Address 2 Google Maps Link</label>
            <input
              type="text"
              className="admin-input"
              value={contactPage.address2MapUrl || ''}
              onChange={(e) => setContactPage({ ...contactPage, address2MapUrl: e.target.value })}
            />
          </div>
        </div>

        {/* Direct Contact Numbers & Emails */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Communication & Direct Hotline Channels
          </h3>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Primary Executive Phone (Arpit Jain)</label>
              <input
                type="text"
                className="admin-input"
                value={settings.primary_phone || ''}
                onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary Executive Phone</label>
              <input
                type="text"
                className="admin-input"
                value={settings.secondary_phone || ''}
                onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-grid-2">
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

          <div className="admin-form-group">
            <label className="admin-label">Support Desk Hours</label>
            <input
              type="text"
              className="admin-input"
              value={contactPage.workingHours || ''}
              onChange={(e) => setContactPage({ ...contactPage, workingHours: e.target.value })}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Official Social Media Channels
          </h3>

          <div className="admin-grid-2">
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
              <label className="admin-label">Twitter / X URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_twitter || ''}
                onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Instagram URL</label>
              <input
                type="url"
                className="admin-input"
                value={settings.social_instagram || ''}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">YouTube Channel URL</label>
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
