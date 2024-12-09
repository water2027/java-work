<script setup lang="ts">
import { ref, watch } from 'vue';

import { type CustomFormData } from '@/model/CustomFormData';

import { useFormExam } from '@/composables/FormExam';

import { GetAllCourse } from '@/api/CourseApi/GetAll';

import { CreateChatRoom } from '@/api/ChatRoomApi/Create';

import FormInput from '@/components/FormInput.vue';
import { showMsg } from './MessageBox';

const { data: courses, isLoading } = GetAllCourse();

const props = defineProps({
  close: {
    type: Function,
    required: true,
  },
});

const formData = ref<CustomFormData[]>([
  {
    id: '聊天室名称',
    label: '聊天室名称',
    value: '',
    type: 'text',
    autocomplete: 'off',
  },
]);

const { correct } = useFormExam(formData);

const selectedCourse = ref(0);

const submitHandler = () => {
  const { isLoading, err } = CreateChatRoom({
    name: formData.value[0].value,
    courseId: selectedCourse.value,
  });
  watch(isLoading, () => {
    if (err.value) {
      showMsg(err.value);
    } else {
      showMsg('success');
    }
    props.close();
  });
};
</script>

<template>
  <div
    class="absolute z-10 w-[30vw] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-10"
  >
    <form @submit.prevent="submitHandler">
      <FormInput
        v-for="item in formData"
        :key="item.id"
        :id="item.id"
        :label="item.label"
        v-model="item.value"
        :type="item.type || ''"
        :autocomplete="item.autocomplete || 'off'"
      />
      <select v-if="!isLoading" v-model="selectedCourse">
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.name }}
        </option>
      </select>
      <button
        :disabled="!correct || isLoading"
        class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
        type="submit"
      >
        {{ correct ? '创建' : '请填写完整信息' }}
      </button>
      <button 
        @click="()=>props.close()"
        class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
      >退出</button>
    </form>
  </div>
</template>
