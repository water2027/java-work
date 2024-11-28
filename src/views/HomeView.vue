<script setup lang="ts">
import { type CourseInfo } from '@/model/CourseInfo';
import { useRequest } from '@/api/request';

import { onMounted, ref } from 'vue';

import CourseCard from '@/components/CourseCard.vue';

// const { data, isLoading } = await useRequest<CourseInfo[]>(
//   '/api/course/list',
//   {
//     method: 'GET',
//   },
//   false
// );

const data = ref<CourseInfo[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  setTimeout(() => {
    // 模拟请求数据
    data.value = [
      {
        id: 1,
        name: '数学',
        teacher: '张老师',
        score: 95,
        start: new Date('2023-09-01'),
        end: new Date('2023-12-15'),
        isExam: true,
        examTime: new Date('2023-12-16T09:00:00'),
        location: '教学楼A201',
        time: '周一 10:00-12:00',
      },
      {
        id: 2,
        name: '英语',
        teacher: '李老师',
        score: 88,
        start: new Date('2023-09-02'),
        end: new Date('2023-12-16'),
        isExam: false,
        location: '教学楼B302',
        time: '周二 14:00-16:00',
      },
      {
        id: 3,
        name: '物理',
        teacher: '王老师',
        score: 92,
        start: new Date('2023-09-03'),
        end: new Date('2023-12-17'),
        isExam: true,
        examTime: new Date('2023-12-18T10:00:00'),
        location: '教学楼C103',
        time: '周三 09:00-11:00',
      },
      {
        id: 4,
        name: '化学',
        teacher: '赵老师',
        score: 85,
        start: new Date('2023-09-04'),
        end: new Date('2023-12-18'),
        isExam: false,
        location: '教学楼D204',
        time: '周四 13:00-15:00',
      },
      {
        id: 5,
        name: '历史',
        teacher: '孙老师',
        score: 90,
        start: new Date('2023-09-05'),
        end: new Date('2023-12-19'),
        isExam: true,
        examTime: new Date('2023-12-20T11:00:00'),
        location: '教学楼E305',
        time: '周五 08:00-10:00',
      },
      {
        id: 1,
        name: '数学',
        teacher: '张老师',
        score: 95,
        start: new Date('2023-09-01'),
        end: new Date('2023-12-15'),
        isExam: true,
        examTime: new Date('2023-12-16T09:00:00'),
        location: '教学楼A201',
        time: '周一 10:00-12:00',
      },
      {
        id: 2,
        name: '英语',
        teacher: '李老师',
        score: 88,
        start: new Date('2023-09-02'),
        end: new Date('2023-12-16'),
        isExam: false,
        location: '教学楼B302',
        time: '周二 14:00-16:00',
      },
      {
        id: 3,
        name: '物理',
        teacher: '王老师',
        score: 92,
        start: new Date('2023-09-03'),
        end: new Date('2023-12-17'),
        isExam: true,
        examTime: new Date('2023-12-18T10:00:00'),
        location: '教学楼C103',
        time: '周三 09:00-11:00',
      },
      {
        id: 4,
        name: '化学',
        teacher: '赵老师',
        score: 85,
        start: new Date('2023-09-04'),
        end: new Date('2023-12-18'),
        isExam: false,
        location: '教学楼D204',
        time: '周四 13:00-15:00',
      },
      {
        id: 2,
        name: '英语',
        teacher: '李老师',
        score: 88,
        start: new Date('2023-09-02'),
        end: new Date('2023-12-16'),
        isExam: false,
        location: '教学楼B302',
        time: '周二 14:00-16:00',
      },
      {
        id: 3,
        name: '物理',
        teacher: '王老师',
        score: 92,
        start: new Date('2023-09-03'),
        end: new Date('2023-12-17'),
        isExam: true,
        examTime: new Date('2023-12-18T10:00:00'),
        location: '教学楼C103',
        time: '周三 09:00-11:00',
      },
      {
        id: 4,
        name: '化学',
        teacher: '赵老师',
        score: 85,
        start: new Date('2023-09-04'),
        end: new Date('2023-12-18'),
        isExam: false,
        location: '教学楼D204',
        time: '周四 13:00-15:00',
      },
    ];
    isLoading.value = false;
  },3000);
});
</script>

<template>
  <div>
    <div v-if="!isLoading">
      <div class="columns-1 md:columns-2 lg:columns-3 gap-4">
        <div
          v-for="course in data"
          :key="course.id"
          class="mb-4 break-inside-avoid"
        >
          <CourseCard :info="course" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="columns-1 md:columns-2 lg:columns-3 gap-4">
        <div v-for="index in 9" :key="index" class="mb-4 break-inside-avoid">
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
      </div>
    </div>
  </div>
</template>
