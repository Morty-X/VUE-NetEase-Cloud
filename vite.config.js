import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5763,
    open: './index.html',
    // proxy: {
    //   // 当检测到我的路径是以 veet 开头，这个路径就会别代理
    //   '/veet': {
    //     target: 'https://neteasecloudmusicapi.vercel.app',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/veet/, ''),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
