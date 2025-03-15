<template>
  <div class=" ">
    <!-- 搜索栏 -->
    <searchBar class="px-[2vh]">
      {{ defaultSearchRes }}
    </searchBar>

    <!-- 内容垂直滚动区域 -->
    <div ref="verBscroll" class="h-[92vh] mt-[8vh]">
      <div class="bg-[#0d0d12] px-[2vh]">
        <!-- 轮播图模块 -->
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
          <van-swipe-item
            v-for="item in blocks?.HOMEPAGE_BANNER?.extInfo?.banners"
            :key="item.encodeId"
          >
            <img class="w-full h-full rounded-[3vh]" :src="item.pic" alt="" />
          </van-swipe-item>
        </van-swipe>
        <!-- ======================================================== -->
        <!-- 推荐歌单模块 -->
        <Block name="推荐歌单">
          <HScrollbar>
            <Poster
              v-for="item in blocks?.HOMEPAGE_BLOCK_MGC_PLAYLIST.creatives"
              :key="item.creativeId"
              :posterData="item"
            ></Poster>
          </HScrollbar>
        </Block>

        <!--雷达歌单模块  -->
        <Block name="雷达歌单">
          <HScrollbar>
            <Poster
              v-for="item in blocks?.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives"
              :key="item.creativeId"
              :posterData="item"
            ></Poster>
          </HScrollbar>
        </Block>

        <Block name="民谣歌单">
          <HScrollbar>
            <Poster
              v-for="item in blocks?.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST.creatives"
              :key="item.creativeId"
              :posterData="item"
            ></Poster>
          </HScrollbar>
        </Block>

        <!-- 热门节目模块 -->

        <Block name="为你推荐的热门节目">
          <HScrollbar class="listCard">
            <div
              class="mr-[8.2vh] text-[#fff]"
              v-for="item in blocks?.HOMEPAGE_VOICELIST_RCMD?.creatives"
              :key="item.position++"
            >
              <posterHorizonCard
                v-for="res in item.resources"
                :cardData="res"
                :key="res.resourceId"
              />
            </div>

            <!-- <div class="mr-[8vh]">
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
            </div>

            <div class="mr-[8vh]">
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
            </div>
            <div class="mr-[8vh]">
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
              <posterHorizonCard></posterHorizonCard>
            </div> -->
          </HScrollbar>
        </Block>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUpdated, shallowRef } from 'vue';
import { useRequest } from 'vue-request';
import BScroll from '@better-scroll/core';

import searchBar from './HomeComponent/searchBar.vue';
import { getSearchDefault, getHomeData } from '../api/home';
import Block from './HomeComponent/Block.vue';
import HScrollbar from './HomeComponent/HScrollbar.vue';
import Poster from './HomeComponent/Poster.vue';
import posterHorizonCard from './HomeComponent/posterHorizonCard.vue';
/* -------------------------------- 搜索栏组件 -------------------------------- */
const { data: defaultSearch } = useRequest(getSearchDefault);
const defaultSearchRes = ref(null);
watch(defaultSearch, () => {
  defaultSearchRes.value = defaultSearch.value?.data?.data?.realkeyword;
});

/* -------------------------------------------------------------------------- */
const { data: homePageData } = useRequest(getHomeData);
// watch(homePageData, () => {
//   console.log('🚀 ~ Home.vue:31 ~ watch ~ homePageData:', homePageData.value);
// });
// Vue 的计算属性会自动追踪响应式依赖
const blocks = computed(() => {
  return homePageData?.value?.data?.data?.blocks.reduce((prev, current) => {
    prev[current.blockCode] = current;
    return prev;
  }, {});
});
watch(blocks, () => {
  console.log('🚀 ~ Home.vue:52 ~ watch ~ blocks:', blocks.value);
  console.log(blocks.value?.HOMEPAGE_VOICELIST_RCMD?.creatives);
});

/* --------------------------------- 内容的垂直滚动 -------------------------------- */
let bsVer = null;
const verBscroll = shallowRef(null);

onMounted(() => {
  bsVer = new BScroll(verBscroll.value, { scrollY: true });
});

onUpdated(() => {
  bsVer?.refresh();
});
</script>

<style lang="scss" scoped>
:deep(.van-swipe__indicator) {
  background-color: #f1f1f1;
  width: 1.2vh;
  height: 1.2vh;
}
:deep(.listCard) {
  height: 48vh;
}
.my-swipe {
  height: 26vh;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>
