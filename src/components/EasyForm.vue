<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';

import { type CustomFormData } from '@/model/CustomFormData';

import { GetAllCourse } from '@/api/CourseApi/GetAll';

import FormInput from '@/components/FormInput.vue';

const { data: courses, isLoading } = GetAllCourse();

const props = defineProps({
  inputData: {
    type: Object as PropType<CustomFormData[]>,
    required: true,
  },
  submitHandler:{
    type: Function,
    required:true,
  },
  close: {
    type: Function,
    required: true,
  },
  isCourse:{
    type: Boolean,
    required: false,
    default: false,
  }
});

const selectedCourse = ref(0);

const submit = () => {
  const correct = props.inputData.every((item) => item.value !== '');
  if(!correct) return;
  if (props.isCourse) {
    props.submitHandler(selectedCourse.value);
  } else {
    props.submitHandler();
  }
}
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center"
  >
    <form class="z-10 w-[30vw] h-auto top-1/2 left-1/2 bg-slate-600 p-10" @submit.prevent="submit">
      <FormInput
        v-for="item in inputData"
        :key="item.id"
        :id="item.id"
        :label="item.label"
        v-model="item.value"
        :type="item.type || ''"
        :autocomplete="item.autocomplete || 'off'"
      />
      <select v-if="isCourse" v-model="selectedCourse">
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.name }}
        </option>
      </select>
      <button
        class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
        type="submit"
      >
        提交
      </button>
      <button
        @click="() => props.close()"
        class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
      >
        退出
      </button>
    </form>
  </div>
</template>
