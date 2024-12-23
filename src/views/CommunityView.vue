<script setup lang="ts">
import GroupCard from '@/components/GroupCard.vue';

import { GetPublicChatRoomsByUserId } from '@/api/ChatRoomApi/GetAll';

import { useUserStore } from '@/store/userStore';

const { user } = useUserStore();

const { data: groupInfos, isLoading } = GetPublicChatRoomsByUserId(user.value.id);

</script>
<template>
  <div
    v-if="!isLoading"
    class="grid grid-cols-3 w-9/12 h-[120vh] mx-auto gap-3"
  >
    <GroupCard v-for="group in groupInfos" :group-info="group" />
  </div>
  <div v-else class="grid grid-cols-3 w-9/12 h-[120vh] mx-auto gap-3">
    <div 
      v-for="n in 9"
      class="animate-pulse bg-white shadow-md rounded-lg p-6 w-full mx-auto flex flex-col"
    >
      <h2 class="text-xl font-bold mb-2">Loading...</h2>
      <p class="text-gray-600 mb-4">Please wait...</p>
    </div>
  </div>
</template>
