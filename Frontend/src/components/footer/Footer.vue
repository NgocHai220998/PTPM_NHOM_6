<template>
  <footer class="footer">
    <Example v-if="server === 'JP'" />
    <ExampleEnglish v-else-if="server === 'EN'" />
  </footer>
</template>

<script>

import Example from './example/Example'
import ExampleEnglish from './exampleEnglish/Example'

export default {
  name: 'FooterComponent',
  data () {
    return {
      server: ''
    }
  },
  components: {
    Example,
    ExampleEnglish
  },
  beforeMount () {
    this.server = localStorage.getItem('server')
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background-color: rgba(0, 0, 0, 0.65);
    padding: 5px 10px;
  }
</style>
