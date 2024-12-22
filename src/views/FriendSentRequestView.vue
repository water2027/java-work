<script setup lang="ts">
import RequestSentCard from '@/components/RequestSentCard.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { type FriendRequestReturn } from '@/model/dto/FriendRequestApi/FriendRequest';
import { GetSentRequests } from '@/api/FriendShipApi/GetSendedRequest';

const {user} = useUserStore();

const { data: friendRequests, isLoading, err } = GetSentRequests(user.value.id);

//   {
//     id: 1,
//     senderUserId: 1,
//     receiverUserId: 1,
//     announcement: '你爸回家了，快开门！',
//     createdAt: new Date(),
//     status: 'PENDING',
//   },
//   {
//     id: 2,
//     senderUserId: 1,
//     receiverUserId: 3,
//     announcement: '我保证我不是机器人',
//     createdAt: new Date(),
//     status: 'PENDING',
//   },
//   {
//     id: 3,
//     senderUserId: 1,
//     receiverUserId: 4,
//     announcement: '我会告诉你我的银行卡密码',
//     createdAt: new Date(),
//     status: 'APPROVED',
//   },
//   {
//     id: 4,
//     senderUserId: 1,
//     receiverUserId: 5,
//     announcement: '你有一份新的快递，请查收！',
//     createdAt: new Date(),
//     status: 'REJECTED',
//   },
//   {
//     id: 5,
//     senderUserId: 1,
//     receiverUserId: 6,
//     announcement: '恭喜你中奖了，请联系我领取奖品！',
//     createdAt: new Date(),
//     status: 'REJECTED',
//   }
// ]);

// const users = ref<User[]>([
//   {
//     id: 1,
//     username: 'Alice',
//     email: 'alice@example.com',
//     password: '',
//     profilePicture: '',
//     role: '学生',
//   },
//   {
//     id: 2,
//     username: 'Current User',
//     email: 'currentuser@example.com',
//     password: '',
//     profilePicture: '',
//     role: '学生',
//   },
//   {
//     id: 3,
//     username: 'Bob',
//     email: 'bob@example.com',
//     password: '',
//     profilePicture: '',
//     role: '老师',
//   },
//   {
//     id: 4,
//     username: 'Charlie',
//     email: 'charlie@example.com',
//     password: '',
//     profilePicture: '',
//     role: '学生',
//   },
//   {
//     id: 5,
//     username: 'David',
//     email: 'david@example.com',
//     password: '',
//     profilePicture: '',
//     role: '老师',
//   },
//   {
//     id: 6,
//     username: 'Eve',
//     email: 'eve@example.com',
//     password: '',
//     profilePicture: '',
//     role: '学生',
//   }

// ]);

</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <template v-if="friendRequests">
      <div v-for="request in friendRequests" :key="request.id">
          <RequestSentCard
            :request="request"
          />
      </div>
    </template>
  </div>
</template>
