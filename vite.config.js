import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5763,
    open: './index.html',
    
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
