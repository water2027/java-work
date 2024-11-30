<script setup lang="ts">
import { type PropType } from 'vue';
import { type CourseInfo } from '@/model/CourseInfo';
defineProps({
  info: {
    type: Object as PropType<CourseInfo>,
    required: true,
  },
});
</script>
<template>
  <div
    class="relative flex flex-row bg-slate-400 p-4 py-8 m-2 shadow-md shadow-slate-700 before:content-['java大学'] before:absolute before:top-4 before:text-slate-500 before:opacity-80"
    :style="
      info.backgroundImage
        ? {
            backgroundImage: `url(${info.backgroundImage})`,
            objectFit: 'cover',
          }
        : {}
    "
  >
    <div class="w-[90%] flex flex-col *:my-2 *:w-full">
      <h2>
        {{ info.name }}
      </h2>
      <div class="*:flex *:flex-row *:mx-4 flex flex-row">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.99953 5.17007L4.02953 6.46007C2.09953 7.72007 2.09953 10.5401 4.02953 11.8001L10.0495 15.7301C11.1295 16.4401 12.9095 16.4401 13.9895 15.7301L19.9795 11.8001C21.8995 10.5401 21.8995 7.73007 19.9795 6.47007L13.9895 2.54007C12.9095 1.83007 11.1295 1.83007 10.0495 2.54007"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.62914 13.0801L5.61914 17.7701C5.61914 19.0401 6.59914 20.4001 7.79914 20.8001L10.9891 21.8601C11.5391 22.0401 12.4491 22.0401 13.0091 21.8601L16.1991 20.8001C17.3991 20.4001 18.3791 19.0401 18.3791 17.7701V13.1301"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.4004 15V9"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ info.teacher }}</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g fill="none" fill-rule="nonzero">
              <path d="M0 0h24v24H0z" />
              <path
                fill="#09244B"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v1h2a1 1 0 0 1 .117 1.993L15 10h-5a.5.5 0 0 0-.09.992L10 11h4a2.5 2.5 0 0 1 .164 4.995L14 16h-1v1a1 1 0 0 1-1.993.117L11 17v-1H9a1 1 0 0 1-.117-1.993L9 14h5a.5.5 0 0 0 .09-.992L14 13h-4a2.5 2.5 0 0 1-.164-4.995L10 8h1V7a1 1 0 0 1 1-1"
              />
            </g>
          </svg>
          <span>{{ info.score }}学分</span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          <span>{{ info.isExam ? '考试' : '考核' }}</span>
          <time :datetime="info.examTime?.toISOString()" v-if="info.isExam">{{
            info.examTime?.toLocaleDateString()
          }}</time>
        </div>
      </div>
      <div class="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <time :datetime="info.start.toISOString()">
          {{ info.start.toLocaleDateString() }} -
          {{ info.end.toLocaleDateString() }}
        </time>
      </div>
      <div class="flex flex-row">
        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <title />
          <g data-name="Layer 21" id="Layer_21">
            <path
              class="cls-1"
              d="M16,31a3,3,0,0,1-2.21-1C10.14,26,4,18.39,4,13.36A12.19,12.19,0,0,1,16,1,12.19,12.19,0,0,1,28,13.36c0,5-6.14,12.59-9.79,16.65A3,3,0,0,1,16,31ZM16,3A10.2,10.2,0,0,0,6,13.36c0,3.14,3.47,8.86,9.28,15.31a1,1,0,0,0,1.44,0C22.53,22.22,26,16.5,26,13.36A10.2,10.2,0,0,0,16,3Z"
            />
            <path
              class="cls-1"
              d="M16,19a6,6,0,1,1,6-6A6,6,0,0,1,16,19ZM16,9a4,4,0,1,0,4,4A4,4,0,0,0,16,9Z"
            />
          </g>
        </svg>
        <span>{{ info.location }} | {{ info.time }}</span>
      </div>
    </div>
    <div class="min-h-32 w-[10%] text-center my-auto">
      <RouterLink :to="'/course/' + info.id" class="text-slate-600"
        >加入</RouterLink
      >
      <span class="text-slate-600">收藏</span>
    </div>
  </div>
</template>
