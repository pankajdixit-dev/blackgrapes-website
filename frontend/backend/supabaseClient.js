/**
 * MongoDB Bridge Client (Preserving previous Supabase module signature for zero-breakage compatibility)
 */
export {
  checkMongoHealth,
  checkSupabaseHealth,
  isConfigured,
  supabase
} from './mongoClient.js';

import mongoClient from './mongoClient.js';
export default mongoClient;
