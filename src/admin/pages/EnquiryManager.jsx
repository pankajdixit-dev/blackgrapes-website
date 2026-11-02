import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  CheckCircle,
  Download,
  Trash2,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  User,
  X,
  Save
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../services/dataService';

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    const list = await getEnquiries();
    setEnquiries(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setAdminNotes(enq.admin_notes || '');
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await updateEnquiryStatus(id, newStatus, adminNotes);
    showToast(`Status updated to "${newStatus}".`);
    await loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, adminNotes);
    showToast('Admin notes saved.');
    await loadEnquiries();
    setSelectedEnquiry((prev) => ({ ...prev, admin_notes: adminNotes }));
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete lead record from ${name}?`)) {
      await deleteEnquiry(id);
      showToast('Enquiry removed.');
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      await loadEnquiries();
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Requirement', 'Status', 'Message', 'Notes'];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.created_at).toLocaleString(),
      `"${(e.name || '').replace(/"/g, '""')}"`,
      e.email,
      e.phone || '',
      `"${(e.requirement || '').replace(/"/g, '""')}"`,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.admin_notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `blackgrapes-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (e.name || '').toLowerCase().includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (e.phone || '').toLowerCase().includes(q) ||
      (e.requirement || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

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
          <h1 className="admin-page-title">Client Leads & Demo Requests</h1>
          <p className="admin-page-sub">
            Track inquiries received through the website Demo Modal, estimator, and contact channels.
          </p>
        </div>
        <button onClick={handleExportCSV} className="admin-btn admin-btn-secondary">
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="admin-card"
        style={{
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent' }}
            placeholder="Search leads by client name, email, phone, or requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#9ca3af" />
          <select
            className="admin-select"
            style={{ width: 'auto' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Enquiries ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === 'new').length})</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Contact</th>
                <th>Requirement</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af' }}>
                    No leads match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => handleOpenDetail(enq)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={12} />
                        {new Date(enq.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#fff' }}>{enq.name}</strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>{enq.email}</div>
                      {enq.phone && (
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{enq.phone}</div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--admin-orange)', fontWeight: 600 }}>
                        {enq.requirement || 'General'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${enq.status}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(enq.id, enq.name)}
                        className="btn-header-action"
                        style={{ display: 'inline-flex', color: '#f87171' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Slideout / Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, color: '#fff' }}>Enquiry Details</h3>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>ID: {selectedEnquiry.id}</span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.3rem 0.6rem' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>Client Name</span>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem', marginTop: '0.2rem' }}>
                    {selectedEnquiry.name}
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase' }}>Requirement</span>
                  <div style={{ fontWeight: 700, color: 'var(--admin-orange)', fontSize: '1rem', marginTop: '0.2rem' }}>
                    {selectedEnquiry.requirement || 'Custom Tech'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span className="admin-label">Email Address</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Mail size={14} />
                    <span>{selectedEnquiry.email}</span>
                  </a>
                </div>

                <div>
                  <span className="admin-label">Direct Phone</span>
                  {selectedEnquiry.phone ? (
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      style={{ color: '#34d399', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Phone size={14} />
                      <span>{selectedEnquiry.phone}</span>
                    </a>
                  ) : (
                    <span style={{ color: '#6b7280' }}>Not provided</span>
                  )}
                </div>
              </div>

              <div className="admin-form-group">
                <span className="admin-label">Client Message / Project Scope</span>
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '1rem',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {selectedEnquiry.message || 'No additional message was attached.'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Update Status</label>
                  <select
                    className="admin-select"
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusUpdate(selectedEnquiry.id, e.target.value)}
                  >
                    <option value="new">New (Unread)</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="converted">Converted (Client Onboarded)</option>
                    <option value="closed">Closed / Archived</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Received At</label>
                  <div style={{ padding: '0.65rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Internal Engineering & Sales Notes</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  placeholder="Record call logs, client budget, proposal status, or assigned lead manager..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="admin-btn admin-btn-secondary"
              >
                Close
              </button>
              <button onClick={handleSaveNotes} className="admin-btn admin-btn-primary">
                <Save size={15} />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
