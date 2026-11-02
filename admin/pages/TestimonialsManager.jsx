import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Star,
  Save,
  X,
  ExternalLink
} from 'lucide-react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@backend/dataService';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    country: '',
    quote: '',
    rating: 5,
    avatar: 'BG',
    status: 'published'
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const list = await getTestimonials();
    setTestimonials(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({
      name: '',
      role: '',
      company: '',
      country: '',
      quote: '',
      rating: 5,
      avatar: 'BG',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    const displayName = t.name || t.author || '';
    setForm({
      name: displayName,
      role: t.role || t.designation || '',
      company: t.company || '',
      country: t.country || '',
      quote: t.quote || '',
      rating: t.rating || 5,
      avatar: t.avatar || displayName.slice(0, 2).toUpperCase() || 'BG',
      status: t.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const displayName = form.name.trim();
    const payload = {
      ...(editingItem || {}),
      name: displayName,
      author: displayName,
      role: form.role,
      designation: form.role,
      company: form.company,
      country: form.country,
      quote: form.quote,
      rating: Number(form.rating) || 5,
      avatar: form.avatar || displayName.slice(0, 2).toUpperCase() || 'BG',
      status: form.status,
      is_featured: true
    };

    await saveTestimonial(payload);
    setSaving(false);
    setModalOpen(false);
    showToast(editingItem ? 'Testimonial updated & published live!' : 'New testimonial added & published live!');
    await loadTestimonials();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete review from "${name}"?`)) {
      await deleteTestimonial(id);
      showToast('Testimonial removed.');
      await loadTestimonials();
    }
  };

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
          <h1 className="admin-page-title">Client Reviews & Testimonials</h1>
          <p className="admin-page-sub">
            Manage authentic client reviews and ratings showcased across the homepage and /our-clients page.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/#testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live</span>
          </a>
          <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reviewer / Author</th>
                <th>Designation / Role</th>
                <th>Quote Preview</th>
                <th>Rating</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255, 107, 0, 0.2)',
                          color: '#ff6b00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                      >
                        {t.avatar || (t.name || t.author || 'BG').slice(0, 2).toUpperCase()}
                      </div>
                      <strong style={{ color: '#fff' }}>{t.name || t.author}</strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{t.role || t.designation || 'Client'}</span>
                  </td>
                  <td style={{ maxWidth: '350px' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      "{t.quote}"
                    </p>
                  </td>
                  <td>
                    <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" />
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(t)}
                        className="admin-action-btn"
                        title="Edit testimonial"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id, t.name || t.author)}
                        className="admin-action-btn danger"
                        title="Delete testimonial"
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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
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
                  <label className="admin-label">Author / Client Name *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Role / Designation</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Enterprise Client / Founder"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Rating (1 to 5 Stars)</label>
                    <select
                      className="admin-select"
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    >
                      <option value={5}>5 Stars (★★★★★)</option>
                      <option value={4}>4 Stars (★★★★)</option>
                      <option value={3}>3 Stars (★★★)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Review / Testimonial Quote *</label>
                  <textarea
                    rows={4}
                    required
                    className="admin-textarea"
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
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
                  <span>{saving ? 'Saving...' : 'Save & Publish Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
