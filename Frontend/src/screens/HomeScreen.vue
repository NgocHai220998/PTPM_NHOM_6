<template>
  <div class="home-page">
    <home-component></home-component>
  </div>
</template>

<script>

import HomeComponent from '../components/contents/Home'

export default {
  name: 'HomeScreen',
  data () {
    return {
    }
  },
  components: {
    HomeComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
