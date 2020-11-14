<template>
  <footer class="footer">
    <Example />
  </footer>
</template>

<script>

import Example from './example/Example'

export default {
  name: 'FooterComponent',
  data () {
    return {
    }
  },
  components: {
    Example
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background-color: rgba(0, 0, 0, 0.65);
    padding: 5px 10px;
  }
</style>
