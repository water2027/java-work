<script setup lang="ts">
import { useUserStore } from '@/store/userStore'; // 引入 Pinia store
import { onMounted } from 'vue';

const userStore = useUserStore(); // 获取 user store
const { user, setAvatar } = userStore;

const onProfileImageChange = (e: Event)=>{
  const file = (e.target as HTMLInputElement)?.files?.[0];
  // base64 编码
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target?.result as string;
    setAvatar(base64);
    console.log(base64);
  };
  file&&reader.readAsDataURL(file);
}

const logoutHandler = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email')
  localStorage.removeItem('password')
  localStorage.removeItem('rememberMe')
  window.location.reload();
};

onMounted(()=>{
  if(localStorage.getItem('avatar')){
    setAvatar(localStorage.getItem('avatar') as string)
  }
})

</script>

<template>
  <div class="p-5 max-w-[600px] mx-auto text-center">
    <div class="bg-white p-5 rounded-lg shadow text-center mb-5">
      <!-- 头像，默认占位图 -->
      <img
      :src="
        user.profilePicture || 'https://via.placeholder.com/150'
      "
      alt="User Avatar"
      class="w-[150px] h-[150px] rounded-full object-cover mb-5 mx-auto"
      />
      <!-- 显示用户名 -->
      <h2>{{ user.username || '未命名' }}</h2>
      <!-- 显示邮箱 -->
      <p class="text-base text-gray-600">我的邮箱{{ user.email }}</p>
      <!-- 显示用户id -->
      <p class="text-base text-gray-600">我的用户ID: {{ user.id }}</p>
    </div>

    <!-- 退出登录按钮 -->
    <button
      @click="logoutHandler"
      class="mt-5 py-2.5 px-5 bg-orange-600 text-white border-none rounded cursor-pointer text-base hover:bg-orange-500"
    >
      退出登录
    </button>
  </div>
</template>

<style scoped>
h2 {
  @apply text-2xl font-bold my-2.5;
}
</style>
