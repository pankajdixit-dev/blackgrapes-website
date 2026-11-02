import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { loginAdmin } from '@backend/authService';
import logoImg from '@assets/bgst-logo.png';
import '../admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const result = await loginAdmin(email, password);
      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login encounter an unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('admin@blackgrapessoftech.com');
    setPassword('admin123');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#090a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(18, 20, 30, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src={logoImg}
            alt="Black Grapes Softech"
            style={{ height: '48px', width: 'auto', marginBottom: '1rem', borderRadius: '8px' }}
          />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem 0' }}>
            Black Grapes <span style={{ color: 'var(--admin-orange)' }}>Control Center</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
            Sign in to manage dynamic content, enquiries & settings
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-label">
              <Mail size={14} style={{ display: 'inline', marginRight: '5px' }} /> Admin Email Address
            </label>
            <input
              type="email"
              required
              className="admin-input"
              placeholder="admin@blackgrapessoftech.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">
              <Lock size={14} style={{ display: 'inline', marginRight: '5px' }} /> Password
            </label>
            <input
              type="password"
              required
              className="admin-input"
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleQuickDemo}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--admin-purple)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Auto-fill Default Admin Credentials (admin@blackgrapessoftech.com)
          </button>
        </div>

        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>256-bit SSL Protected</span>
          </div>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

