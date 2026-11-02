import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Star,
  Save,
  X
} from 'lucide-react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../services/dataService';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    author: '',
    role: '',
    company: '',
    country: '',
    quote: '',
    rating: 5,
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
      author: '',
      role: '',
      company: '',
      country: '',
      quote: '',
      rating: 5,
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setForm({
      author: t.author || '',
      role: t.role || '',
      company: t.company || '',
      country: t.country || '',
      quote: t.quote || '',
      rating: t.rating || 5,
      status: t.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveTestimonial({
      ...(editingItem || {}),
      ...form
    });
    setModalOpen(false);
    showToast(editingItem ? 'Testimonial updated.' : 'New testimonial added.');
    await loadTestimonials();
  };

  const handleDelete = async (id, author) => {
    if (window.confirm(`Delete review from ${author}?`)) {
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
            Manage verified client testimonials, ratings, and quotes showcased across /our-clients.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client / Reviewer</th>
                <th>Company & Region</th>
                <th>Quote Preview</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong style={{ color: '#fff' }}>{t.author}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{t.role}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>{t.company}</span>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.country}</div>
                  </td>
                  <td style={{ maxWidth: '350px' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#d1d5db', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      "{t.quote}"
                    </p>
                  </td>
                  <td>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" />
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge-status ${t.status || 'published'}`}>
                      {t.status || 'published'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex', marginRight: '0.5rem' }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.author)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex', color: '#f87171' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>
                  {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
                    <label className="admin-label">Author Name *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Designation / Role</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Company / Enterprise</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Country / Region</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Client Quote / Testimonial *</label>
                  <textarea
                    rows={4}
                    required
                    className="admin-textarea"
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Rating (Stars: 1 to 5)</label>
                    <select
                      className="admin-select"
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Status</label>
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
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
