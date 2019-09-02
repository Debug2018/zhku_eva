import Vue from 'vue'
import Router from 'vue-router'

//管理员路由
import mergeExcel from './views/page/mergeExcel.vue'
import selectGood from './views/page/selectGood.vue'
import home from './views/page/home.vue'

import _404 from './views/errPage/404.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/s',
      // name: Home,
      // component: Home,
      component: selectGood
    },
    {
      path: '/m',
      // name: Home,
      // component: Home,
      component: mergeExcel
    },
    //404
    {
      path: '*',
      component: _404,
      // meta: { requiresAuth: true }
    },
  ],
 
});


export default router

