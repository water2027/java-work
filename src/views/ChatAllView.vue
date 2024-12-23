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
          style="font-size: 16px"
        >
          <el-sub-menu index="1">
            <template #title>
              <span style="font-weight: bold; font-size: 16px">联系人</span>
            </template>
            <RouterLink
              v-for="chat in privateChats"
              :key="chat.id"
              :to="`/chat/${chat.id}`"
            >
              <el-menu-item
                :index="'1-' + chat.id"
                style="font-weight: bold; font-size: 16px"
              >
                {{ chat.name }}
              </el-menu-item>
            </RouterLink>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span style="font-weight: bold; font-size: 16px">公共聊天室</span>
            </template>
            <RouterLink
              v-for="chat in publicChats"
              :key="chat.id"
              :to="`/chat/${chat.id}`"
            >
              <el-menu-item
                :index="'2-' + chat.id"
                style="font-weight: bold; font-size: 16px"
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
          <el-button
            type="warning"
            round
            plain
            @click="dialogFormVisible = true"
            >加入聊天室</el-button
          >
          <el-button type="warning" round plain @click="createChatRoom"
            >添加聊天室</el-button
          >
        </div>
      </el-header>

      <el-dialog v-model="dialogFormVisible" title="加入聊天室" width="500">
        <el-form :model="form">
          <el-form-item label="聊天室ID" :label-width="formLabelWidth">
            <el-input v-model="form.chatRoomId" autocomplete="off" />
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
                  joinChatRoom();
                }
              "
              >确认</el-button
            >
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { showMsg } from '@/components/MessageBox';
import { CreateChatRoom } from '@/api/ChatRoomApi/Create';
import { useEasyForm } from '@/composables/EasyForm';
import type { CustomFormData } from '@/model/CustomFormData';
import {
  GetPrivateChatRoomsByUserId,
  GetPublicChatRoomsByUserId,
} from '@/api/ChatRoomApi/GetAll';
import { addMemberToChatRoom } from '@/api/ChatRoomMemberApi/GetAll';

const route = useRoute();
const activeIndex = ref('');
const dialogFormVisible = ref(false);
const form = ref({ chatRoomId: '' });
const formLabelWidth = '120px';

const { user } = useUserStore();

const { data: privateChats } = GetPrivateChatRoomsByUserId(user.value.id);

const { data: publicChats } = GetPublicChatRoomsByUserId(user.value.id);

const inputData: CustomFormData[] = [
  {
    id: 'chatRoomName',
    label: '聊天室名称',
    value: '',
    type: 'text',
    autocomplete: 'off',
  },
];

const createChatRoom = async () => {
  useEasyForm(inputData, async (courseId: number) => {
    const { data: CreateChatRoomValue, err: CreateChatRoomErr } =
      await CreateChatRoom({
        name: inputData[0].value,
        courseId,
      });
    if (CreateChatRoomErr) {
      showMsg(CreateChatRoomErr);
    } else {
      showMsg(
        CreateChatRoomValue?.id
          ? '创建成功，正在自动添加成员'
          : '没有成功添加成员!!!!'
      );
      if (CreateChatRoomValue?.id) {
        showMsg('创建成功，正在自动添加成员');
        const { err: autoAddMemberErr } =
          await addMemberToChatRoom({
            chatRoomId: CreateChatRoomValue?.id,
            userId: user.value?.id,
          });
          if (autoAddMemberErr) {
            showMsg(autoAddMemberErr);
          } else {
            showMsg('添加成员成功');
          }
      } else {
        showMsg('没有成功添加成员');
      }
    }
  });
};

const joinChatRoom = async () => {
  try {
    const { err } = await addMemberToChatRoom({
      chatRoomId: parseInt(form.value.chatRoomId),
      userId: user.value.id,
    });
    if(err){
      throw new Error(err);
    }
    showMsg('加入成功');
    form.value = { chatRoomId: '' };
  } catch (error) {
    showMsg('加入失败');
  }
};

const updateActiveIndex = (path: string) => {
  const chatId = path.split('/').pop();
  if (privateChats.value?.some((chat) => chat.id.toString() === chatId)) {
    activeIndex.value = '1-' + chatId;
  } else if (publicChats.value?.some((chat) => chat.id.toString() === chatId)) {
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
