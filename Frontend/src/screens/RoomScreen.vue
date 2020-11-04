<template>
  <RoomComponent :socket="socket" />
</template>

<script>

import RoomComponent from '../components/contents/room/Room'

export default {
  name: 'RoomScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    RoomComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
