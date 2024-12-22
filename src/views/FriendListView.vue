<script setup lang="ts">
import { type User } from '@/model/User';

import { type PropType } from 'vue';

// 引入FriendCard组件
import FriendCard from '@/components/FriendCard.vue';

const students: User[] = [
  { id: 1, username: '张三', email: 'zhangsan@school.com', role: '学生' },
  { id: 2, username: '李四', email: 'lisi@school.com', role: '学生' },
  { id: 3, username: '王五', email: 'wangwu@school.com', role: '学生' },
  { id: 4, username: '赵六', email: 'zhaoliu@school.com', role: '学生' },
  { id: 5, username: '孙七', email: 'sunqi@school.com', role: '学生' },
  { id: 6, username: '周八', email: 'zhouba@school.com', role: '学生' },
  { id: 7, username: '吴九', email: 'wujiu@school.com', role: '学生' },
  { id: 8, username: '郑十', email: 'zhengshi@school.com', role: '学生' },
  { id: 9, username: '冯十一', email: 'fengshiyi@school.com', role: '学生' },
  { id: 10, username: '陈十二', email: 'chenshieri@school.com', role: '学生' },
  { id: 11, username: '褚十三', email: 'chusanshi@school.com', role: '学生' },
  { id: 12, username: '卫十四', email: 'weishisi@school.com', role: '学生' },
  { id: 13, username: '蒋十五', email: 'jiangshiwu@school.com', role: '学生' },
  { id: 14, username: '沈十六', email: 'shenshiliu@school.com', role: '学生' },
  { id: 15, username: '韩十七', email: 'hanshiqin@school.com', role: '学生' },
  { id: 16, username: '杨十八', email: 'yangshiba@school.com', role: '学生' },
  { id: 17, username: '朱十九', email: 'zhushijiu@school.com', role: '学生' },
  { id: 18, username: '秦二十', email: 'qineri@school.com', role: '学生' },
  { id: 19, username: '尤二十一', email: 'youershiyi@school.com', role: '学生' },
  { id: 20, username: '许二十二', email: 'xuershier@school.com', role: '学生' },
]

</script>

<!-- 展示20个FriendCard，每行三个 -->
<template>
  <div class="flex flex-wrap mx-10 gap-10">
    <FriendCard v-for="user in students" :key="user.id" :user="user" class="flex-grow" />
  </div>
</template>

