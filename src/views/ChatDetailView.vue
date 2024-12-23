<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/store/userStore';
import { Client } from '@stomp/stompjs';

import { GetAllMessage } from '@/api/MessageApi/GetAll';
import { GetAllMember } from '@/api/ChatRoomMemberApi/GetAll';
import { GetUserByID } from '@/api/UserApi/GetByID';
import { GetChatRoomByID } from '@/api/ChatRoomApi/GetByID'; // 假设这个 API 存在
import { showMsg } from '@/components/MessageBox';
import type { User } from '@/model/User';

const { user } = useUserStore();

const route = useRoute();

let client: Client | null = null;

const messageText = ref('');
const chatRoomId = ref<number>(Number(route.params.id));

const { data: messages, isLoading } = GetAllMessage(chatRoomId.value);
const {
  data: members,
  isLoading: membersIsLoading,
  err: membersErr,
} = GetAllMember(chatRoomId.value);

watch(membersIsLoading, async () => {
  if (membersErr.value) {
    showMsg(membersErr.value);
  } else {
    console.log(members.value);
    await fetchUsers();
  }
});

const messageContainer = ref<HTMLDivElement | null>(null);

// 新增：存储用户数据
const users = ref<{ [key: number]: User }>({});

const { data: chatRoom } = GetChatRoomByID(chatRoomId.value);

const getUserById = (id: number) => {
  return (
    users.value[id] || {
      id,
      username: '未知用户',
      email: '',
      role: 'user',
      profilePicture: '',
    }
  );
};

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const setupWebsocket = () => {
  if (!client || !client.connected) {
    client = new Client({
      brokerURL: `wss://${apiUrl}/ws/chat`, // WebSocket 服务器地址
      onConnect: () => {
        console.log('Connected to WebSocket');
        client?.subscribe(
          `/topic/chat-room/${chatRoomId.value}`,
          (message: any) => {
            const response = JSON.parse(message.body);
            messages.value?.push(response);
            nextTick(() => {
              scrollToBottom();
            });
          }
        );
      },
      onStompError: (frame: any) => {
        console.error('STOMP error: ', frame);
      },
    });
    client.activate();
  }
};

const sendMessage = () => {
  if (!messageText.value.trim()) {
    showMsg('不可以发送空白消息');
    return;
  }
  client?.publish({
    destination: '/app/sendMessage',
    body: JSON.stringify({
      chatRoomId: chatRoomId.value,
      userId: user.value.id,
      content: messageText.value,
      messageType: 'text',
    }),
  });
  messageText.value = '';
};

const detail = ref(false);
const showDetail = () => {
  detail.value = !detail.value;
};

// 新增：获取所有用户数据
const fetchUsers = async () => {
  if (members.value?.length) {
    for (let i = 0; i < members.value.length; i++) {
      const id = members.value[i].userId;
      const { data: userInfo, err: userInfoErr } = await GetUserByID(id);
      if (userInfoErr) {
        showMsg(userInfoErr);
      } else {
        // 确保存储完整的 User 对象
        users.value[id] = userInfo || {
          id,
          username: '未知用户',
          email: '未知邮箱',
          role: '未知角色',
          profilePicture: '',
        };
      }
    }
  }
};

onMounted(() => {
  setupWebsocket();
});
onBeforeUnmount(() => {
  client?.deactivate();
});
</script>

<template>
  <div class="flex flex-row w-full">
    <div
      class="w-full flex flex-col border border-slate-500 h-[70vh]"
    >
      <div class="flex flex-row justify-center">
        <h2 class="text-center ml-auto">{{ chatRoom?.name || '加载中' }}</h2>
        <!-- 修改：展示聊天室名字 -->
        <span class="ml-auto mr-4" @click="showDetail">...</span>
      </div>
      <template v-if="!isLoading">
        <div ref="messageContainer" class="h-[60vh] overflow-auto">
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex flex-col p-4 border-b border-gray-200"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">
                {{ getUserById(message.userId).username + ' 说：' }}
              </h3>
              <div class="text-sm text-gray-500">
                {{ new Date(message.createdAt)?.toLocaleString() }}
              </div>
            </div>
            <div class="mt-2 text-base">{{ message.content }}</div>
          </div>
        </div>
        <div class="h-[10vh] w-full bg-slate-500">
          <div class="flex items-center h-full w-full p-0">
            <el-input
              v-model="messageText"
              class="flex-grow h-full border border-slate-1200"
              placeholder="Please input"
            />
            <button @click="sendMessage" class="h-full bg-[#409EFF] text-white">
              发送
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="h-[70vh] flex justify-center items-center">
          <div class="spinner"></div>
        </div>
      </template>
    </div>
    <div
      v-if="detail"
      class="flex flex-col border-slate-500 h-[100vh] overflow-hidden w-[20vw]"
    >
      <h2 class="text-xl font-bold p-4 border-b border-slate-300">
        聊天室成员列表
      </h2>
      <ContactsCard
        v-for="member in members"
        :key="member.id"
        :user="getUserById(member.userId)"
      />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
