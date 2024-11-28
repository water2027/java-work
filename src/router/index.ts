import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=>import('@/views/AuthView.vue'),
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
