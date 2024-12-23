<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const refresh = ref(false);

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
  <div>
    <h1 class="w-full text-center">java大学</h1>
    <div class="flex flex-row *:mx-auto border border-slate-800 p-1">
      <!-- 导航条 -->
      <RouterLink to="/" class="p-2 hover:bg-slate-500 rounded-lg"
        >课程专区</RouterLink
      >
      <RouterLink to="/community" class="p-2 hover:bg-slate-500 rounded-lg"
        >学习社区</RouterLink
      >
      <RouterLink to="/profile" class="p-2 hover:bg-slate-500 rounded-lg"
        >个人中心</RouterLink
      >
      <RouterLink to="/chat" class="p-2 hover:bg-slate-500 rounded-lg"
        >来聊天吧</RouterLink
      >
      <RouterLink to="/postbar" class="p-2 hover:bg-slate-500 rounded-lg"
        >哈哈贴吧</RouterLink
      >
      <RouterLink to="/save" class="p-2 hover:bg-slate-500 rounded-lg"
        >我的收藏</RouterLink
      >

      <RouterLink to="/videochat" class="p-2 hover:bg-slate-500 rounded-lg"
        >测试功能</RouterLink
      >

    </div>
    <template v-if="!refresh">
      <RouterView class="mt-5" />
    </template>
    <template v-else>
      <div class="w-full h-[80vh] flex justify-center items-center">
        <div class="text-4xl">Loading...</div>
      </div>
    </template>
  </div>
</template>
