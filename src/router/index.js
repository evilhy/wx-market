import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/', // 公共入口页面getId
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ 'views/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
