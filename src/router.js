import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index')
    },
    {
      path: '/load',
      name: 'load',
      component: () => import('@/views/Load')
    },
    {
      path: '/display',
      name: 'display',
      component: () => import('@/views/Display'),
      props: true
    },
    {
      path: '*',
      component: () => import('@/views/Index')
    }
  ]
})

export default router;