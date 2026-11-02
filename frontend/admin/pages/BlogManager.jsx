import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Save,
  X,
  Search,
  Calendar
} from 'lucide-react';
import { getBlogPosts, saveBlogPost, deleteBlogPost, getBlogCategories } from '@backend/dataService';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: 'cat-1',
    cover_image: '',
    author_name: 'Black Grapes Engineering Team',
    read_time: '5 min read',
    tags_raw: 'Cloud, Microservices, Architecture',
    status: 'published'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [pList, cList] = await Promise.all([getBlogPosts(), getBlogCategories()]);
    setPosts(pList);
    setCategories(cList);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category_id: categories[0]?.id || 'cat-1',
      cover_image: '',
      author_name: 'Black Grapes Engineering Team',
      read_time: '5 min read',
      tags_raw: 'Architecture, Cloud',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category_id: post.category_id || 'cat-1',
      cover_image: post.cover_image || '',
      author_name: post.author_name || 'Black Grapes Engineering Team',
      read_time: post.read_time || '5 min read',
      tags_raw: (post.tags || []).join(', '),
      status: post.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveBlogPost({
      ...(editingPost || {}),
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      category_id: form.category_id,
      cover_image: form.cover_image,
      author_name: form.author_name,
      read_time: form.read_time,
      tags: form.tags_raw.split(',').map((s) => s.trim()).filter(Boolean),
      status: form.status
    });
    setModalOpen(false);
    showToast(editingPost ? 'Article updated.' : 'New blog article created.');
    await loadData();
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      await deleteBlogPost(id);
      showToast('Article deleted.');
      await loadData();
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
          <h1 className="admin-page-title">Blog & Engineering Insights</h1>
          <p className="admin-page-sub">
            Publish technical articles, case study write-ups, and architectural whitepapers.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Read Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong style={{ color: '#fff' }}>{post.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>slug: {post.slug}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>{post.author_name}</span>
                  </td>
                  <td>
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {categories.find((c) => c.id === post.category_id)?.name || 'General'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem' }}>{post.read_time}</span>
                  </td>
                  <td>
                    <span className={`badge-status ${post.status || 'published'}`}>
                      {post.status || 'published'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex', marginRight: '0.5rem' }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
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
          <div className="admin-modal" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>
                  {editingPost ? 'Edit Article' : 'Write New Article'}
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
                  <label className="admin-label">Article Title *</label>
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
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-select"
                      value={form.category_id}
                      onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Author Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.author_name}
                      onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Excerpt / Short Teaser</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Full Article Markdown / HTML Content</label>
                  <textarea
                    rows={8}
                    className="admin-textarea"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Estimated Read Time</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.read_time}
                      onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.tags_raw}
                      onChange={(e) => setForm({ ...form, tags_raw: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Publishing Status</label>
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
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

