<template>
  <RankComponent :socket="socket" />
</template>

<script>

import RankComponent from '../components/contents/rank/Rank'

export default {
  name: 'RankScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    RankComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
