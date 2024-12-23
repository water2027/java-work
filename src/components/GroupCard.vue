<script setup lang="ts">
import { type PropType } from 'vue';
import { type ChatRoomReturn } from '@/model/dto/ChatRoomApi/ChatRoom';

import { showMsg } from './MessageBox';
import { addMemberToChatRoom } from '@/api/ChatRoomMemberApi/GetAll';

import { useUserStore } from '@/store/userStore';

const { user } = useUserStore();

const props = defineProps({
  groupInfo: {
    type: Object as PropType<ChatRoomReturn>,
    required: true,
  },
});

const enterChatRoom = async () => {
  const { err: AddMemberErr } = await addMemberToChatRoom({
    chatRoomId: props.groupInfo.id,
    userId: user.value?.id,
  });
  if (AddMemberErr) {
    showMsg(AddMemberErr);
  } else {
    showMsg('加入成功');
  }
};
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 w-full mx-auto flex flex-col">
    <h2 class="text-xl font-bold mb-2">{{ groupInfo.name }}</h2>
    <div>
      <button @click="enterChatRoom">加入</button>
    </div>
  </div>
</template>
