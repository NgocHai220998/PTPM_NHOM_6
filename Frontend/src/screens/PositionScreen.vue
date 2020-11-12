<template>
  <PositionComponent v-if="server === 'JP'" />
  <PositionEnglishComponent v-else-if="server === 'EN'" />
</template>

<script>

import PositionComponent from '../components/contents/position/Position'
import PositionEnglishComponent from '../components/contents/position/PositionEnglish'

export default {
  name: 'PositionScreen',
  data () {
    return {
      server: ''
    }
  },
  components: {
    PositionComponent,
    PositionEnglishComponent
  },
  beforeMount () {
    this.server = localStorage.getItem('server')
  }
}
</script>

<style lang="scss" scoped>
</style>
