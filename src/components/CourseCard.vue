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
  >
    <!-- 参考电脑端选课界面 -->
    <div class="w-[95%] flex flex-col *:my-2 *:w-full">
      <h2>
        {{ info.name }}
      </h2>
      <div class="*:mx-5 *:flex *:flex-row *:w-auto flex flex-row">
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect
              x="3"
              y="3"
              width="10"
              height="10"
              rx="2"
              stroke="currentColor"
            />
            <path
              d="M3.5 6.5h9M6 2.5v2M10 2.5v2"
              stroke="currentColor"
              stroke-linecap="round"
            />
          </svg>
          <span>{{ info.isExam ? '考试' : '考核' }}</span>
          <time :datetime="info.examTime?.toISOString()" v-if="info.isExam">{{
            info.examTime?.toLocaleDateString()
          }}</time>
        </div>
        <div>
          <svg
            class="w-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            enable-background="new 0 0 32 32"
            version="1.1"
            viewBox="0 0 32 32"
            xml:space="preserve"
          >
            <g id="Outline_copy_2">
              <g>
                <path
                  d="M20.656,0.927C14.712-0.805,8.024,1.03,3.905,5.677c-4.619,5.209-5.21,13.064-1.4,18.897    c3.512,5.376,10.068,8.012,16.344,6.885c7.572-1.36,12.983-7.864,13.151-15.507C31.848,9.018,27.377,2.885,20.656,0.927z     M15.403,31.296C7.347,30.921,0.957,23.932,0.957,15.951c0-8.376,7.088-15.641,15.602-15.245    c8.173,0.381,14.271,7.362,14.445,15.345C30.822,24.423,24.044,31.698,15.403,31.296z"
                />
                <path
                  d="M20.778,20.095c-0.964-0.964-1.928-1.927-2.892-2.891c-0.373-0.372-1.211-0.926-1.41-1.409    c-0.179-0.433,0.002-1.322,0.002-1.799c0-1.341,0-2.682,0-4.023c0-1.951,0-3.901,0-5.852c0-0.26-0.994-0.194-0.994,0.111    c0,1.951,0,3.901,0,5.852c0,1.341,0,2.682,0,4.023c0,0.488-0.179,1.395,0.012,1.854c0.169,0.407,0.885,0.898,1.184,1.197    c0.935,0.935,1.87,1.87,2.805,2.804c1.441,1.441,2.882,2.881,4.323,4.322c0.212,0.212,1.124-0.035,0.947-0.212    C23.43,22.746,22.104,21.421,20.778,20.095z"
                />
              </g>
            </g>
          </svg>
          <time :datetime="info.start.toISOString()">
            {{ info.start.toLocaleDateString() }} -
            {{ info.end.toLocaleDateString() }}
          </time>
        </div>
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
    <div class="w-[5%] text-center my-auto">加入</div>
  </div>
</template>
