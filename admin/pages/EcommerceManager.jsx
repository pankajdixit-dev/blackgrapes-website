import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Users,
  Tag,
  ShieldCheck,
  TrendingUp,
  Inbox,
  Sparkles
} from 'lucide-react';
import { getEcommerce, saveEcommerce, getEnquiries } from '@backend/dataService';

export default function EcommerceManager() {
  const [data, setData] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'categories', 'perks', 'waitlist'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadData();
    loadWaitlist();
    const handleUpdate = () => {
      loadWaitlist();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadData = async () => {
    const res = await getEcommerce();
    setData(res);
  };

  const loadWaitlist = async () => {
    const list = await getEnquiries();
    const entries = list.filter(
      (e) => (e.service && e.service.toLowerCase().includes('ecommerce')) || (e.source && e.source.toLowerCase().includes('waitlist'))
    );
    setWaitlist(entries);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveEcommerce(data);
    setSaving(false);
    showToast('E-Commerce platform updates published live via WebSocket!');
  };

  const handleCategoryChange = (idx, field, val) => {
    const categories = [...(data.categories || [])];
    categories[idx] = { ...categories[idx], [field]: val };
    setData({ ...data, categories });
  };

  const handleAddCategory = () => {
    const categories = [...(data.categories || [])];
    categories.push({
      id: `cat-${Date.now()}`,
      name: 'New Product Category',
      count: '50+ Listings Pending'
    });
    setData({ ...data, categories });
  };

  const handleDeleteCategory = (idx) => {
    const categories = data.categories.filter((_, i) => i !== idx);
    setData({ ...data, categories });
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading E-Commerce Control Center...</div>;
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
          <h1 className="admin-page-title">E-Commerce (Naya Purana Bazaar) Manager</h1>
          <p className="admin-page-sub">
            Control marketplace launch headlines, domain addresses, product categories, buyer/seller perks, and view VIP waitlist signups.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/ecommerce"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live ecommerce page"
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
          <Sparkles size={16} />
          <span>Platform Overview & Domain</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Tag size={16} />
          <span>Marketplace Categories ({data.categories?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'perks' ? 'active' : ''}`}
          onClick={() => setActiveTab('perks')}
        >
          <ShieldCheck size={16} />
          <span>Buyer & Seller Perks</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'waitlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('waitlist')}
        >
          <Inbox size={16} />
          <span>VIP Early Access Waitlist ({waitlist.length})</span>
        </button>
      </div>

      {/* TAB 1: HERO & DOMAIN */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Official Platform Announcement
          </h3>

          <div className="admin-form-group">
            <label className="admin-label">Announcement Top Badge</label>
            <input
              type="text"
              className="admin-input"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Main Announcement Title</label>
            <input
              type="text"
              className="admin-input"
              value={data.title || ''}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Platform Byline Tag</label>
              <input
                type="text"
                className="admin-input"
                value={data.byline || ''}
                onChange={(e) => setData({ ...data, byline: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Target Launch Window</label>
              <input
                type="text"
                className="admin-input"
                value={data.targetLaunch || ''}
                onChange={(e) => setData({ ...data, targetLaunch: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Official Domain URL</label>
              <input
                type="text"
                className="admin-input"
                value={data.domain || ''}
                onChange={(e) => setData({ ...data, domain: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Domain Display Text</label>
              <input
                type="text"
                className="admin-input"
                value={data.domainDisplay || ''}
                onChange={(e) => setData({ ...data, domainDisplay: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Marketplace Concept Summary</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={data.summary || ''}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Product & Trade Categories
            </h3>
            <button type="button" onClick={handleAddCategory} className="admin-btn admin-btn-secondary">
              <Plus size={16} />
              <span>Add Category</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(data.categories || []).map((cat, idx) => (
              <div
                key={cat.id || idx}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <label className="admin-label">Category Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={cat.name || ''}
                    onChange={(e) => handleCategoryChange(idx, 'name', e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="admin-label">Listing Metric / Badge</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={cat.count || ''}
                    onChange={(e) => handleCategoryChange(idx, 'count', e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(idx)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', alignSelf: 'flex-end', paddingBottom: '0.5rem' }}
                  title="Remove category"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PERKS */}
      {activeTab === 'perks' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Platform Benefits & Trust Protections
          </h3>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Buyer Perks (One per line)</label>
              <textarea
                rows={5}
                className="admin-textarea"
                value={(data.buyerPerks || []).join('\n')}
                onChange={(e) =>
                  setData({
                    ...data,
                    buyerPerks: e.target.value.split('\n').filter(Boolean)
                  })
                }
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Seller Perks (One per line)</label>
              <textarea
                rows={5}
                className="admin-textarea"
                value={(data.sellerPerks || []).join('\n')}
                onChange={(e) =>
                  setData({
                    ...data,
                    sellerPerks: e.target.value.split('\n').filter(Boolean)
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WAITLIST SIGNUPS */}
      {activeTab === 'waitlist' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Early Access & VIP Waitlist Signups
          </h3>

          {waitlist.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
              No waitlist registrations yet. When users sign up on nayapuranabazaar.com waitlist form, they will appear here instantly!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {waitlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>{item.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {item.email} | <strong>Mobile:</strong> {item.phone}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#a78bfa' }}>
                    {item.message}
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
