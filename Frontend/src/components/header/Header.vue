<template>
  <section id="header">
    <Function />
  </section>
</template>

<script>

import Function from './function/Function'

export default {
  name: 'GamLHeader',
  data () {
    return {
    }
  },
  components: {
    Function
  }
}
</script>

<style lang="scss" scoped>
  #header {
    background-color: rgba(0, 0, 0, 0.65);
  }
</style>
