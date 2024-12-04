<script setup lang="ts">
window.addEventListener('beforeunload', () => {
  if(localStorage.getItem('rememberMe') === 'false'){
    localStorage.removeItem('token');
  }
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
