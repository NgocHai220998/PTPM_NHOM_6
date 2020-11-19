<template>
  <div>
    <div class="trollbox-user-input">
      <a-input
        :autosize="{ minRows: 1, maxRows: 2 }"
        v-model="message"
        size="default"
        class="trollbox-input"
        placeholder="Message ..."
        @pressEnter="sendMessage"
      >
      </a-input>
      <a-popover title="Emoji =))" trigger="click" v-model="visible">
        <template slot="content">
          <div class="box-emoji" style="background-color: rbga(0, 0, 0, 0);" >
            <a-tabs defaultActiveKey="1" style="max-width: 400px; max-height: 300px; overflow: scroll; overflow-x: hidden;" class="emoji-picker-tabs">
              <a-tab-pane v-for="(emoji, index) in emojis"
                :key="`${index + 1}`" :tab="emoji.emojis[0].trim()">
                <a-row>
                  <a-col
                    class="icon-input"
                    style="cursor: pointer; font-size: 24px;"
                    v-for="(value, id) in emoji.emojis"
                    :span="4"
                    :key="id"
                    @click="selectIcon(value)"
                  >{{value}}</a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </div>
        </template>
        <a-button class="emoji-input" type="primary"><a-icon type="smile" /></a-button>
      </a-popover>
      <a-button @click="sendMessage" class="send-input background" type="primary"><a-icon  type="enter" /></a-button>
      <!-- <a-icon class="emoji-input" type="smile"/> -->
    </div>
  </div>
</template>
<script>
import emoji from '@/constants/emoji.js'

export default {
  data () {
    return {
      message: '',
      emojis: emoji,
      visible: false,
      number: 1,
      user: null
    }
  },
  props: ['socket'],
  methods: {
    sendMessage () {
      if (this.message.trim() === '') {
        this.message = ''
      } else if (this.message.length > 50) {
        this.$message.warning('Your message exceeds the allowable limit! 50 char')
      } else if (this.message.trim() !== '') {
        this.socket.emit('clientSendMessage', {
          name: this.user.main.userName,
          content: this.message
        })
        this.message = ''
      }
    },
    selectIcon (val) {
      this.message = this.message + val
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang='scss' scope>

.trollbox-user-input {
  position: relative;
  width: 100%;
  margin: 5px auto;
  .trollbox-input {
    resize: none;
    border-radius: 0;
    padding-right: 70px;
    border-radius: 8px;
    background-color: rgba(192,192,192,.2);
    color: white;
  }
  .emoji-input {
    position: absolute;
    right: 50px;
    top: -2px;
    color: #DD6000;
    font-size: 20px;
    cursor: pointer;
    background-color: rgba(192,192,192,0);
    border: none;
    padding: 0px;
  }
  .send-input {
    position: absolute;
    right: 0px;
    top: 1px;
    border-radius: 0px 8px 8px 0px;
    height: 30px;
  }
}

.icon-input {
  text-align: center;
  &:hover {
    box-shadow: 0 0 15px #263459;
  }
}

.hidden {
  display: none !important;
}

.icon-box-input {
  max-height: 200px;
  overflow-y: scroll;
}
</style>``
