import React, { useState, useEffect } from 'react';
import {
  Search,
  Save,
  CheckCircle,
  Globe,
  ExternalLink,
  Edit,
  X
} from 'lucide-react';
import { getSeoMetadata, saveSeoMetadata } from '@backend/dataService';

export default function SeoManager() {
  const [seoList, setSeoList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    page_route: '/',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: ''
  });

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    const list = await getSeoMetadata();
    setSeoList(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      page_route: item.page_route,
      meta_title: item.meta_title || '',
      meta_description: item.meta_description || '',
      meta_keywords: item.meta_keywords || '',
      canonical_url: item.canonical_url || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveSeoMetadata({
      ...(editingItem || {}),
      ...form
    });
    setModalOpen(false);
    showToast(`SEO tags updated for ${form.page_route}`);
    await loadSeo();
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
          <h1 className="admin-page-title">SEO & Metadata Management</h1>
          <p className="admin-page-sub">
            Configure search engine titles, descriptions, and OpenGraph parameters for every website route.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page Route</th>
                <th>Search Meta Title</th>
                <th>Meta Description Snippet</th>
                <th>Keywords</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {seoList.map((item) => (
                <tr key={item.page_route}>
                  <td>
                    <code style={{ background: 'rgba(255, 107, 0, 0.15)', color: 'var(--admin-orange)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      {item.page_route}
                    </code>
                  </td>
                  <td>
                    <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{item.meta_title}</strong>
                  </td>
                  <td style={{ maxWidth: '350px' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.meta_description}
                    </p>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {item.meta_keywords}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex' }}
                    >
                      <Edit size={14} />
                      <span>Edit SEO</span>
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
          <div className="admin-modal" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>
                  Edit SEO Metadata: {form.page_route}
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
                {/* Google Search Engine Preview Simulator */}
                <div
                  style={{
                    background: '#202124',
                    border: '1px solid #3c4043',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    fontFamily: 'arial, sans-serif'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#dadce0', marginBottom: '0.2rem' }}>
                    https://blackgrapessoftech.com{form.page_route}
                  </div>
                  <div style={{ fontSize: '1.1rem', color: '#8ab4f8', fontWeight: 500, marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {form.meta_title || 'Black Grapes Softech'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#bdc1c6', lineHeight: 1.4 }}>
                    {form.meta_description || 'Page meta description preview snippet on Google SERP...'}
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Meta Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={form.meta_title}
                    onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Meta Description (150-160 chars recommended)</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={form.meta_description}
                    onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Keywords (comma-separated)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.meta_keywords}
                    onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Canonical URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={form.canonical_url}
                    onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
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
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={15} />
                  <span>Update SEO</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

