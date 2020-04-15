import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index')
    },
    {
      path: '/load',
      component: () => import('@/views/Load')
    },
    {
      path: '/display',
      component: () => import('@/views/Display')
    },
    {
      path: '*',
      component: () => import('@/views/Index')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router;