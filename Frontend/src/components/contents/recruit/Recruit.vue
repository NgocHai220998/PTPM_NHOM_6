<template>
  <section class="recruit-page">
    <Card v-for="(figure, i) in dataRecruit" :key="i" :figure="figure" :socket="socket" />
  </section>
</template>
<script>
// import { jsonHeader } from '@/utils/fetchTool'
// import { API } from '@/constants/api'
import dataRecruit from './dataRecruit'
import Card from './Card'
export default {
  name: 'RecruitComponent',
  data () {
    return {
      dataRecruit,
      user: null
    }
  },
  props: ['socket'],
  components: {
    Card
  },
  methods: {
    connectSocket () {
      this.socket.on('serverBuyFigure', (data) => {
        this.$message.success('Thuyết phục thành công!')
        if (data.code === 200) {
          this.user = {
            ...this.user,
            ...data.user
          }
          localStorage.setItem('user', JSON.stringify({
            ...this.user,
            ...data.user
          }))
        } else {
          this.$message.error('Ui có biến rồi đại ca ơi 😡😡')
        }
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {
      this.connectSocket()
    }
  }
}
</script>

<style lang="scss" scoped>
  .recruit-page {
    display: flex;
    justify-content: space-around;
  }
</style>
