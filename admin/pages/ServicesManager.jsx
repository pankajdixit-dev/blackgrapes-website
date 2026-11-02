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
import { getServices, saveService, deleteService } from '@backend/dataService';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'web',
    categoryLabel: 'Web & Cloud',
    badge: 'Popular',
    image: '/softech-services/web.jpg',
    shortDesc: '',
    description: '',
    tags_raw: 'React\nNext.js\nNode.js\nAWS',
    deliverables_raw: 'Custom React & Full-Stack MERN engineering\nResponsive UI/UX\nSub-second load times'
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
      category: 'web',
      categoryLabel: 'Web & Cloud',
      badge: 'Popular',
      image: '/softech-services/web.jpg',
      shortDesc: '',
      description: '',
      tags_raw: 'React\nNext.js\nNode.js\nAWS',
      deliverables_raw: 'Custom React & Full-Stack MERN engineering\nResponsive UI/UX\nSub-second load times'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setForm({
      title: srv.title || '',
      category: srv.category || 'web',
      categoryLabel: srv.categoryLabel || srv.category || 'Software Development',
      badge: srv.badge || '',
      image: srv.image || '',
      shortDesc: srv.shortDesc || srv.short_desc || '',
      description: srv.description || srv.full_desc || '',
      tags_raw: (srv.tags || srv.techStack || []).join('\n'),
      deliverables_raw: (srv.keyDeliverables || []).join('\n')
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const tagList = form.tags_raw.split('\n').map((s) => s.trim()).filter(Boolean);
    const deliverableList = form.deliverables_raw.split('\n').map((s) => s.trim()).filter(Boolean);

    const payload = {
      ...(editingService || {}),
      title: form.title,
      category: form.category,
      categoryLabel: form.categoryLabel,
      badge: form.badge,
      image: form.image,
      shortDesc: form.shortDesc,
      short_desc: form.shortDesc,
      description: form.description,
      full_desc: form.description,
      tags: tagList,
      techStack: tagList,
      keyDeliverables: deliverableList,
      is_active: true
    };

    await saveService(payload);
    setSaving(false);
    setModalOpen(false);
    showToast(editingService ? 'Service updated and published live!' : 'New service created!');
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
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <h1 className="admin-page-title">Services & Solutions Manager</h1>
          <p className="admin-page-sub">
            Manage 10+ core software engineering, mobile development, ERP, CRM, and cloud services across homepage and /services pages.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live services page"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>
          <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div className="admin-search-box">
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search services by title or category..."
            className="admin-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Deliverables / Tech</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((srv) => (
                <tr key={srv.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {srv.image && (
                        <img
                          src={srv.image}
                          alt=""
                          style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <strong style={{ color: '#fff', display: 'block' }}>{srv.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{srv.shortDesc || srv.description?.slice(0, 70)}...</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-orange">{srv.categoryLabel || srv.category}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', maxWidth: '240px' }}>
                      {(srv.tags || srv.techStack || []).slice(0, 3).map((t, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: '#10b981', fontSize: '0.85rem' }}>● Active</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(srv)}
                        className="admin-action-btn"
                        title="Edit service"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="admin-action-btn danger"
                        title="Delete service"
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

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingService ? 'Edit Service Details' : 'Add New Service'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
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

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Category Key</label>
                    <select
                      className="admin-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="web">Web & Cloud</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="software">Custom Software</option>
                      <option value="enterprise">CRM & MLM ERP</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="design">UI/UX & Branding</option>
                      <option value="gaming">Game Development</option>
                      <option value="tenders">Tenders & Staffing</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Badge</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Service Showcase Image Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Short Description (for card preview)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={form.shortDesc}
                    onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Full Narrative Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Tech Stack Tags (One per line)</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.tags_raw}
                    onChange={(e) => setForm({ ...form, tags_raw: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Key Deliverables (One per line)</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.deliverables_raw}
                    onChange={(e) => setForm({ ...form, deliverables_raw: e.target.value })}
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
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
