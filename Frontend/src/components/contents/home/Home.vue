<template>
  <section class="home-page">
    <HomeEnglish />
  </section>
</template>
<script>

import HomeEnglish from './homeEnglish/Index'

export default {
  name: 'HomeComponent',
  data () {
    return {
    }
  },
  components: {
    HomeEnglish
  },
  beforeMount () {
    if (localStorage.getItem('preRouterName') === 'Login') {
      localStorage.removeItem('preRouterName')
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
