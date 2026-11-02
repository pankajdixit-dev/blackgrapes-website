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
  Sparkles,
  Edit,
  X,
  Search
} from 'lucide-react';
import {
  getPartnership,
  savePartnership,
  getBusinessPartners,
  saveBusinessPartners,
  getEnquiries
} from '@backend/dataService';

export default function PartnershipManager() {
  const [data, setData] = useState(null);
  const [businessPartners, setBusinessPartners] = useState({ product_partners: [], service_partners: [] });
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'product_partners', 'service_partners', 'applications'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Partner Modal State
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerModalType, setPartnerModalType] = useState('product'); // 'product' or 'service'
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    img: '',
    localImg: ''
  });

  useEffect(() => {
    loadAll();
    const handleUpdate = () => {
      loadApplications();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadAll = async () => {
    const [pRes, bpRes, enqRes] = await Promise.all([
      getPartnership(),
      getBusinessPartners(),
      getEnquiries()
    ]);
    setData(pRes);
    setBusinessPartners(bpRes || { product_partners: [], service_partners: [] });
    const apps = (enqRes || []).filter(
      (e) => (e.service && e.service.toLowerCase().includes('partner')) || (e.source && e.source.toLowerCase().includes('partner'))
    );
    setApplications(apps);
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

  const handleSaveOverview = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await savePartnership(data);
    setSaving(false);
    showToast('Partnership overview saved & published live via WebSocket!');
  };

  // PARTNER MODAL HANDLERS
  const handleOpenCreatePartner = (type) => {
    setPartnerModalType(type);
    setEditingPartner(null);
    setPartnerForm({ name: '', img: '', localImg: '' });
    setPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (type, partner) => {
    setPartnerModalType(type);
    setEditingPartner(partner);
    setPartnerForm({
      name: partner.name || '',
      img: partner.img || '',
      localImg: partner.localImg || ''
    });
    setPartnerModalOpen(true);
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    setSaving(true);
    const listKey = partnerModalType === 'product' ? 'product_partners' : 'service_partners';
    const currentList = [...(businessPartners[listKey] || [])];

    if (editingPartner) {
      const idx = currentList.findIndex((p) => p.id === editingPartner.id || p.name === editingPartner.name);
      if (idx >= 0) {
        currentList[idx] = { ...editingPartner, ...partnerForm };
      }
    } else {
      currentList.push({
        id: `partner-${Date.now()}`,
        name: partnerForm.name,
        img: partnerForm.img,
        localImg: partnerForm.localImg || partnerForm.img
      });
    }

    const updated = {
      ...businessPartners,
      [listKey]: currentList
    };

    await saveBusinessPartners(updated);
    setBusinessPartners(updated);
    setSaving(false);
    setPartnerModalOpen(false);
    showToast(`${partnerModalType === 'product' ? 'Product' : 'Service'} partner updated live!`);
  };

  const handleDeletePartner = async (type, partner) => {
    if (window.confirm(`Delete partner "${partner.name}"?`)) {
      const listKey = type === 'product' ? 'product_partners' : 'service_partners';
      const updatedList = (businessPartners[listKey] || []).filter(
        (p) => (p.id ? p.id !== partner.id : p.name !== partner.name)
      );

      const updated = {
        ...businessPartners,
        [listKey]: updatedList
      };

      await saveBusinessPartners(updated);
      setBusinessPartners(updated);
      showToast('Partner removed.');
    }
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading Partnership Control Center...</div>;
  }

  const prodList = (businessPartners.product_partners || []).filter(
    (p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const servList = (businessPartners.service_partners || []).filter(
    (p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Manage ODC proposals, 29+ product tie-ups (Zoho, Salesforce, Microsoft), 17+ service tie-ups (JustDial, Sulekha), and view applications.
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
            <span>View Live</span>
          </a>
          {activeTab === 'overview' ? (
            <button onClick={handleSaveOverview} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Overview'}</span>
            </button>
          ) : activeTab === 'product_partners' ? (
            <button onClick={() => handleOpenCreatePartner('product')} className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add Product Partner</span>
            </button>
          ) : activeTab === 'service_partners' ? (
            <button onClick={() => handleOpenCreatePartner('service')} className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add Service Partner</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={16} />
          <span>Overview & ODC Content</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'product_partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('product_partners')}
        >
          <Handshake size={16} />
          <span>Product Partners ({businessPartners.product_partners?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'service_partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('service_partners')}
        >
          <Layers size={16} />
          <span>Service Partners ({businessPartners.service_partners?.length || 0})</span>
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

      {/* TAB 2: PRODUCT PARTNERS (Zoho, Salesforce, Microsoft, etc.) */}
      {activeTab === 'product_partners' && (
        <div className="admin-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <div className="admin-search-box">
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search product partner brands (e.g. Zoho, Salesforce, SAP)..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Logo Image URL</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prodList.map((partner, idx) => (
                  <tr key={partner.id || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {partner.img || partner.localImg ? (
                          <img
                            src={partner.localImg || partner.img}
                            alt=""
                            style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                        )}
                        <strong style={{ color: '#fff' }}>{partner.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '300px' }}>
                      {partner.img || partner.localImg || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditPartner('product', partner)}
                          className="admin-action-btn"
                          title="Edit partner"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner('product', partner)}
                          className="admin-action-btn danger"
                          title="Delete partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICE PARTNERS (JustDial, Sulekha, IndiaMART, etc.) */}
      {activeTab === 'service_partners' && (
        <div className="admin-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <div className="admin-search-box">
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search service partner networks (e.g. JustDial, Sulekha, IndiaMART)..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Brand / Network Name</th>
                  <th>Logo Image URL</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {servList.map((partner, idx) => (
                  <tr key={partner.id || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {partner.img || partner.localImg ? (
                          <img
                            src={partner.localImg || partner.img}
                            alt=""
                            style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                        )}
                        <strong style={{ color: '#fff' }}>{partner.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '300px' }}>
                      {partner.img || partner.localImg || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditPartner('service', partner)}
                          className="admin-action-btn"
                          title="Edit partner"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner('service', partner)}
                          className="admin-action-btn danger"
                          title="Delete partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: APPLICATIONS */}
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

      {/* CREATE / EDIT PARTNER MODAL */}
      {partnerModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingPartner ? `Edit ${partnerModalType === 'product' ? 'Product' : 'Service'} Partner` : `Add New ${partnerModalType === 'product' ? 'Product' : 'Service'} Partner`}
              </h3>
              <button
                type="button"
                onClick={() => setPartnerModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePartner}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Partner Brand Name *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Logo Image URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://... or /partners/brand.png"
                    value={partnerForm.img}
                    onChange={(e) => setPartnerForm({ ...partnerForm, img: e.target.value, localImg: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish Partner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
