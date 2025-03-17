// import { request } from '../utils/request';
import { request } from '@/utils/index';
// 二维码 key 生成接口
export const apiGetKey = () =>
  request.get('/login/qr/key', {
    params: {
      noCookie: true,
    },
  });
//  二维码生成接口
export const apiGetQR = (key) =>
  request.get('login/qr/create', {
    params: {
      key,
      qrimg: true,
      noCookie: true,
    },
  });
// 二维码检测扫码状态接口
export const apiCheckLoginStatus = (key) =>
  request.get(`/login/qr/check`, {
    params: {
      key,
      timestamp: Date.now(),
      noCookie: true,
    },
  });
