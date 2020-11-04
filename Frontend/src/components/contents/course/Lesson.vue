<template>
  <section class="lesson-detail">
    <div :style="{ maxHeight: maxHeight + 'px' }" class="left">
      <div v-for="(word, i) in lesson.words" :key="i" class="item">
        <span class="vocabulary btn">{{ i + 1}}. {{ word.vocabulary }}</span>
        <span class="explain btn">{{ word.explain }}</span>
        <a-tooltip>
          <template slot="title">
            Thêm vào danh sách học của bạn
          </template>
          <a-button @click="addWordFromCourse(word)" type="primary" size="small" class="btn-plus"><a-icon type="plus" /></a-button>
        </a-tooltip>
      </div>
    </div>
    <div class="right">
      <div class="group-button">
        <div>
          <a-button @click="showDrawer" type="primary" class="btn-plus background">Luyện tập</a-button>
        </div>
      </div>
      <a-drawer
      title="Luyện tập"
      placement="left"
      :width="550"
      :closable="false"
      @close="onClose"
      :visible="visible"
      >
        <div style="text-align: center;">
          <h1>{{ currentWord.explain }}</h1>
          <a-input-search
            v-model="inputText"
            placeholder="Nhập đáp án"
            @search="onEnter"
            enterButton="Trả lời"
            size="large"
          />
        </div>
      </a-drawer>
    </div>
  </section>
</template>
<script>

export default {
  name: 'LessonComponent',
  data () {
    return {
      user: null,
      windowHeight: null,
      visible: false,
      currentWord: null,
      listWord: null,
      inputText: '',
      index: 0
    }
  },
  props: ['socket', 'lesson'],
  methods: {
    connectSocket () {
      this.socket.on('addWordFromCourseDone', (data) => {
        this.$message.success('Thêm thành công')
      })
    },
    addWordFromCourse (word) {
      this.socket.emit('clientAddWordFromCourse', {
        token: this.user.token,
        vocabulary: word.vocabulary,
        explain: word.explain
      })
    },
    onClose () {
      this.visible = false
    },
    showDrawer () {
      this.visible = true
    },
    onEnter () {
      if (this.inputText === this.currentWord.vocabulary) {
        this.listWord.splice(this.index, 1)
        if (this.listWord.length === 0) {
          this.$message.success('Đã ôn tập xong')
        } else {
          this.index = Math.floor(Math.random() * this.listWord.length)
          this.currentWord = this.listWord[this.index]
          this.inputText = ''
        }
      } else {
        this.$message.error('Sai rồi')
      }
    }
  },
  computed: {
    maxHeight () {
      return (this.windowHeight > 700) ? 350 : 250
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.windowHeight = window.innerHeight
    this.listWord = this.lesson.words
    this.currentWord = this.listWord[0]
    this.index = 0
    this.connectSocket()
  }
}
</script>

<style lang="scss" scoped>
  .lesson-detail {
    display: flex;
    justify-content: space-between;
    .right {
      max-width: 150px;
      min-width: 150px;
    }
    .left {
      width: 100%;
      overflow: scroll;
      background-color: rgba(0, 0, 0, 0.75);
      .item {
        padding: 12px 15px 7px 15px;
        border-bottom: 1px solid white;
        .vocabulary {
          display: inline-block;
          width: 200px;
          max-width: 200px;
          color: white;
          font-size: 20px;
        }
        .explain {
          display: inline-block;
          width: 310px;
          max-width: 310px;
          color: white;
          font-size: 20px;
        }
        .btn-plus {
          width: 70px;
          position: relative;
          bottom: 8px;
        }
        &:hover {
          box-shadow: 1px 1px 1px green, 1px 1px 5px green, 1px 1px 25px red;
          cursor: pointer;
        }
      }
    }
    .right {
      text-align: center;
      .group-button {
        text-align: center;
      }
    }
  }
</style>
