import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Package,
  Users,
  Layers,
  MessageSquareQuote,
  TrendingUp,
  Activity,
  ArrowRight,
  Clock,
  Sparkles,
  Database,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Globe,
  FileText
} from 'lucide-react';
import {
  getEnquiries,
  getProjects,
  getClients,
  getTeamMembers,
  getServices,
  getTestimonials,
  getAllPagesSummary,
  getActivityLogs,
  updateEnquiryStatus
} from '@backend/dataService';
import { checkSupabaseHealth } from '@backend/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enquiries: 0,
    newEnquiries: 0,
    projects: 0,
    clients: 0,
    team: 0,
    services: 0,
    testimonials: 0,
    cmsPages: 10
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [pagesSummary, setPagesSummary] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [enqs, prods, clis, team, srvs, tests, pages, logs, health] = await Promise.all([
        getEnquiries(),
        getProjects(),
        getClients(),
        getTeamMembers(),
        getServices(),
        getTestimonials(),
        getAllPagesSummary(),
        getActivityLogs(),
        checkSupabaseHealth()
      ]);

      setStats({
        enquiries: (enqs || []).length,
        newEnquiries: (enqs || []).filter((e) => e.status === 'new').length,
        projects: (prods || []).length,
        clients: (clis || []).length,
        team: (team || []).length,
        services: (srvs || []).length,
        testimonials: (tests || []).length,
        cmsPages: (pages || []).length || 10
      });

      setRecentEnquiries((enqs || []).slice(0, 5));
      setPagesSummary((pages || []).slice(0, 6));
      setRecentLogs((logs || []).slice(0, 6));
      setDbStatus(health);
      setLoading(false);
    }

    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateEnquiryStatus(id, newStatus);
    const updated = await getEnquiries();
    setRecentEnquiries((updated || []).slice(0, 5));
    setStats((prev) => ({
      ...prev,
      newEnquiries: (updated || []).filter((e) => e.status === 'new').length
    }));
  };

  return (
    <div>
      {/* Page Title */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Executive Control Dashboard</h1>
          <p className="admin-page-sub">
            Real-time multi-page CMS metrics, lead pipeline, and system health overview.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/admin/pages" className="admin-btn admin-btn-primary">
            <Globe size={16} />
            <span>Universal Page CMS</span>
          </Link>
          <Link to="/admin/enquiries" className="admin-btn admin-btn-secondary">
            <Inbox size={16} />
            <span>All Enquiries</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            <ExternalLink size={16} />
            <span>Public Site</span>
          </a>
        </div>
      </div>

      {/* Database Status Alert Banner */}
      {dbStatus && (
        <div
          style={{
            background: dbStatus.connected
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(245, 158, 11, 0.1)',
            border: `1px solid ${
              dbStatus.connected
                ? 'rgba(16, 185, 129, 0.3)'
                : 'rgba(245, 158, 11, 0.3)'
            }`,
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Database
              size={20}
              color={dbStatus.connected ? '#10b981' : '#f59e0b'}
            />
            <div>
              <strong style={{ color: '#fff', fontSize: '0.9rem' }}>
                {dbStatus.connected
                  ? 'MongoDB Atlas Cluster: Connected & Synchronized'
                  : 'Storage Engine: Local Fallback Active'}
              </strong>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.2rem' }}>
                {dbStatus.message}
              </div>
            </div>
          </div>
          <Link
            to="/admin/settings"
            className="admin-btn admin-btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
          >
            View System Settings
          </Link>
        </div>
      )}

      {/* KPI Stats Cards - 6 Cards Grid */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        {/* 1. Enquiries */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap orange">
            <Inbox size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.enquiries}</div>
            <div className="stat-data-lbl">
              Total Enquiries {stats.newEnquiries > 0 && <span style={{ color: '#f87171' }}>({stats.newEnquiries} New)</span>}
            </div>
          </div>
        </div>

        {/* 2. Projects */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap purple">
            <Package size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.projects}</div>
            <div className="stat-data-lbl">Proprietary Products</div>
          </div>
        </div>

        {/* 3. Services */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap green">
            <Layers size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.services}</div>
            <div className="stat-data-lbl">Engineered Services</div>
          </div>
        </div>

        {/* 4. Testimonials */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap cyan">
            <MessageSquareQuote size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.testimonials}</div>
            <div className="stat-data-lbl">Client Reviews & Ratings</div>
          </div>
        </div>

        {/* 5. CMS Pages */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap orange">
            <Globe size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.cmsPages}</div>
            <div className="stat-data-lbl">CMS Managed Pages</div>
          </div>
        </div>

        {/* 6. Clients */}
        <div className="admin-stat-card">
          <div className="stat-icon-wrap purple">
            <Users size={22} />
          </div>
          <div>
            <div className="stat-data-val">{stats.clients}</div>
            <div className="stat-data-lbl">Global Client Brands</div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Leads & Recent Website Content Updates */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Column 1: Recent Enquiries */}
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
              Recent Client Enquiries
            </h3>
            <Link
              to="/admin/enquiries"
              style={{
                color: 'var(--admin-orange)',
                fontSize: '0.8rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              View All ({stats.enquiries}) →
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Requirement</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#9ca3af' }}>
                      No enquiries received yet.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>
                        <strong style={{ color: '#fff' }}>{enq.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{enq.email}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem' }}>{enq.requirement || 'General'}</span>
                      </td>
                      <td>
                        <span className={`badge-status ${enq.status}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td>
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className="admin-select"
                          style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto' }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: Recent Website Content Updates (CMS Pages & Sections) */}
        <div className="admin-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
              Recent Website Content Updates
            </h3>
            <Link
              to="/admin/pages"
              style={{
                color: 'var(--admin-purple)',
                fontSize: '0.8rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Manage All Pages →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pagesSummary.map((page) => (
              <div
                key={page.slug}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={15} color="var(--admin-orange)" />
                    <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{page.title}</strong>
                    <code style={{ fontSize: '0.7rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                      {page.route}
                    </code>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.2rem' }}>
                    {page.sectionCount} CMS Sections • {page.enabledCount} Active
                  </div>
                </div>

                <Link
                  to={`/admin/pages/${page.slug}`}
                  className="admin-btn admin-btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                >
                  Edit Page
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
