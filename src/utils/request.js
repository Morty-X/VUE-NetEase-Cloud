import axios from 'axios';

// https://netease-cloud-music-api-five-roan-88.vercel.app
// 使用自定义配置新建一个实例。
export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // 超时时间
  timeout: Number(import.meta.env.VITE_REQUEST_TTMEOUT),
});
