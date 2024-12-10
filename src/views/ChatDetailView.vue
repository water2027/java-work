<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/store/userStore';
import { Client } from '@stomp/stompjs';

import { GetAllMessage } from '@/api/MessageApi/GetAll';
import { GetAllMember } from '@/api/ChatRoomMemberApi/GetAll';

const { user } = useUserStore();

const route = useRoute();

let client: Client | null = null;

const messageText = ref('');
const chatRoomId = ref<number>(Number(route.params.id));
const { data: messages, isLoading } = GetAllMessage(chatRoomId.value);
const { data: members } = GetAllMember(
  chatRoomId.value
);
const messageContainer = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const apiUrl = import.meta.env.VITE_API_BASE_URL

const setupWebsocket = () => {
  if (!client || !client.connected) {
    client = new Client({
      brokerURL: `ws://${apiUrl}/ws/chat`, // WebSocket 服务器地址
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

onMounted(() => {
  setupWebsocket();
});
onBeforeUnmount(() => {
  client?.deactivate();
});
</script>
<template>
  <div class="flex flex-row w-full">
    <div class="w-full flex flex-col border border-slate-500 h-[80vh]">
      <div class="flex flex-row justify-center">
        <h2 class="text-center ml-auto">{{ chatRoomId }}</h2>
        <span class="ml-auto mr-4" @click="showDetail">...</span>
      </div>
      <template v-if="!isLoading">
        <div ref="messageContainer" class="h-[70vh] overflow-auto">
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex flex-col p-4 border-b border-gray-200"
          >
            <h3 class="text-lg font-bold">{{ message.userId }}</h3>
            <div class="mt-2 text-base">{{ message.content }}</div>
            <div class="mt-2 text-sm text-gray-500">
              {{ message.createdAt }}
            </div>
          </div>
        </div>
        <div class="h-[10vh] w-full bg-slate-500">
          <textarea
            v-model="messageText"
            class="h-full w-full border border-slate-900"
          ></textarea>
          <button @click="sendMessage">发送</button>
        </div>
      </template>
      <template v-else>
        <div class="h-[80vh] flex justify-center items-center">
          <div class="spinner"></div>
        </div>
      </template>
    </div>
    <div
      v-if="detail"
      class="flex flex-col border-slate-500 h-[80vh] overflow-auto"
    >
      <ContactsCard v-for="member in members" :key="member.id" :user="member" />
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
