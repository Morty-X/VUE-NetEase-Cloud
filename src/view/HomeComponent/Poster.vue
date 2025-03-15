<template>
  <div class="w-[16vh] shrink-0 h-full mr-[2vh]">
    <div class="relative w-[16vh] h-[16vh] rounded-[2vh] overflow-hidden">
      <img
        class="w-full h-full"
        :src="props.posterData.uiElement?.image?.imageUrl"
        alt=""
      />
      <Icon
        class="absolute right-[1vh] bottom-[0.5vh]"
        icon="line-md:play-filled"
        width="32"
        height="32"
        style="color: #fff"
      />
    </div>  
    <p class="text-[14px] text-[#f1f1f1] h-[6vh]  text-ellipsis overflow-hidden   line-clamp-2 mt-[1vh] ">
      {{ props.posterData.uiElement?.mainTitle?.title }}
    </p>
  </div>
</template>

<script setup>
import { defineProps, watchEffect, watch } from 'vue';
import { Icon } from '@iconify/vue';
// 下一步，获取传递过来的属性值
// { item: posterData }
const props = defineProps({
  posterData: {
    type: Object,
    required: true,
  },
});

</script>
