import { createRouter, createWebHistory } from 'vue-router'
import movies from '@/views/movies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: movies
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('@/views/sessions.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/views/info.vue')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('@/views/book.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about.vue')
    },
  ]
})

export default router
