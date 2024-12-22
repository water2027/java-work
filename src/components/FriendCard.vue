<template>
  <el-card :style="{ maxWidth: '400px', border: '8px solid ' + borderColor, borderRadius: '16px' }">
    <template #header>
      <div class="card-header">
        <!-- <img width="50" height="50" :src="user.profilePicture || '/default-avatar.svg'" :alt="user.username"> -->
        <span><strong>{{ user.username || 'Default Name' }}</strong></span>
      </div>
    </template>
    <div class="card-body">
      <p>邮箱：{{ user.email || 'undefined@undefined.com' }}</p>
      <p>角色：{{ user.role || '学生' }}</p>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        你们在{{ addedDate }}加了好友
        <el-button type="danger" plain>删除好友</el-button>
      </div>
    </template>

  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type User } from '@/model/User';
import { type PropType } from 'vue';

const borderColor = ref(getRandomColor());
const addedDate = ref(generateRandomDate());

function getRandomColor() {
  const colors = ['#FF7F00', '#FFD700', '#00FF00', '#87CEFA', '#9370DB', '#FF69B4', '#e54af3', '#ff374f', '#359722'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomDate(): string {
    const start = new Date(2020, 0, 1).getTime();
    const end = new Date().getTime();
    const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
    const date = new Date(randomTimestamp);
    return date.toLocaleDateString();
}

defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
});
</script>

<style scoped>

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.card-header {
  display: flex;
  align-items: center;
}
.card-body {
  padding: 10px 0;
}
</style>
