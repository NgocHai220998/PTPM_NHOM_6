<template>
  <section class="chatbox-content">
    <div id="chat-box" class="index">
      <p v-for="n in data" :key="n">
        <span class="name-message">๖ۣۜGấu๖ۣۜNC:</span>
        <span class="content-message">message</span>
      </p>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      data: ['2', '3', '4']
    }
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const chat = document.getElementById('chat-box')
        chat.scrollTop = chat.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .chatbox-content {
    padding: 10px 0px 0px 0px;
    .index {
      overflow: scroll;
      overflow-x: hidden; /* Hide horizontal scrollbar */
      background-color: white;
      height: 100%;
      p {
        padding-left: 5px;
        .name-message {
          font-weight: bold;
          color: red;
        }
        .content-message {
          font-weight: 600;
        }
      }
    }
  }
</style>
