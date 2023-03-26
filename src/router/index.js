import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import info from '@/views/movie-info.vue'
import sessions from '@/views/movie-sessions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('@/views/sessions.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/views/movie.vue'),
      redirect: {name: 'info'},
      
      children: [
        {
          path: 'info',
          name: 'info',
          component: info
        },
        {
          path: 'sessions',
          name: 'sessions',
          component: sessions
        },
      ]

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
