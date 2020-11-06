<template>
  <section class="chat-window">
    <Header />
    <Content />
    <Input />
  </section>
</template>
<script>

import Header from './Header'
import Content from './Content'
import Input from './Input'

export default {
  name: 'ChatWindow',
  data () {
    return {
    }
  },
  components: {
    Header,
    Content,
    Input
  }
}
</script>

<style scope>
  .chat-window {
    height: 100%;
  }
</style>
