<template>
  <section class="function">
    <Fight />
    <Fight />
    <Fight />
    <Fight />
    <Fight />
  </section>
</template>

<script>

import Fight from './Fight'

export default {
  name: 'FunctionHeader',
  data () {
    return {
    }
  },
  components: {
    Fight
  }
}
</script>

<style lang="scss" scoped>
  .function {
    display: flex;
    flex-wrap: wrap;
  }
</style>
