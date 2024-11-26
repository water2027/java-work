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
  <form class="bg-[#4545453d]" @submit.prevent="$emit('SubmitForm')">
    <slot></slot>
    <button type="submit">{{ formName }}</button>
  </form>
</template>
