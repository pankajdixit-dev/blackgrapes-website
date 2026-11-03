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
  X,
  Globe,
  Layers
} from 'lucide-react';
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getProjects,
  saveProject,
  deleteProject
} from '@backend/dataService';

export default function ProjectsManager() {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'projects'
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
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
    highlights_raw: ''
  });

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web Apps',
    type: 'Full-Stack Solution',
    summary: '',
    link: '#'
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const [prods, projs] = await Promise.all([getProducts(), getProjects()]);
    setProducts(prods || []);
    setProjects(projs || []);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // PRODUCT HANDLERS
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
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
      key_features_raw: 'Student Attendance & Biometrics\nOnline Fee Invoicing\nDedicated Mobile Apps',
      tech_stack_raw: 'React\nNode.js\nPostgreSQL\nFlutter',
      highlights_raw: 'Multi-Branch Support\n100% White Label'
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
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
      highlights_raw: (prod.highlights || []).join('\n')
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(editingProduct || {}),
      title: productForm.title,
      subtitle: productForm.subtitle,
      category: productForm.category,
      industry: productForm.industry,
      badge: productForm.badge,
      badge_color: productForm.badge_color,
      badgeColor: productForm.badge_color,
      youtube_id: productForm.youtube_id,
      youtubeId: productForm.youtube_id,
      deployment_days: productForm.deployment_days,
      deploymentDays: productForm.deployment_days,
      rating: productForm.rating,
      summary: productForm.summary,
      key_features: productForm.key_features_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      keyFeatures: productForm.key_features_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      tech_stack: productForm.tech_stack_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      techStack: productForm.tech_stack_raw.split('\n').map((s) => s.trim()).filter(Boolean),
      highlights: productForm.highlights_raw.split('\n').map((s) => s.trim()).filter(Boolean)
    };
    await saveProduct(payload);
    await loadAll();
    setSaving(false);
    setProductModalOpen(false);
    showToast(editingProduct ? 'Product updated and published live!' : 'New product created in catalog!');
  };

  const handleDeleteProduct = async (id, title) => {
    if (window.confirm(`Delete product "${title}" from the catalog?`)) {
      await deleteProduct(id);
      await loadAll();
      showToast('Product removed.');
    }
  };

  // PROJECT HANDLERS
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Web Apps',
      type: 'Full-Stack Solution',
      summary: '',
      link: '#'
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || proj.name || '',
      category: proj.category || 'Web Apps',
      type: proj.type || 'Full-Stack Solution',
      summary: proj.summary || proj.description || '',
      link: proj.link || proj.url || '#'
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(editingProject || {}),
      title: projectForm.title,
      name: projectForm.title,
      category: projectForm.category,
      type: projectForm.type,
      summary: projectForm.summary,
      description: projectForm.summary,
      link: projectForm.link,
      url: projectForm.link,
      is_featured: true
    };
    await saveProject(payload);
    await loadAll();
    setSaving(false);
    setProjectModalOpen(false);
    showToast(editingProject ? 'Portfolio delivery updated!' : 'New portfolio delivery added!');
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Delete project "${title}" from home portfolio?`)) {
      await deleteProject(id);
      await loadAll();
      showToast('Portfolio project deleted.');
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return !q || p.title?.toLowerCase().includes(q) || p.industry?.toLowerCase().includes(q);
  });

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return !q || (p.title || p.name)?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

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
          <h1 className="admin-page-title">Products & Projects Manager</h1>
          <p className="admin-page-sub">
            Manage 12+ proprietary turnkey software products with video demos and 12+ live client deliveries on the homepage.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={activeTab === 'products' ? '/products' : '/#projects'}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live</span>
          </a>
          <button
            onClick={activeTab === 'products' ? handleOpenCreateProduct : handleOpenCreateProject}
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} />
            <span>{activeTab === 'products' ? 'Add New Product' : 'Add New Portfolio Project'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={16} />
          <span>Proprietary Turnkey Products ({products.length})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Globe size={16} />
          <span>Home Portfolio Showcase ({projects.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="admin-card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div className="admin-search-box">
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder={activeTab === 'products' ? 'Search turnkey software products...' : 'Search portfolio deliveries...'}
            className="admin-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* TAB 1: TURNKEY PRODUCTS */}
      {activeTab === 'products' && (
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Title</th>
                  <th>Category</th>
                  <th>YouTube Demo</th>
                  <th>Rating</th>
                  <th>Deployment</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div>
                        <strong style={{ color: '#fff', display: 'block' }}>{prod.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{prod.subtitle}</span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-orange">{prod.category}</span>
                    </td>
                    <td>
                      {prod.youtube_id || prod.youtubeId ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${prod.youtube_id || prod.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}
                        >
                          <Play size={14} fill="currentColor" />
                          <span>Watch Video</span>
                        </a>
                      ) : (
                        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>No Video</span>
                      )}
                    </td>
                    <td style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{prod.rating}</td>
                    <td style={{ fontSize: '0.85rem' }}>{prod.deployment_days || prod.deploymentDays}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditProduct(prod)}
                          className="admin-action-btn"
                          title="Edit product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id, prod.title)}
                          className="admin-action-btn danger"
                          title="Delete product"
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
      )}

      {/* TAB 2: PORTFOLIO SHOWCASE */}
      {activeTab === 'projects' && (
        <div className="admin-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project / Brand Name</th>
                  <th>Category</th>
                  <th>Solution Type</th>
                  <th>Website / Link</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((proj) => (
                  <tr key={proj.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{proj.title || proj.name}</strong>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-orange">{proj.category}</span>
                    </td>
                    <td>{proj.type || '—'}</td>
                    <td>
                      <a
                        href={proj.link || proj.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}
                      >
                        <span>{proj.link || proj.url || 'Visit'}</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditProject(proj)}
                          className="admin-action-btn"
                          title="Edit project"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.id, proj.title || proj.name)}
                          className="admin-action-btn danger"
                          title="Delete project"
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
      )}

      {/* PRODUCT MODAL */}
      {productModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingProduct ? 'Edit Turnkey Product' : 'Add New Turnkey Product'}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Product Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Subtitle / Value Tagline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={productForm.subtitle}
                    onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Industry</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={productForm.industry}
                      onChange={(e) => setProductForm({ ...productForm, industry: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">YouTube Video ID (GPuZ0QpRypw)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. GPuZ0QpRypw"
                      value={productForm.youtube_id}
                      onChange={(e) => setProductForm({ ...productForm, youtube_id: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Deployment Turnaround</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={productForm.deployment_days}
                      onChange={(e) => setProductForm({ ...productForm, deployment_days: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Summary</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={productForm.summary}
                    onChange={(e) => setProductForm({ ...productForm, summary: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Key Features (One per line)</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={productForm.key_features_raw}
                    onChange={(e) => setProductForm({ ...productForm, key_features_raw: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Tech Stack (One per line)</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={productForm.tech_stack_raw}
                    onChange={(e) => setProductForm({ ...productForm, tech_stack_raw: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {projectModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>
                {editingProject ? 'Edit Portfolio Delivery' : 'Add New Portfolio Delivery'}
              </h3>
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Project / Brand Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-select"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    >
                      <option value="Website">Website</option>
                      <option value="Android / IOS - Mobile Apps">Android / IOS - Mobile Apps</option>
                      <option value="Web Apps">Web Apps</option>
                      <option value="E-Commerce">E-Commerce</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Type / Subtitle</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={projectForm.type}
                      onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Live Link / Website URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Project Scope Summary</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={projectForm.summary}
                    onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish Delivery'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
