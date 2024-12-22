<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useUserStore } from './store/userStore';

import { useRouter } from 'vue-router';

const { setUser } = useUserStore();

const router = useRouter()

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
          if(data.value?.user) {
            setUser(data.value.user);
          }
          if (data.value?.token) {
            localStorage.setItem('token', data.value.token);
            router.push('/')
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
