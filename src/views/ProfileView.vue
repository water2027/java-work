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
  <div v-if="isLoggedIn" class="profile-container">
    <div class="profile-card">
      <!-- 头像，默认占位图 -->
      <img
        :src="userStore.user?.profilePicture || 'https://via.placeholder.com/150'"
        alt="User Avatar"
        class="avatar"
      />
      <!-- 显示用户名 -->
      <h2>{{ userStore.user?.username }}</h2>
      <!-- 显示邮箱 -->
      <p class="email">{{ userStore.user?.email }}</p>
    </div>

    <!-- 退出登录按钮 -->
    <button @click="logoutHandler" class="logout-btn">
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
.profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.profile-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.email {
  font-size: 16px;
  color: #555;
}

.logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #eb6b26;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.logout-btn:hover {
  background-color: #ff7e3b;
}
</style>
