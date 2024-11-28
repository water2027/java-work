import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/HomeView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=>import('@/layout/AuthLayout.vue'),
      children:[
        {
          path: 'login',
          name: 'login',
          component: ()=>import('@/views/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: ()=>import('@/views/RegisterView.vue')
        },
        {
          path: 'reset',
          name: 'reset',
          component: ()=>import('@/views/ResetView.vue')
        },
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: ()=>import('@/views/ProfileView.vue'),
    }
  ],
});

export default router;
