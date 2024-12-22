<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { TabsPaneContext } from 'element-plus';

const route = useRoute();
const router = useRouter();

const refresh = ref(false);

const activeName = ref('first');

interface Tab {
  name: string;
  label: string;
  to: string;
}

const tabs = ref<Tab[]>([
  {
    name: 'first',
    label: '课程专区',
    to: '/',
  },
  {
    name: 'second',
    label: '学习社区',
    to: '/community',
  },
  {
    name: 'third',
    label: '个人中心',
    to: '/profile',
  },
  {
    name: 'fourth',
    label: '来聊天吧',
    to: '/chat',
  },
  {
    name: 'fifth',
    label: '我的好友',
    to: '/friend',
  },
  {
    name: 'sixth',
    label: '哈哈贴吧',
    to: '/postbar',
  },
  {
    name: 'seventh',
    label: '我的收藏',
    to: '/save',
  },
  {
    name: 'eighth',
    label: '关于我们',
    to: '/about',
  },
]);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  tabs.value.forEach((item) => {
    if (item.name === tab.props.name) {
      router.push(item.to);
    }
  });
};

watch(
  () => route.path,
  () => {
    console.log('refresh');
    refresh.value = !refresh.value;
    nextTick(() => {
      refresh.value = !refresh.value;
    });
  }
);


</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="mb-4">
        <h1 class="text-4xl font-bold text-center mb-6 text-black">⭐️🏫Java大学🏫⭐️</h1>
        <el-tabs v-model="activeName" class="demo-tabs" stretch @tab-click="handleClick">
          <el-tab-pane
            v-for="tab in tabs"
            :label="tab.label"
            :name="tab.name"
            :key="tab.name"
            class="w-full"
          ></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <template v-if="!refresh">
          <RouterView class="mt-5" />
        </template>
        <template v-else>
          <div class="w-full h-[80vh] flex justify-center items-center">
            <div class="text-4xl">Loading...</div>
          </div>
        </template>
      </el-main>
    </el-container>
  </div>
</template>
