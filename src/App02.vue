<template>
  <div class="w-screen h-[200px] bg-red-300">App02.vue</div>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink class="inline-block px-[10px] py-[6px] border" to="/home"
      >Go to Home</RouterLink
    >

    <RouterLink class="inline-block px-[10px] py-[6px] border" to="/about"
      >Go to About</RouterLink
    >
    
    <RouterLink class="inline-block px-[10px] py-[6px] border" to="/login"
      >Go to Login</RouterLink
    >
  </nav>
  <nav>
    <van-button @click="toHome" type="primary">Go to Home</van-button>
    <van-button @click="toAbout" type="primary">Go to About</van-button>
    <van-button @click="toLogin" type="primary">Go to Login</van-button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 路由实例 对象
const router = useRouter();
console.log('🚀 ~ App02.vue:10 ~ router:', router);
// 当前路由 对象
const route = useRoute();
console.log('🚀 ~ App02.vue:13 ~ route:', route);

const toHome = () => {
  router.push('/home');
};
const toAbout = () => {
  router.push('/about');
};
const toLogin = () => {
  router.push('/login');
};

const search = computed({
  get() {
    return route.query.search ?? '';
  },
  set(search) {
    router.replace({ query: { search } });
  },
});
</script>

<style lang="scss" scoped>
// 组件穿透，根据自己的喜好修改引入组件的样式
:deep(.van-button--normal) {
  margin-right: 10px;
}
</style>
