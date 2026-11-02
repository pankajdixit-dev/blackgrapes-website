import React, { useState, useEffect } from 'react';
import {
  Handshake,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Layers,
  Inbox,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { getPartnership, savePartnership, getEnquiries } from '@backend/dataService';

export default function PartnershipManager() {
  const [data, setData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'alliances', 'applications'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadData();
    loadApplications();
    const handleUpdate = () => {
      loadApplications();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadData = async () => {
    const res = await getPartnership();
    setData(res);
  };

  const loadApplications = async () => {
    const list = await getEnquiries();
    const apps = list.filter(
      (e) => (e.service && e.service.toLowerCase().includes('partner')) || (e.source && e.source.toLowerCase().includes('partner'))
    );
    setApplications(apps);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await savePartnership(data);
    setSaving(false);
    showToast('Partnership content published live via WebSocket!');
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading Partnership Control Center...</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Partnership & Alliances Manager</h1>
          <p className="admin-page-sub">
            Control partnership proposals, offshore development offerings, alliance categories, and view incoming partner applications.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live partnership page"
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

      {/* Navigation Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={16} />
          <span>Overview & ODC Content</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'alliances' ? 'active' : ''}`}
          onClick={() => setActiveTab('alliances')}
        >
          <Layers size={16} />
          <span>Product & Services Tie-ups</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Inbox size={16} />
          <span>Partner Applications ({applications.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ODC */}
      {activeTab === 'overview' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Main Partnership Proposal & Offshore Development Center
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              value={data.heroBadge || ''}
              onChange={(e) => setData({ ...data, heroBadge: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Main Heading</label>
            <input
              type="text"
              className="admin-input"
              value={data.heroTitle || ''}
              onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={data.heroSubtitle || ''}
              onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Card Section Title</label>
              <input
                type="text"
                className="admin-input"
                value={data.partnerWithUsTitle || ''}
                onChange={(e) => setData({ ...data, partnerWithUsTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Showcase Image Path</label>
              <input
                type="text"
                className="admin-input"
                value={data.partnerImage || ''}
                onChange={(e) => setData({ ...data, partnerImage: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Partner With Us Detailed Narrative</label>
            <textarea
              rows={4}
              className="admin-textarea"
              value={data.partnerWithUsText || ''}
              onChange={(e) => setData({ ...data, partnerWithUsText: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Key Partnership Advantages (One per line)</label>
            <textarea
              rows={4}
              className="admin-textarea"
              value={(data.benefits || []).join('\n')}
              onChange={(e) =>
                setData({
                  ...data,
                  benefits: e.target.value.split('\n').filter(Boolean)
                })
              }
            />
          </div>
        </div>
      )}

      {/* TAB 2: ALLIANCES */}
      {activeTab === 'alliances' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Products & Services Tie-Up Frameworks
          </h3>

          <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ color: '#ff6b00', marginBottom: '1rem' }}>Products Companies Tie-Up (Zoho, Salesforce, Microsoft, etc.)</h4>
            <div className="admin-form-group">
              <label className="admin-label">Section Title</label>
              <input
                type="text"
                className="admin-input"
                value={data.productPartnersTitle || ''}
                onChange={(e) => setData({ ...data, productPartnersTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Intro Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={data.productPartnersIntro || ''}
                onChange={(e) => setData({ ...data, productPartnersIntro: e.target.value })}
              />
            </div>
          </div>

          <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Services Companies Tie-Up (JustDial, Sulekha, IndiaMART, etc.)</h4>
            <div className="admin-form-group">
              <label className="admin-label">Section Title</label>
              <input
                type="text"
                className="admin-input"
                value={data.servicePartnersTitle || ''}
                onChange={(e) => setData({ ...data, servicePartnersTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Intro Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={data.servicePartnersIntro || ''}
                onChange={(e) => setData({ ...data, servicePartnersIntro: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Partnership Applications Received
          </h3>

          {applications.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
              No partnership applications submitted yet. Submissions from the /partnership form will appear here in real time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>{app.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(app.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {app.email} | <strong>Contact:</strong> {app.phone}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '4px' }}>
                    {app.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
