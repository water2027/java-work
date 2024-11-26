<script setup lang="ts">
import { computed, ref } from 'vue';

import FormContainer from '@/components/FormContainer.vue';
import FormInput from '@/components/FormInput.vue';

const username = ref('');
const password = ref('');
const password2 = ref('');
const email = ref('');
const code = ref('');

// 密码强度校验 正则
const passwordReg = /^(?=.*@,_)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@,_]{8,12}$/;

const registerHandler = () => {
  console.log(username.value, password.value, password2.value, email.value, code.value);
};

const emailCorrect = computed(()=>{
  // 使用正则
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)
})

const sendVerificationCode = () => {
  console.log('发送验证码');
};

</script>
<template>
  <div>
    <FormContainer class="w-1/2 mt-12" formName="注册" @form-submit="registerHandler">
      <FormInput v-model="username" label="用户名" id="username" />
      <div>
        <!-- 用于告诉用户密码强度哪些不满足 -->
        
      </div>
      <FormInput v-model="password" label="密码" id="password" />
      <FormInput v-model="password2" label="确认密码" id="password2" />
      <FormInput v-model="email" label="邮箱" id="email" />
      <button type="button" :disabled="!emailCorrect" class="mb-2 w-full h-10 bg-[#eb6b26] disabled:bg-zinc-600 text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b]" @click="sendVerificationCode">{{ emailCorrect?'发送验证码':'需要正确的邮箱' }}</button>
      <FormInput v-model="code" label="验证码" id="code" />
    </FormContainer>
  </div>
</template>
