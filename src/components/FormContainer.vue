<script setup lang="ts">
import { type CustomFormData } from '@/composables/FormExam';

import FormInput from '@/components/FormInput.vue';

defineProps({
  formName: {
    type: String,
    required: false,
    default: '提交',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  formData: {
    type: Array as () => CustomFormData[],
    required: true,
  },
});
</script>
<template>
  <form
    class="bg-[#4545453d] p-12 mx-auto"
    @submit.prevent="$emit('SubmitForm')"
  >
    <FormInput
      v-for="item in formData"
      :id="item.id"
      :label="item.label"
      v-model="item.value"
      :type="item.type || ''"
      :autocomplete="item.autocomplete || 'off'"
    />
    <slot></slot>
    <button
      :disabled="disabled"
      class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
      type="submit"
    >
      {{ disabled ? '请填写完整信息' : formName }}
    </button>
  </form>
</template>
