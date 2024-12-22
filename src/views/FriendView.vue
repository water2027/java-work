<template>
  <el-container class="column-layout" style="height: 100vh">
    <el-aside width="200px" height="100%" style="background-color: #409EFF;">
      <el-scrollbar>
      <el-menu :default-openeds="['1', '2']" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
        <el-sub-menu index="1">
        <template #title>
          <!-- <el-icon><message /></el-icon> -->
          <span style="font-weight: bold;">我的好友</span>
        </template>
          <el-menu-item index="1-1" @click="showFriendList" :class="{ 'is-active': activeIndex === '1-1' }" style="font-weight: bold;">所有好友</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
        <template #title>
          <!-- <el-icon><icon-menu /></el-icon> -->
          <span style="font-weight: bold;">好友申请</span>
        </template>
          <el-menu-item index="2-1" @click="showFriendReceivedRequest" :class="{ 'is-active': activeIndex === '2-1' }" style="font-weight: bold;">我收到的</el-menu-item>
          <el-menu-item index="2-2" @click="showFriendSentRequest" :class="{ 'is-active': activeIndex === '2-2' }" style="font-weight: bold;">我发出的</el-menu-item>
        </el-sub-menu>
      </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="display: flex; align-items: center; justify-content: center; font-size: 24px; background-color: #FFB347; color: #fff;">
        <div class="toolbar">
          <span>🌟 欢迎来到好友管理中心 🌟</span>
        </div>
        <div style="margin-left:auto; padding-right:20px;">
          <el-button type="warning" round plain @click="dialogFormVisible = true">添加好友</el-button>
        </div>
      </el-header>

      <el-dialog v-model="dialogFormVisible" title="发送好友申请" width="500">

        <el-form :model="form">
          <el-form-item label="好友ID" :label-width="formLabelWidth">
        <el-input v-model="form.friendId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="申请说明" :label-width="formLabelWidth">
        <el-input v-model="form.note" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="() => {dialogFormVisible = false; confirmSendRequest() }">确认</el-button>
          </div>
        </template>
      </el-dialog>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { SendFriendRequest } from '@/api/FriendShipApi/SendRequest';
import { showMsg } from '@/components/MessageBox';

const router = useRouter();
const route = useRoute();
const activeIndex = ref('');

const { user } = useUserStore();

const showFriendList = () => {
  activeIndex.value = '1-1';
  router.push('/friend');
};

const showFriendSentRequest = () => {
  activeIndex.value = '2-1';
  router.push('/friend/sent-request');
};

const showFriendReceivedRequest = () => {
  activeIndex.value = '2-2';
  router.push('/friend/received-request');
};

const dialogFormVisible = ref(false);
const form = ref({ friendId: '', note: '' });
const formLabelWidth = '120px';

const confirmSendRequest = async () => {
  if (user.value.id === parseInt(form.value.friendId)) {
    showMsg("不可以向自己发送好友申请");
    return;
  }

  try {
    await SendFriendRequest({
      senderUserId: user.value.id,
      receiverUserId: parseInt(form.value.friendId),
      announcement: form.value.note,
      status: "PENDING"
    });

    showMsg("已发送好友请求~");
    form.value = { friendId: '', note: '' };
  } catch (error) {
    showMsg("请求失败")
  }
};

onMounted(() => {
  if (route.path === '/friend') {
    activeIndex.value = '1-1';
  } else if (route.path === '/friend/received-request') {
    activeIndex.value = '2-1';
  } else if (route.path === '/friend/sent-request') {
    activeIndex.value = '2-2';
  }
});
</script>

<style scoped>
.mb-4 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.is-active {
  color: #ffd04b !important;
}
</style>
