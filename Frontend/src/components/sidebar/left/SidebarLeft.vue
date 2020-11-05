<template>
  <section class="sidebar-left">
    <Info class="sidebar-left-info" />
    <Feature class="sidebar-left-feature" />
    <ChatBox class="sidebar-left-chatbox" />
  </section>
</template>

<script>

import Info from './Info'
import Feature from './Feature'
import ChatBox from './ChatBox'

export default {
  name: 'SidebarLeftComponent',
  data () {
    return {
    }
  },
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
    }
    &-feature {
      height: 200px;
    }
    &-chatbox {
      height: auto;
    }
  }
</style>
