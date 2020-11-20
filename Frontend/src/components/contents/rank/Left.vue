<template>
  <section class="rank-left">
    <div class="name">
      <span>{{ user.main.userName }}</span>
      <div class="power">
        <span>
          Tấn công: {{ user.main.martialArt }}
        </span>
      </div>
    </div>
    <div class="avatar">
      <img width="80%" :src="this.user.main.srcImage" alt="gameLanguage">
    </div>
    <div class="action">
      <div class="info">
        <a-popover :title="user.main.userName" trigger="click" v-model="visible">
          <div slot="content" class="content-info">
            <div v-for="(value, name, index) in user.main" :key="index">
              <span style="font-size: 16px" v-if="name === 'userName'"><b>Tên:</b> {{ value }}</span>
              <span style="font-size: 16px" v-if="name === 'kind'"><b>Hệ:</b> {{ value }}</span>
              <span style="font-size: 16px" v-if="name === 'martialArt'"><b>Võ lực:</b> {{ value + (user.profile.technicalPoint.martialArt * 10) }}</span>
                <span style="font-size: 16px" v-if="name === 'avoid'"><b>Né tránh:</b> {{ value + (user.profile.technicalPoint.avoid * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'propUp'"><b>Chống đỡ:</b> {{ value + (user.profile.technicalPoint.propUp * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'critical'"><b>Chí mạng:</b> {{ value + (user.profile.technicalPoint.critical * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'armor'"><b>Giáp:</b> {{ value + (user.profile.technicalPoint.armor * 10) }}</span>
                <span style="font-size: 16px" v-if="name === 'hp'"><b>Máu:</b> {{ value + (user.profile.technicalPoint.hp * 20) }}</span>
            </div>
          </div>
          <a-button style="width: 100%" class="background">Bản thân</a-button>
        </a-popover>
      </div>
      <div class="back">
        <router-link :to="{ name: 'HomeScreen' }">
          <a-button style="width: 100%" type="danger">Quai lại</a-button>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
// import { jsonHeader } from '@/utils/fetchTool'
// import { API } from '@/constants/api'
export default {
  name: 'RankLeft',
  data () {
    return {
      visible: false,
      user: null
    }
  },
  methods: {
    hide () {
      this.visible = false
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
  .rank-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      text-align: center;
      span {
        color: white;
        font-weight: 600;
      }
      .power {
        span {
          color: white;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
    width: 100%;
    .action {
      text-align: center;
      .info {
        .background {
          color: white;
          font-weight: 500;
        }
      }
    }
  }
</style>
