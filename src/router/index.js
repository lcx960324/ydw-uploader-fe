import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Explorer from '@/views/explorer'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/explorer',
      name: 'Explorer',
      component: Explorer
    }
  ]
})
export default router
