<template>
  <section class="chat-box">
    <ChatWindow />
  </section>
</template>

<script>

import ChatWindow from './chatbox/ChatWindow'

export default {
  name: 'ChatBoxComponent',
  data () {
    return {
    }
  },
  components: {
    ChatWindow
  }
}
</script>

<style lang="scss" scoped>
  .chat-box {
    height: 40000px;
  }
</style>
