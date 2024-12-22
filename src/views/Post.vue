<template>
  <div class="posts-container">
    <!-- 使用 v-if 确保 posts 已经加载完成 -->
    <el-card
      v-for="post in posts"
      :key="post.id"
      shadow="hover"
      v-if="!isLoading"
      class="post-card"
    >
      <div slot="header" class="clearfix">
        <span>{{ post.authorName }}</span>
        <span style="margin-left: 10px; color: #99a9bf">{{
          post.createdAt
        }}</span>
      </div>
      <div class="post-content">
        <h3>{{ post.title }}</h3> <!-- 显示帖子标题 -->
        <p>{{ post.content }}</p> <!-- 显示帖子内容 -->
      </div>
      <div class="post-meta">
        <!-- 显示评论和收藏数量 -->
<<<<<<< HEAD
        <span>💬 {{ post.comments?.length || 0 }}</span>
        <span>❤️ {{ post.likes?.length || 0 }}</span>
=======
        <span>💬 {{ post.comments?.length || 0 }}</span> <!-- 显示评论数量 -->
        <span>❤️ {{ post.likes?.length || 0 }}</span> <!-- 显示收藏（喜欢）数量 -->
>>>>>>> e10b7f211c9f3d804ae26a88b56c04bdb1249a61
      </div>
    </el-card>
    <!-- 如果帖子正在加载或加载失败，显示相应消息 -->
    <div v-else-if="isLoading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // 引入 vue-router
import { GetAllPosts } from '@/api/PostApi/GetAll';
import { showMsg } from '@/components/MessageBox';
import { GetUserByID } from '@/api/UserApi/GetByID';
import { GetFavoritesByPostId } from '@/api/FavouriteApi/GetFavoritesByPostId';
import { GetCommentsByPostId } from '@/api/CommentApi/GetCommentsByPostId';

// 定义响应式变量
const userCache = ref({}); // 用户信息缓存
const commentCounts = ref({}); // 每个帖子的评论数量缓存
const favoriteCounts = ref({}); // 每个帖子的收藏数量缓存

const router = useRouter(); // 初始化路由

// 获取所有帖子的方法
const { data: posts, isLoading, err } = GetAllPosts();

// 监听加载状态的变化
watch(isLoading, async () => {
  if (!err.value) {
    fetchPostInfo();
  } else {
    showMsg(err.value);
  }
});

// 获取帖子附加信息的方法
const fetchPostInfo = async () => {
  for (let i = 0; i < posts.value.length; ++i) {
    const {
      data: authorInfo,
      isLoading: authorIsLoading,
      err: authorErr,
    } = GetUserByID(posts.value[i].authorId);

    watch(authorIsLoading, () => {
      if (!authorErr.value) {
        posts.value[i].authorName = authorInfo.value.username;
      } else {
        showMsg(authorErr.value);
      }
    });

    const {
      data: comments,
      isLoading: commentIsLoading,
      err: commentErr,
    } = GetCommentsByPostId(posts.value[i].id);

    watch(commentIsLoading, () => {
      if (!commentErr.value) {
        posts.value[i].comments = comments.value;
      } else {
        showMsg(commentErr.value);
      }
    });

    const {
      data: likes,
      isLoading: likeIsLoading,
      err: likeErr,
    } = GetFavoritesByPostId(posts.value[i].id);

    watch(likeIsLoading, () => {
      if (!likeErr.value) {
        posts.value[i].likes = likes.value;
      } else {
        showMsg(likeErr.value);
      }
    });
    
  }
};
</script>

<style scoped>
/* 样式部分 */
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 帖子之间的间距 */
}

.post-card {
  position: relative;
  /* 确保 .post-meta 能够相对于卡片定位 */
  background: linear-gradient(180deg, #e5e5e5, #ffffff);
  /* 银灰色到白色的渐变 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  /* 悬浮阴影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  /* 过渡效果，包括背景渐变变化 */
}

.post-card:hover {
  transform: translateY(-5px);
  /* 鼠标悬停时稍微上移 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  /* 更强的阴影 */
  background: linear-gradient(180deg, #f0f0f0, #ffffff);
  /* 修改悬停时的渐变 */
}

.clearfix {
  padding: 10px 15px;
  border-bottom: 1px solid #ebebeb; /* 分隔线 */
}

.post-content {
  padding: 20px;
  font-size: 1rem;
  line-height: 1.6;
}

.post-content h3 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #333;
}

.post-content p {
  color: #666;
}

.post-meta {
  position: absolute; /* 绝对定位 */
  bottom: 10px; /* 距离卡片底部10px */
  right: 15px; /* 改为距离卡片右边15px */
  font-size: 0.9rem;
  color: #666;
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* emoji 和文本之间的间距 */
}

/* 样式化 emoji 图标 */
.post-meta span {
  display: flex;
  align-items: center;
}

.post-meta span::before {
  content: attr(data-icon); /* 使用 data-icon 属性动态设置图标 */
  font-size: 1.2em; /* 增大图标 */
  margin-right: 5px; /* 在图标和数字之间添加一点间距 */
  vertical-align: middle; /* 确保图标和文本垂直居中对齐 */
}
</style>