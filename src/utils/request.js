import axios from 'axios';
import store from 'storejs';
export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT),
});

// 请求拦截器 回调函数
// request.interceptors.request.use((config) => {
//   // if (!config.params) {
//   //   config.params = {}
//   // }
//   // config.params.cookie = { cookie: store.get('cookie') }
//   if (config.params?.noCookie === false) {
//     config.params = { ...(config.params ?? {}), cookie: store.get('cookie') };
//   }
//   return config;
// });

// // 响应拦截器 回调函数
// request.interceptors.response.use((response) => {
//   if ([200, 801, 802, 803].includes(response.data.code)) {
//     return response.data;
//   }
//   return Promise.reject(response);
// });
