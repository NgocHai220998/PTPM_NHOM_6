<template>
  <GotoLearnComponent :socket="socket" />
</template>

<script>

import GotoLearnComponent from '../components/contents/gotoLearn/GotoLearn'

export default {
  name: 'GotoLearnScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    GotoLearnComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
