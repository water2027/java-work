<template>
  <el-card :style="{ width: '400px', border: '8px solid ' + borderColor, borderRadius: '16px' }">
    <template #header>
      <div class="card-header">
        <!-- <img width="50" height="50" :src="user.profilePicture || '/default-avatar.svg'" :alt="user.username"> -->
        <span><strong>{{ friend.username || 'Default Name' }}</strong></span>
      </div>
    </template>
    <div class="card-body">
      <p>邮箱：{{ friend.email || 'undefined@undefined.com' }}</p>
      <p>角色：{{ friend.role || '学生' }}</p>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        添加日期：{{ new Date(friendship.createdAt).toLocaleString() }}
        <el-button type="danger" plain @click="DeleteClicked">删除好友</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { type PropType } from 'vue';
import { DeleteFriendship } from '@/api/FriendShipApi/DeleteFriend';
import { useUserStore } from '@/store/userStore';
import type { FriendshipReturn } from '@/model/dto/FriendshipApi/Friendship';
import { GetUserByID } from '@/api/UserApi/GetByID';
import { showMsg } from './MessageBox';
import type { User } from '@/model/User';

const props = defineProps({
    friendship: {
        type: Object as PropType<FriendshipReturn>,
        required: true
    }
});

const emit = defineEmits(['delete']);

const { user } = useUserStore();

const friend = ref<User>({
  id: 0,
  username: '',
  email: '',
  role: ''
});


const borderColor = ref(getRandomColor());

function getRandomColor() {
  const colors = ['#FF0000', '#FF7F00', '#FFD700', '#00FF00', '#87CEFA', '#9370DB', '#8B00FF', '#FF69B4', '#006400']; // Changed yellow to gold
  return colors[Math.floor(Math.random() * colors.length)];
}

const DeleteClicked = () => {
  console.log('Delete button clicked');
  showMsg('删除好友');
  const { isLoading, err } = DeleteFriendship(user.value.id, friend.value.id);
  watch(isLoading, () => {
    if (err.value) {
      showMsg(err.value);
    } else {
      emit('delete');
    }
  });
};

onMounted(async () => {
  const { data, err } = await GetUserByID(props.friendship.user1Id === user.value.id ? props.friendship.user2Id : props.friendship.user1Id);
  if (err) {
    showMsg(err);
  } else {
    friend.value = data;
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
