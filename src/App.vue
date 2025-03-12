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
          ref="logoImg"
          src="data:image/png;base64,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"
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
import { Icon } from '@iconify/vue';
import {
  ref,
  reactive,
  onMounted,
  useTemplateRef,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import {
  getUnikey,
  useSendRequest,
  getImgBase64,
  rotaSendReq,
} from './lib/requestMethod.js';

/* -------------------------------------------------------------------------- */
// 第一个参数必须与模板中的 ref 值匹配
const logoImg = shallowRef(null);
const maskIsHidden = ref(true);
let unikey = getUnikey();

console.log('🚀 ~ App.vue:75 ~ unikey:', unikey);

// 监听 unikey 的值的改变，当获取到unikey的值后进行下一步的操作
watch(unikey, () => {
  console.log('🚀 ~ App.vue:68 ~ watch ~ unikey:', unikey.value);
  const imgRes = getImgBase64(unikey.value);

  imgRes.then((res) => {
    console.log(res);
    logoImg.value.src = res;
  });

  /* -------------------------------------------------------------------------- */
  // 轮训获取状态码

  setInterval(() => {
    const result = rotaSendReq(unikey.value);
    result.then((res) => {
      console.log(res.data);

      const { code, message } = res.data;
      console.log(code, message);
      if (code === 800) {
        maskIsHidden.value = true;
      }
    });
  }, 1000);
});

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
