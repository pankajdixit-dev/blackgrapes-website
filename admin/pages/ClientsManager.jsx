import React, { useState, useEffect } from 'react';
import {
  Users,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  ExternalLink,
  Search,
  Building2,
  Globe,
  Award,
  X
} from 'lucide-react';
import { getClients, saveClient, deleteClient, getClientsPage, saveClientsPage } from '@backend/dataService';

export default function ClientsManager() {
  const [clients, setClients] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('clients'); // 'clients', 'metrics'
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    logo_url: '',
    category: 'fintech',
    industry: 'Enterprise Software',
    region: 'North America',
    services: 'Custom ERP & Mobile Engineering'
  });

  useEffect(() => {
    loadClients();
    loadPageData();
  }, []);

  const loadClients = async () => {
    const list = await getClients();
    setClients(list);
  };

  const loadPageData = async () => {
    const res = await getClientsPage();
    setPageData(res);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    setForm({
      name: '',
      logo_url: '',
      category: 'fintech',
      industry: 'Enterprise Software',
      region: 'North America',
      services: 'Custom ERP & Mobile Engineering'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditingClient(client);
    setForm({
      name: client.name || '',
      logo_url: client.logo_url || client.logo || '',
      category: client.category || 'fintech',
      industry: client.industry || 'Enterprise Software',
      region: client.region || 'Global',
      services: client.services || ''
    });
    setModalOpen(true);
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(editingClient || {}),
      name: form.name,
      logo_url: form.logo_url,
      category: form.category,
      industry: form.industry,
      region: form.region,
      services: form.services
    };
    await saveClient(payload);
    await loadClients();
    setSaving(false);
    setModalOpen(false);
    showToast(editingClient ? 'Client updated on live website!' : 'New client added to portfolio!');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete client "${name}" from portfolio?`)) {
      await deleteClient(id);
      await loadClients();
      showToast('Client removed from portfolio.');
    }
  };

  const handleSaveMetrics = async (e) => {
    e.preventDefault();
    setSaving(true);
    await saveClientsPage(pageData);
    setSaving(false);
    showToast('Client impact metrics published live via WebSocket!');
  };

  const handleMetricChange = (idx, field, val) => {
    const metrics = [...(pageData.metrics || [])];
    metrics[idx] = { ...metrics[idx], [field]: val };
    setPageData({ ...pageData, metrics });
  };

  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      c.name?.toLowerCase().includes(q) ||
      c.industry?.toLowerCase().includes(q) ||
      c.region?.toLowerCase().includes(q)
    );
  });

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
          <h1 className="admin-page-title">Client Portfolio & Impact Metrics</h1>
          <p className="admin-page-sub">
            Manage global client logos, corporate case study associations, and headline counter stats.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/clients"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live clients page"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>
          <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <Building2 size={16} />
          <span>Client Roster ({clients.length})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          <Award size={16} />
          <span>Impact Counter Metrics</span>
        </button>
      </div>

      {/* TAB 1: CLIENTS LIST */}
      {activeTab === 'clients' && (
        <div className="admin-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <div className="admin-search-box">
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search clients by name, industry, or region..."
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
                  <th>Client Brand</th>
                  <th>Category</th>
                  <th>Industry</th>
                  <th>Region</th>
                  <th>Deliverables</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {client.logo_url || client.logo ? (
                          <img
                            src={client.logo_url || client.logo}
                            alt=""
                            style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b00', fontWeight: 'bold' }}>
                            {client.name?.charAt(0) || 'C'}
                          </div>
                        )}
                        <span style={{ fontWeight: '600', color: '#fff' }}>{client.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-orange">{client.category}</span>
                    </td>
                    <td>{client.industry || '—'}</td>
                    <td>{client.region || '—'}</td>
                    <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '240px' }}>
                      {client.services || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(client)}
                          className="admin-action-btn"
                          title="Edit client"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(client.id, client.name)}
                          className="admin-action-btn danger"
                          title="Delete client"
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

      {/* TAB 2: METRICS */}
      {activeTab === 'metrics' && pageData && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Headline Counter Strip Metrics
            </h3>
            <button onClick={handleSaveMetrics} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Metrics'}</span>
            </button>
          </div>

          <div className="admin-grid-2">
            {(pageData.metrics || []).map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px'
                }}
              >
                <div className="admin-form-group">
                  <label className="admin-label">Metric Number / Stat</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.number || ''}
                    onChange={(e) => handleMetricChange(idx, 'number', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.label || ''}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Subline Highlight</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.highlight || ''}
                    onChange={(e) => handleMetricChange(idx, 'highlight', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingClient ? 'Edit Client Record' : 'Add New Client to Portfolio'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitModal}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Logo Image URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://... or /assets/..."
                    value={form.logo_url}
                    onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="fintech">Fintech & Banking</option>
                      <option value="healthcare">Healthcare & MedTech</option>
                      <option value="enterprise">Enterprise Cloud & SaaS</option>
                      <option value="ecommerce">E-Commerce & Retail</option>
                      <option value="ai">AI & Smart Mobility</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Region</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Industry</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Delivered Services Summary</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={form.services}
                    onChange={(e) => setForm({ ...form, services: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

