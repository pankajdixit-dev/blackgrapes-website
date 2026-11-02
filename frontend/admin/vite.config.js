import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Standalone Vite Configuration for Black Grapes Admin Panel
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true
  },
  resolve: {
    alias: {
      '@admin': fileURLToPath(new URL('./', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('../src/assets', import.meta.url))
    }
  }
});

