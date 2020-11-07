<template>
  <div>
    <div class="trollbox-user-input">
      <a-textarea
        :autosize="{ minRows: 1, maxRows: 1 }"
        v-show="!isHidden"
        v-model="message"
        size="default"
        class="trollbox-input"
        placeholder="Message ..."
        @keydown="handleKeypressEnter"
        @click="onEmojiPicker(false)"
      >
      </a-textarea>
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
        <a-button class="emoji-input" type="primary"><a-icon type="smile"/></a-button>
      </a-popover>
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
      visible: false
    }
  },
  methods: {
    handleKeypressEnter (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()
        if (this.message.trim() === '') {
          this.message = ''
        } else if (this.message.length > 1000) {
          this.$message.warning('Your message exceeds the allowable limit!')
        } else if (this.message.trim() !== '' && this.username !== '') {
          this.$emit('sendMessage', this.message)
          this.message = ''
        }
      }
    },
    selectIcon (val) {
    },
    hide () {
      console.log(111)
      this.visible = false
    }
  }
}
</script>

<style lang='scss' scope>

.trollbox-user-input {
  position: relative;
  width: 100%;
  margin: 5px auto;
  padding: 0 8px;
  .trollbox-input {
    resize: none;
    border-radius: 0;
    padding-right: 24px;
    border-radius: 8px;
    background-color: rgba(192,192,192,.1);
    color: white;
  }
  .emoji-input {
    position: absolute;
    right: 12px;
    top: -2px;
    color: #DD6000;
    font-size: 20px;
    cursor: pointer;
    background-color: rgba(192,192,192,0);
    border: none;
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
