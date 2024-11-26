<script setup lang="ts">
import { ref } from 'vue';
import FormContainer from '@/components/FormContainer.vue';
import FormInput from '@/components/FormInput.vue';

const username = ref('');
const password = ref('');

const loginHandler = () => {
  console.log(username.value);
  console.log(password.value);
};
</script>
<template>
  <div>
    <FormContainer class="w-1/2 mt-11" @submit-form="loginHandler">
      <FormInput
        id="username"
        label="Username"
        type="text"
        v-model="username"
        autocomplete="current-password"
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        v-model="password"
        autocomplete="current-password"
      />
    </FormContainer>
  </div>
</template>
