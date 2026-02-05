import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import LogIn from '@/views/auth/LogIn.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GuestLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: LogIn
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: ForgotPassword
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: ResetPassword
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
