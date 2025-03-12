import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
/* -------------------------------- 全局axios配置 ------------------------------- */
axios.defaults.baseURL = 'https://neteasecloudmusicapi.vercel.app';
/* -------------------------------------------------------------------------- */

export async function useSendRequest(option) {
  try {
    const res = await axios({
      method: option.method,
      url: option.url,
      params: option.params,
    });
    return res;
  } catch (error) {
    throw new Error('请求失败！');
  }
}

export function getUnikey() {
  const unikey = ref(null);
  onMounted(() => {
    const queryUnikey = useSendRequest({
      method: 'post',
      url: `/login/qr/key/veet&timestamp=${Date.now()}`,
    });
    queryUnikey
      .then((res) => {
        unikey.value = res.data.data.unikey;
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        console.log('获取Unikey的请求已经发送');
      });
  });
  return unikey;
}


export async function getImgBase64(unikey) {
  const URLRes = await useSendRequest({
    method: 'post',
    url: `/login/qr/create/veet?key=${unikey}&qrimg=${Date.now()}&timestamp=${Date.now()}`,
  });
  console.log('🚀 ~ requestMethod.js:44 ~ getImgBase64 ~ URLRes:', URLRes);
  const QRImg = URLRes.data.data.qrimg;

  return QRImg;
}

export async function rotaSendReq(unikey) {
  const result = await useSendRequest({
    method: 'post',
    url: `/login/qr/check?key=${unikey}&noCookie=true&timestamp=${Date.now()}`,
  });
  return result;
}
