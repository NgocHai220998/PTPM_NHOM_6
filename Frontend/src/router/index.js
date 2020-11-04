import Vue from 'vue'
import Router from 'vue-router'
import userService from '@/utils/userServices'
import SignUp from '@/components/login/Signup'
import Login from '@/components/login/Login'
import ResetPassword from '@/components/login/ResetPassword'
import HomeScreen from '@/screens/HomeScreen'

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
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
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
