<template>
  <div id="app">
    <learn-header/>
    <router-view/>
    <learn-footer />
  </div>
</template>

<script>
import LearnHeader from '@/components/header/Header'
import LearnFooter from '@/components/footer/Footer'
import '@/App.scss'

export default {
  name: 'App',
  components: {
    LearnHeader,
    LearnFooter
  }
}
</script>

<style lang="less">
@import "~ant-design-vue/dist/antd.less";   // import official less entry file
@import "assets/main.less";   // override variables here
</style>
