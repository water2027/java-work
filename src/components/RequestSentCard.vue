<template>
  <el-card :style="{ maxWidth: '400px', border: '8px solid ' + borderColor, borderRadius: '16px' }">
    <template #header>
      <div class="card-header">
        <img width="50" height="50" :src="user.profilePicture || '/default-avatar.svg'" :alt="user.username">
        <span><strong>{{ user.username || 'Default Name' }}</strong></span>
      </div>
    </template>
    <div class="card-body">
      <p>邮箱：{{ user.email || 'undefined@undefined.com' }}</p>
      <p>角色：{{ user.role || '学生' }}</p>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center; align-items: center;">
      <div v-if="props.request.status === 'PENDING'" style="color: #87CEEB; flex: 1; text-align: center;">
      等待对方同意
      </div>
      <div v-else-if="props.request.status === 'APPROVED'" style="color: #1BC650; flex: 1; text-align: center;">
      对方已同意
      </div>
      <div v-else-if="props.request.status === 'REJECTED'" style="color: #FFA39E; flex: 1; text-align: center;">
      对方已拒绝
      </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type User } from '@/model/User';
import { type FriendRequestReturn } from '@/model/dto/FriendRequestApi/FriendRequest';
import { type PropType } from 'vue';

const props = defineProps({
    request: {
        type: Object as PropType<FriendRequestReturn>,
        required: true
    },
    user: {
        type: Object as PropType<User>,
        required: true
    }
});

const borderColor = ref(getBorderColor(props.request.status));
const addedDate = ref(props.request.createdAt.toLocaleDateString());

watch(() => props.request.status, (newStatus) => {
  borderColor.value = getBorderColor(newStatus);
});

function getBorderColor(status: string): string {
  switch(status) {
    case 'APPROVED':
      return '#1BC650';
    case 'PENDING':
      return '#87CEEB';
    case 'REJECTED':
      return '#FFA39E';
    default:
      return '#B0B0B0';
  }
}
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
