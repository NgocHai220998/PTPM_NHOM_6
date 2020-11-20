import Vue from 'vue'
import Router from 'vue-router'
import userService from '@/utils/userServices'
import Register from '@/components/login/Register'
import Login from '@/components/login/Login'
import ForgotPassword from '@/components/login/ForgotPassword'
import HomeScreen from '@/screens/HomeScreen'
import FightScreen from '@/screens/FightScreen'
import PositionScreen from '@/screens/PositionScreen'
import RankScreen from '@/screens/RankScreen'
import RecruitScreen from '@/screens/RecruitScreen'
import GotoLearnScreen from '@/screens/GotoLearnScreen'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeScreen',
      component: HomeScreen,
      meta: { auth: true }
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
      path: '/fight/:type/:email/:emailReverse',
      name: 'FightScreen',
      component: FightScreen,
      meta: { auth: true }
    },
    {
      path: '/position',
      name: 'PositionScreen',
      component: PositionScreen,
      meta: { auth: true }
    },
    {
      path: '/rank',
      name: 'RankScreen',
      component: RankScreen,
      meta: { auth: true }
    },
    {
      path: '/recruit',
      name: 'RecruitScreen',
      component: RecruitScreen,
      meta: { auth: true }
    },
    {
      path: '/goto-learn',
      name: 'GotoLearnScreen',
      component: GotoLearnScreen,
      meta: { auth: true }
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
