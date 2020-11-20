<template>
  <section class="sidebar-left">
    <Info :socket="socket" class="sidebar-left-info" />
    <Feature :socket="socket" class="sidebar-left-feature" />
    <ChatBox :socket="socket" class="sidebar-left-chatbox" />
  </section>
</template>

<script>

import Info from './info/Info'
import Feature from './feature/Feature'
import ChatBox from './chatbox/ChatWindow'

export default {
  name: 'SidebarLeftComponent',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    Info,
    Feature,
    ChatBox
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-left {
    display: flex;
    flex-direction: column;
    &-info {
      height: 130px;
      min-height: 130px;
    }
    &-feature {
      height: 200px;
      min-height: 200px;
    }
    &-chatbox {
      height: auto;
    }
  }
</style>
