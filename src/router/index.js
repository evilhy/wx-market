import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', // 公共入口页面getId
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ 'views/index.vue')
  },
  {
    path: '/to-weapp',
    name: 'toWeapp',
    component: () => import(/* webpackChunkName: "toWeapp" */ 'views/toWeapp.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
