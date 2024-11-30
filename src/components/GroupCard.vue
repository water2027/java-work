<script setup lang="ts">
import { type PropType } from 'vue';
import { type GroupInfo } from '@/model/GroupInfo';
import { type User } from '@/model/User';

defineProps({
  groupInfo: {
    type: Object as PropType<GroupInfo>,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 w-full mx-auto flex flex-col">
    <h2 class="text-xl font-bold mb-2">{{ groupInfo.name }}</h2>
    <p class="text-gray-600 mb-4">{{ groupInfo.description }}</p>
    
    <div class="flex items-center mb-2">
      <span class="font-semibold mr-2">Members:</span>
      <span>{{ groupInfo.members }}</span>
    </div>
    
    <div class="flex items-center mb-2">
      <span class="font-semibold mr-2">Created:</span>
      <span>{{ new Date(groupInfo.created).toLocaleDateString() }}</span>
    </div>
    
    <div class="flex items-center mb-2">
      <span class="font-semibold mr-2">Creator:</span>
      <div class="flex items-center">
        <img 
          v-if="groupInfo.creator.profilePicture" 
          :src="groupInfo.creator.profilePicture" 
          :alt="groupInfo.creator.username" 
          class="w-8 h-8 rounded-full mr-2"
        />
        <span>{{ groupInfo.creator.username }}</span>
      </div>
    </div>
    
    <div class="flex items-center">
      <span class="font-semibold mr-2">Status:</span>
      <span>
        {{ groupInfo.status === 1 ? 'Active' : 'Inactive' }}
      </span>
    </div>
    <div>
        <button>加入</button>
    </div>
  </div>
</template>