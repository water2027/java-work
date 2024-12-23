<template>
  <div v-if="post">
    <el-card class="post-detail-card">
      <div slot="header" class="clearfix">
        <span>{{ post.authorName }}</span>
        <span style="margin-left: 10px; color: #99a9bf">{{
          post.createdAt
        }}</span>
        <!-- 动作按钮（评论、收藏） -->
        <div class="actions">
          <button @click="toggleCommentBox">💬 评论</button>
          <button @click="handleFavoriteClick">
            {{ isFavorited ? '❤️ 已收藏' : '❤️ 收藏' }}
          </button>
        </div>
      </div>
      <!-- 帖子内容 -->
      <div class="post-detail-content">
        <h2>{{ post.title }}</h2>
        <!-- 帖子标题 -->
        <p>{{ post.content }}</p>
        <!-- 帖子正文 -->
      </div>
      <!-- 评论输入框 -->
      <div v-if="isCommentBoxVisible" class="comment-input-section">
        <textarea
          v-model="newCommentContent"
          placeholder="写下你的评论..."
          rows="4"
        ></textarea>
        <!-- 用户输入评论内容 -->
        <button @click="submitComment">发送</button>
        <!-- 发送按钮，触发提交评论 -->
      </div>
      <!-- 如果存在评论，则显示评论列表 -->
      <div v-if="comments && comments.length > 0" class="comments-section">
        <el-card
          v-for="comment in comments"
          :key="comment.id"
          class="comment-card"
        >
          <div slot="header" class="clearfix comment-header">
            <span>{{ comment.authorName }}</span>
            <span style="margin-left: 10px; color: #99a9bf">{{
              comment.createdAt
            }}</span>
          </div>
          <p>{{ comment.content }}</p>
        </el-card>
      </div>
    </el-card>
  </div>
  <div v-else>加载中...</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { GetPostById } from '@/api/PostApi/GetByID';
import { GetCommentsByPostId } from '@/api/CommentApi/GetCommentsByPostId';
import { GetUserByID } from '@/api/UserApi/GetByID';
import { showMsg } from '@/components/MessageBox';
import { CreateComment } from '@/api/CommentApi/CreateComment';
import { useUserStore } from '@/store/userStore';
import { CreateFavorite } from '@/api/FavouriteApi/CreateFavorite';
import { DeleteFavoriteById } from '@/api/FavouriteApi/deleteFavoriteById';
import { GetFavoritesByPostId } from '@/api/FavouriteApi/GetFavoritesByPostId';

const { user } = useUserStore();
// 获取当前路由信息
const route = useRoute();
const postId = route.params.id;

// 定义响应式变量来存储帖子和评论数据
const newCommentContent = ref('');

// 定义是否显示评论输入框的状态
const isCommentBoxVisible = ref(false);
// 定义收藏状态
const isFavorited = ref(false);

// 获取帖子详情
const {
  data: post,
  isLoading: postIsLoading,
  err: postErr,
} = GetPostById(parseInt(postId));
watch(postIsLoading, async () => {
  if (!postErr.value) {
    // 更新帖子作者名称
    const { data: authorInfo, err: authorErr } = await GetUserByID(
      post.value.authorId
    );
    if (authorErr) {
      // showMsg(authorErr);
    } else {
      post.value.authorName = authorInfo.username;
    }

    // 检查当前用户是否已经收藏了这个帖子
    const { data: favorites, err: favoritesErr } = await GetFavoritesByPostId(
      postId
    );
    if (!favoritesErr && favorites) {
      isFavorited.value = favorites.some(
        (favorite) => favorite.authorId === user.value.id
      );
    }
  }
});

// 获取评论列表
const {
  data: comments,
  isLoading: commentIsLoading,
  err: commentErr,
} = GetCommentsByPostId(postId);
watch(commentIsLoading, async () => {
  if (!commentErr.value) {
    for (let i = 0; i < comments.value.length; ++i) {
      const { data: authorInfo, err: authorErr } = await GetUserByID(
        comments.value[i].authorId
      );
      if (authorErr) {
        // showMsg(authorErr);
      } else {
        comments.value[i].authorName = authorInfo.username;
      }
    }
  }
});

const reloadPost = () => {
  // 获取帖子详情
  const {
    data: postData,
    isLoading: postIsLoading,
    err: postErr,
  } = GetPostById(parseInt(postId));
  watch(postIsLoading, async () => {
    if (!postErr.value) {
      post.value = postData.value;
      // 更新帖子作者名称
      const { data: authorInfo, err: authorErr } = await GetUserByID(
        post.value.authorId
      );
      if (authorErr) {
        // showMsg(authorErr);
      } else {
        post.value.authorName = authorInfo.username;
      }

      // 检查当前用户是否已经收藏了这个帖子
      const { data: favorites, err: favoritesErr } = await GetFavoritesByPostId(
        postId
      );
      if (!favoritesErr && favorites) {
        isFavorited.value = favorites.some(
          (favorite) => favorite.authorId === user.value.id
        );
      }
    }
  });
};

