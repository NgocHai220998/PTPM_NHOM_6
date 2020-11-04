<template>
  <section class="home-page">
    <HomeEnglish :socket="socket" />
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
  props: ['socket'],
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
