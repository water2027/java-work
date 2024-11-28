<script setup lang="ts"></script>
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
      <RouterLink to="/save" class="p-2 hover:bg-slate-500 rounded-lg"
        >我的收藏</RouterLink
      >
      <RouterLink to="/about" class="p-2 hover:bg-slate-500 rounded-lg"
        >关于我们</RouterLink
      >
    </div>
    <RouterView class="mt-5" />
  </div>
</template>
