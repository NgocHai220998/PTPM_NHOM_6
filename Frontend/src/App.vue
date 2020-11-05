<template>
  <div id="app">
    <learn-header v-show="!this.isLogin()"/>
    <router-view/>
    <learn-footer v-show="!this.isLogin()"/>
  </div>
</template>

<script>
import LearnHeader from '@/components/header/Header'
import LearnFooter from '@/components/footer/Footer'
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
    LearnFooter
  },
  beforeMount () {
    this.currentRouter = this.$router.history.current.name
    // console.log(this.$router)
  },
  methods: {
    /**
     * Check that the user is logged in
     */
    isLogin () {
      return this.currentRouter === 'Login' || this.currentRouter === 'Register' || this.currentRouter === 'ResetPassword'
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
