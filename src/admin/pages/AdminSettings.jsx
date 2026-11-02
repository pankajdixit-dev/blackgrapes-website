import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Save, 
  Key, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminSettings() {
  const { admin, changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    setUpdating(true);
    const result = await changePassword(currentPassword, newPassword);
    setUpdating(false);

    if (result.success) {
      showToast('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(result.message || 'Failed to update password', 'error');
    }
  };

  return (
    <div>
      {toast && (
        <div className={`admin-toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#ef4444" />}
          <span>{toast.message}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left Col: Admin Profile & Security Checklist */}
        <div>
          <div className="admin-card">
            <h2 className="admin-card-title" style={{ marginBottom: '1.25rem' }}>Active Administrator Profile</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800
              }}>
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.2rem' }}>{admin?.name}</h3>
                <span className="status-pill status-completed">{admin?.role || 'Administrator'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Official Email</span>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', marginTop: '0.2rem' }}>{admin?.email}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Last Active Session</span>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Active Now'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>Authorization Level</span>
                <p style={{ color: '#10b981', fontSize: '0.95rem', marginTop: '0.2rem', fontWeight: 600 }}>
                  Full Access (Content, Enquiries, Services, Media)
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ background: '#000000', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span>Security Protocols Active</span>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#a1a1aa' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Bcrypt 10-round salted password hashing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> JSON Web Token (JWT) stateless auth with 7-day expiry
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Helmet security headers &amp; CORS allowlist protection
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Rate limiting enabled on `/api/*` (300 req / 15m)
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col: Change Password */}
        <div>
          <div className="admin-card">
            <h2 className="admin-card-title" style={{ marginBottom: '0.35rem' }}>Change Administrator Password</h2>
            <p className="admin-card-subtitle" style={{ marginBottom: '1.75rem' }}>
              Ensure your new password contains at least 6 characters with a combination of numbers and symbols.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <div className="admin-form-group">
                <label>Current Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="admin-form-control"
                  />
                  <Key size={16} color="#71717a" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="admin-form-group">
                <label>New Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="admin-form-control"
                  />
                  <Lock size={16} color="#71717a" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginBottom: '2rem' }}>
                <label>Confirm New Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="admin-form-control"
                  />
                  <Lock size={16} color="#71717a" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="btn-admin-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>Update Admin Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

