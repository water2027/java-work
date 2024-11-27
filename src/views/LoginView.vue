<script setup lang="ts">
import { ref } from 'vue';
import FormContainer from '@/components/FormContainer.vue';

import { type CustomFormData, useFormExam } from '@/composables/FormExam';

const form = ref<CustomFormData[]>([
  {
    id: 'username',
    label: 'username',
    value: '',
    type: 'text',
    autocomplete: 'off',
  },
  {
    id: 'password',
    label: 'password',
    value: '',
    type: 'password',
    autocomplete: 'current-password',
  },
]);

const { correct } = useFormExam(form);

const loginHandler = () => {};
</script>
<template>
  <FormContainer
    class="w-1/2 mt-11"
    :form-data="form"
    :disabled="!correct"
    @submit-form="loginHandler"
  >
  </FormContainer>
</template>
