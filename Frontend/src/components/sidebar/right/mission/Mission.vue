<template>
  <section class="mission">
    <div class="max">
      <span>Nhiệm vụ hoàn thành {{ `${ 15 - mission.max }/15` }}</span>
    </div>
    <a-menu class="content background" mode="inline" :openKeys="openKeys" @openChange="onOpenChange" style="width: 256px">
      <a-sub-menu key="day">
        <span slot="title"><a-icon class="icon" type="highlight" /><span class="title">Nhiệm vụ hằng ngày</span></span>
        <a-menu-item class="item" key="1">
          Từ mới
          <span> {{ `${ mission ? mission.dayly.vocabulary : '' } / ${user.profile.level * 3}` }}</span>
          <a-button v-show="mission.dayly.vocabulary >= (user.profile.level * 3)" @click="completeMission('dayly', 'vocabulary')"
            size="small" class="background btn-get" type="primary">
            Nhận
          </a-button>
        </a-menu-item>
        <a-menu-item class="item" key="2">
          Câu văn ngắn
          <span> {{ `${ mission ? mission.dayly.sentence : '' } / ${user.profile.level * 3}` }}</span>
          <a-button v-show="mission.dayly.sentence >= (user.profile.level * 3)" @click="completeMission('dayly', 'sentence')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
        <a-menu-item class="item" key="3">
          Ôn tập
          <span> {{ `${ mission ? mission.dayly.review : '' } / ${user.profile.level * 50}` }}</span>
          <a-button v-show="mission.dayly.review >= (user.profile.level * 50)" @click="completeMission('dayly', 'review')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="growth">
        <span slot="title"><a-icon class="icon" type="line-chart" /><span class="title">Nhiệm vụ tuần</span></span>
        <a-menu-item class="item" key="4">
          Từ mới
          <span> {{ `${ mission ? mission.weekly.vocabulary : '' } / ${user.profile.level * 21}` }}</span>
          <a-button v-show="mission.weekly.vocabulary >= (user.profile.level * 21)" @click="completeMission('weekly', 'vocabulary')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
        <a-menu-item class="item" key="5">
          Câu văn ngắn
          <span> {{ `${ mission ? mission.weekly.sentence : '' } / ${user.profile.level * 21}` }}</span>
          <a-button v-show="mission.weekly.sentence >= (user.profile.level * 21)" @click="completeMission('weekly', 'sentence')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
        <a-menu-item class="item" key="6">
          Ôn tập
          <span> {{ `${ mission ? mission.weekly.review : '' } / ${user.profile.level * 350}` }}</span>
          <a-button v-show="mission.weekly.review >= (user.profile.level * 350)" @click="completeMission('weekly', 'review')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="month">
        <span slot="title"><a-icon class="icon" type="box-plot" /><span class="title">Nhiệm vụ tháng</span></span>
        <a-menu-item class="item" key="7">
          Từ mới
          <span> {{ `${ mission ? mission.monthly.vocabulary : '' } / ${user.profile.level * 80}` }}</span>
          <a-button v-show="mission.monthly.vocabulary >= (user.profile.level * 80)" @click="completeMission('monthly', 'vocabulary')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
        <a-menu-item class="item" key="8">
          Câu văn ngắn
          <span> {{ `${ mission ? mission.monthly.sentence : '' } / ${user.profile.level * 80}` }}</span>
          <a-button v-show="mission.monthly.sentence >= (user.profile.level * 80)" @click="completeMission('monthly', 'sentence')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
        <a-menu-item class="item" key="9">
          Ôn tập
          <span> {{ `${ mission ? mission.monthly.review : '' } / ${user.profile.level * 1500}` }}</span>
          <a-button v-show="mission.monthly.review >= (user.profile.level * 1500)" @click="completeMission('monthly', 'review')"
          size="small" class="background btn-get" type="primary">Nhận</a-button>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </section>
</template>

<script>
export default {
  name: 'MissionComponent',
  data () {
    return {
      rootSubmenuKeys: ['day', 'growth', 'month'],
      openKeys: ['day'],
      user: null,
      mission: {
        dayly: {
          vocabulary: 0,
          sentence: 0,
          review: 0
        },
        monthly: {
          vocabulary: 0,
          sentence: 0,
          review: 0
        },
        weekly: {
          vocabulary: 0,
          sentence: 0,
          review: 0
        }
      }
    }
  },
  props: ['socket'],
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    connectSocket () {
      this.socket.on('serverGetMission', (data) => {
        this.mission = data.mission
      })
      this.socket.on('serverUpdateMission', (data) => {
        this.mission = data.mission
      })
      this.socket.on('serverDoneMission', (data) => {
        this.mission = data.mission
        this.$notification.success({
          message: 'Ngon 😍😍',
          description: `Kinh nghiệm +${data.exp}, Tiền Yên(円) +${data.money}`
        })
      })
      this.socket.on('userGotoUniversity', (data) => {
        this.$notification.warning({
          message: 'Có mồi ngon! 😍😍',
          description: `${data.userName} bắt đầu đi học Đại học, mau chóng đến cướp thôi! 😍😍`,
          duration: 0
        })
      })
    },
    getMission () {
      this.socket.emit('clientGetMission', {
        token: this.user.token
      })
    },
    completeMission (type1, type2) { // type1 = (dayly, weekly, monthly), type2 = (voca, sentence, review)
      if (this.mission.max > 0) {
        switch (type1) {
          case 'dayly':
            this.socket.emit('clientDoneDaylyMission', {
              token: this.user.token,
              type: type2
            })
            break
          case 'weekly':
            this.socket.emit('clientDoneWeeklyMission', {
              token: this.user.token,
              type: type2
            })
            break
          case 'monthly':
            this.socket.emit('clientDoneMonthlyMission', {
              token: this.user.token,
              type: type2
            })
            break
          default:
            break
        }
      } else {
        this.$message.warning('Mai quay lại nhé!')
      }
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {
      this.connectSocket()
      this.getMission()
    }
  }
}
</script>

<style lang="scss" scoped>
.mission {
  .max {
    background-color: #16032d;
    width: 97.75%;
    padding: 2px 10px;
    span {
      color: white;
    }
  }
  .content {
    .title {
      font-weight: 600;
      font-size: 16px;
      color: white;
    }
    .icon {
      color: white;
    }
    .item {
      .btn-get {
        margin-top: 8px;
        float: right;
        color: white;
      }
    }
  }
}
</style>
