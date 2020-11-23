<template>
  <section class="course-page">
    <a-spin :spinning="loading"></a-spin>
    <div v-if="course" class="container">
      <div class="top">
        <div class="logo">
          <img src="/static/images/logo.png" alt="Logo">
        </div>
        <div class="title">
          <h2>Tên: {{ course.name }}</h2>
          <h1 v-if="!nameLesson">Số bài: {{ course.listLesson.length }}
            <a-button @click="backCourses" type="danger" size="small"><a-icon type="rollback" />
            Back
          </a-button></h1>
          <h1 v-else>{{ nameLesson }} <a-button @click="backCourse" type="danger" size="small"><a-icon type="rollback" />Back</a-button></h1>
        </div>
      </div>
      <div v-if="!currentLesson" :style="{ maxHeight: maxHeight + 'px' }" class="content">
        <div v-for="(lesson, i) in course.listLesson" :key="i" @click="clickedLesson(lesson)" class="lesson">
          <h3 class="name">{{ lesson.name }}</h3>
          <a-button class="btn">Từ vựng: {{ lesson.words.length }}</a-button>
        </div>
      </div>
      <div :style="{ maxHeight: maxHeight + 'px' }" class="bot" v-else>
        <Lesson :socket="socket" :lesson="currentLesson"/>
      </div>
    </div>
  </section>
</template>
<script>

import Lesson from './Lesson'

export default {
  name: 'CourseComponent',
  data () {
    return {
      user: null,
      course: null,
      loading: true,
      windowHeight: null,
      currentLesson: null,
      nameLesson: null
    }
  },
  components: {
    Lesson
  },
  props: ['socket'],
  methods: {
    connectSocket () {
      this.socket.on('serverGetCourse', (data) => {
        this.course = data.course
        this.loading = false
      })
    },
    clientGetcourse () {
      this.socket.emit('clientGetCourse', {
        token: this.user.token,
        name: this.$router.history.current.params.name
      })
    },
    clickedLesson (lesson) {
      this.currentLesson = lesson
      this.nameLesson = lesson.name
    },
    backCourse () {
      this.currentLesson = null
      this.nameLesson = null
    },
    backCourses () {
      this.$router.push({
        name: 'CoursesScreen'
      })
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
      this.clientGetcourse()
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-page {
    max-height: 100%;
    .container {
      .top  {
        display: flex;
        justify-content: space-evenly;
        h1, h2 {
          text-align: center;
          color: white;
        }
      }
      .content {
        padding: 30px 20px 20px 20px;
        display: flex;
        // max-height: 280px;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: scroll;
        .lesson {
          width: 30.3333%;
          margin: 13px 5px;
          text-align: center;
          background-color: rgba(85, 22, 105, 0.95);
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            color: white
          }
          .btn {
            width: 100%;
          }
          &:hover {
            box-shadow: 1px 1px 1px green, 1px 1px 5px green, 1px 1px 25px red;
            cursor: pointer;
          }
        }
      }
      .bot {
        margin-top: 20px;
      }
    }
  }
</style>
