import Vue from 'vue'
import Router from 'vue-router'
import userService from '@/utils/userServices'
import Register from '@/components/login/Register'
import Login from '@/components/login/Login'
import ForgotPassword from '@/components/login/ForgotPassword'
import HomeScreen from '@/screens/HomeScreen'
import FightScreen from '@/screens/FightScreen'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeScreen',
      component: HomeScreen
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reset-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/fight',
      name: 'FightScreen',
      component: FightScreen
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const isLogin = userService.verify(user)

  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (!isLogin) {
        router.push({ name: 'Login' })
      } else {
        next()
      }
    } else if (!isLogin) {
      next()
    } else {
      router.push({ name: 'HomeScreen' })
    }
  } else {
    next()
  }
})
export default router
