<template>
  <section class="function">
    <Rank />
  </section>
</template>

<script>

import Rank from './Rank'

export default {
  name: 'FunctionHeader',
  data () {
    return {
    }
  },
  components: {
    Rank
  }
}
</script>

<style lang="scss" scoped>
  .function {
    display: flex;
    flex-wrap: wrap;
  }
</style>
