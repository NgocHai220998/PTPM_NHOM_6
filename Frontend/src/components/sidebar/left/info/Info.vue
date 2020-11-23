<template>
  <section class="info">
    <div class="info-container">
      <div class="avatar">
        <router-link :to="{ name: 'HomeScreen' }">
          <img width="100" height="100" class="index background" :src="user ? user.main.srcImage : ''" />
        </router-link>
        <div class="avatar-level background">
          <div>
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>Cấp độ</span>
              </template>
              <span>{{ user ? user.profile.level : '' }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="avatar-top background">
          <div>
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>Xếp hạng</span>
              </template>
              <span>{{ user ? user.profile.rank : '' }}</span>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-name">
          <div class="background">
            <a-tooltip placement="top">
              <template slot="title">
                <span>Tên nhân vật</span>
              </template>
              <span>{{ user ? user.main.userName : '' }}</span>
            </a-tooltip>
          </div>
        </div>
        <div class="right-money">
          <div class="background">
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ user ? user.profile.money : '' }} Yên</span>
              </template>
              <span>{{ user ? user.profile.money : '' }} 円</span>
            </a-tooltip>
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ user ? user.profile.famePoint : '' }} Danh vọng</span>
              </template>
              <a-icon @click="clickFamePoint" class="fame-point" type="bg-colors"/>
            </a-tooltip>
          </div>
        </div>
        <div class="right-point">
          <div class="background">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ user ? user.profile.diamond : '' }} Kim Cương</span>
              </template>
              <span><a-icon type="radar-chart" /> {{ user ? user.profile.diamond : '' }} KC</span>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div class="position">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <router-link class="position-icon" :to="{ name: 'PositionScreen' }">
          <a-tooltip placement="top">
            <template slot="title">
              <span>Trận hình</span>
            </template>
            <a-icon class="position-icon" type="border-left" />
          </a-tooltip>
        </router-link>
      </div>
      <a-tooltip placement="topLeft">
        <template slot="title">
          <span>Kinh nghiệm: {{ `${user.profile.exp}/${user.profile.expNextLevel}` }}</span>
        </template>
        <div class="exp">
          <div :style="{ width: (user ? parseInt(user.profile.exp/user.profile.expNextLevel * 100) : 0) + '%'}" class="index background"></div>
        </div>
      </a-tooltip>
    </div>
  </section>
</template>

<script>

