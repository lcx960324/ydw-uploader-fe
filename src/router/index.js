import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
