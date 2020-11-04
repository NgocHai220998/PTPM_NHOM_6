<template>
  <HomeComponent :socket="socket" />
</template>

<script>

import HomeComponent from '../components/contents/home/Home'

export default {
  name: 'HomeScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    HomeComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
