import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('@/Layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/CoursesCenter.vue'),
          meta: {
            auth: true,
          },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta: {
            auth: true,
          },
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('@/views/CommunityView.vue'),
          meta: {
            auth: true,
          },
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/ChatAllView.vue'),
          children: [
            {
              path: ':id',
              name: 'chatroom',
              component: () => import('@/views/ChatDetailView.vue'),
              props: true,
            },
          ],
          meta: {
            auth: true,
          },
        },
        {
          path: 'friend',
          name: 'friend',
          component: () => import('@/views/FriendView.vue'),
          children: [
            {
              path: '',
              name: 'friendList',
              component: () => import('@/views/FriendListView.vue'),
            },
            {
              path: 'sent-request',
              name: 'sentRequest',
              component: () => import('@/views/FriendSentRequestView.vue'),
            },
            {
              path: 'received-request',
              name: 'receivedRequest',
              component: () => import('@/views/FriendReceivedRequestView.vue'),
            },
          ],
          meta: {
            auth: true,
          },
        },
        {
          path: '/postbar',
          name: 'postbar',
          component: () => import('@/views/PostBar.vue'), // 新的 PostBar 主页面
          children: [
            {
              path: '', // 默认子页面
              name: 'post',
              component: () => import('@/views/Post.vue'),
              meta: { auth: true },
            },
            {
              path: 'myhistory',
              name: 'myhistory',
              component: () => import('@/views/MyHistory.vue'),
              meta: { auth: true },
            },
            {
              path: 'myfavorite',
              name: 'myfavorite',
              component: () => import('@/views/MyFavorite.vue'),
              meta: { auth: true },
            },
            {
              path: 'createpost',
              name: 'createpost',
              component: () => import('@/views/CreatePost.vue'),
              meta: { auth: true },
            },
          ],
          meta: { auth: true },
        },
        {
          path: 'postcontent/:id',
          name: 'postcontent',
          component: () => import('@/views/PostContent.vue'),
          props: true,
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/Layout/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import('@/views/ResetView.vue'),
          meta: {
            auth: false,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next('/auth/login');
    }
  } else {
    next();
  }
});

export default router;
