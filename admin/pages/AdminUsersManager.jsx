import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Save,
  X,
  UserCheck,
  Mail,
  Lock
} from 'lucide-react';
import { getAdminUsers, saveAdminUser } from '@backend/dataService';

export default function AdminUsersManager() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    email: '',
    full_name: '',
    role: 'editor',
    is_active: true
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const list = await getAdminUsers();
    setUsers(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingUser(null);
    setForm({
      email: '',
      full_name: '',
      role: 'editor',
      is_active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setEditingUser(u);
    setForm({
      email: u.email || '',
      full_name: u.full_name || '',
      role: u.role || 'editor',
      is_active: u.is_active !== undefined ? u.is_active : true
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveAdminUser({
      ...(editingUser || {}),
      ...form
    });
    setModalOpen(false);
    showToast(editingUser ? 'Admin account updated.' : 'New admin user invited.');
    await loadUsers();
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
          <h1 className="admin-page-title">Admin Users & Access Control</h1>
          <p className="admin-page-sub">
            Manage administrative credentials, role authorizations, and audit access permissions.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Email Address</th>
                <th>Role & Permissions</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong style={{ color: '#fff' }}>{u.full_name}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{u.email}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background:
                          u.role === 'super_admin'
                            ? 'rgba(255, 107, 0, 0.2)'
                            : u.role === 'admin'
                            ? 'rgba(139, 92, 246, 0.2)'
                            : 'rgba(6, 182, 212, 0.2)',
                        color:
                          u.role === 'super_admin'
                            ? 'var(--admin-orange)'
                            : u.role === 'admin'
                            ? 'var(--admin-purple)'
                            : 'var(--admin-cyan)'
                      }}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-status ${u.is_active ? 'published' : 'draft'}`}>
                      {u.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleDateString() : 'Never'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenEdit(u)}
                      className="btn-header-action"
                      style={{ display: 'inline-flex' }}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
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
                  {editingUser ? 'Edit Admin User' : 'Add Admin User'}
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
                  <label className="admin-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="admin-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Role</label>
                    <select
                      className="admin-select"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <option value="super_admin">Super Admin (Full Access)</option>
                      <option value="admin">Admin (Content & Enquiries)</option>
                      <option value="editor">Editor (Draft & Content)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Account Status</label>
                    <select
                      className="admin-select"
                      value={form.is_active ? 'active' : 'disabled'}
                      onChange={(e) => setForm({ ...form, is_active: e.target.value === 'active' })}
                    >
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
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
                  <span>Save User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

