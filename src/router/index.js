import {
  createWebHistory,
  createRouter,
  createWebHashHistory,
} from 'vue-router';

import { STATIC_ROUTER } from './router.js';
// 创建路由实例
export const router = createRouter({
  history: createWebHistory(),
  // url和组件的对应关系
  // 静态路由
  routes: STATIC_ROUTER,
});
