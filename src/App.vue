<template>
  <div>
    <div class="bg-[#FDFBFC] h-[100vh] pb-[12vw]">
      <!-- 头部 -->
      <div
        class="flex h-[19vw] items-center justify-between px-[5.5vw] border-b"
      >
        <Icon icon="formkit:left" width="24" height="24" />
        <span class="text-[4.5vw] text-[#696969]">游客登录</span>
      </div>
      <!-- 网易云音乐logo -->
      <img
        src="./assets/static/logo.fill.svg"
        alt=""
        class="w-[38vw] mx-auto mt-[7vw] mb-[9vw]"
      />
      <div class="relative">
        <img
          :src="qrlImg"
          alt=""
          class="w-[40vw] h-[40vw] m-auto relative z-[1]"
        />

        <div
          v-show="maskIsHidden"
          class="z-[999] absolute h-[40vw] w-[40vw] top-0 left-1/2 transform -translate-x-1/2"
        >
          <div
            class="absolute bg-[#DDDDDD] w-[40vw] h-[40vw] opacity-60 z-[2]"
          ></div>
          <div
            @click="unikey = getUnikey()"
            class="shadow-lg absolute z-[3] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF5A35] to-[#F81227] text-[#fff] rounded-[200px] text-center leading-[7.6vw] h-[7.6vw] w-[20vw] text-[3vw]"
          >
            点击刷新
          </div>
        </div>
        <div class="text-[4vw] text-[#100A09] text-center mt-[10vw]">
          使用<span class="text-[#2C6AA1] mx-[1.5vw]">网易云音乐APP</span
          >扫码登录
        </div>
      </div>

      <div class="fixed bottom-0">
        <img src="./assets/static/bg-login.png" alt="" class="w-[100vw]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  useTemplateRef,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';

import { Icon } from '@iconify/vue';

import { apiGetKey, apiGetQR, apiCheckLoginState } from './api/login';

let key = '';
const qrlImg = ref('/src/assets/vue.svg');
const maskIsHidden = ref(false);

apiGetKey()
  .then((res) => {
    if (res.data.code === 200) {
      key = res.data.data.unikey;
      return apiGetQR(key);
    }
  })
  .then((res) => {
    if (res.data.code === 200) {
      qrlImg.value = res.data.data.qrimg;
      // 轮训请求
      // polling(apiCheckLoginState(key),)
    }
  });

// import {
//   getUnikey,
//   useSendRequest,
//   getImgBase64,
//   rotaSendReq,
// } from './lib/requestMethod.js';

/* -------------------------------------------------------------------------- */
// 第一个参数必须与模板中的 ref 值匹配
// const logoImg = shallowRef(null);

// let unikey = getUnikey();

// console.log('🚀 ~ App.vue:75 ~ unikey:', unikey);

// 监听 unikey 的值的改变，当获取到unikey的值后进行下一步的操作
// watch(unikey, () => {
//   console.log('🚀 ~ App.vue:68 ~ watch ~ unikey:', unikey.value);
//   const imgRes = getImgBase64(unikey.value);

//   imgRes.then((res) => {
//     console.log(res);
//     logoImg.value.src = res;
//   });

//   /* -------------------------------------------------------------------------- */
//   // 轮训获取状态码

//   setInterval(() => {
//     const result = rotaSendReq(unikey.value);
//     result.then((res) => {
//       console.log(res.data);

//       const { code, message } = res.data;
//       console.log(code, message);
//       if (code === 800) {
//         maskIsHidden.value = true;
//       }
//     });
//   }, 1000);
// });

// 发起一个post请求
// axios({
//   method: 'post',
//   url: '/login/qr/key',
// })
//   .then((res) => {
//     const unikey = res.data.data.unikey;
//     console.log('🚀 ~ App.vue:66 ~ .then ~ unikey:', unikey);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
</script>
