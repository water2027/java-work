<template>
  <el-container class="column-layout" style="height: 100vh">
    <el-aside width="200px" height="100%" style="background-color: #409EFF;">
      <el-scrollbar>
      <el-menu :default-openeds="['1', '2']" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
        <el-sub-menu index="1">
        <template #title>
          <!-- <el-icon><message /></el-icon> -->
          <span style="font-weight: bold;">我的好友</span>
        </template>
          <el-menu-item index="1-1" @click="showFriendList" :class="{ 'is-active': activeIndex === '1-1' }" style="font-weight: bold;">所有好友</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
        <template #title>
          <!-- <el-icon><icon-menu /></el-icon> -->
          <span style="font-weight: bold;">好友申请</span>
        </template>
          <el-menu-item index="2-1" @click="showFriendReceivedRequest" :class="{ 'is-active': activeIndex === '2-1' }" style="font-weight: bold;">我收到的</el-menu-item>
          <el-menu-item index="2-2" @click="showFriendSentRequest" :class="{ 'is-active': activeIndex === '2-2' }" style="font-weight: bold;">我发出的</el-menu-item>
        </el-sub-menu>
      </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="display: flex; align-items: center; justify-content: center; font-size: 24px; background-color: #FFB347; color: #fff;">
        <div class="toolbar">
          <span>🌟 欢迎来到好友管理中心 🌟</span>
        </div>
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = ref('');

const showFriendList = () => {
  activeIndex.value = '1-1';
  router.push('/friend');
};

const showFriendSentRequest = () => {
  activeIndex.value = '2-1';
  router.push('/friend/sent-request');
};

const showFriendReceivedRequest = () => {
  activeIndex.value = '2-2';
  router.push('/friend/received-request');
};

onMounted(() => {
  if (route.path === '/friend') {
    activeIndex.value = '1-1';
  } else if (route.path === '/friend/received-request') {
    activeIndex.value = '2-1';
  } else if (route.path === '/friend/sent-request') {
    activeIndex.value = '2-2';
  }
});
</script>

<style scoped>
.mb-4 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.is-active {
  color: #ffd04b !important;
}
</style>
