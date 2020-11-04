<template>
  <section class="room-page">
    <a-spin :spinning="loading"></a-spin>
    <div class="container">
      <div :style="{ maxHeight: maxHeight + 'px' }" class="left">
        <div class="content">
          <h1>NgocHai</h1>
          <img width="100%" src="/static/images/shoot.png" alt="">
        </div>
      </div>
      <div :style="{ maxHeight: maxHeight + 'px' }" class="center">
        <div class="choose">
          <a-button @click="showDrawer" class="btn" style="width: 100%" type="primary">Chọn từ để thi đấu</a-button>
        </div>
        <div class="btn-start">
          <a-button @click="clickStart" class="btn background" style="width: 100%" type="primary">Bắt đầu</a-button>
        </div>
      </div>
      <div :style="{ maxHeight: maxHeight + 'px' }" class="right">
        <div class="content">
          <h1>NguyenNgoc</h1>
          <img width="100%" src="/static/images/shoot.png" alt="">
        </div>
      </div>
      <a-drawer
        title="Chọn từ"
        :height="600"
        placement="top"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <a-tabs size="large">
          <a-tab-pane v-for="(course, i) in courses" :key="i + 1" :tab="course.name">
            <a-tabs size="large">
              <a-tab-pane v-for="(lesson, j) in course.listLesson" :key="j + 1" :tab="lesson.name">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; overflow: scroll; overflow-x: hidden">
                  <div style="margin-bottom: 10px; width: 18%;" v-for="(word, k) in lesson.words" :key="k">
                    <a-button class="word" style="width: 100%;" type="primary">{{ word.vocabulary }}</a-button>
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
        </a-tabs>
      </a-drawer>
    </div>
  </section>
</template>
<script>

export default {
  name: 'CourseComponent',
  data () {
    return {
      user: null,
      loading: false,
      windowHeight: null,
      courses: null,
      visible: false
    }
  },
  props: ['socket'],
  methods: {
    connectSocket () {
      this.socket.on('serverGetCourses', (data) => {
        this.courses = data.courses
        this.loading = false
        console.log(this.courses)
      })
    },
    clientGetCourses () {
      this.socket.emit('clientGetCourses', {
        token: this.user.token
      })
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    clickStart () {
      this.$message.warning('Chức năng chưa được mở (Coming soon)')
    }
  },
  computed: {
    maxHeight () {
      return (this.windowHeight > 700) ? 370 : 270
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.windowHeight = window.innerHeight
    if (this.user) {
      this.connectSocket()
      this.clientGetCourses()
    }
  }
}
</script>

<style lang="scss" scoped>
  .room-page {
    .container {
      display: flex;
      justify-content: space-between;
      .left {
        width: 35%;
        .content {
          position: relative;
          top: 18%;
          text-align: center;
          h1 {
            color: white;
          }
        }
      }
      .center {
        width: 20%;
        padding: 25px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .right {
        width: 35%;
        text-align: center;
        .content {
          position: relative;
          top: 18%;
          text-align: center;
          h1 {
            color: white;
          }
        }
        img {
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
        }
      }
    }
  }
  .word {
    &:focus {
      background-color: red;
    }
  }
</style>
