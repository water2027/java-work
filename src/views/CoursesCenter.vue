<script setup lang="ts">

import CourseCard from '@/components/CourseCard.vue';

import { GetAll } from '@/api/CourseApi/GetAll';

const { data, isLoading } = GetAll();

</script>

<template>
  <div class="flex flex-col mx-5">

    <template v-if="!isLoading && Array.isArray(data)">
      <div
        v-for="course in data"
        :key="course.id"
        class="mb-4 break-inside-avoid"
      >
        <CourseCard :CourseInfo="course" />
      </div>
    </template>
    <template v-else>
      <div v-for="index in 9" class="mb-4 break-inside-avoid">
        <div class="bg-white shadow-md p-4 rounded-lg h-[230px]">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items center">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="ml-4">
                <div class="w-24 h-4 bg-gray-200 rounded"></div>
                <div class="w-16 h-4 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