export default {
  name: 'InfoComponent',
  data () {
    return {
      user: null,
      exp: null
    }
  },
  props: ['socket'],
  methods: {
    clickFamePoint () {
      this.$message.success('clicked FamePoint')
    },
    connectSocket () {
      this.serverUpdateProfile()
      this.serverLevelUp()
    },
    serverUpdateProfile () {
      this.socket.on('serverUpdateProfile', async (data) => {
        if (data.code === 200) {
          this.user = {
            ...this.user,
            ...data.user
          }
          this.exp = this.user.profile.exp
          localStorage.setItem('user', JSON.stringify({
            ...this.user,
            ...data.user
          }))
        } else {
          this.$message.error('Lỗi rồi đại ca ơi!')
        }
      })
    },
    serverLevelUp () {
      this.socket.on('serverLevelUp', (data) => {
        if (data.code === 200) {
          this.levelUp()
          this.user = {
            ...this.user,
            ...data.user
          }
          this.exp = this.user.profile.exp
          localStorage.setItem('user', JSON.stringify({
            ...this.user,
            ...data.user
          }))
        } else {
          this.$message.error('Lỗi rồi đại ca ơi!')
        }
      })
    },
    levelUp () {
      this.$notification.success({
        message: 'Lên cấp rùi 😄😄',
        description:
          'Điểm kỹ năng +3, Tiền yên(円) +100, Danh vọng +10',
        duration: 0
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {
      this.connectSocket()
    }
  },
  watch: {
    exp: function () {
      let main = {}
      if (this.exp >= this.user.profile.expNextLevel) {
        switch (this.user.main.kind) {
          case 'shoot':
            main.martialArt = this.user.main.martialArt + 9
            main.avoid = this.user.main.avoid + 1
            main.propUp = this.user.main.propUp + 1
            main.critical = this.user.main.critical + 3
            main.hp = this.user.main.hp + 30
            main.armor = this.user.main.armor + 4
            break
          case 'attack':
            main.martialArt = this.user.main.martialArt + 5
            main.avoid = this.user.main.avoid + 1
            main.propUp = this.user.main.propUp + 3
            main.critical = this.user.main.critical + 1
            main.hp = this.user.main.hp + 45
            main.armor = this.user.main.armor + 9
            break
          case 'ninja':
            main.martialArt = this.user.main.martialArt + 7
            main.avoid = this.user.main.avoid + 3
            main.propUp = this.user.main.propUp + 1
            main.critical = this.user.main.critical + 1
            main.hp = this.user.main.hp + 37
            main.armor = this.user.main.armor + 6
            break
          default:
            break
        }
        if (this.user.pets) {
          for (let i = 0; i < this.user.pets.length; ++i) {
            let dataPet = {}
            switch (this.user.pets[i].kind) {
              case 'zombie':
                dataPet.martialArt = this.user.main.martialArt + 12
                dataPet.avoid = this.user.main.avoid + 1
                dataPet.propUp = this.user.main.propUp + 1
                dataPet.critical = this.user.main.critical + 1
                dataPet.hp = this.user.main.hp + 35
                dataPet.armor = this.user.main.armor + 5
                break
              case 'robot':
                dataPet.martialArt = this.user.main.martialArt + 5
                dataPet.avoid = this.user.main.avoid + 1
                dataPet.propUp = this.user.main.propUp + 1
                dataPet.critical = this.user.main.critical + 1
                dataPet.hp = this.user.main.hp + 40
                dataPet.armor = this.user.main.armor + 12
                break
              default:
                break
            }
            this.user.pets[i] = {
              ...this.user.pets[i],
              ...dataPet
            }
          }
        }
        this.socket.emit('clientLevelUp', {
          token: this.user.token,
          main,
          pets: this.user.pets,
          profile: {
            famePoint: this.user.profile.famePoint + 10,
            money: this.user.profile.money + 100,
            exp: 0,
            level: this.user.profile.level + 1,
            technicalPoint: {
              ...this.user.profile.technicalPoint,
              index: this.user.profile.technicalPoint.index + 3
            },
            expNextLevel: parseInt(this.user.profile.expNextLevel * 1.2)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .info {
    &-container {
      position: relative;
      margin: 15px 0 0 15px;
      .avatar {
        position: absolute;
        // left: 15px;
        // top: 15px;
        z-index: 2;
        .index {
          width: 100px;
          border-radius: 9999px;
          border: 3px solid green;
          cursor: pointer;
          max-height: 100px;
        }
        &-level, &-top {
          position: absolute;
          width: 40px;
          border-radius: 9999px;
          border: 3px solid green;
          div {
            text-align: center;
            cursor: pointer;
            span {
              color: white;
            }
          }
        }
        &-level {
          top: 0;
        }
        &-top {
          bottom: -12px;
          left: 25px;
        }
      }
      .right {
        position: relative;
        height: 90px;
        border-radius: 100px 50px 50px 100px;
        z-index: 1;
        top: 5px;
        margin-left: 10px;
        &-name, &-money, &-point {
          // border-radius: 50px;
          div {
            margin-left: 20px;
            height: 30px;
            line-height: 30px;
            span {
              font-weight: bold;
              color: white;
              padding-left: 80px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        &-name {
          div {
            border-radius: 0 10px 0 0;
            // border-bottom: 2px solid green;
            padding-left: 5px;
          }
        }
        &-point {
          div {
            // border-top: 2px solid green;
            border-radius: 0 0 10px 0;
            span {
              max-width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 5px;
            }
          }
        }
        &-money {
          position: relative;
          span {
            display: inline-block;
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 5px;
          }
          .fame-point {
            position: absolute;
            color: white;
            top: 0px;
            right: 10px;
            font-size: 24px;
            &:hover {
              cursor: pointer;
              opacity: 0.65;
            }
          }
        }
      }
      .position {
        position: absolute;
        bottom: -35px;
        right: 15px;
        cursor: pointer;
        &-icon {
          font-size: 25px;
          color: white;
        }
      }
      .exp {
        cursor: pointer;
        position: absolute;
        height: 5px;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        bottom: -40px;
        .index {
          height: 100%;
          border-radius: 5px;
        }
      }
    }
  }
</style>
