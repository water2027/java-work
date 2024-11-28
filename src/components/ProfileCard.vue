<!-- src/components/ProfileCard.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';

// 定义用户数据的类型
interface User {
  username: string;
  email: string;
  profilePicture?: string;
}

const props = defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="profile-card">
    <div v-if="props.user.profilePicture">
      <img :src="props.user.profilePicture" alt="Profile Picture" class="profile-image" />
    </div>
    <div class="user-info">
      <h2>{{ props.user.username }}</h2>
      <p>{{ props.user.email }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.user-info h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px 0;
}

.user-info p {
  font-size: 1rem;
  color: #666;
}
</style>
