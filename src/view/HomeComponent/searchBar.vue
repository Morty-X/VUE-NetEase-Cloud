<template>
  <div class="w-full fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-between items-center h-[8vh] bg-[#0d0d12]">
    <Icon
      icon="quill:hamburger"
      width="24"
      height="24"
      style="color: #d3d3d3"
    />

    <div
      class="flex-shrink-0 justify-between inline-flex items-center h-[5vh] flex-1 mx-[3vh] px-[1vh] rounded-[2vh] bg-[#1b1b20] text-[#696969] text-[14px]"
    >
      <Icon
        icon="bitcoin-icons:search-outline"
        width="24"
        height="24"
        style="color: #d3d3d3"
      />
      <span class="flex-1 text-left"> <slot></slot></span>
      <Icon
        icon="lucide:scan-line"
        width="22"
        height="22"
        style="color: #d3d3d3"
      />
    </div>
    <Icon
      icon="mynaui:microphone"
      width="24"
      height="24"
      class="text-[#d3d3d3]"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
