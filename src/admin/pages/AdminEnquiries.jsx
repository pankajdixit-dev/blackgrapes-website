import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { 
  Search, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Save, 
  Loader2, 
  Inbox, 
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search) params.search = search;

      const res = await api.get('/contact', { params });
      if (res.data?.success) {
        setEnquiries(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
      showToast('Error loading enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/contact/${id}`, { status: newStatus });
      if (res.data?.success) {
        setEnquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead(prev => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setUpdating(true);
    try {
      const res = await api.put(`/contact/${selectedLead._id}`, { adminNotes });
      if (res.data?.success) {
        setEnquiries(prev => prev.map(item => item._id === selectedLead._id ? { ...item, adminNotes } : item));
        setSelectedLead(prev => ({ ...prev, adminNotes }));
        showToast('Admin notes saved successfully');
      }
    } catch {
      showToast('Failed to save notes', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/contact/${id}`);
      if (res.data?.success) {
        setEnquiries(prev => prev.filter(item => item._id !== id));
        if (selectedLead?._id === id) setSelectedLead(null);
        showToast('Enquiry deleted successfully');
      }
    } catch {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const openDetails = (lead) => {
    setSelectedLead(lead);
    setAdminNotes(lead.adminNotes || '');
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="admin-toolbar">
        <form onSubmit={handleSearchSubmit} className="admin-search-box">
          <input
            type="text"
            placeholder="Search by client, email, phone, ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
          <Search size={16} className="admin-search-icon" />
        </form>

        <div className="admin-filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Statuses</option>
            <option value="New">Status: New</option>
            <option value="In Progress">Status: In Progress</option>
            <option value="Completed">Status: Completed</option>
            <option value="Archived">Status: Archived</option>
          </select>

          <button
            type="button"
            className="btn-admin-secondary"
            onClick={fetchEnquiries}
          >
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Enquiries Table */}
      <div className="admin-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b00' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
            <span style={{ color: '#a1a1aa' }}>Fetching Enquiries...</span>
          </div>
        ) : enquiries.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Client</th>
                  <th>Service Requested</th>
                  <th>Contact Details</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((lead) => (
                  <tr key={lead._id || lead.ticketId}>
                    <td>
                      <span style={{ fontFamily: 'monospace', color: '#ff6b00', fontWeight: 700 }}>
                        {lead.ticketId}
                      </span>
                    </td>
                    <td>
                      <strong>{lead.name}</strong>
                      {lead.company && <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{lead.company}</div>}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{lead.service}</span>
                    </td>
                    <td>
                      <div><a href={`mailto:${lead.email}`} style={{ color: '#e4e4e7', textDecoration: 'none' }}>{lead.email}</a></div>
                      <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{lead.phone}</div>
                    </td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`status-pill ${
                          lead.status === 'New' ? 'status-new' :
                          lead.status === 'In Progress' ? 'status-in-progress' :
                          'status-completed'
                        }`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="New" style={{ background: '#000', color: '#f87171' }}>NEW</option>
                        <option value="In Progress" style={{ background: '#000', color: '#fbbf24' }}>IN PROGRESS</option>
                        <option value="Completed" style={{ background: '#000', color: '#34d399' }}>COMPLETED</option>
                        <option value="Archived" style={{ background: '#000', color: '#a1a1aa' }}>ARCHIVED</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => openDetails(lead)}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(lead._id, lead.name)}
                          title="Delete Lead"
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
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#71717a' }}>
            <Inbox size={44} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.35rem' }}>No enquiries found</h3>
            <p style={{ fontSize: '0.9rem' }}>Try clearing filters or search query.</p>
          </div>
        )}
      </div>

      {/* Details & Notes Drawer Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setSelectedLead(null)}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="status-pill status-new">{selectedLead.ticketId}</span>
              <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
                Received on: {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : 'N/A'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '0.35rem' }}>
              {selectedLead.name}
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Company: {selectedLead.company || 'Not Specified'} • Source: {selectedLead.source}
            </p>

            {/* Quick Contact & Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#000000', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>Email</span>
                <p style={{ marginTop: '0.2rem' }}>
                  <a href={`mailto:${selectedLead.email}`} style={{ color: '#ff6b00', textDecoration: 'none', fontSize: '0.9rem' }}>{selectedLead.email}</a>
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>Phone</span>
                <p style={{ marginTop: '0.2rem' }}>
                  <a href={`tel:${selectedLead.phone}`} style={{ color: '#ff6b00', textDecoration: 'none', fontSize: '0.9rem' }}>{selectedLead.phone}</a>
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>Service Requested</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>{selectedLead.service}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>Urgency / Timeline</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>{selectedLead.urgency || 'Normal'}</p>
              </div>
            </div>

            {/* Client Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Client Requirements / Message:
              </span>
              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem', color: '#e4e4e7', whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: '#ff6b00', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Internal Executive Notes (Not visible to client):
              </label>
              <textarea
                rows={3}
                placeholder="Log internal follow-up notes, phone call summaries, or quoted amounts here..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="admin-form-control"
              />
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                onClick={() => handleDelete(selectedLead._id, selectedLead.name)}
                style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                <Trash2 size={15} />
                <span>Delete Lead</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => setSelectedLead(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-admin-primary"
                  onClick={handleSaveNotes}
                  disabled={updating}
                >
                  {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

