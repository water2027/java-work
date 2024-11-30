// src/store/userStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';  // 添加这一行

import { type User } from '@/model/User';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null); // 存储当前登录的用户信息

  // 登录方法，用于设置用户信息
  const login = (userInfo: User) => {
    user.value = userInfo; // 设置用户信息
  };

  // 退出登录方法，用于清除用户信息
  const logout = () => {
    user.value = null; // 清空用户信息
  };

  // 可选：检测用户是否已经登录
  const isLoggedIn = computed(() => !!user.value);

  return {
    user,
    login,
    logout,
    isLoggedIn, // 返回是否已登录的状态
  };
});
