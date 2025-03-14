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
// 添加全局的路由守卫(拦截器)

router.beforeEach((to, from, next) => {
  console.log('🚀 ~ index.js:18 ~ router.beforeEach ~ from:', from);
  // 必须先登录才能访问其他页面
  // 不加参数表示放行，加参数表示重定向
  // const isLogin = Boolean(window.localStorage.getItem('isLogin'));
  if (to.fullPath === '/login') {
    next();
  } else {
    next('/login');
  }
});
