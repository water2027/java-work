<script setup lang="ts">
import { type User } from '@/model/User';

import { type PropType } from 'vue';
defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
  })
  </script>
  <template>
    <div class="flex hover:bg-slate-500 hover:opacity-60 p-1 cursor-pointer border border-slate-500 w-full">
      <img width="50" height="50" :src="user.profilePicture || '/default-avatar.svg'" :alt="user.username">
      <h2 class="my-auto ml-2">{{ user.username }}</h2>
    </div>
  </template>
