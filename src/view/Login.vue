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
        src="../assets/static/logo.fill.svg"
        class="w-[38vw] mx-auto mt-[7vw] mb-[9vw]"
      />
      <div class="relative">
        <!--  :src="qrlImg" -->
        <img
          alt=""
          :src="qrimg"
          class="w-[40vw] h-[40vw] m-auto relative z-[1]"
        />

        <!-- <div
          class="z-[999] absolute h-[40vw] w-[40vw] top-0 left-1/2 transform -translate-x-1/2"
        >
          <div
            class="absolute bg-[#DDDDDD] w-[40vw] h-[40vw] opacity-60 z-[2]"
          ></div>
          <div
            class="shadow-lg absolute z-[3] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF5A35] to-[#F81227] text-[#fff] rounded-[200px] text-center leading-[7.6vw] h-[7.6vw] w-[20vw] text-[3vw]"
          >
            点击刷新
          </div>
        </div> -->

        <div class="text-[4vw] text-[#100A09] text-center mt-[10vw]">
          使用<span class="text-[#2C6AA1] mx-[1.5vw]">网易云音乐APP</span
          >扫码登录
        </div>

        <!-- <div class="text-[4vw] text-[#100A09] text-center mt-[10vw]">
          <div class="h-[10vw]">扫描成功 待授权</div>
        
        </div> -->
      </div>

      <div class="fixed bottom-0">
        <img src="../assets//static/bg-login.png" alt="" class="w-[100vw]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import store from 'storejs';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { apiGetKey, apiGetQR, apiCheckLoginStatus } from '../api/login';
import { polling } from '../utils';
const qrimg = ref('/public/vite.svg');
const resCode = ref(null);
let key = '';
const router = useRouter();
const onPollingStop = (res) => {
  switch (res.code) {
    case 800:
      res.value = 800;
      console.log('二维码已失效');
      break;
    case 803:
      res.value = 803;
      console.log('登录成功');
      store.set('cookie', res.cookie);
      router.replace('/');
      break;

    default:
      break;
  }
};
function checkStatus() {
  apiGetKey()
    .then((res) => {
      key = res.data.unikey;
      return apiGetQR(key);
    })
    .then((res) => {
      qrimg.value = res.data.qrimg;
      polling(
        () => apiCheckLoginStatus(key),
        onPollingStop,
        (result) => {
          resCode.value = result.code;
          return result.code === 800 || result.code === 803;
        },
        3000
      );
    });
}
checkStatus();
</script>
