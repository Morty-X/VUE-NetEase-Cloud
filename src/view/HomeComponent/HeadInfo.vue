<template>
  <div class="w-full h-[8vh] flex justify-between  items-center">
    <div class="h-full inline-flex items-center text-[#f1f1f1]">
      <img
        class="w-[5vh] h-[5vh] rounded-[3vh] mr-[1vh]"
        src="../../assets/static/头像.jpg"
        alt=""
      />
      <div>
        <span>雨浥轻尘</span>
        <Icon
          icon="mingcute:right-line"
          width="24"
          height="24"
          style="color: #f1f1f1"
          class="inline-block"
        />
      </div>
    </div>
    <Icon
      icon="lucide:scan-line"
      width="22"
      height="22"
      style="color: #f3f3f3"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
