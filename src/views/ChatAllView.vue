<template>
  <el-container class="column-layout" style="height: 100vh">
    <el-aside width="200px" height="100%" style="background-color: #14b441">
      <el-scrollbar>
        <el-menu
          v-model="activeIndex"
          :default-openeds="['1', '2']"
          background-color="#14B441"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="font-size: 18px"
        >
          <el-sub-menu index="1">
            <template #title>
              <span style="font-weight: bold; font-size: 18px">联系人</span>
            </template>
            <RouterLink
              v-for="chat in privateChats"
              :key="chat.id"
              :to="`/chat/${chat.id}`"
            >
              <el-menu-item
                :index="'1-' + chat.id"
                style="font-weight: bold; font-size: 18px"
              >
                {{ chat.name }}
              </el-menu-item>
            </RouterLink>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span style="font-weight: bold; font-size: 18px">公共聊天室</span>
            </template>
            <RouterLink
              v-for="chat in publicChats"
              :key="chat.id"
              :to="`/chat/${chat.id}`"
            >
              <el-menu-item
                :index="'2-' + chat.id"
                style="font-weight: bold; font-size: 18px"
              >
                {{ chat.name }}
              </el-menu-item>
            </RouterLink>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background-color: #ffb347;
          color: #fff;
        "
      >
        <div class="toolbar">
          <span>🌟 欢迎来到聊天中心 🌟</span>
        </div>
        <div style="margin-left: auto; padding-right: 20px">
          <el-button type="warning" round plain @click="createChatRoom"
            >添加聊天室</el-button
          >
        </div>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { showMsg } from '@/components/MessageBox';
import { CreateChatRoom } from '@/api/ChatRoomApi/Create';
import { useEasyForm } from '@/composables/EasyForm';
import type { CustomFormData } from '@/model/CustomFormData';
import {
  GetPrivateChatRoomsByUserId,
  GetPublicChatRoomsByUserId,
} from '@/api/ChatRoomApi/GetAll';

const router = useRouter();
const route = useRoute();
const activeIndex = ref('');

const { user } = useUserStore();

const {
  data: privateChats,
  isLoading: privateIsLoading,
  err: privateErr,
} = GetPrivateChatRoomsByUserId(user.value.id);

const {
  data: publicChats,
  isLoading: publicIsLoading,
  err: publicErr,
} = GetPublicChatRoomsByUserId(user.value.id);

const inputData: CustomFormData[] = [
  {
    id: 'chatRoomName',
    label: '聊天室名称',
    value: '',
    type: 'text',
    autocomplete: 'off',
  },
];

const createChatRoom = () => {
  useEasyForm(inputData, (id: number) => {
    CreateChatRoom({
      name: inputData[0].value,
      courseId: id,
    });
  });
};

// 添加这个函数来更新 activeIndex
const updateActiveIndex = (path: string) => {
  const chatId = path.split('/').pop(); // 获取路由中的聊天室 ID
  if (privateChats.value?.some(chat => chat.id.toString() === chatId)) {
    activeIndex.value = '1-' + chatId;
  } else if (publicChats.value?.some(chat => chat.id.toString() === chatId)) {
    activeIndex.value = '2-' + chatId;
  }
};

// 监听路由变化和聊天数据加载完成
watch(
  () => [route.path, privateChats.value, publicChats.value],
  () => {
    updateActiveIndex(route.path);
  },
  { immediate: true }
);

// 其他代码保持不变
</script>

<style scoped>
.mb-4 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* 移除 .is-active 样式，因为使用了 el-menu 的 active-text-color */
</style>
