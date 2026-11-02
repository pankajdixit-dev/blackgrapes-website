import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  MapPin, 
  Phone 
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'stats', 'contact'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Hero State
  const [heroData, setHeroData] = useState({
    badge: '',
    title: '',
    subtitle: '',
    ctaPrimaryText: '',
    ctaPrimaryLink: '',
    ctaSecondaryText: '',
  });

  // Stats State
  const [statsData, setStatsData] = useState([]);

  // Contact Info State
  const [contactInfoData, setContactInfoData] = useState({
    address1: '',
    address2: '',
    phone1: '',
    phone2: '',
    phone3: '',
    primaryEmail: '',
    secondaryEmail: '',
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        const [heroRes, statsRes, contactRes] = await Promise.all([
          api.get('/content/hero'),
          api.get('/content/stats'),
          api.get('/content/contactInfo'),
        ]);

        if (heroRes.data?.success && heroRes.data.data) {
          setHeroData(heroRes.data.data);
        }
        if (statsRes.data?.success && statsRes.data.data) {
          setStatsData(statsRes.data.data || []);
        }
        if (contactRes.data?.success && contactRes.data.data) {
          setContactInfoData(contactRes.data.data);
        }
      } catch (err) {
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/content/hero', { data: heroData });
      if (res.data?.success) showToast('Homepage Hero section updated successfully');
    } catch {
      showToast('Failed to update Hero section', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/content/stats', { data: statsData });
      if (res.data?.success) showToast('Company metrics updated successfully');
    } catch {
      showToast('Failed to update metrics', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/content/contactInfo', { data: contactInfoData });
      if (res.data?.success) showToast('Contact information updated successfully');
    } catch {
      showToast('Failed to update contact info', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {toast && (
        <div className={`admin-toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`btn-admin-secondary ${activeTab === 'hero' ? 'btn-admin-primary' : ''}`}
        >
          <Sparkles size={16} />
          <span>Homepage Hero Banner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`btn-admin-secondary ${activeTab === 'stats' ? 'btn-admin-primary' : ''}`}
        >
          <Layers size={16} />
          <span>Company Key Metrics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`btn-admin-secondary ${activeTab === 'contact' ? 'btn-admin-primary' : ''}`}
        >
          <MapPin size={16} />
          <span>Headquarters &amp; Contact Info</span>
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b00' }}>
          <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
          <span style={{ color: '#a1a1aa' }}>Loading Dynamic Section Data...</span>
        </div>
      ) : (
        <>
          {/* View 1: Hero Section */}
          {activeTab === 'hero' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: '0.35rem' }}>Homepage Hero Section</h2>
              <p className="admin-card-subtitle" style={{ marginBottom: '1.75rem' }}>
                Modify headline copy, badges, and call-to-action button labels without editing source code.
              </p>

              <form onSubmit={handleSaveHero}>
                <div className="admin-form-group">
                  <label>Welcome Eyebrow Badge</label>
                  <input
                    type="text"
                    value={heroData.badge}
                    onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
                    className="admin-form-control"
                    placeholder="🍇 Welcome to Black Grapes Group"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Primary Main Heading *</label>
                  <input
                    type="text"
                    required
                    value={heroData.title}
                    onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                    className="admin-form-control"
                    placeholder="Where Technology, Engineering & Strategic Advisory Converge"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle / Company Paragraph *</label>
                  <textarea
                    rows={4}
                    required
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label>Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={heroData.ctaPrimaryText}
                      onChange={(e) => setHeroData({ ...heroData, ctaPrimaryText: e.target.value })}
                      className="admin-form-control"
                      placeholder="Explore All Services"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Primary CTA Button Link Target</label>
                    <input
                      type="text"
                      value={heroData.ctaPrimaryLink}
                      onChange={(e) => setHeroData({ ...heroData, ctaPrimaryLink: e.target.value })}
                      className="admin-form-control"
                      placeholder="/services"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Secondary CTA Button Text (Triggers Strategy Call Modal)</label>
                  <input
                    type="text"
                    value={heroData.ctaSecondaryText}
                    onChange={(e) => setHeroData({ ...heroData, ctaSecondaryText: e.target.value })}
                    className="admin-form-control"
                    placeholder="Schedule Strategy Call"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="submit" disabled={saving} className="btn-admin-primary">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>Save Hero Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View 2: Stats Section */}
          {activeTab === 'stats' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: '0.35rem' }}>Homepage &amp; Services Metrics</h2>
              <p className="admin-card-subtitle" style={{ marginBottom: '1.75rem' }}>
                Update quantitative milestones (Years in industry, Delivered reports, Team size, Satisfaction).
              </p>

              <form onSubmit={handleSaveStats}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  {statsData.map((stat, idx) => (
                    <div key={idx} style={{ background: '#000000', border: '1px solid rgba(255, 107, 0, 0.25)', borderRadius: '12px', padding: '1.25rem' }}>
                      <div className="admin-form-group">
                        <label>Stat Metric Value</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...statsData];
                            updated[idx].value = e.target.value;
                            setStatsData(updated);
                          }}
                          className="admin-form-control"
                          style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 800, color: '#ff6b00' }}
                        />
                      </div>

                      <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label>Label / Description</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...statsData];
                            updated[idx].label = e.target.value;
                            setStatsData(updated);
                          }}
                          className="admin-form-control"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={saving} className="btn-admin-primary">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>Save Metrics</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View 3: Contact & Address Information */}
          {activeTab === 'contact' && (
            <div className="admin-card">
              <h2 className="admin-card-title" style={{ marginBottom: '0.35rem' }}>Headquarters &amp; Executive Contacts</h2>
              <p className="admin-card-subtitle" style={{ marginBottom: '1.75rem' }}>
                Control office addresses and phone numbers displayed on the Contact page, Footer, and Quick Contact bars.
              </p>

              <form onSubmit={handleSaveContact}>
                <div className="admin-form-group">
                  <label>Office Address 1 (Scheme No. 54, Vijay Nagar) *</label>
                  <input
                    type="text"
                    required
                    value={contactInfoData.address1}
                    onChange={(e) => setContactInfoData({ ...contactInfoData, address1: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Office Address 2 (Scheme No. 114, Vijay Nagar) *</label>
                  <input
                    type="text"
                    required
                    value={contactInfoData.address2}
                    onChange={(e) => setContactInfoData({ ...contactInfoData, address2: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label>Phone 1 (Arpit Jain - Primary)</label>
                    <input
                      type="text"
                      value={contactInfoData.phone1}
                      onChange={(e) => setContactInfoData({ ...contactInfoData, phone1: e.target.value })}
                      className="admin-form-control"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Phone 2 (Arpit Jain - Secondary)</label>
                    <input
                      type="text"
                      value={contactInfoData.phone2}
                      onChange={(e) => setContactInfoData({ ...contactInfoData, phone2: e.target.value })}
                      className="admin-form-control"
                    />
                  </div>
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label>Phone 3 (Deepika Jain)</label>
                    <input
                      type="text"
                      value={contactInfoData.phone3}
                      onChange={(e) => setContactInfoData({ ...contactInfoData, phone3: e.target.value })}
                      className="admin-form-control"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Primary Group Email</label>
                    <input
                      type="email"
                      value={contactInfoData.primaryEmail}
                      onChange={(e) => setContactInfoData({ ...contactInfoData, primaryEmail: e.target.value })}
                      className="admin-form-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="submit" disabled={saving} className="btn-admin-primary">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

