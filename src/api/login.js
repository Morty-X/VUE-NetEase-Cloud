import { request } from '../utils/index.js';

/**
 * @description:获取 登录的 unikey
 * @param {*}
 * @return {*}
 */
export const apiGetKey = () =>
  request.get('/login/qr/key', {
    params: {
      noCookie: true,
    },
  });
/* -------------------------------------------------------------------------- */
/**
 * @description: 获取二维码图片的base64地址
 * @param {*} key
 * @return {*}
 */
export const apiGetQR = (key) =>
  request.get('/login/qr/create', {
    params: {
      key,
      qrimg: Date.now(),
      noCookie: true,
    },
  });
/* -------------------------------------------------------------------------- */
/**
 * @description: 检查登录状态
 * @param {*} key
 * @return {*}
 */
export const apiCheckLoginState = (key) =>
  request.get('/login/qr/check', {
    params: {
      key,
      noCookie: true,
    },
  });
