<template>
  <div ref="wrapper" class="w-full h-[25vh] overflow-hidden mt-[1vh] mb-[2vh]">
    <div class="h-full inline-flex">
      <!-- 这里是内容插槽卡片内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, shallowRef, onBeforeUnmount } from 'vue';
import BScroll from '@better-scroll/core';

let bs = null;
const wrapper = shallowRef(null);

onMounted(() => {
  console.log('🚀 ~ BScroll.vue:22 ~ wrapper:', wrapper.value);
  bs = new BScroll(wrapper.value, { click: true, scrollX: true });
});

onUpdated(() => {
  bs.refresh();
});
onBeforeUnmount(() => {
  bs?.destroy();
});
</script>
