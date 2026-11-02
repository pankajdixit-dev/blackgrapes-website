import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { 
  Inbox, 
  Layers, 
  Briefcase, 
  MessageSquareQuote, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Loader2
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent-activity'),
        ]);

        if (statsRes.data?.success) {
          setStats(statsRes.data.data);
        }
        if (activityRes.data?.success) {
          setRecentActivities(activityRes.data.data || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#ff6b00', gap: '0.75rem' }}>
        <Loader2 size={32} className="animate-spin" />
        <span style={{ color: '#a1a1aa' }}>Loading Dashboard Metrics...</span>
      </div>
    );
  }

  const enquiries = stats?.enquiries || { total: 0, new: 0, inProgress: 0, completed: 0 };

  return (
    <div>
      {/* 4 Stat Metric Cards */}
      <div className="admin-stats-grid">
        {/* Card 1: Enquiries */}
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-label">Total Inquiries &amp; Leads</div>
            <div className="admin-stat-number">{enquiries.total}</div>
            <div className="admin-stat-subtext">
              <span style={{ color: '#ff6b00', fontWeight: 700 }}>{enquiries.new} New Leads</span> requiring action
            </div>
          </div>
          <div className="admin-stat-icon-wrap">
            <Inbox size={24} />
          </div>
        </div>

        {/* Card 2: Services */}
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-label">Published Services</div>
            <div className="admin-stat-number">{stats?.services || 0}</div>
            <div className="admin-stat-subtext">
              <CheckCircle2 size={13} /> Active in Services Directory
            </div>
          </div>
          <div className="admin-stat-icon-wrap" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <Layers size={24} />
          </div>
        </div>

        {/* Card 3: Projects */}
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-label">Portfolio Projects</div>
            <div className="admin-stat-number">{stats?.projects || 0}</div>
            <div className="admin-stat-subtext">
              <CheckCircle2 size={13} /> Featured Case Studies
            </div>
          </div>
          <div className="admin-stat-icon-wrap" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.12)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <Briefcase size={24} />
          </div>
        </div>

        {/* Card 4: Testimonials */}
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-label">Client Reviews</div>
            <div className="admin-stat-number">{stats?.testimonials || 0}</div>
            <div className="admin-stat-subtext">
              <CheckCircle2 size={13} /> Published Endorsements
            </div>
          </div>
          <div className="admin-stat-icon-wrap" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <MessageSquareQuote size={24} />
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts Banner */}
      <div className="admin-card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.08) 0%, rgba(13, 13, 18, 1) 100%)', borderColor: 'rgba(255, 107, 0, 0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.25rem' }}>Management Shortcuts</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Directly jump to administrative tasks without navigating sub-menus.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/enquiries" className="btn-admin-primary">
              <Inbox size={15} />
              <span>Review Leads ({enquiries.new} New)</span>
            </Link>
            <Link to="/admin/services" className="btn-admin-secondary">
              <Plus size={15} />
              <span>Add Service</span>
            </Link>
            <Link to="/admin/projects" className="btn-admin-secondary">
              <Plus size={15} />
              <span>Add Project</span>
            </Link>
            <Link to="/admin/content" className="btn-admin-secondary">
              <span>Edit Homepage Hero</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Enquiries & Leads Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">Recent Client Enquiries</h2>
            <p className="admin-card-subtitle">Real-time submissions from contact forms, modal quotes, and staffing leads.</p>
          </div>
          <Link to="/admin/enquiries" className="btn-admin-secondary">
            <span>View All Leads</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {recentActivities.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Client Name</th>
                  <th>Service Requested</th>
                  <th>Contact Info</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((lead) => (
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
                      <span style={{ fontSize: '0.85rem', color: '#e4e4e7' }}>{lead.service}</span>
                    </td>
                    <td>
                      <div>{lead.email}</div>
                      <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>{lead.phone}</div>
                    </td>
                    <td>
                      <span className={`status-pill ${
                        lead.status === 'New' ? 'status-new' :
                        lead.status === 'In Progress' ? 'status-in-progress' :
                        'status-completed'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() => setSelectedLead(lead)}
                        title="View Full Message"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#71717a' }}>
            <Inbox size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <p>No enquiries received yet. All new leads will automatically appear here.</p>
          </div>
        )}
      </div>

      {/* Details View Modal */}
      {selectedLead && (
        <div className="admin-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setSelectedLead(null)}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span className="status-pill status-new">{selectedLead.ticketId}</span>
              <span className={`status-pill ${
                selectedLead.status === 'New' ? 'status-new' :
                selectedLead.status === 'In Progress' ? 'status-in-progress' : 'status-completed'
              }`}>
                {selectedLead.status}
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              {selectedLead.name}
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Company: {selectedLead.company || 'Not Specified'} • Source: {selectedLead.source}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: '#000000', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Email</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  <a href={`mailto:${selectedLead.email}`} style={{ color: '#ff6b00', textDecoration: 'none' }}>{selectedLead.email}</a>
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Phone</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                  <a href={`tel:${selectedLead.phone}`} style={{ color: '#ff6b00', textDecoration: 'none' }}>{selectedLead.phone}</a>
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Service Requested</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>{selectedLead.service}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Urgency</span>
                <p style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '0.2rem' }}>{selectedLead.urgency || 'Normal'}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Client Requirements / Message:
              </span>
              <div style={{ background: '#000000', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1rem', color: '#e4e4e7', whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {selectedLead.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                onClick={() => setSelectedLead(null)}
              >
                Close
              </button>
              <Link
                to="/admin/enquiries"
                className="btn-admin-primary"
                onClick={() => setSelectedLead(null)}
              >
                Manage in Enquiries Desk
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

