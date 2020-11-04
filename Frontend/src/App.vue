<template>
  <div id="app">
    <sidebar-left :socket="socket" id="app-left" v-show="!this.isLogin()"></sidebar-left>
    <section id="app-center">
      <learn-header id="app-center-top" v-show="!this.isLogin()"/>
      <router-view :socket="socket" id="app-center-view"/>
      <learn-footer :socket="socket" id="app-center-bot" v-show="!this.isLogin()"/>
    </section>
    <sidebar-right :socket="socket" id="app-right" v-show="!this.isLogin()"></sidebar-right>
  </div>
</template>

<script>
import LearnHeader from '@/components/header/Header'
import LearnFooter from '@/components/footer/Footer'
import SidebarLeft from '@/components/sidebar/left/SidebarLeft'
import SidebarRight from '@/components/sidebar/right/SidebarRight'
import io from 'socket.io-client'
import { SOCKET_EVENT } from '@/constants/api'

import '@/App.scss'

export default {
  name: 'App',
  data () {
    return {
      currentRouter: '',
      user: null,
      socket: null
    }
  },
  components: {
    LearnHeader,
    LearnFooter,
    SidebarLeft,
    SidebarRight
  },
  methods: {
    /**
     * Check that the user is logged in
     */
    isLogin () {
      return this.currentRouter === 'Login' || this.currentRouter === 'Register' || this.currentRouter === 'ForgotPassword'
    }
  },
  beforeMount () {
    this.currentRouter = this.$router.history.current.name
    this.user = JSON.parse(localStorage.getItem('user'))
    this.$message.config({
      maxCount: 1,
      duration: 0.7
    })
    if (this.user) {
      this.socket = io.connect(SOCKET_EVENT.urlSocket, {
        query: {
          name: this.user.email
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "~ant-design-vue/dist/antd.less";   // import official less entry file
@import "assets/main.less";   // override variables here
  #app {
    width: 100%;
    height: 100%;
  }
</style>
