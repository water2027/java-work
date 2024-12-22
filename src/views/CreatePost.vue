<template>
  <div class="create-post-container">
    <el-card shadow="hover" class="create-post-card">
      <h2>创建新帖子</h2>
      <el-form :model="postForm" :rules="rules" ref="postFormRef" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="postForm.title" placeholder="请输入帖子标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="postForm.content" :rows="4" placeholder="请输入帖子内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(postFormRef)">发送</el-button>
          <el-button @click="resetForm(postFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { CreatePost } from '@/api/PostApi/Create';
import { showMsg } from '@/components/MessageBox';
import { useUserStore } from '@/store/userStore';
const { user } = useUserStore()
const router = useRouter();
const postFormRef = ref(null);

// 表单数据对象
const postForm = ref({
  title: '',
  content: ''
});

// 表单验证规则
const rules = ref({
  title: [
    { required: true, message: '请输入帖子标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入帖子内容', trigger: 'blur' }
  ]
});

// 提交表单的方法
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const { isLoading, err } = CreatePost({ authorId: user.value.id, ...postForm.value, imageUrls:[] });
      watch(isLoading, () => {
        if (err.value) {
          showMsg(err.value)
        } else {
          // 清空表单并跳转到其他页面或刷新列表
          resetForm(formEl);
          router.push('/postbar'); // 示例：创建后跳转到帖子列表页
        }
      })
    } else {
      console.log('验证失败');
      return false;
    }
  });
};

// 重置表单的方法
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.create-post-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 占满整个视口高度 */
  background-color: #f5f7fa;
  /* 轻柔的背景颜色 */
}

.create-post-card {
  width: 80%;
  /* 增加宽度 */
  max-width: 800px;
  /* 设置最大宽度 */
  padding: 40px;
  /* 增加内边距 */
  background-color: #ffffff;
  /* 白色背景 */
  border-radius: 16px;
  /* 较大的圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* 更强的阴影效果 */
  text-align: center;
  /* 居中文本 */
}

h2 {
  font-size: 2rem;
  /* 增大标题字体 */
  color: #333333;
  /* 深灰色文字 */
  margin-bottom: 20px;
  /* 下边距 */
}

.el-form {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* 表单项之间的间距 */
}

.el-form-item__label {
  font-size: 1.1rem;
  /* 增大标签字体 */
  color: #555555;
  /* 灰色标签文字 */
}

.el-input__inner,
.el-textarea__inner {
  font-size: 1rem;
  /* 增大输入框字体 */
  padding: 12px;
  /* 增加输入框内边距 */
  border-radius: 8px;
  /* 输入框圆角 */
  border: 1px solid #dcdfe6;
  /* 边框颜色 */
  transition: all 0.3s ease;
  /* 添加过渡效果 */
}

.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #409eff;
  /* 焦点时改变边框颜色 */
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5);
  /* 焦点时添加阴影 */
}

.el-button {
  font-size: 1rem;
  /* 增大按钮字体 */
  padding: 12px 24px;
  /* 增加按钮内边距 */
  border-radius: 8px;
  /* 按钮圆角 */
  transition: all 0.3s ease;
  /* 添加过渡效果 */
}

.el-button--primary {
  background-color: #409eff;
  /* 主按钮背景颜色 */
  border-color: #409eff;
  /* 主按钮边框颜色 */
}

.el-button--primary:hover {
  background-color: #66b1ff;
  /* 主按钮悬停背景颜色 */
  border-color: #66b1ff;
  /* 主按钮悬停边框颜色 */
}

.el-button+.el-button {
  margin-left: 10px;
  /* 按钮之间的间距 */
}
</style>
