<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import FormContainer from '@/components/FormContainer.vue';

import { useFormExam } from '@/composables/FormExam';
import { type CustomFormData } from '@/model/CustomFormData';

import { login } from '@/api/UserApi/Login';
import { type LoginSend } from '@/model/dto/UserApi/Login';

const router = useRouter();

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

const loginHandler = async () => {
  const infoSend: LoginSend = {
    email: form.value[0].value,
    password: form.value[1].value,
  };
  const { data, isLoading, err } = login(infoSend);
  watch(isLoading, (newVal) => {
    if (err.value) {
      console.log(err);
    } else {
      if (!isLoading.value) {
        if (data.value?.token) {
          localStorage.setItem('token', data.value.token);
          router.push('/');
        }
      } else {
        console.log('error');
      }
    }
  });
};
</script>
<template>
  <FormContainer
    class="w-1/2 mt-11"
    :form-data="form"
    :disabled="!correct"
    @submit-form="loginHandler"
  >
    <div class="flex flex-row justify-around">
      <router-link to="/auth/register">还没账号？</router-link>
      <router-link to="/auth/reset">忘记密码了？</router-link>
    </div>
  </FormContainer>
</template>
