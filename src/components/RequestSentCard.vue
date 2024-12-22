<template>
  <el-card :style="{ width: '100%', margin: '20px', border: '8px solid ' + borderColor, borderRadius: '16px' }">
    <template #header>
      <div class="card-header" style="display: flex; align-items: center;">
        <span>你对</span>
        <!-- <img width="50" height="50" :src="user.profilePicture || '/default-avatar.svg'" :alt="user.username" style="margin: 0px;"> -->
        <strong>{{ user.username || 'Default Name' }}</strong>
        <span>说：{{ props.request.announcement }}</span>
      </div>
    </template>
    <div class="card-body">
      <p>邮箱：{{ user.email || 'undefined@undefined.com' }}</p>
      <p>角色：{{ user.role || '学生' }}</p>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <div v-if="props.request.status === 'PENDING'" style="color : #366fff;flex: 1; text-align: center;">
          <strong>对方暂未处理您的申请，请耐心等待</strong>
        </div>
        <div v-else-if="props.request.status === 'APPROVED'" style="color: #1BC650; flex: 1; text-align: center;">
          <strong>对方已通过您的申请，现在可以去聊天室了！</strong>
        </div>
        <div v-else-if="props.request.status === 'REJECTED'" style="color: #FFA39E; flex: 1; text-align: center;">
          <strong>对方已拒绝您的申请，请稍后再试</strong>
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
import { type User } from '@/model/dto/UserApi/UserInfo';
import { GetUserByID } from '@/api/UserApi/GetByID';

const props = defineProps({
    request: {
        type: Object as PropType<FriendRequestReturn>,
        required: true
    }
});

const getUserById = (id: number) => {
  const response = GetUserByID(id);
  return response;
};

const user = ref<User>({
  id: 0,
  username: '',
  email: '',
  role: '',
  password: ''
});

const { data, isLoading, err } = getUserById(props.request.receiverUserId);

watch(() => data.value, (newData) => {
  if (newData) {
    user.value = newData;
  }
});

const borderColor = ref(getBorderColor(props.request.status));

watch(() => props.request.status, (newStatus) => {
  borderColor.value = getBorderColor(newStatus);
});

function getBorderColor(status: string): string {
  switch(status) {
    case 'APPROVED':
      return '#1BC650';
    case 'PENDING':
      return '#366fff';
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
