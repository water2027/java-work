<script setup lang="ts">

import { useUserStore } from '@/store/userStore';
import { GetAllFriends } from '@/api/FriendShipApi/GetAllFriends';
import FriendCard from '@/components/FriendCard.vue';
import { watch } from 'vue';
import { showMsg } from '@/components/MessageBox';

const { user } = useUserStore();

console.log(user.value);

const { data: friendships } = GetAllFriends(user.value.id);

const refreshFriends = async () => {
  const { data, isLoading, err } = GetAllFriends(user.value.id);
  watch(isLoading, (newData) => {
    if(err.value){
      showMsg(err.value);
    }else{
      friendships.value = data.value;
    }
  });
};

</script>
<template>
  <div class="flex flex-wrap mx-10 gap-10">
    <FriendCard
      v-for="friendship in friendships"
      :key="friendship.id"
      :friendship="friendship"
      @delete="refreshFriends"
    />
  </div>
</template>
