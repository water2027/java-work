<script setup lang="ts">
import { type User } from '@/store/userStore';

import { ref } from 'vue';

import ContactsCard from '@/components/ContactsCard.vue';

const user = ref<User>({
  email: '',
  username: 'www',
  profilePicture: '',
});
</script>
<template>
  <div class="w-3/5 h-full mx-auto mt-10 flex flex-row">
    <div class="custom-scrollbar w-1/5 max-h-[80vh] overflow-auto">
      <ContactsCard v-for="index in 12" :key="index" :user="user" />
    </div>
    <div class="w-4/5 flex flex-col border border-slate-500 h-[80vh]">
      <h2 class="text-center">{{ user.username }}</h2>
      <div class="h-[75vh]">

      </div>
      <div class="h-[10vh] w-full bg-slate-500">
        <textarea class="h-full w-full border border-slate-900"></textarea>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  border: 2px solid #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>