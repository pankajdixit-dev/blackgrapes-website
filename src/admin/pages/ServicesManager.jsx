import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Search,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { getServices, saveService, deleteService } from '../../services/dataService';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Engineering',
    short_desc: '',
    full_desc: '',
    icon_name: 'Layers',
    status: 'published'
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const list = await getServices();
    setServices(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setForm({
      title: '',
      slug: '',
      category: 'Engineering',
      short_desc: '',
      full_desc: '',
      icon_name: 'Layers',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setForm({
      title: srv.title || '',
      slug: srv.slug || '',
      category: srv.category || 'Engineering',
      short_desc: srv.short_desc || '',
      full_desc: srv.full_desc || '',
      icon_name: srv.icon_name || 'Layers',
      status: srv.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveService({
      ...(editingService || {}),
      ...form
    });
    setModalOpen(false);
    showToast(editingService ? 'Service updated successfully.' : 'New service created.');
    await loadServices();
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      await deleteService(id);
      showToast('Service deleted.');
      await loadServices();
    }
  };

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="admin-page-title">Services & Capabilities Management</h1>
          <p className="admin-page-sub">
            Add, update, or reorganize technological services displayed across the website and footer.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent' }}
            placeholder="Search services by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Short Description</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af' }}>
                    No services found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((srv) => (
                  <tr key={srv.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{srv.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>slug: {srv.slug}</div>
                    </td>
                    <td>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        {srv.category}
                      </span>
                    </td>
                    <td style={{ maxWidth: '350px' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {srv.short_desc}
                      </p>
                    </td>
                    <td>
                      <span className={`badge-status ${srv.status || 'published'}`}>
                        {srv.status || 'published'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="btn-header-action"
                        style={{ display: 'inline-flex', marginRight: '0.5rem' }}
                        title="Edit service"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="btn-header-action"
                        style={{ display: 'inline-flex', color: '#f87171' }}
                        title="Delete service"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: '0.3rem 0.6rem' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Service Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">URL Slug</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. enterprise-crm"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Gaming">Gaming</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Short Summary (Displayed on Cards)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={form.short_desc}
                    onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Full Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.full_desc}
                    onChange={(e) => setForm({ ...form, full_desc: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Icon Identifier</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.icon_name}
                      onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Publish Status</label>
                    <select
                      className="admin-select"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
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
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={15} />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
