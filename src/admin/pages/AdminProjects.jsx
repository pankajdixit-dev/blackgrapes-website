import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Briefcase,
  ExternalLink 
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'ERP & CRM',
    clientName: '',
    description: '',
    image: '',
    projectUrl: '',
    tags: '',
    isFeatured: false,
    order: 0,
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      if (res.data?.success) {
        setProjects(res.data.data || []);
      }
    } catch {
      showToast('Failed to load portfolio projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'ERP & CRM',
      clientName: '',
      description: '',
      image: '',
      projectUrl: '',
      tags: '',
      isFeatured: false,
      order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      subtitle: project.subtitle || '',
      category: project.category || 'ERP & CRM',
      clientName: project.clientName || '',
      description: project.description || '',
      image: project.image || '',
      projectUrl: project.projectUrl || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      isFeatured: Boolean(project.isFeatured),
      order: project.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };

    try {
      if (editingProject) {
        const res = await api.put(`/projects/${editingProject._id}`, payload);
        if (res.data?.success) showToast('Project updated successfully');
      } else {
        const res = await api.post('/projects', payload);
        if (res.data?.success) showToast('Project added to portfolio');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;

    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data?.success) {
        setProjects(prev => prev.filter(p => p._id !== id));
        showToast('Project removed');
      }
    } catch {
      showToast('Failed to delete project', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      showToast('Uploading project media...', 'info');
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.success && res.data?.url) {
        setFormData(prev => ({ ...prev, image: res.data.url }));
        showToast('Media uploaded');
      }
    } catch {
      showToast('Upload failed', 'error');
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

      <div className="admin-toolbar">
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.2rem' }}>Portfolio &amp; Project Showcase</h2>
          <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Showcase completed client engagements, software architectures, and valuations.</p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={openCreateModal}>
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b00' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
            <span style={{ color: '#a1a1aa' }}>Loading Projects...</span>
          </div>
        ) : projects.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Project Name</th>
                  <th>Category</th>
                  <th>Client</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj._id}>
                    <td style={{ fontFamily: 'monospace', color: '#ff6b00', fontWeight: 700 }}>
                      #{proj.order}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {proj.image ? (
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0d0d12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                            <Briefcase size={20} />
                          </div>
                        )}
                        <div>
                          <strong>{proj.title}</strong>
                          {proj.subtitle && <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{proj.subtitle}</div>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-pill status-in-progress" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.1)' }}>
                        {proj.category}
                      </span>
                    </td>
                    <td style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>
                      {proj.clientName || 'Confidential'}
                    </td>
                    <td>
                      {proj.isFeatured ? (
                        <span className="status-pill status-completed">
                          <Star size={12} /> FEATURED
                        </span>
                      ) : (
                        <span style={{ color: '#71717a', fontSize: '0.8rem' }}>Standard</span>
                      )}
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => openEditModal(proj)}
                          title="Edit Project"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(proj._id, proj.title)}
                          title="Delete Project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#71717a' }}>
            <p>No projects created yet. Click "Add New Project" to create your first portfolio item.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Manufacturing ERP Platform"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ERP & CRM, Mobile App, Web App"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Central India Steel Manufacturers"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Project Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Integrated Inventory, Production & Financials"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-group">
                <label>Description &amp; Highlights *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the architectural challenge, deliverables, and business impact..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-group">
                <label>Tags / Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, PostgreSQL, Docker, Redis"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Screenshot / Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="Image URL or upload file below"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="admin-form-control"
                  />
                  <div style={{ marginTop: '0.5rem' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="proj-img-file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="proj-img-file" className="btn-admin-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'inline-flex', cursor: 'pointer' }}>
                      <Upload size={14} /> Upload Screenshot
                    </label>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Project Live URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="proj-feat"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#ff6b00', cursor: 'pointer' }}
                  />
                  <label htmlFor="proj-feat" style={{ cursor: 'pointer', margin: 0, color: '#ffffff' }}>
                    Mark as Featured Spotlight Project
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-admin-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-admin-primary">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

