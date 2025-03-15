<template>
  <div class="w-full">
    <h1 class="text-[20px] text-[#fff] font-bold h-[7vh] leading-[7vh]">
      {{ name }}
    </h1>
    <!-- 这里是 BetterScroll 的插槽 -->
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
