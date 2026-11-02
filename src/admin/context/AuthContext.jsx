import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('bg_admin_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('bg_admin_token'));
  const [loading, setLoading] = useState(true);

  // Verify stored token on initial load
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('bg_admin_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data?.success && res.data?.admin) {
          setAdmin(res.data.admin);
          localStorage.setItem('bg_admin_data', JSON.stringify(res.data.admin));
        }
      } catch {
        // Token invalid or expired
        localStorage.removeItem('bg_admin_token');
        localStorage.removeItem('bg_admin_data');
        setAdmin(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success && res.data?.token) {
        const jwtToken = res.data.token;
        const adminData = res.data.admin;

        localStorage.setItem('bg_admin_token', jwtToken);
        localStorage.setItem('bg_admin_data', JSON.stringify(adminData));
        setToken(jwtToken);
        setAdmin(adminData);
        return { success: true };
      }
      return { success: false, message: res.data?.message || 'Login failed.' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Authentication error. Please check your credentials.',
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('bg_admin_token');
    localStorage.removeItem('bg_admin_data');
    setToken(null);
    setAdmin(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.put('/auth/change-password', { currentPassword, newPassword });
      return { success: true, message: res.data?.message || 'Password updated.' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update password.',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        isAuthenticated: Boolean(token && admin),
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

