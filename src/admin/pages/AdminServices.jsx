import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Layers
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'softech',
    categoryLabel: 'IT & Softech',
    description: '',
    keyDeliverables: '',
    techStack: '',
    image: '',
    url: '',
    accentColor: '#ff6b00',
    order: 0,
    isActive: true,
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services?all=true');
      if (res.data?.success) {
        setServices(res.data.data || []);
      }
    } catch {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      tagline: '',
      category: 'softech',
      categoryLabel: 'IT & Softech',
      description: '',
      keyDeliverables: '',
      techStack: '',
      image: '',
      url: '',
      accentColor: '#ff6b00',
      order: services.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      tagline: service.tagline || '',
      category: service.category || 'softech',
      categoryLabel: service.categoryLabel || '',
      description: service.description || '',
      keyDeliverables: Array.isArray(service.keyDeliverables) ? service.keyDeliverables.join(', ') : '',
      techStack: Array.isArray(service.techStack) ? service.techStack.join(', ') : '',
      image: service.image || '',
      url: service.url || '',
      accentColor: service.accentColor || '#ff6b00',
      order: service.order || 0,
      isActive: service.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      keyDeliverables: formData.keyDeliverables ? formData.keyDeliverables.split(',').map(s => s.trim()).filter(Boolean) : [],
      techStack: formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      if (editingService) {
        const res = await api.put(`/services/${editingService._id}`, payload);
        if (res.data?.success) {
          showToast('Service updated successfully');
        }
      } else {
        const res = await api.post('/services', payload);
        if (res.data?.success) {
          showToast('New service published successfully');
        }
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const nextState = !service.isActive;
      const res = await api.put(`/services/${service._id}`, { isActive: nextState });
      if (res.data?.success) {
        setServices(prev => prev.map(s => s._id === service._id ? { ...s, isActive: nextState } : s));
        showToast(`Service ${nextState ? 'Activated' : 'Deactivated'}`);
      }
    } catch {
      showToast('Failed to toggle status', 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete service "${title}" permanently?`)) return;

    try {
      const res = await api.delete(`/services/${id}`);
      if (res.data?.success) {
        setServices(prev => prev.filter(s => s._id !== id));
        showToast('Service deleted successfully');
      }
    } catch {
      showToast('Failed to delete service', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      showToast('Uploading image...', 'info');
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.success && res.data?.url) {
        setFormData(prev => ({ ...prev, image: res.data.url }));
        showToast('Image uploaded successfully');
      }
    } catch {
      showToast('Image upload failed', 'error');
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

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.2rem' }}>Services Directory</h2>
          <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Manage Group Conglomerate &amp; Softech IT catalog.</p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={openCreateModal}>
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List Table */}
      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b00' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
            <span style={{ color: '#a1a1aa' }}>Loading Services Catalog...</span>
          </div>
        ) : services.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Service Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Accent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td style={{ fontFamily: 'monospace', color: '#ff6b00', fontWeight: 700 }}>
                      #{service.order}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#0d0d12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b00' }}>
                            <Layers size={18} />
                          </div>
                        )}
                        <div>
                          <strong>{service.title}</strong>
                          {service.tagline && <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{service.tagline}</div>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-pill status-in-progress" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.1)' }}>
                        {service.category}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(service)}
                        className={`status-pill ${service.isActive ? 'status-completed' : 'status-archived'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle visibility"
                      >
                        {service.isActive ? 'ACTIVE' : 'HIDDEN'}
                      </button>
                    </td>
                    <td>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: service.accentColor || '#ff6b00', border: '1px solid rgba(255,255,255,0.2)' }} />
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => openEditModal(service)}
                          title="Edit Service"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(service._id, service.title)}
                          title="Delete Service"
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
            <p>No services registered in database.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem' }}>
              {editingService ? 'Edit Service' : 'Add New Service to Catalog'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Website Designing and Development"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="softech">IT &amp; Softech</option>
                    <option value="web">Web &amp; Cloud</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="software">Custom Software &amp; ERP</option>
                    <option value="valuers">Valuers &amp; Engineers</option>
                    <option value="associates">Associates &amp; Legal</option>
                    <option value="realestate">Real Estate &amp; Land</option>
                    <option value="investment">Investment &amp; Securities</option>
                    <option value="insurance">Insurance Surveyors</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Tagline / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Modern MERN Stack Portals"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Comprehensive description of the service and capabilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-group">
                <label>Key Deliverables (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Custom React Apps, Mobile-first responsive UI, REST APIs"
                  value={formData.keyDeliverables}
                  onChange={(e) => setFormData({ ...formData, keyDeliverables: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-group">
                <label>Tech Stack / Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, MongoDB, AWS"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Image URL / Upload</label>
                  <input
                    type="text"
                    placeholder="/softech-services/web.jpg or https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="admin-form-control"
                  />
                  <div style={{ marginTop: '0.5rem' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="srv-img-file"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="srv-img-file" className="btn-admin-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'inline-flex', cursor: 'pointer' }}>
                      <Upload size={14} /> Upload Image File
                    </label>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>External / Landing URL</label>
                  <input
                    type="text"
                    placeholder="https://blackgrapessoftech.com/..."
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Display Order (Priority)</label>
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
                    id="srv-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#ff6b00', cursor: 'pointer' }}
                  />
                  <label htmlFor="srv-active" style={{ cursor: 'pointer', margin: 0, color: '#ffffff' }}>
                    Publish and show on live website
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-admin-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-admin-primary">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{editingService ? 'Save Changes' : 'Create Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

