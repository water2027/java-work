<script setup lang="ts">
import { onMounted } from 'vue';

import { useUserStore } from './store/userStore';

import { useRouter } from 'vue-router';

const { setUser } = useUserStore();

const router = useRouter();

import { Login } from './api/UserApi/Login';
import { showMsg } from './components/MessageBox';
onMounted(() => {
  // 获取当前url，登录成功后继续前往
  const path = window.location.pathname;
  console.log(path)
  if (localStorage.getItem('rememberMe') === 'true') {
    const email = localStorage.getItem('email') as string;
    const password = localStorage.getItem('password') as string;
    Login({
      email: email,
      password: password,
    })
    .then(({data, err})=>{
      if(err){
        showMsg(err)
      }else{
          if(data?.user) {
            setUser(data.user);
          }
          if (data?.token) {
            localStorage.setItem('token', data.token);
          }
          router.push(path)
      }
    })
  }
});
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('token');
});
</script>

<template>
  <div>
    <h2>测试版，如遇网络错误可能是自证书原因浏览器认为不安全</h2>
    <RouterView />
  </div>
</template>
