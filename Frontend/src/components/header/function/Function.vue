<template>
  <section class="function">
    <Rank />
    <GotoLearn />
  </section>
</template>

<script>

import Rank from './Rank'
import GotoLearn from './GotoLearn'

export default {
  name: 'FunctionHeader',
  data () {
    return {
    }
  },
  components: {
    Rank,
    GotoLearn
  }
}
</script>

<style lang="scss" scoped>
  .function {
    display: flex;
    flex-wrap: wrap;
  }
</style>
