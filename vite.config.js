import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@backend': fileURLToPath(new URL('./backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
});
