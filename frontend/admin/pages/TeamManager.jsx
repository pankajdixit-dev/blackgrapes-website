import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Save,
  X,
  ExternalLink
} from 'lucide-react';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@backend/dataService';

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    photo_url: '',
    badge_tag: 'Executive',
    is_leadership: true,
    status: 'published'
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const list = await getTeamMembers();
    setMembers(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingMember(null);
    setForm({
      name: '',
      role: '',
      bio: '',
      photo_url: '',
      badge_tag: 'Executive',
      is_leadership: true,
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setForm({
      name: m.name || '',
      role: m.role || '',
      bio: m.bio || '',
      photo_url: m.photo_url || '',
      badge_tag: m.badge_tag || 'Executive',
      is_leadership: m.is_leadership !== undefined ? m.is_leadership : true,
      status: m.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveTeamMember({
      ...(editingMember || {}),
      ...form
    });
    setModalOpen(false);
    showToast(editingMember ? 'Team member updated.' : 'New team member added.');
    await loadMembers();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete profile for ${name}?`)) {
      await deleteTeamMember(id);
      showToast('Profile removed.');
      await loadMembers();
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
          <h1 className="admin-page-title">Leadership & Team Management</h1>
          <p className="admin-page-sub">
            Manage the executive leadership team profiles, biographies, and photos shown on the website.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Role / Designation</th>
                <th>Bio Summary</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {m.photo_url ? (
                        <img
                          src={m.photo_url}
                          alt={m.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#374151',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                          }}
                        >
                          {m.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <strong style={{ color: '#fff' }}>{m.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{m.badge_tag}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: '#e5e7eb' }}>{m.role}</span>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {m.bio}
                    </p>
                  </td>
                  <td>
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {m.is_leadership ? 'Executive Leadership' : 'Engineering Team'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-status ${m.status || 'published'}`}>
                      {m.status || 'published'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex', marginRight: '0.5rem' }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
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
                  {editingMember ? 'Edit Profile' : 'Add Team Member'}
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
                    <label className="admin-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Role / Title *</label>
                    <input
                      type="text"
                      required
                      className="admin-input"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Photo URL / Asset Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.photo_url}
                    onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Biographical Summary</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Badge Tag (e.g. Founder)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={form.badge_tag}
                      onChange={(e) => setForm({ ...form, badge_tag: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Publish Status</label>
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
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

