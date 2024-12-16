<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { Login } from './api/UserApi/Login';
onMounted(() => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const email = localStorage.getItem('email') as string;
    const password = localStorage.getItem('password') as string;
    const { data, isLoading, err } = Login({
      email: email,
      password: password,
    });
    watch(isLoading, () => {
      if (err.value) {
        console.log(err);
      } else {
        if (!isLoading.value) {
          if (data.value?.token) {
            localStorage.setItem('token', data.value.token);
          }
        }
      }
    });
  }
});
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('token');
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
