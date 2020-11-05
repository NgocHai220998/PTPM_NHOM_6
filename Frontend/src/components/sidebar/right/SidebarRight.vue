<template>
  <section class="sidebar-right">
    <div class="sidebar-right-top">
      <h1>Top</h1>
    </div>
    <Mission class="sidebar-right-misson" />
    <div class="sidebar-right-bot">
      <h1>Bot</h1>
    </div>
  </section>
</template>

<script>

import Mission from './Mission'

export default {
  name: 'SidebarRightComponent',
  data () {
    return {
    }
  },
  components: {
    Mission
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-right {
    display: flex;
    flex-direction: column;
    &-top {
      height: 130px;
    }
    &-misson {
      height: 350px;
    }
    &-bot {
      height: auto;
    }
  }
</style>
