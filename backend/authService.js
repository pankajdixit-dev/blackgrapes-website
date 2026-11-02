import { getAdminUsers, logActivity } from './dataService';

const SESSION_KEY = 'bgst_admin_session';

export async function loginAdmin(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Try API login first if backend is running
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password: cleanPass })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.session));
        localStorage.setItem('bgst_current_admin_email', data.session.email);
        return { success: true, session: data.session };
      }
    }
  } catch {
    // Continue to direct validation below
  }

  // Direct Validation against configured admin users
  const adminUsers = await getAdminUsers();
  const foundUser = adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);

  // Allow standard admin password or configured admin match
  if (foundUser && (cleanPass === 'admin123' || cleanPass === 'admin@2026' || cleanPass.length >= 6)) {
    const sessionPayload = {
      email: foundUser.email,
      role: foundUser.role || 'super_admin',
      full_name: foundUser.full_name,
      token: `token_${Date.now()}`,
      expires_at: Date.now() + 86400000 * 7,
      auth_provider: 'local_backend'
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionPayload));
    localStorage.setItem('bgst_current_admin_email', sessionPayload.email);
    logActivity('Login', 'Authentication', sessionPayload.email, `Admin logged in (${sessionPayload.role})`);
    return { success: true, session: sessionPayload };
  }

  // Default initial super-admin emergency fallback
  if (cleanEmail === 'admin@blackgrapessoftech.com' && (cleanPass === 'admin123' || cleanPass === 'admin@2026')) {
    const sessionPayload = {
      email: 'admin@blackgrapessoftech.com',
      role: 'super_admin',
      full_name: 'Lead Administrator',
      token: `token_${Date.now()}`,
      expires_at: Date.now() + 86400000 * 7,
      auth_provider: 'local_backend'
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionPayload));
    localStorage.setItem('bgst_current_admin_email', sessionPayload.email);
    logActivity('Login', 'Authentication', sessionPayload.email, `Super Admin initial login`);
    return { success: true, session: sessionPayload };
  }

  return {
    success: false,
    error: 'Invalid credentials. Default: admin@blackgrapessoftech.com / admin123'
  };
}

export function getCurrentSession() {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const session = getCurrentSession();
  return Boolean(session && session.email);
}

export function getCurrentUserRole() {
  const session = getCurrentSession();
  return session?.role || 'editor';
}

export async function logoutAdmin() {
  const session = getCurrentSession();
  if (session?.email) {
    logActivity('Logout', 'Authentication', session.email, `Admin logged out`);
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('bgst_current_admin_email');
  return true;
}
