<template>
  <section class="function">
    <Rank />
    <GotoLearn />
    <Position />
    <Recruit />
  </section>
</template>

<script>

import Rank from './Rank'
import GotoLearn from './GotoLearn'
import Position from './Position'
import Recruit from './Recruit'

export default {
  name: 'FunctionHeader',
  data () {
    return {
    }
  },
  components: {
    Rank,
    GotoLearn,
    Position,
    Recruit
  }
}
</script>

<style lang="scss" scoped>
  .function {
    display: flex;
    flex-wrap: wrap;
  }
</style>
