import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-public-key') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Health check to verify real Supabase connection
 */
export async function checkSupabaseHealth() {
  if (!isConfigured || !supabase) {
    return {
      connected: false,
      mode: 'local_storage',
      message: 'Supabase credentials not configured in .env. Running on local persistence store.',
    };
  }

  try {
    const { error } = await supabase.from('site_settings').select('id').limit(1);
    if (error) {
      return {
        connected: false,
        mode: 'error',
        message: `Connected to Supabase endpoint, but table query returned: ${error.message}. Please run supabase/schema.sql in your Supabase SQL Editor.`,
      };
    }
    return {
      connected: true,
      mode: 'supabase_postgres',
      message: 'Successfully connected to Supabase PostgreSQL database.',
    };
  } catch (err) {
    return {
      connected: false,
      mode: 'error',
      message: `Failed to connect to Supabase: ${err.message}`,
    };
  }
}

