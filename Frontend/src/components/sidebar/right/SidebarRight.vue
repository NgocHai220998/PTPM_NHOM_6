<template>
  <section class="sidebar-right">
    <Top class="sidebar-right-top" />
    <Mission class="sidebar-right-misson sidebar-right-misson-japanese" />
    <Voca class="sidebar-right-bot sidebar-right-voca" />
  </section>
</template>

<script>

import Mission from './mission/Mission'
import Voca from './botEnglish/Voca'
import Top from './top/Top'

export default {
  name: 'SidebarRightComponent',
  data () {
    return {
    }
  },
  components: {
    Mission,
    Top,
    Voca
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-right {
    display: flex;
    flex-direction: column;
    &-top {
      height: 50px;
    }
    &-misson {
      height: 380px;
    }
    &-bot {
      // background-color: gray;
      background-color: rgba(0, 0, 0, .85);
    }
  }
</style>
