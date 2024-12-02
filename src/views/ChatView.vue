<script setup lang="ts">
import { type User } from '@/model/User';

import { ref, onMounted, onBeforeUnmount } from 'vue';

import ContactsCard from '@/components/ContactsCard.vue';

import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

let stompClient: any = null

const setupWebSocket = () => {
  const socket = new SockJS('http://127.0.0.1:8080/ws/chat')
  stompClient = Stomp.over(socket)

  stompClient.connect({}, (frame: any) => {
    console.log('Connected: ' + frame)
    
    // 订阅特定聊天室的消息
    stompClient.subscribe('/topic/chat-room/1', (message: any) => {
      const receivedMessage = JSON.parse(message.body)
      console.log('Received message:', receivedMessage)
    })
  }, (error: any) => {
    console.error('Connection error:', error)
  })
}

// 发送消息的方法
const sendMessage = (message: any) => {
  if (stompClient && stompClient.connected) {
    stompClient.send("/app/sendMessage", {}, JSON.stringify(message))
  }
}

// 断开连接
const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.disconnect()
  }
}

onMounted(() => {
  setupWebSocket()
})
onBeforeUnmount(() => {
  disconnectWebSocket()
})

const user = ref<User>({
  email: '',
  username: 'www',
  profilePicture: '',
  role:'学生'
});


</script>
<template>
  <div class="w-3/4 h-full mx-auto mt-10 flex flex-row">
    <div class="w-1/12 flex flex-col">
      <img class="w-full scale-75" :src="!!user.profilePicture?'':'/default-avatar.svg'" :alt="user.username">
      <span class="text-center my-5">人</span>
      <span class="text-center my-5">群</span>
    </div>
    <div class="custom-scrollbar w-1/6 max-h-[80vh] overflow-auto">
      <ContactsCard v-for="index in 12" :key="index" :user="user" />
    </div>
    <div class="w-3/4 flex flex-col border border-slate-500 h-[80vh]">
      <h2 class="text-center">{{ user.username }}</h2>
      <div class="h-[70vh]">

      </div>
      <div class="h-[10vh] w-full bg-slate-500">
        <textarea class="h-full w-full border border-slate-900"></textarea>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  @apply w-1
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-200
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-[#888] rounded-md border-2 border-slate-500
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-[#555]
}
</style>