import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { createApiMiddleware } from './backend/apiMiddleware.js';

function contentApiPlugin() {
  return {
    name: 'bgst-content-api-plugin',
    configureServer(server) {
      server.middlewares.use(createApiMiddleware());
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contentApiPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@admin': fileURLToPath(new URL('./admin', import.meta.url)),
      '@backend': fileURLToPath(new URL('./backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
});
