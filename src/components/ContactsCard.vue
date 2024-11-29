<script setup lang="ts">
import { type User } from '@/store/userStore';

import { type PropType } from 'vue';
defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
})
</script>
<template>
    <div class="flex flex-row hover:bg-slate-500 hover:opacity-60 p-3 py-1 cursor-pointer border border-slate-500">
        <img width="50" height="50" :src="!!user.profilePicture?'':'/default-avatar.svg'" :alt="user.username">
        <h2 class="my-auto">人名</h2>
    </div>
</template>