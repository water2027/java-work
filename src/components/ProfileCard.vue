<!-- src/components/ProfileCard.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';

import { type User } from '@/store/userStore';

defineProps({
  user:{
    type: Object as () => User,
    required: true
  }
})
</script>

<template>
  <div class="profile-card">
    <div>
      <img
        :src="user.profilePicture||'https://via.placeholder.com/150'"
        alt="Profile Picture"
        class="profile-image"
      />
    </div>
    <div class="user-info">
      <h2>{{ user.username }}</h2>
      <p>{{ user.email }}</p>
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
