import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// 引入路由实例
import { router } from './router/index';
const app = createApp(App);
app.use(router);
app.mount('#app');
