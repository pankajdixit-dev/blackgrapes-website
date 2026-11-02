import React, { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Save,
  X
} from 'lucide-react';
import { getMenus, saveMenus } from '@backend/dataService';

export default function MenuManager() {
  const [menus, setMenus] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newPath, setNewPath] = useState('');

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    const list = await getMenus();
    setMenus(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleMove = async (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= menus.length) return;

    const copy = [...menus];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);

    const reindexed = copy.map((item, idx) => ({ ...item, order_index: idx + 1 }));
    setMenus(reindexed);
    await saveMenus(reindexed);
    showToast('Menu order updated on website.');
  };

  const handleToggleActive = async (id) => {
    const updated = menus.map((m) => (m.id === id ? { ...m, is_active: !m.is_active } : m));
    setMenus(updated);
    await saveMenus(updated);
    showToast('Menu visibility updated.');
  };

  const handleDelete = async (id, label) => {
    if (window.confirm(`Delete menu item "${label}"?`)) {
      const updated = menus.filter((m) => m.id !== id);
      setMenus(updated);
      await saveMenus(updated);
      showToast('Menu item removed.');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newLabel || !newPath) return;

    const newItem = {
      id: `m-${Date.now()}`,
      label: newLabel.trim(),
      path: newPath.trim(),
      order_index: menus.length + 1,
      is_active: true
    };

    const updated = [...menus, newItem];
    setMenus(updated);
    await saveMenus(updated);
    setNewLabel('');
    setNewPath('');
    setModalOpen(false);
    showToast('New menu item added.');
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
          <h1 className="admin-page-title">Navigation Menus Management</h1>
          <p className="admin-page-sub">
            Customize header navigation links, routing targets, order sequences, and visibility.
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Order</th>
                <th>Link Label</th>
                <th>Target URL / Path</th>
                <th>Visible</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="btn-header-action"
                        style={{ padding: '0.2rem 0.4rem', opacity: idx === 0 ? 0.3 : 1 }}
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        disabled={idx === menus.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="btn-header-action"
                        style={{ padding: '0.2rem 0.4rem', opacity: idx === menus.length - 1 ? 0.3 : 1 }}
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: '#fff' }}>{item.label}</strong>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {item.path}
                    </code>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`badge-status ${item.is_active ? 'published' : 'draft'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                    >
                      {item.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(item.id, item.label)}
                      className="btn-header-action"
                      style={{ color: '#f87171' }}
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
            <form onSubmit={handleAdd}>
              <div className="admin-modal-header">
                <h3 style={{ margin: 0, color: '#fff' }}>Add Navigation Link</h3>
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
                  <label className="admin-label">Link Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Careers"
                    className="admin-input"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">URL Path *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /careers or https://..."
                    className="admin-input"
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
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
                  <span>Add Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

