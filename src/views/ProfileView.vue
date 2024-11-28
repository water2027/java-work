<script setup lang="ts">
import { useUserStore } from '@/store/userStore'; // 引入 Pinia store
import { computed } from 'vue';

const userStore = useUserStore(); // 获取 user store
const logoutHandler = () => {
  userStore.logout(); // 调用 logout 方法清除用户数据
};

const isLoggedIn = computed(() => userStore.isLoggedIn); // 判断是否登录
</script>

<template>
  <!-- 如果已登录，显示个人主页信息 -->
  <div v-if="isLoggedIn" class="p-5 max-w-[600px] mx-auto text-center">
    <div class="bg-white p-5 rounded-lg shadow text-center mb-5">
      <!-- 头像，默认占位图 -->
      <img
        :src="
          userStore.user?.profilePicture || 'https://via.placeholder.com/150'
        "
        alt="User Avatar"
        class="w-[150px] h-[150px] rounded-full object-cover mb-5"
      />
      <!-- 显示用户名 -->
      <h2>{{ userStore.user?.username }}</h2>
      <!-- 显示邮箱 -->
      <p class="text-base text-gray-600">{{ userStore.user?.email }}</p>
    </div>

    <!-- 退出登录按钮 -->
    <button
      @click="logoutHandler"
      class="mt-5 py-2.5 px-5 bg-orange-600 text-white border-none rounded cursor-pointer text-base hover:bg-orange-500"
    >
      退出登录
    </button>
  </div>

  <!-- 如果未登录，显示提示信息 -->
  <div v-else class="text-center">
    <p>您未登录，请先登录。</p>
    <!-- 登录链接 -->
    <router-link to="/auth/login" class="text-blue-600">去登录</router-link>
  </div>
</template>

<style scoped>
h2 {
  @apply text-2xl font-bold my-2.5;
}
</style>
