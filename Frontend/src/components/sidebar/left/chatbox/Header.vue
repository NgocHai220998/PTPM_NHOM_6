<template>
  <section class="chatbox-header">
      <div class="left">
          <div class="background">
              <span>Chatbox</span>
          </div>
      </div>
      <div class="right">
          <div class="right-icon">
              <div @click="hidenChatbox" class="up background">
                  <a-icon type="caret-up" />
              </div>
              <div @click="showChatbox" class="down background">
                  <a-icon type="caret-down" />
              </div>
          </div>
      </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    showChatbox () {
      this.$emit('isShowChatbox', true)
    },
    hidenChatbox () {
      this.$emit('isShowChatbox', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .chatbox-header {
      display: flex;
      justify-content: space-between;
      .left {
          div {
                text-align: center;
                padding: 0 10px;
                box-shadow: #cc0000 1px 1px 0px 0px;
                border-radius: 3px;
                transition: 0.35s;
                &:hover {
                    opacity: 0.65;
                    cursor: pointer;
                    box-shadow: #CCFFFF 0px 0px 3px 3px;
                }
                span {
                    color: white;
                }
          }
      }
      .right {
          &-icon {
              display: flex;
          }
          .up, .down {
                background-color: red;
                margin-left: 10px;
                width: 23px;
                text-align: center;
                box-shadow: #cc0000 1px 1px 0px 0px;
                border-radius: 3px;
                transition: 0.35s;
                &:hover {
                    opacity: 0.65;
                    cursor: pointer;
                    box-shadow: #CCFFFF 0px 0px 3px 3px;
                }
                color: white;
          }
      }
  }
</style>
