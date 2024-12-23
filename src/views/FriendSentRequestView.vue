<script setup lang="ts">
import RequestSentCard from '@/components/RequestSentCard.vue';
import { useUserStore } from '@/store/userStore';
import { GetSentRequests } from '@/api/FriendShipApi/GetSendedRequest';

const {user} = useUserStore();

const { data: friendRequests } = GetSentRequests(user.value.id);

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
