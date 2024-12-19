<template>
  <div class="posts-container">
    <!-- 使用 v-if 确保 posts 已经加载完成 -->
    <el-card v-for="post in posts" :key="post.id" shadow="hover" v-if="!isLoading">
      <div slot="header" class="clearfix">
        <span>{{ getAuthorName(post.authorId) }}</span>
        <span style="margin-left: 10px; color: #99a9bf">{{ post.createdAt }}</span>
      </div>
      <div class="post-content">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </el-card>
    <!-- 如果帖子正在加载或加载失败，显示相应消息 -->
    <div v-else-if="isLoading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { GetAllPosts } from '@/api/PostApi/GetAll';
import { showMsg } from '@/components/MessageBox';
import { GetUserByID } from '@/api/UserApi/GetByID';

// 定义响应式变量
const userCache = ref({}); // 用户信息缓存

// 获取所有帖子的方法
const { data: posts, isLoading, err } = GetAllPosts();

watch(isLoading, async () => {
  if (!err.value) {
    await fetchUsers();
  }else{
    showMsg(err.value)
  }
})


// 批量获取用户信息的方法
async function fetchUsers() {
  // 获取所有帖子的作者 ID 并去重
  const authorIds = [...new Set(posts.value.map(post => post.authorId))];

  // 批量获取所有作者信息
  await Promise.all(authorIds.map(async id => {
    try {
      const { data: userInfo, isLoading, err } = await GetUserByID(id); // 假设 GetUserByID 返回 useRequest 的结果
      watch(isLoading, ()=>{
        if(err.value){
          showMsg(err.value)
        }else{
          userCache.value[id] = userInfo.value.username;
        }
      })
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      userCache.value[id] = 'Unknown User';
    }
  }));
}

// 获取作者名称的方法
function getAuthorName(authorId) {
  return userCache.value[authorId] || 'Unknown User';
}

</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-content {
  padding: 10px;
}
</style>
