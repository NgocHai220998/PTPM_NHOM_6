<template>
  <RoomsComponent :socket="socket" />
</template>

<script>

import RoomsComponent from '../components/contents/room/Rooms'

export default {
  name: 'RoomsScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    RoomsComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
