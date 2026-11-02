import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Search,
  ExternalLink,
  Play,
  Save,
  X
} from 'lucide-react';
import { getProjects, saveProject, deleteProject } from '@backend/dataService';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    category: 'education',
    industry: 'Education',
    badge: 'Enterprise Choice',
    badge_color: 'orange',
    youtube_id: '',
    deployment_days: '3 - 5 Days',
    rating: '4.9/5',
    summary: '',
    key_features_raw: '',
    tech_stack_raw: '',
    highlights_raw: '',
    status: 'published'
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const list = await getProjects();
    setProjects(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setForm({
      title: '',
      subtitle: '',
      category: 'education',
      industry: 'Education',
      badge: 'Enterprise Choice',
      badge_color: 'orange',
      youtube_id: '',
      deployment_days: '3 - 5 Days',
      rating: '4.9/5',
      summary: '',
      key_features_raw: 'Automated Student Attendance\nOnline Fee Payments & Invoicing\nParent-Teacher Dedicated Mobile Apps',
      tech_stack_raw: 'React\nNode.js\nPostgreSQL\nFlutter',
      highlights_raw: 'Multi-Branch Support\n100% White Label',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setForm({
      title: prod.title || '',
      subtitle: prod.subtitle || '',
      category: prod.category || 'education',
      industry: prod.industry || 'Education',
      badge: prod.badge || '',
      badge_color: prod.badge_color || prod.badgeColor || 'orange',
      youtube_id: prod.youtube_id || prod.youtubeId || '',
      deployment_days: prod.deployment_days || prod.deploymentDays || '3 - 5 Days',
      rating: prod.rating || '4.9/5',
      summary: prod.summary || '',
      key_features_raw: (prod.key_features || prod.keyFeatures || []).join('\n'),
      tech_stack_raw: (prod.tech_stack || prod.techStack || []).join('\n'),
      highlights_raw: (prod.highlights || []).join('\n'),
      status: prod.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...(editingProduct || {}),
      title: form.title,
      subtitle: form.subtitle,
      category: form.category,
      industry: form.industry,
      badge: form.badge,
      badge_color: form.badge_color,
      badgeColor: form.badge_color,
      youtube_id: form.youtube_id,
      youtubeId: form.youtube_id,
      deployment_days: form.deployment_days,
      deploymentDays: form.deployment_days,
      rating: form.rating,
      summary: form.summary,
      key_features: form.key_features_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      keyFeatures: form.key_features_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      tech_stack: form.tech_stack_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      techStack: form.tech_stack_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      highlights: form.highlights_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      status: form.status
    };

    await saveProject(payload);
    setModalOpen(false);
    showToast(editingProduct ? 'Proprietary product updated.' : 'New product catalog entry created.');
    await loadProjects();
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete product "${title}" from the catalog?`)) {
      await deleteProject(id);
      showToast('Product removed.');
      await loadProjects();
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="admin-page-title">Proprietary Products & Solutions</h1>
          <p className="admin-page-sub">
            Manage the official software catalog, YouTube video demos, and specifications shown on /our-products.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent' }}
            placeholder="Search software products by title or industry..."
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
                <th>Product Title</th>
                <th>Industry</th>
                <th>Demo Video</th>
                <th>Turnaround</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#9ca3af' }}>
                    No products found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{prod.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{prod.subtitle}</div>
                    </td>
                    <td>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        {prod.industry}
                      </span>
                    </td>
                    <td>
                      {(prod.youtube_id || prod.youtubeId) ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${prod.youtube_id || prod.youtubeId}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            color: '#f87171',
                            fontSize: '0.75rem',
                            textDecoration: 'none'
                          }}
                        >
                          <Play size={12} fill="#f87171" />
                          <span>YouTube ID: {prod.youtube_id || prod.youtubeId}</span>
                        </a>
                      ) : (
                        <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>No Video</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem' }}>{prod.deployment_days || prod.deploymentDays}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#fbbf24' }}>
                        ★ {prod.rating}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${prod.status || 'published'}`}>
                        {prod.status || 'published'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="btn-header-action"
                        style={{ display: 'inline-flex', marginRight: '0.5rem' }}
                        title="Edit product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.title)}
                        className="btn-header-action"
                        style={{ display: 'inline-flex', color: '#f87171' }}
                        title="Delete product"
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

      {/* Product Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>
                  {editingProduct ? 'Edit Proprietary Product' : 'Add New Proprietary Product'}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Product Title *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Tagline / Subtitle</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="education">Education & Campus</option>
                      <option value="healthcare">Healthcare & Pharma</option>
                      <option value="real-estate">Real Estate & Rentals</option>
                      <option value="enterprise">ERP, HR & Projects</option>
                      <option value="ecommerce">E-Commerce & Retail</option>
                      <option value="mobility">Mobility & Car Rental</option>
                      <option value="lifestyle">Fitness, Dating & Salon</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Industry Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">YouTube Video ID</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. GPuZ0QpRypw"
                      value={form.youtube_id}
                      onChange={(e) => setForm({ ...form, youtube_id: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Badge Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Badge Color</label>
                    <select
                      className="admin-select"
                      value={form.badge_color}
                      onChange={(e) => setForm({ ...form, badge_color: e.target.value })}
                    >
                      <option value="orange">Orange</option>
                      <option value="purple">Purple</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Turnaround Days</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.deployment_days}
                      onChange={(e) => setForm({ ...form, deployment_days: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Product Summary</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Key Features (One per line)</label>
                    <textarea
                      rows={4}
                      className="admin-textarea"
                      value={form.key_features_raw}
                      onChange={(e) => setForm({ ...form, key_features_raw: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Tech Stack (One per line)</label>
                    <textarea
                      rows={4}
                      className="admin-textarea"
                      value={form.tech_stack_raw}
                      onChange={(e) => setForm({ ...form, tech_stack_raw: e.target.value })}
                    />
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
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

