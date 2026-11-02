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
  Globe,
  Sliders,
  Phone,
  Share2,
  Search,
  Image as ImageIcon
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';
import { checkSupabaseHealth } from '@backend/supabaseClient';
import MediaPickerModal from '../components/MediaPickerModal';

export default function WebsiteSettings() {
  const [settings, setSettings] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);
  const [saving, setSaving] = useState(false);
  const [testingDb, setTestingDb] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'header', 'footer', 'contact', 'social', 'seo', 'database'

  useEffect(() => {
    getSiteSettings().then((res) => {
      setSettings(res || {});
    });
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setTestingDb(true);
    const health = await checkSupabaseHealth();
    setDbHealth(health);
    setTestingDb(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await updateSiteSettings(settings);
    setSaving(false);
    showToast('Global website configuration saved successfully.');
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading website settings...</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Website Settings & Global Architecture</h1>
          <p className="admin-page-sub">
            Manage global branding, navbar announcement banner, footer links, contact info, and SEO defaults.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="cms-tabs-scroll" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {[
          { id: 'general', label: 'Brand & Logo', icon: Settings },
          { id: 'header', label: 'Navbar & Banner', icon: Sliders },
          { id: 'footer', label: 'Footer & Copyright', icon: Globe },
          { id: 'contact', label: 'Contact Details', icon: Phone },
          { id: 'social', label: 'Social Media', icon: Share2 },
          { id: 'seo', label: 'SEO Defaults', icon: Search },
          { id: 'database', label: 'Database & System', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cms-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: isActive ? '1px solid var(--admin-orange)' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255,255,255,0.03)',
                color: isActive ? '#fff' : '#9ca3af',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={15} color={isActive ? 'var(--admin-orange)' : '#9ca3af'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave}>
        {/* TAB 1: BRAND & LOGO */}
        {activeTab === 'general' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Brand Identity & Logo
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Official Legal Business Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.site_name || settings.companyName || ''}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value, companyName: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Brand Tagline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.brandTagline || ''}
                  onChange={(e) => setSettings({ ...settings, brandTagline: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Website Logo URL</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/assets/bgst-logo.png or Cloudinary URL"
                  value={settings.logoUrl || settings.logo_url || ''}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value, logo_url: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="admin-btn admin-btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <ImageIcon size={14} />
                  <span>Choose Media</span>
                </button>
              </div>
              {(settings.logoUrl || settings.logo_url) && (
                <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', display: 'inline-block' }}>
                  <img
                    src={settings.logoUrl || settings.logo_url}
                    alt="Logo Preview"
                    style={{ maxHeight: '40px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Favicon Path</label>
              <input
                type="text"
                className="admin-input"
                value={settings.favicon_url || '/favicon.ico'}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* TAB 2: NAVBAR & TOP BANNER */}
        {activeTab === 'header' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Navbar & Global Announcement Banner
            </h3>

            <div className="admin-form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.top_strip_enabled !== false && settings.topStripEnabled !== false}
                  onChange={(e) => setSettings({ ...settings, top_strip_enabled: e.target.checked, topStripEnabled: e.target.checked })}
                />
                <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>
                  Enable Top Global Announcement Strip
                </span>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Announcement Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.top_strip_badge || settings.topStripBadge || 'Accepting New Projects'}
                  onChange={(e) => setSettings({ ...settings, top_strip_badge: e.target.value, topStripBadge: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Announcement Offer / Notice</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.top_strip_text || settings.headerNoticeText || settings.topStripOffer || 'Apprenticeship & Partner Program Open'}
                  onChange={(e) => setSettings({ ...settings, top_strip_text: e.target.value, headerNoticeText: e.target.value, topStripOffer: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FOOTER & COPYRIGHT */}
        {activeTab === 'footer' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Footer Information & Copyright
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Copyright Notice</label>
              <input
                type="text"
                className="admin-input"
                value={settings.footer_copyright || settings.footerCopyright || '© 2026 Black Grapes Softech. All rights reserved.'}
                onChange={(e) => setSettings({ ...settings, footer_copyright: e.target.value, footerCopyright: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Footer Brief Bio</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={settings.footer_text || 'Black Grapes Softech delivers cutting-edge software engineering, custom mobile apps, CRMs, and enterprise solutions for ambitious brands worldwide.'}
                onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT COORDINATES */}
        {activeTab === 'contact' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Official Contact & Office Coordinates
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Primary Official Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.primaryPhone || settings.phone_primary || '+917470997884'}
                  onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value, phone_primary: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Secondary / WhatsApp Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.secondaryPhone || settings.phone_secondary || '+916262414463'}
                  onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value, phone_secondary: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Primary Contact Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.primaryEmail || settings.email_primary || 'contact@blackgrapessoftech.com'}
                  onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value, email_primary: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Support / Info Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.supportEmail || settings.email_support || 'info@blackgrapessoftech.com'}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value, email_support: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Headquarters Physical Address</label>
              <textarea
                rows={2}
                className="admin-textarea"
                value={settings.headquartersAddress || settings.address_office || '252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, Madhya Pradesh, India'}
                onChange={(e) => setSettings({ ...settings, headquartersAddress: e.target.value, address_office: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Google Maps Location Link</label>
              <input
                type="url"
                className="admin-input"
                value={settings.googleMapsUrl || settings.google_maps_url || 'https://maps.app.goo.gl/qJcKNw9DMo4JVWrv8'}
                onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value, google_maps_url: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* TAB 5: SOCIAL MEDIA LINKS */}
        {activeTab === 'social' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Social Media Channels & Profiles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">LinkedIn Company Page</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.linkedin || settings.social_linkedin || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_linkedin: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), linkedin: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Twitter / X Profile</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.twitter || settings.social_twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_twitter: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), twitter: e.target.value }
                  })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Instagram Profile</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.instagram || settings.social_instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_instagram: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), instagram: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Facebook Page</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.facebook || settings.social_facebook || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_facebook: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), facebook: e.target.value }
                  })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">YouTube Channel</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.youtube || settings.social_youtube || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_youtube: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), youtube: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">GitHub Organization</label>
                <input
                  type="url"
                  className="admin-input"
                  value={settings.socialLinks?.github || settings.social_github || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_github: e.target.value,
                    socialLinks: { ...(settings.socialLinks || {}), github: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SEO DEFAULTS */}
        {activeTab === 'seo' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              Global Default SEO Parameters
            </h3>

            <div className="admin-form-group">
              <label className="admin-label">Default Global SEO Title</label>
              <input
                type="text"
                className="admin-input"
                value={settings.seoTitle || settings.default_seo_title || 'Black Grapes Softech - Custom Software & Enterprise Solutions'}
                onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value, default_seo_title: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Default Global Meta Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={settings.seoDescription || settings.default_seo_description || 'Enterprise custom software engineering, Android/iOS apps, CRMs, and web platforms built with precision.'}
                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value, default_seo_description: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* TAB 7: DATABASE & SYSTEM */}
        {activeTab === 'database' && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
              System Health & Database Architecture
            </h3>

            {dbHealth && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: dbHealth.connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  border: `1px solid ${dbHealth.connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: dbHealth.connected ? '#10b981' : '#f59e0b'
                      }}
                    />
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>
                      {dbHealth.connected ? 'Connected to MongoDB Atlas Cluster' : 'Local Storage Fallback Mode'}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1d5db' }}>
                    {dbHealth.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runHealthCheck}
                  disabled={testingDb}
                  className="admin-btn admin-btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  <RefreshCw size={13} className={testingDb ? 'animate-spin' : ''} />
                  <span>{testingDb ? 'Checking...' : 'Retest Connection'}</span>
                </button>
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-label">Google Analytics / Tag Manager Measurement ID</label>
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
                  Maintenance Mode (Only authenticated Admins can view public pages when enabled)
                </span>
              </label>
            </div>
          </div>
        )}
      </form>

      {/* Media Picker Modal for Brand Logo */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelectMedia={(media) => {
          setSettings((prev) => ({
            ...prev,
            logoUrl: media.url,
            logo_url: media.url
          }));
        }}
        allowedType="image"
      />
    </div>
  );
}
