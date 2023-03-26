import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import movie from '@/views/movie'
import movieInfo from '@/views/movie/info.vue'
import movieSessions from '@/views/movie/sessions.vue'

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
      name: 'all-sessions',
      component: () => import('@/views/sessions.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: movie,
      redirect: {name: 'info'},
      children: [
        {
          path: 'info',
          name: 'info',
          component: movieInfo,
          props: true
        },
        {
          path: 'sessions',
          name: 'sessions',
          component: movieSessions,
          props: true
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
