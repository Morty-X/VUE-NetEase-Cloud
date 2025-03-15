<template>
  <div
    class="w-full h-[14vh] mb-[1vh] text-[#fff] text-[12px] inline-flex items-center"
  >
    <div class="w-[12vh] h-[12vh] rounded-[3vh] overflow-hidden mr-[2vh]">
      <img class="w-full h-full" :src="uiElement?.image?.imageUrl" alt="" />
    </div>
    <div class="w-[30vh] flex flex-col justify-between">
      <span class="text-[#858585]">{{ uiElement.subTitle.title }}</span>
      <div>{{ uiElement.mainTitle.title }}</div>
      <div class="text-[#999]">
        <span
          class="inline-block py-[0.5vh] text-[#556fa9] text-[10px] bg-[85, 111, 169]"
          >{{ uiElement.labelTexts[0] }}</span
        >
        {{ resourceExtInfo.djProgram.dj.signature }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, shallowRef } from 'vue';
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
const { uiElement, resourceExtInfo } = props.cardData;
</script>
