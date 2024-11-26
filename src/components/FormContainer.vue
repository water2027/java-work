<script setup lang="ts">
defineProps({
  formName: {
    type: String,
    required: false,
    default: '提交',
  },
});
</script>
<template>
  <form class="bg-[#4545453d] p-12 mx-auto" @submit.prevent="$emit('SubmitForm')">
    <slot></slot>
    <button class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b]" type="submit">{{ formName }}</button>
  </form>
</template>
