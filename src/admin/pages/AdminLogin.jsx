import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import '../styles/Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      const origin = location.state?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    } else {
      setErrorMsg(result.message || 'Invalid administrator credentials');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255, 107, 0, 0.15) 0%, transparent 60%)',
      padding: '1.5rem',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#09090d',
        border: '1px solid rgba(255, 107, 0, 0.35)',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 107, 0, 0.15)',
        position: 'relative'
      }}>
        {/* Brand Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2), rgba(255, 107, 0, 0.05))',
            border: '1px solid rgba(255, 107, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 107, 0, 0.25)'
          }}>
            <ShieldCheck size={32} color="#ff6b00" />
          </div>

          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.35rem'
          }}>
            Black Grapes <span style={{ color: '#ff6b00' }}>Admin</span>
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '0.88rem' }}>
            Enterprise Website &amp; Lead Management Portal
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.85rem 1rem',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '0.86rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="adm-email">Official Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input
                id="adm-email"
                type="email"
                required
                placeholder="admin@blackgrapessoftech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-form-control"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={16} color="#71717a" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '1.75rem' }}>
            <label htmlFor="adm-pass">Security Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="adm-pass"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-control"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Lock size={16} color="#71717a" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-admin-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <a
            href="/"
            style={{ color: '#a1a1aa', fontSize: '0.82rem', textDecoration: 'none' }}
          >
            &larr; Return to Black Grapes Public Website
          </a>
        </div>
      </div>
    </div>
  );
}

