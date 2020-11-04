<template>
  <section class="courses-page">
    <a-spin :spinning="loading"></a-spin>
    <Card v-for="(course, index) in courses" :key="index" :course="course" />
  </section>
</template>
<script>

import Card from './Card'

export default {
  name: 'CoursesComponent',
  data () {
    return {
      user: null,
      courses: null,
      loading: true
    }
  },
  components: {
    Card
  },
  props: ['socket'],
  methods: {
    connectSocket () {
      this.socket.on('serverGetCourses', (data) => {
        this.courses = data.courses
        this.loading = false
      })
    },
    clientGetCourses () {
      this.socket.emit('clientGetCourses', {
        token: this.user.token
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {
      this.connectSocket()
      this.clientGetCourses()
    }
  }
}
</script>

<style lang="scss" scoped>
  .courses-page {
    max-height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
