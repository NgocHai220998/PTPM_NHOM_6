<template>
  <FightComponent :socket="socket" />
</template>

<script>

import FightComponent from '../components/contents/fight/Fight'

export default {
  name: 'FightScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    FightComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
