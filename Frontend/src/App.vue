<template>
  <div id="app">
    <sidebar-left id="app-left" v-show="!this.isLogin()"></sidebar-left>
    <section id="app-center">
      <learn-header id="app-center-top" v-show="!this.isLogin()"/>
      <router-view id="app-center-view"/>
      <learn-footer id="app-center-bot" v-show="!this.isLogin()"/>
    </section>
    <sidebar-right id="app-right" v-show="!this.isLogin()"></sidebar-right>
  </div>
</template>

<script>
import LearnHeader from '@/components/header/Header'
import LearnFooter from '@/components/footer/Footer'
import SidebarLeft from '@/components/sidebar/left/SidebarLeft'
import SidebarRight from '@/components/sidebar/right/SidebarRight'
import '@/App.scss'

export default {
  name: 'App',
  data () {
    return {
      currentRouter: ''
    }
  },
  components: {
    LearnHeader,
    LearnFooter,
    SidebarLeft,
    SidebarRight
  },
  beforeMount () {
    this.currentRouter = this.$router.history.current.name
    window.localStorage.setItem('server', 'JP')
    // console.log(this.$router)
  },
  methods: {
    /**
     * Check that the user is logged in
     */
    isLogin () {
      return this.currentRouter === 'Login' || this.currentRouter === 'Register' || this.currentRouter === 'ForgotPassword'
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
