/**
 * MongoDB Atlas Connection Client & Health Monitor for Black Grapes Softech
 */

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const isConfigured = Boolean(
  typeof window !== 'undefined'
);

/**
 * Health check to verify real MongoDB connection
 */
export async function checkMongoHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const mg = data.mongodb || {};

    if (mg.connected) {
      return {
        connected: true,
        mode: 'mongodb_cluster',
        host: mg.host,
        dbName: mg.dbName,
        message: `Successfully connected to MongoDB Cluster (Database: ${mg.dbName || 'blackgrapes'})`,
      };
    } else {
      return {
        connected: false,
        mode: 'connecting',
        error: mg.error,
        message: mg.error || 'Server is running, but MongoDB Cluster is connecting or URI needs to be set in .env',
      };
    }
  } catch (err) {
    return {
      connected: false,
      mode: 'offline',
      message: 'Backend server is currently offline. Running in local persistence fallback mode. Start backend with: npm run server',
    };
  }
}

// Backwards-compatible alias for existing admin UI
export const checkSupabaseHealth = checkMongoHealth;
export const supabase = null;

export default {
  checkMongoHealth,
  checkSupabaseHealth,
  isConfigured
};

