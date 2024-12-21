<script setup lang="ts">
import RequestReceivedCard from '@/components/RequestReceivedCard.vue';
import { ref } from 'vue';
import { type User } from '@/model/User';
import { type FriendRequestReturn } from '@/model/dto/FriendRequestApi/FriendRequest';

const friendRequests = ref<FriendRequestReturn[]>([
  {
    id: 1,
    senderUserId: 1,
    receiverUserId: 2,
    announcement: 'Hi, let\'s be friends!',
    createdAt: new Date(),
    status: 'PENDING',
  },
  {
    id: 2,
    senderUserId: 3,
    receiverUserId: 2,
    announcement: 'Hello, please accept my friend request.',
    createdAt: new Date(),
    status: 'PENDING',
  },
  {
    id: 3,
    senderUserId: 4,
    receiverUserId: 2,
    announcement: 'Let\'s connect!',
    createdAt: new Date(),
    status: 'APPROVED',
  },
  {
    id: 4,
    senderUserId: 5,
    receiverUserId: 2,
    announcement: 'Hope we can be friends.',
    createdAt: new Date(),
    status: 'REJECTED',
  },
  {
    id: 5,
    senderUserId: 6,
    receiverUserId: 2,
    announcement: 'Looking forward to connecting with you.',
    createdAt: new Date(),
    status: 'REJECTED',
  }
]);

const users = ref<User[]>([
  {
    id: 1,
    username: 'Alice',
    email: 'alice@example.com',
    password: '',
    profilePicture: '',
    role: '学生',
  },
  {
    id: 2,
    username: 'Current User',
    email: 'currentuser@example.com',
    password: '',
    profilePicture: '',
    role: '学生',
  },
  {
    id: 3,
    username: 'Bob',
    email: 'bob@example.com',
    password: '',
    profilePicture: '',
    role: '老师',
  },
  {
    id: 4,
    username: 'Charlie',
    email: 'charlie@example.com',
    password: '',
    profilePicture: '',
    role: '学生',
  },
  {
    id: 5,
    username: 'David',
    email: 'david@example.com',
    password: '',
    profilePicture: '',
    role: '老师',
  },
  {
    id: 6,
    username: 'Eve',
    email: 'eve@example.com',
    password: '',
    profilePicture: '',
    role: '学生',
  }

]);

const getUserById = (id: number): User | undefined => {
  return users.value.find(user => user.id === id);
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div v-for="(request, index) in friendRequests" :key="index">
      <RequestReceivedCard :request="request" :user="getUserById(request.senderUserId)!" />
    </div>
  </div>
</template>
