<template>
  <section class="chatbox-content">
    <div id="chat-box" class="index">
      <p v-for="(message, index) in data" :key="index">
        <span class="name-message">๖ۣۜGấu๖ۣۜNC:</span>
        <span class="content-message">{{ message }}</span>
      </p>
    </div>
  </section>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      data: ['2', '3', '4'],
      socket: io.connect('http://localhost:4000')
    }
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const chat = document.getElementById('chat-box')
        chat.scrollTop = chat.scrollHeight
      })
    },
    connectSocket () {
      this.socket.on('getMessage', (message) => {
        this.data.push(message)
        this.scrollToBottom()
      })
    }
  },
  beforeMount () {
    this.connectSocket()
  }
}
</script>

<style lang="scss" scoped>
  .chatbox-content {
    padding: 10px 0px 0px 0px;
    .index {
      overflow: scroll;
      overflow-x: hidden; /* Hide horizontal scrollbar */
      background-color: rgba(0, 0, 0, .1);
      height: 100%;
      p {
        padding-left: 5px;
        .name-message {
          font-weight: bold;
          color: rgb(255, 115, 0);
        }
        .content-message {
          font-weight: 600;
          color: white;
        }
      }
    }
  }
</style>
