<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const refresh = ref(false);

watch(
  () => route.path,
  () => {
    console.log('refresh');
    refresh.value = !refresh.value;
    nextTick(() => {
      refresh.value = !refresh.value;
    });
  }
);
</script>

<template>
  <div class="post-bar-container">
    <!-- 竖直的菜单栏 -->
    <aside class="sidebar">
      <ul class="menu">
        <li><RouterLink to="/postbar" exact-active-class="active">看看所有</RouterLink></li>
        <li><RouterLink to="/postbar/myhistory" active-class="active">我的历史</RouterLink></li>
        <li><RouterLink to="/postbar/myfavorite" active-class="active">我的收藏</RouterLink></li>
        <li><RouterLink to="/postbar/createpost" active-class="active">我发一个</RouterLink></li>
      </ul>
    </aside>

    <!-- 主要内容区 -->
    <main class="content">
      <template v-if="!refresh">
        <RouterView />
      </template>
      <template v-else>
        <div class="loading-screen flex justify-center items-center h-full">
          <div class="text-4xl text-white">加载中...</div>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.post-bar-container {
  display: flex;
  height: 100vh; /* 确保容器占满整个浏览器窗口的高度 */
  background-color: #e6f7ff; /* 非常浅的蓝色背景 */
}

.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #0d6efd; /* 菜单栏的蓝色背景 */
  color: white; /* 默认文字颜色为白色 */
}

.menu li {
  list-style-type: none;
  margin-bottom: 10px;
}

.menu a {
  text-decoration: none;
  color: white; /* 白色文字 */
  padding: 10px;
  display: block;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menu a:hover {
  background-color: #1e40af; /* 鼠标悬停时深蓝色背景 */
}

.menu a.active {
  background-color: #ffdd00; /* 选中时黄色背景 */
  color: black; /* 选中时黑色文字 */
  font-weight: bold;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow: auto; /* 如果内容超出屏幕高度则允许滚动 */
  background-color: #e6f7ff; /* 同样的非常浅的蓝色背景 */
}

.loading-screen {
  min-height: 80vh; /* 设置最小高度 */
}
</style>
