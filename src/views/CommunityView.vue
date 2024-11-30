<script setup lang="ts">
import GroupCard from '@/components/GroupCard.vue';

import { type User } from '@/model/User';
import { type GroupInfo } from '@/model/GroupInfo';

import { ref } from 'vue';

const mockUser: User = {
  username: 'john_doe',
  email: 'john@example.com',
};

const groupInfos: GroupInfo[] = [
  {
    id: 1,
    name: '开发团队',
    description: '负责软件开发',
    members: 5,
    created: '2023-01-10',
    creator: mockUser,
    status: 1,
  },
  {
    id: 2,
    name: '设计团队',
    description: '负责UI/UX设计',
    members: 3,
    created: '2023-02-15',
    creator: mockUser,
    status: 1,
  },
  {
    id: 3,
    name: '测试团队',
    description: '负责软件测试',
    members: 4,
    created: '2023-03-20',
    creator: mockUser,
    status: 1,
  },
  {
    id: 4,
    name: '市场团队',
    description: '负责市场推广',
    members: 6,
    created: '2023-04-25',
    creator: mockUser,
    status: 1,
  },
  {
    id: 5,
    name: '支持团队',
    description: '负责客户支持',
    members: 2,
    created: '2023-05-30',
    creator: mockUser,
    status: 1,
  },
  {
    id: 6,
    name: '人力资源',
    description: '负责招聘与培训',
    members: 3,
    created: '2023-06-05',
    creator: mockUser,
    status: 1,
  },
  {
    id: 7,
    name: '财务团队',
    description: '负责财务管理',
    members: 2,
    created: '2023-07-10',
    creator: mockUser,
    status: 1,
  },
  {
    id: 8,
    name: '运营团队',
    description: '负责日常运营',
    members: 4,
    created: '2023-08-15',
    creator: mockUser,
    status: 1,
  },
  {
    id: 9,
    name: '法律团队',
    description: '负责法律事务',
    members: 1,
    created: '2023-09-20',
    creator: mockUser,
    status: 1,
  },
  {
    id: 10,
    name: '战略团队',
    description: '负责公司战略规划',
    members: 2,
    created: '2023-10-25',
    creator: mockUser,
    status: 1,
  },
];

const col = ref(3);

const isLoading = ref(true);
</script>
<template>
  <div
    v-if="!isLoading"
    class="grid grid-cols-3 w-9/12 h-[120vh] mx-auto gap-3"
  >
    <GroupCard v-for="group in groupInfos" :group-info="group" />
  </div>
  <div v-else class="grid grid-cols-3 w-9/12 h-[120vh] mx-auto gap-3">
    <div 
      v-for="n in 9"
      class="animate-pulse bg-white shadow-md rounded-lg p-6 w-full mx-auto flex flex-col"
    >
      <h2 class="text-xl font-bold mb-2">Loading...</h2>
      <p class="text-gray-600 mb-4">Please wait...</p>
    </div>
  </div>
</template>
