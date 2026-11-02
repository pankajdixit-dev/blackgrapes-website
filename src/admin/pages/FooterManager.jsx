import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle, ShieldCheck } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '../../services/dataService';

export default function FooterManager() {
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
    showToast('Footer content updated on live website.');
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading footer settings...</div>;
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
          <h1 className="admin-page-title">Footer & Copyright Content</h1>
          <p className="admin-page-sub">
            Manage footer bio descriptions, trust badges, copyright notices, and legal links.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Footer'}</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Footer Company Bio & Trust Badge
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">About Us Short Summary</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={settings.footer_about_text || ''}
              onChange={(e) => setSettings({ ...settings, footer_about_text: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Quality & ISO Trust Badge Text</label>
            <input
              type="text"
              className="admin-input"
              value={settings.footer_trust_badge || ''}
              onChange={(e) => setSettings({ ...settings, footer_trust_badge: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Copyright Notice Text</label>
            <input
              type="text"
              className="admin-input"
              value={settings.copyright_text || ''}
              onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
