import HomeView from '../view/Home.vue';
import AboutView from '../view/About.vue';
import LoginView from '../view/Login.vue';
// 这里的 routes 选项定义了一组路由，把 URL 路径映射到组件。

export const STATIC_ROUTER = [
  { path: '/', redirect: '/home' },
  // { path: '/', redirect: '/login' },
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
];
