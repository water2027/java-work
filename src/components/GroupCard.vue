<script setup lang="ts">
import { type PropType } from 'vue';
import { type ChatRoomReturn } from '@/model/dto/ChatRoomApi/ChatRoom';

defineProps({
  groupInfo: {
    type: Object as PropType<ChatRoomReturn>,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 w-full mx-auto flex flex-col">
    <h2 class="text-xl font-bold mb-2">{{ groupInfo.name }}</h2>
  </div>
</template>