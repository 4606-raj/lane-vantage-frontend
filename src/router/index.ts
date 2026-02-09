import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import LogIn from '@/views/auth/LogIn.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import { useAuthStore } from '@/stores/auth.store'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: GuestLayout,
      meta: { guest: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LogIn,
          meta: { guest: true },
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: ForgotPassword,
          meta: { guest: true },
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: ResetPassword,
          meta: { guest: true },
        },
      ]
    },
     {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const isGuest = to.matched.some(r => r.meta.guest)

  if (requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }

  if (isGuest && isLoggedIn) {
    return next({ name: 'home' })
  }


  next()
})

export default router
