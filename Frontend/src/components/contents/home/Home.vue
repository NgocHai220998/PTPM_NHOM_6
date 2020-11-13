<template>
  <section class="home-page">
    <Home v-if="server === 'JP'" />
    <HomeEnglish v-else-if="server === 'EN'" />
  </section>
</template>
<script>

import Home from './homeJapanese/Index'
import HomeEnglish from './homeEnglish/Index'

export default {
  name: 'HomeComponent',
  data () {
    return {
      server: ''
    }
  },
  components: {
    Home,
    HomeEnglish
  },
  beforeMount () {
    this.server = localStorage.getItem('server')
  }
}
</script>

<style lang="scss" scoped>
</style>
