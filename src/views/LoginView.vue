<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import FormContainer from '@/components/FormContainer.vue';

import { useFormExam } from '@/composables/FormExam';
import { useUserStore } from '@/store/userStore';

import { type CustomFormData } from '@/model/CustomFormData';

import { Login } from '@/api/UserApi/Login';
import { type LoginSend } from '@/model/dto/UserApi/Login';
import { showMsg } from '@/components/MessageBox';

const router = useRouter();
const userStore = useUserStore();

//Vue3的响应式api,用来创建响应式变量,form
//即当这个值变化了,就会自动重新渲染dom(即每个元素)
const form = ref<CustomFormData[]>([
  {
    id: 'email',
    label: 'email',
    value: '',
    type: 'email',
    autocomplete: 'email',
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
const rememberMe = ref(false);

const loginHandler = async () => {
  const infoSend: LoginSend = {
    email: form.value[0].value,
    password: form.value[1].value,
  };
  const { data, err } = await Login(infoSend);
  if (err) {
    showMsg(err);
  } else {
    if (data?.token) {
      localStorage.setItem('token', data.token);
      userStore.setUser(data.user);
      if (rememberMe.value) {
        localStorage.setItem('email', form.value[0].value);
        localStorage.setItem('password', form.value[1].value);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      router.push('/');
    }
  }
};
</script>
<template>
  <FormContainer
    class="w-1/2 mt-11"
    :form-data="form"
    :disabled="!correct"
    @submit-form="loginHandler"
  >
    <input type="checkbox" v-model="rememberMe" />记住我
    <div class="flex flex-row justify-around">
      <router-link to="/auth/register">还没账号？</router-link>
      <router-link to="/auth/reset">忘记密码了？</router-link>
    </div>
  </FormContainer>
</template>