const reloadComments = async () => {
  // 获取评论列表
  const {
    data: commentsData,
    isLoading: commentIsLoading,
    err: commentErr,
  } = GetCommentsByPostId(postId);
  watch(commentIsLoading, async () => {
    comments.value = commentsData.value;
    if (!commentErr.value) {
      for (let i = 0; i < comments.value.length; ++i) {
        const { data: authorInfo, err: authorErr } = await GetUserByID(
          comments.value[i].authorId
        );
        if (authorErr) {
          // showMsg(authorErr);
        } else {
          comments.value[i].authorName = authorInfo.username;
        }
      }
    }
  });
};

// 切换评论输入框的可见性
const toggleCommentBox = () => {
  isCommentBoxVisible.value = !isCommentBoxVisible.value;
};
// 提交评论的方法
const submitComment = async () => {
  if (!newCommentContent.value.trim()) {
    showMsg('评论不能为空');
    return;
  }

  // 创建评论的数据对象
  const commentData = {
    postId: post.value.id,
    content: newCommentContent.value,
    authorId: user.value.id,
  };

  const { err: createErr } = await CreateComment(commentData);
  if (createErr) {
    showMsg(createErr);
  } else {
    // 成功后刷新评论列表并隐藏输入框
    reloadComments();
    newCommentContent.value = ''; // 清空输入框
    isCommentBoxVisible.value = false;
    showMsg('评论成功！');
  }
};

// 处理收藏按钮点击事件
const handleFavoriteClick = async () => {
  await toggleFavorite();
};

// 切换收藏状态
const toggleFavorite = async () => {
  if (isFavorited.value) {
    // 如果已经收藏，则尝试删除收藏
    const { data: favoriteList, err: getFavErr } = await GetFavoritesByPostId(
      post.value.id
    );
    if (getFavErr) {
      showMsg(getFavErr);
    } else {
      const favoriteRecord = favoriteList.find(
        (fav) => fav.authorId === user.value.id
      );
      const { err: deleteErr } = await DeleteFavoriteById(favoriteRecord.id);

      if (deleteErr) {
        showMsg(deleteErr);
      } else {
        isFavorited.value = false;
        showMsg('取消成功');
      }
    }
  } else {
    // 如果没有收藏，则尝试创建收藏
    const favoriteData = {
      postId: post.value.id,
      authorId: user.value.id,
    };

    const { err: createErr } = await CreateFavorite(favoriteData);
    if (createErr) {
      showMsg(createErr);
    } else {
      isFavorited.value = true;
      showMsg('成功');
    }
  }
  reloadPost();
};
</script>

<style scoped>
.create-post-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 占满整个视口高度 */
  background-color: #e6f7ff; /* 浅蓝色背景 */
}

.create-post-card {
  width: 80%; /* 增加宽度 */
  max-width: 800px; /* 设置最大宽度 */
  padding: 40px; /* 增加内边距 */
  background-color: #ffffff; /* 白色背景 */
  border-radius: 16px; /* 较大的圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 更强的阴影效果 */
  text-align: center; /* 居中文本 */
}

h2 {
  font-size: 2rem; /* 增大标题字体 */
  color: #333333; /* 深灰色文字 */
  margin-bottom: 20px; /* 下边距 */
}

.el-form {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 表单项之间的间距 */
}

.el-form-item__label {
  font-size: 1.1rem; /* 增大标签字体 */
  color: #555555; /* 灰色标签文字 */
}

.el-input__inner,
.el-textarea__inner {
  font-size: 1rem; /* 增大输入框字体 */
  padding: 12px; /* 增加输入框内边距 */
  border-radius: 8px; /* 输入框圆角 */
  border: 1px solid #dcdfe6; /* 边框颜色 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #409eff; /* 焦点时改变边框颜色 */
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5); /* 焦点时添加阴影 */
}

.el-button {
  font-size: 1rem; /* 增大按钮字体 */
  padding: 12px 24px; /* 增加按钮内边距 */
  border-radius: 8px; /* 按钮圆角 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.el-button--primary {
  background-color: #409eff; /* 主按钮背景颜色 */
  border-color: #409eff; /* 主按钮边框颜色 */
}

.el-button--primary:hover {
  background-color: #66b1ff; /* 主按钮悬停背景颜色 */
  border-color: #66b1ff; /* 主按钮悬停边框颜色 */
}

.el-button + .el-button {
  margin-left: 10px; /* 按钮之间的间距 */
}

/* 针对帖子详情卡片的样式 */
.post-detail-card {
  margin-bottom: 20px;
  background-color: #fff; /* 确保卡片背景为白色 */
}

.post-detail-content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0;
  color: #333;
}

.clearfix .actions {
  float: right;
  display: flex;
  gap: 10px;
}

.comments-section {
  margin-top: 20px;
}

.comment-card {
  margin-bottom: 10px;
  background: linear-gradient(
    180deg,
    #e5e5e5,
    #ffffff
  ); /* 背景恢复到原来的渐变 */
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.comment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    180deg,
    #f0f0f0,
    #ffffff
  ); /* 悬停时背景也恢复到原来的渐变 */
}

.comment-header {
  padding: 10px 15px;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff; /* 头部背景改为白色 */
}

.comment-input-section {
  margin-top: 15px;
  background-color: #fff; /* 输入框区域背景改为白色 */
}

.comment-input-section textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  background-color: #fff; /* 确保文本区域背景为白色 */
}

.comment-input-section button {
  display: block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-input-section button:hover {
  background-color: #45a049;
}
</style>
