<template>
  <section class="rooms-page">
    <a-spin :spinning="loading"></a-spin>
    <div class="container">
      <div class="top effect-mission">
        <h1>Phòng hẹn đấu</h1>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
      </div>
      <div :style="{ maxHeight: maxHeight + 'px' }" class="content">
        <div v-for="item in 30" :key="item" class="item">
          <router-link :to="{ name: 'RoomScreen', params: {
            id: 1,
            email: 'none1',
            emailReverse: 'none2'
          }}">
            <span class="name">Room {{ item }}</span>
          </router-link>
        </div>
      </div>
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
      windowHeight: null
    }
  },
  props: ['socket'],
  methods: {
    connectSocket () {
      this.socket.on('serverGetCourse', (data) => {
        this.course = data.course
        this.loading = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .rooms-page {
    .container {
      .top {
        background-color: rgba(0, 0, 0, .65);
        min-height: 80px;
        height: 80px;
        width: 50%;
        margin: 0 auto;
        padding: 15px;
        text-align: center;
        border-radius: 5px;
        h1 {
          color: white;
          font-size: 30px;
          text-transform: uppercase;
        }
      }
      .content {
        padding: 20px 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        overflow: scroll;
        .item {
          background-color: rgba(85, 22, 105, 0.95);
          width: 15%;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
          margin: 10px;
          .name {
            color: white;
          }
          &:hover {
            box-shadow: 1px 1px 1px green, 1px 1px 5px green, 1px 1px 25px red;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
