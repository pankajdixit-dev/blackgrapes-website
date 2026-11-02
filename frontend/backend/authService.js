/**
 * Admin Authentication Service for Black Grapes Softech
 * Connected to MongoDB Backend REST API with localStorage session management
 */

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';
const SESSION_KEY = 'bg_admin_session';
const TOKEN_KEY = 'bg_admin_token';

export function getStoredToken() {
  if (typeof window === 'undefined') return null;
  const directToken = localStorage.getItem(TOKEN_KEY);
  if (directToken) return directToken;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return parsed.token;
    }
  } catch (err) {}
  return 'local_admin_token_active';
}

export function getCurrentSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export async function loginAdmin(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  // Try real MongoDB Backend REST API
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password }),
    });

    const data = await res.json();

    if (res.ok && data.success && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      const session = {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
        token: data.token,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    } else if (res.status === 401 || res.status === 403 || res.status === 400) {
      // Backend responded with invalid credentials
      return { success: false, error: data.message || 'Invalid email or password.' };
    }
  } catch (netErr) {
    console.warn('[AuthService] Backend API not reachable. Checking local credentials...', netErr.message);
  }

  // Fallback to local admin credentials if backend server is not running yet
  const defaultEmail = 'admin@blackgrapessoftech.com';
  const defaultPass = 'Admin@12345';

  if (cleanEmail === defaultEmail && password === defaultPass) {
    const fallbackSession = {
      user: {
        id: 'local_admin_1',
        email: defaultEmail,
        name: 'Black Grapes Superadmin',
        role: 'superadmin',
      },
      token: 'local_token_mock',
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(TOKEN_KEY, 'local_token_mock');
    localStorage.setItem(SESSION_KEY, JSON.stringify(fallbackSession));
    return { success: true, session: fallbackSession };
  }

  return {
    success: false,
    error: 'Invalid email or password. (Default credentials: admin@blackgrapessoftech.com / Admin@12345)',
  };
}

export async function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
  return { success: true };
}

export default {
  loginAdmin,
  logoutAdmin,
  getCurrentSession,
  getStoredToken
};
