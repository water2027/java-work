<script setup lang="ts">
import GroupCard from '@/components/GroupCard.vue';

import { GetAllChatRooms } from '@/api/ChatRoomApi/GetAll';

import { watch } from 'vue';
import { showMsg } from '@/components/MessageBox';

const { data: groupInfos, isLoading, err } = GetAllChatRooms();

watch(isLoading,()=>{
  // 如果名字以 Private 开头，移出
  if(err.value){
    showMsg(err.value);
  }else{
    groupInfos.value = groupInfos.value?.filter((group) => {
      return !group.name.startsWith('Private');
    });
  }
})

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
