import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import path from 'path';
/* -------------------------------------------------------------------------- */
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    port: 5763,
    open: './index.html',
    // proxy: {
    //   '/api': {
    //     target: 'https://netease-cloud-music-api-five-roan-88.vercel.app',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
