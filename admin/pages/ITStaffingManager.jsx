import React, { useState, useEffect } from 'react';
import {
  Users,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  Inbox,
  Flame,
  ExternalLink
} from 'lucide-react';
import { getITStaffing, saveITStaffing, getEnquiries, updateEnquiryStatus } from '@backend/dataService';

export default function ITStaffingManager() {
  const [data, setData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'models', 'guarantees', 'leads'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadData();
    loadLeads();
    const handleUpdate = () => {
      loadLeads();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadData = async () => {
    const res = await getITStaffing();
    setData(res);
  };

  const loadLeads = async () => {
    const list = await getEnquiries();
    const staffingLeads = list.filter(
      (e) => (e.service && e.service.toLowerCase().includes('staffing')) || (e.source && e.source.toLowerCase().includes('staffing'))
    );
    setEnquiries(staffingLeads);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveITStaffing(data);
    setSaving(false);
    showToast('IT Staffing content published live to website via WebSocket!');
  };

  const handleStatChange = (idx, field, val) => {
    const stats = [...(data.stats || [])];
    stats[idx] = { ...stats[idx], [field]: val };
    setData({ ...data, stats });
  };

  const handleModelChange = (idx, field, val) => {
    const models = [...(data.models || [])];
    models[idx] = { ...models[idx], [field]: val };
    setData({ ...data, models });
  };

  const handleAddModel = () => {
    const models = [...(data.models || [])];
    models.push({
      id: `model-${Date.now()}`,
      title: 'New Hiring Model',
      desc: 'Description of candidate sourcing and engagement framework.',
      rate: 'From $20/hr',
      bestFor: 'High-growth startups'
    });
    setData({ ...data, models });
  };

  const handleDeleteModel = (idx) => {
    const models = data.models.filter((_, i) => i !== idx);
    setData({ ...data, models });
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading IT Staffing Control Center...</div>;
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
          <h1 className="admin-page-title">IT Staffing Solutions Manager</h1>
          <p className="admin-page-sub">
            Control headlines, candidate guarantee metrics, hiring models, and view direct staffing leads.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/it-staffing"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live page in new tab"
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
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Flame size={16} />
          <span>Hero & Key Headlines</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'models' ? 'active' : ''}`}
          onClick={() => setActiveTab('models')}
        >
          <Users size={16} />
          <span>Hiring Models & Rates ({data.models?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'guarantees' ? 'active' : ''}`}
          onClick={() => setActiveTab('guarantees')}
        >
          <ShieldCheck size={16} />
          <span>Candidate Guarantees & Metrics</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <Inbox size={16} />
          <span>Staffing Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: HERO & HEADLINES */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Hero Banner & Value Proposition
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Main H1 Headline</label>
            <input
              type="text"
              className="admin-input"
              value={data.headline || ''}
              onChange={(e) => setData({ ...data, headline: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Lead Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={data.subtitle || ''}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Narrative Overview Description</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Staffing Services Offered (Comma-separated)</label>
              <textarea
                rows={3}
                className="admin-textarea"
                value={(data.staffingServices || []).join(', ')}
                onChange={(e) =>
                  setData({
                    ...data,
                    staffingServices: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Mandate Range Options (Comma-separated)</label>
              <input
                type="text"
                className="admin-input"
                value={(data.mandateOptions || []).join(', ')}
                onChange={(e) =>
                  setData({
                    ...data,
                    mandateOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HIRING MODELS */}
      {activeTab === 'models' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Engagement & Sourcing Models
            </h3>
            <button type="button" onClick={handleAddModel} className="admin-btn admin-btn-secondary">
              <Plus size={16} />
              <span>Add Model</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {(data.models || []).map((model, idx) => (
              <div
                key={model.id || idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>Model #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteModel(idx)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Delete model"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Model Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={model.title || ''}
                      onChange={(e) => handleModelChange(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Billing Rate / Pricing</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={model.rate || ''}
                      onChange={(e) => handleModelChange(idx, 'rate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Best For</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={model.bestFor || ''}
                    onChange={(e) => handleModelChange(idx, 'bestFor', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Description & Capabilities</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={model.desc || ''}
                    onChange={(e) => handleModelChange(idx, 'desc', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GUARANTEES & STATS */}
      {activeTab === 'guarantees' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Impact Counters & Risk-Free Guarantees
          </h3>

          <div className="admin-grid-2">
            {(data.stats || []).map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px'
                }}
              >
                <div className="admin-form-group">
                  <label className="admin-label">Metric Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.label || ''}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Value</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.value || ''}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Subline / Context</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.sub || ''}
                    onChange={(e) => handleStatChange(idx, 'sub', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
            <label className="admin-label">Key Guarantee Bullet Points (One per line)</label>
            <textarea
              rows={4}
              className="admin-textarea"
              value={(data.guaranteePoints || []).join('\n')}
              onChange={(e) =>
                setData({
                  ...data,
                  guaranteePoints: e.target.value.split('\n').filter(Boolean)
                })
              }
            />
          </div>
        </div>
      )}

      {/* TAB 4: DIRECT STAFFING LEADS */}
      {activeTab === 'leads' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Direct Inquiries Received from IT Staffing Page
          </h3>

          {enquiries.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
              No staffing enquiries received yet. Inquiries submitted through the IT Staffing form will appear here in real time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>{enq.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {enq.email} | <strong>Phone:</strong> {enq.phone} | <strong>Company:</strong> {enq.company || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                    <strong>Service Requirement:</strong> {enq.service} | <strong>Source:</strong> {enq.source}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '4px' }}>
                    {enq.message}
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
