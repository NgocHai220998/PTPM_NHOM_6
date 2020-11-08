<template>
  <section class="sidebar-right">
    <Top class="sidebar-right-top" />
    <Mission v-if="server === 'JP'" class="sidebar-right-misson sidebar-right-misson-japanese" />
    <MissionEnglish v-else-if="server === 'EN'" class="sidebar-right-misson sidebar-right-misson-english" />
    <Kanji v-if="server === 'JP'" class="sidebar-right-bot sidebar-right-kanji" />
    <Voca v-else-if="server === 'EN'" class="sidebar-right-bot sidebar-right-voca" />
  </section>
</template>

<script>

import Mission from './mission/Mission'
import MissionEnglish from './missionEnglish/Mission'
import Kanji from './bot/Kanji'
import Voca from './botEnglish/Voca'
import Top from './top/Top'

export default {
  name: 'SidebarRightComponent',
  data () {
    return {
      server: ''
    }
  },
  components: {
    Mission,
    Kanji,
    Top,
    Voca,
    MissionEnglish
  },
  beforeMount () {
    this.server = window.localStorage.getItem('server')
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
