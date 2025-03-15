import axios from 'axios';
import store from 'storejs';

// https://netease-cloud-music-api-five-roan-88.vercel.app
// 使用自定义配置新建一个axios实例。
export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // 超时时间
  timeout: Number(import.meta.env.VITE_REQUEST_TTMEOUT),
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 为所有请求添加cookie
  // if (!config.params) {
  //   config.params = {};
  // }
  // config.params.cookie = store.get('cookie');
  config.params = { ...(config.params ?? {}), cookie: store.get('cookie') };
  return config;
});
// 响应拦截器
request.interceptors.response.use((response) => {
  return response;
});
