import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
  Filter,
  Clock,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { getActivityLogs } from '../../services/dataService';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  useEffect(() => {
    getActivityLogs().then((res) => setLogs(res));
  }, []);

  const filtered = logs.filter((log) => {
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      log.description.toLowerCase().includes(q) ||
      log.admin_email.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q);
    return matchesModule && matchesSearch;
  });

  const modulesList = Array.from(new Set(logs.map((l) => l.module)));

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Activity Audit Trail</h1>
          <p className="admin-page-sub">
            Real-time record of all administrative modifications, publishes, and operational events.
          </p>
        </div>
      </div>

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
            placeholder="Search audit trail by description or admin email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#9ca3af" />
          <select
            className="admin-select"
            style={{ width: 'auto' }}
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <option value="all">All Modules ({logs.length})</option>
            {modulesList.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Module</th>
                <th>Details & Changes</th>
                <th>Admin User</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id}>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background:
                          log.action.includes('Delete')
                            ? 'rgba(239, 68, 68, 0.2)'
                            : log.action.includes('Publish')
                            ? 'rgba(16, 185, 129, 0.2)'
                            : 'rgba(255, 107, 0, 0.2)',
                        color:
                          log.action.includes('Delete')
                            ? '#f87171'
                            : log.action.includes('Publish')
                            ? '#34d399'
                            : 'var(--admin-orange)'
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{log.module}</strong>
                  </td>
                  <td style={{ maxWidth: '420px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#d1d5db' }}>
                      {log.description}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {log.admin_email}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
