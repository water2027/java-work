<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { Client } from '@stomp/stompjs';

import ContactsCard from '@/components/ContactsCard.vue';

import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const { user } = userStore;

const messageText = ref('');

let client:Client = null;

const setupWebSocket = () => {
  client = new Client({
    brokerURL: 'ws://127.0.0.1:8080/ws/chat', // WebSocket 服务器地址
    onConnect: () => {
      console.log('Connected to WebSocket');

      // 订阅服务器端的消息
      client.subscribe('/topic/chat-room/1', (message:any) => {
        console.log('Received message: ', message.body);
      });
    },
    onStompError: (frame:string) => {
      console.error('STOMP error: ', frame);
    },
  });
  client.activate();
};

// 发送消息的方法
const sendMessage = () => {
  client.publish({
    destination:'/app/sendMessage',
    body:JSON.stringify({
      chatRoomId:1,
      userId:user.value.id,
      content:messageText.value,
      messageType:'text'
    })
  })
};

// 断开连接
const disconnectWebSocket = () => {
  client.disconnect();
};

onMounted(() => {
  setupWebSocket();
});
onBeforeUnmount(() => {
  disconnectWebSocket();
});
</script>
<template>
  <div class="w-3/4 h-full mx-auto mt-10 flex flex-row">
    <div class="w-1/12 flex flex-col">
      <img
        class="w-full scale-75"
        :src="!!user.profilePicture ? '' : '/default-avatar.svg'"
        :alt="user.username"
      />
      <span class="text-center my-5">人</span>
      <span class="text-center my-5">群</span>
    </div>
    <div class="custom-scrollbar w-1/6 max-h-[80vh] overflow-auto">
      <ContactsCard v-for="index in 12" :key="index" :user="user" />
    </div>
    <div class="w-3/4 flex flex-col border border-slate-500 h-[80vh]">
      <h2 class="text-center">{{ user.username }}</h2>
      <div class="h-[70vh]"></div>
      <div class="h-[10vh] w-full bg-slate-500">
        <textarea
          v-model="messageText"
          class="h-full w-full border border-slate-900"
        ></textarea>
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  @apply w-1;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-200;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-[#888] rounded-md border-2 border-slate-500;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-[#555];
}
</style>
