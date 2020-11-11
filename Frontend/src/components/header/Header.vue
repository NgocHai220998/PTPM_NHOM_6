<template>
  <section id="header">
    <Function v-if="server === 'JP'" />
    <FunctionEnglish v-else-if="server === 'EN'" />
  </section>
</template>

<script>

import Function from './function/Function'
import FunctionEnglish from './functionEnglish/Function'

export default {
  name: 'LearnHeader',
  data () {
    return {
      server: ''
    }
  },
  components: {
    Function,
    FunctionEnglish
  },
  beforeMount () {
    this.server = localStorage.getItem('server')
  }
}
</script>

<style lang="scss" scoped>
  #header {
    background-color: rgba(0, 0, 0, 0.65);
  }
</style>
