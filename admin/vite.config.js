import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { createApiMiddleware } from '../backend/apiMiddleware.js';

function contentApiPlugin() {
  return {
    name: 'bgst-admin-content-api-plugin',
    configureServer(server) {
      server.middlewares.use(createApiMiddleware());
    }
  };
}

// Standalone Vite Configuration for Black Grapes Admin Panel
export default defineConfig({
  plugins: [react(), contentApiPlugin()],
  server: {
    port: 5174,
    open: false
  },
  resolve: {
    alias: {
      '@admin': fileURLToPath(new URL('./', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('../src/assets', import.meta.url))
    }
  }
});
