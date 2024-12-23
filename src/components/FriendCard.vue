<template>
  <el-card
    :style="{
      width: '400px',
      border: '8px solid ' + borderColor,
      borderRadius: '16px',
    }"
  >
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <span><strong>{{ friend.username || 'Default Name' }}</strong></span>
        <el-button type="success" @click="dialogFormVisible = true">发送邮件</el-button>
      </div>

      <el-dialog v-model="dialogFormVisible" title="发送邮件" width="500">
        <el-form :model="form">
          <el-form-item label="主题" :label-width="formLabelWidth">
            <el-input v-model="form.subject" autocomplete="off" />
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="form.content" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="
                () => {
                  dialogFormVisible = false;
                  confirmSendEmail();
                }
              "
              >确认</el-button
            >
          </div>
        </template>
      </el-dialog>
    </template>
    <div class="card-body">
      <p>邮箱：{{ friend.email || 'undefined@undefined.com' }}</p>
      <p>角色：{{ friend.role || '学生' }}</p>
    </div>
    <template #footer>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        添加日期：{{ formattedDate }}
        <el-button type="danger" plain @click="DeleteClicked"
          >删除好友</el-button
        >
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
import { SendCode } from '@/api/UserApi/SendCode';

const dialogFormVisible = ref(false);
const form = ref({ subject: '', content: '' });
const formLabelWidth = '120px';
import type { User } from '@/model/User';

const props = defineProps({
  friendship: {
    type: Object as PropType<FriendshipReturn>,
    required: true,
  },
});

const emit = defineEmits(['delete']);

const { user } = useUserStore();

const friend = ref<User>({
  id: 0,
  username: '',
  email: '',
  role: '',
});

const { data, isLoading, err } = GetUserByID(
  props.friendship.user1Id === user.value.id
    ? props.friendship.user2Id
    : props.friendship.user1Id
);

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      friend.value = newData;
    }
  }
);

const confirmSendEmail = async () => {
  try {
    await SendCode(
      friend.value.email,
      "[Java大学]好友邮件："+form.value.subject,
      "你的好友["+user.value.username+"]通过[Java大学]向你发来了以下信息："+form.value.content,
    );

    showMsg("已发送邮件~");
    form.value = { subject: '', content: '' };
  } catch (error) {
    showMsg("发送失败")
  }
};

const borderColor = ref(getRandomColor());

const addedDate = '2021,10,01';

function getRandomColor() {
  const colors = [
    '#FF0000',
    '#FF7F00',
    '#FFD700',
    '#00FF00',
    '#87CEFA',
    '#9370DB',
    '#8B00FF',
    '#FF69B4',
    '#006400',
  ]; // Changed yellow to gold
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
