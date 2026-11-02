import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  MessageSquareQuote
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    rating: 5,
    quote: '',
    avatar: '',
    isPublished: true,
    order: 0,
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials?all=true');
      if (res.data?.success) {
        setTestimonials(res.data.data || []);
      }
    } catch {
      showToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      rating: 5,
      quote: '',
      avatar: '',
      isPublished: true,
      order: testimonials.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      company: item.company || '',
      rating: item.rating || 5,
      quote: item.quote || '',
      avatar: item.avatar || '',
      isPublished: item.isPublished !== false,
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingItem) {
        const res = await api.put(`/testimonials/${editingItem._id}`, formData);
        if (res.data?.success) showToast('Testimonial updated successfully');
      } else {
        const res = await api.post('/testimonials', formData);
        if (res.data?.success) showToast('Testimonial added');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;

    try {
      const res = await api.delete(`/testimonials/${id}`);
      if (res.data?.success) {
        setTestimonials(prev => prev.filter(t => t._id !== id));
        showToast('Testimonial deleted');
      }
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      const nextState = !item.isPublished;
      const res = await api.put(`/testimonials/${item._id}`, { isPublished: nextState });
      if (res.data?.success) {
        setTestimonials(prev => prev.map(t => t._id === item._id ? { ...t, isPublished: nextState } : t));
        showToast(`Review ${nextState ? 'Published' : 'Hidden'}`);
      }
    } catch {
      showToast('Toggle failed', 'error');
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
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.2rem' }}>Client Testimonials Management</h2>
          <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Control reviews displayed across website and IT Staffing pages.</p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={openCreateModal}>
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b00' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
            <span style={{ color: '#a1a1aa' }}>Loading Reviews...</span>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Designation / Company</th>
                  <th>Rating</th>
                  <th>Quote Excerpt</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {t.avatar ? (
                          <img 
                            src={t.avatar} 
                            alt={t.name} 
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0d0d12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: 700 }}>
                            {t.name ? t.name.charAt(0) : 'C'}
                          </div>
                        )}
                        <strong>{t.name}</strong>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#ffffff', fontSize: '0.88rem' }}>{t.role}</div>
                      {t.company && <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{t.company}</div>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', color: '#fbbf24', gap: '0.2rem' }}>
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={14} fill="#fbbf24" />
                        ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <p style={{ fontSize: '0.82rem', color: '#a1a1aa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        "{t.quote}"
                      </p>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(t)}
                        className={`status-pill ${t.isPublished ? 'status-completed' : 'status-archived'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle publish"
                      >
                        {t.isPublished ? 'PUBLISHED' : 'HIDDEN'}
                      </button>
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => openEditModal(t)}
                          title="Edit Review"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(t._id, t.name)}
                          title="Delete Review"
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
            <p>No testimonials added yet.</p>
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
              {editingItem ? 'Edit Testimonial' : 'Add New Client Review'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subodh Bhandari"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Designation / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Businessman / Managing Director"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="admin-form-control"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Company / Firm Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise Partner"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-row-2">
                <div className="admin-form-group">
                  <label>Star Rating (1 - 5 Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Client Avatar Photo URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or /avatar.jpg"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="admin-form-control"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share client feedback, endorsement or success story..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="admin-form-control"
                />
              </div>

              <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                <input
                  type="checkbox"
                  id="testi-pub"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#ff6b00', cursor: 'pointer' }}
                />
                <label htmlFor="testi-pub" style={{ cursor: 'pointer', margin: 0, color: '#ffffff' }}>
                  Publish review on live website
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-admin-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-admin-primary">
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>{editingItem ? 'Save Changes' : 'Create Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

