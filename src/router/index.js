import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index'
import SetGlobalUrl from '@/components/SetGlobalUrl'
let routerList = []
const host = localStorage.getItem("host")
if (host !== null) {
  routerList = [...routerList,
    {
      path: '/',
      component: Index
    }
  ]
}else {
  routerList = [...routerList,
    {
      path: '/',
      component: SetGlobalUrl
    }
  ]
}
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: routerList
})


export default router
