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
        <!-- :src="qrlImg" -->
        <img
          alt=""
          :src="qrlImg"
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
            @click="sacnQRCodeLogin"
            class="shadow-lg absolute z-[3] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF5A35] to-[#F81227] text-[#fff] rounded-[200px] text-center leading-[7.6vw] h-[7.6vw] w-[20vw] text-[3vw]"
          >
            点击刷新
          </div>
        </div>

        <div
          v-if="!authoriz"
          class="text-[4vw] text-[#100A09] text-center mt-[10vw]"
        >
          使用<span class="text-[#2C6AA1] mx-[1.5vw]">网易云音乐APP</span
          >扫码登录
        </div>

        <div v-else class="text-[4vw] text-[#100A09] text-center mt-[10vw]">
          <div class="h-[10vw]">扫描成功</div>
          <!-- 使用<span class="text-[#2C6AA1] mx-[1.5vw]">网易云音乐APP</span
          >扫码登录 -->
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
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

import { apiGetKey, apiGetQR, apiCheckLoginState } from './api/login';
import { polling } from './utils/polling';

/* -------------------------------------------------------------------------- */
// 路由实例对象
const router = useRouter();
// 当前路由对象
const route = useRoute();

let key = '';
const qrlImg = ref('/src/assets/vue.svg');
const maskIsHidden = ref(false);
// 是否授权
const authoriz = ref(false);

/* -------------------------------------------------------------------------- */
function onPollingStop(res) {
  if (res.data.code === 800) {
    alert('二维码已失效');
    // 遮罩层显示
    maskIsHidden.value = true;
  }
  if (res.data.code === 802) {
    // 确认登录中
    // qrlImg.value=''
  }
  if (res.data.code === 803) {
    alert('登录成功');
    // 跳转路由
    router.push('/home');
  }
  console.log(res);
}

/* -------------------------------------------------------------------------- */
function onCondition(result) {
  return result.data.code === 800 || result.data.code === 803;
}

/**
 * @description: 扫码登录逻辑
 * @param {*}
 * @return {*}
 */
function sacnQRCodeLogin() {
  apiGetKey()
    .then((res) => {
      if (res.data.code === 200) {
        key = res.data.data.unikey;
        return apiGetQR(key);
      }
    })
    .then((res) => {
      if (res.data.code === 200) {
        // 获取二维码图片的Base64地址后进行修改
        qrlImg.value = res.data.data.qrimg;
        // 轮训发送请求，当请求结果的状态码是 800 、 803 停止轮巡发送请求
        polling(
          () => apiCheckLoginState(key),
          onPollingStop(res),
          // onCondition(res) 这部分代码会被立即执行，并将返回值（布尔值）作为参数传递给 polling，而不是传递 onCondition 这个函数本身。
          // 需要将 onCondition 函数作为参数传递给 polling
          // 可以通过传递一个箭头函数来实现这一点
          (res) => onCondition(res),
          3000
        );
      }
    });
}

sacnQRCodeLogin();

/* -------------------------------------------------------------------------- */
/**
 * @description:
 * @param {*} server 轮巡的逻辑
 * @param {*} onstop 轮训停止后的回调函数
 * @param {*} condition 轮巡停止的条件
 * @param {*} duration  轮训停止的间隔
 * @return {*}
 */
// async function polling(server, onStop, condition, duration = 1000) {
//   // 该 sleep 函数的主要目的是在异步代码中实现延迟执行。
//   // 通过返回一个 Promise，调用者可以使用 await 关键字来
//   // 暂停当前的异步操作，直到延迟时间结束，在异步任务(setTimeout)执行成功的回调(resolve)
//   // Promise 被解决。
//   const sleep = (duration) => {
//     // 等待时间不存在失败
//     // 创建一个 Promise 设置一个延时器，在1s钟之后 执行resolve，当前Promise被满足
//     // 返回成功的Promise结果
//     return new Promise((resolve) => {
//       window.setTimeout(resolve, duration);
//     });
//   };

//   //返回请求结果
//   let result = await server();
//   // 判断轮训状态
//   // 如果状态码是 800(二维码已经过期) 或者 803(登录成功) 就停止轮巡
//   while (!condition(result)) {
//     // 等到上次轮巡的结果返回后再发送下一次请求
//     await sleep(duration);
//     result = await server();
//     console.log('🚀 ~ App.vue:135 ~ polling ~ result:', result);
//   }
//   // 请求失败，传入失败的结果给回调函数并执行
//   onStop(result);
// }

// import {
//   getUnikey,
//   useSendRequest,
//   getImgBase64,
//   rotaSendReq,
// } from './lib/requestMethod.js';

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
