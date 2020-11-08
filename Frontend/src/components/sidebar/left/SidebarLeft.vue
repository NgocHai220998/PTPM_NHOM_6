<template>
  <section class="sidebar-left">
    <Info v-if="server === 'JP'" class="sidebar-left-info" />
    <InfoEnglish v-if="server === 'EN'" class="sidebar-left-info"/>
    <Feature v-if="server === 'JP'" class="sidebar-left-feature" />
    <FeatureEnglish v-if="server === 'EN'" class="sidebar-left-feature" />
    <ChatBox v-if="server === 'JP'" class="sidebar-left-chatbox" />
    <ChatBoxEnglish v-else-if="server === 'EN'" class="sidebar-left-chatbox" />
  </section>
</template>

<script>

import Info from './info/Info'
import InfoEnglish from './infoEnglish/Info'
import Feature from './feature/Feature'
import FeatureEnglish from './featureEnglish/Feature'
import ChatBox from './chatbox/ChatWindow'
import ChatBoxEnglish from './chatboxEnglish/ChatWindow'

export default {
  name: 'SidebarLeftComponent',
  data () {
    return {
      server: ''
    }
  },
  components: {
    Info,
    InfoEnglish,
    Feature,
    FeatureEnglish,
    ChatBox,
    ChatBoxEnglish
  },
  beforeMount () {
    this.server = window.localStorage.getItem('server')
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
