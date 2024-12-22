<script setup lang="ts">
import RequestReceivedCard from '@/components/RequestReceivedCard.vue';
import { ref } from 'vue';
import { type User } from '@/model/User';
import { type FriendRequestReturn } from '@/model/dto/FriendRequestApi/FriendRequest';
import { GetReceivedRequests } from '@/api/FriendShipApi/GetReceivedRequest';
import { useUserStore } from '@/store/userStore';

const {user} = useUserStore();

const {data: friendRequests, isLoading, err} = GetReceivedRequests(user.value.id);

</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <template v-if="friendRequests">
      <div v-for="request in friendRequests" :key="request.id">
          <RequestReceivedCard
            :request="request"
          />
      </div>
    </template>
  </div>
</template>
