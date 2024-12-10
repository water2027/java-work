<script setup lang="ts">
import { type CustomFormData } from '@/model/CustomFormData';

import ContactsCard from '@/components/ContactsCard.vue';

import { useUserStore } from '@/store/userStore';

import { useEasyForm } from '@/composables/EasyForm';

import { CreateChatRoom } from '@/api/ChatRoomApi/Create';

const userStore = useUserStore();
const { user } = userStore;

const inputData:CustomFormData[] = [{
  id: 'chatRoomName',
  label: '聊天室名称',
  value: '',
  type: 'text',
  autocomplete: 'off',
}]
const createChatRoom = () => {
  useEasyForm(inputData,(id:number)=>{
    CreateChatRoom({
      name: inputData[0].value,
      courseId: id,
    })
  });
}
const addFriendData:CustomFormData[] = [{
  id: 'friendId',
  label: 'friendId',
  value: '',
  type: 'number',
  autocomplete: 'off',
}]
const addFriend = () => {

}
</script>
<template>
  <div class="w-3/4 h-full mx-auto mt-10 flex flex-row">
    <div class="w-1/12 flex flex-col">
      <img
        class="w-full scale-75"
        :src="!!user.profilePicture ? '' : '/default-avatar.svg'"
        :alt="user.username"
      />
      <span class="text-center my-5" @click="addFriend">+</span>
      <span class="text-center my-5" @click="createChatRoom">+</span>
      <span class="text-center my-5">人</span>
      <span class="text-center my-5">群</span>
    </div>
    <div class="custom-scrollbar w-1/6 max-h-[80vh] overflow-auto">
      <RouterLink v-for="index in 12" :key="index" :to="`/chat/${index}`">
        <ContactsCard :user="user" />
      </RouterLink>
    </div>
    <RouterView />
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
