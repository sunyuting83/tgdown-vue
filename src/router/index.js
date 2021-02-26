import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: HelloWorld
    }
  ]
})

export default router
