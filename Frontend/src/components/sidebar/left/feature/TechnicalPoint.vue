<template>
  <section class="feature-technical-point">
    <a-popover :title="`Nâng kỹ thuật còn: ${technicalPoint}`" placement="rightTop" trigger="click" v-model="visible">
      <div slot="content">
        <div>
          <div class="input-number">
            <a-button size="small" @click="onChange('martialArt')" type="primary"><a-icon type="plus" /></a-button>
            {{ valueMartialArt }}
            <span>
              Võ thuật
            </span>
          </div>
          <div class="input-number">
            <a-button size="small" @click="onChange('armor')" type="primary"><a-icon type="plus" /></a-button>
            {{ valueArmor }}
            <span>
              Hộ thân
            </span>
          </div>
          <div class="input-number">
            <a-button size="small" @click="onChange('hp')" type="primary"><a-icon type="plus" /></a-button>
            {{ valueHP }}
            <span>
              Sinh lực
            </span>
          </div>
          <div class="input-number">
            <a-button size="small" @click="onChange('critical')" type="primary"><a-icon type="plus" /></a-button>
            {{ valueCritical }}
            <span>
              Chí mạng
            </span>
          </div>
          <div class="input-number">
            <a-button size="small" @click="onChange('propUp')" type="primary"><a-icon type="plus" /></a-button>
            {{ valuePropUp }}
            <span>
              Chống đỡ
            </span>
          </div>
          <div class="input-number">
            <a-button size="small" @click="onChange('avoid')" type="primary"><a-icon type="plus" /></a-button>
            {{ valueAvoid }}
            <span>
              Né tránh
            </span>
          </div>
        </div>
        <div style="text-align: right; margin-top: 10px; display: flex;">
          <a-button @click="hide" type="danger">Thôi</a-button>
          <a-spin :spinning="isLoading">
            <a-button @click="saveTechnicalPoint" class="background" type="primary">Lưu</a-button>
          </a-spin>
        </div>
      </div>
      <a-button class="technical-point" type="primary">Nâng điểm kỹ thuật</a-button>
    </a-popover>
    <a-badge v-if="technicalPoint > 0" :count="user ? technicalPoint : ''">
    </a-badge>
  </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TechnicalPointComponent',
  data () {
    return {
      visible: false,
      technicalPoint: 0,
      valueMartialArt: 0,
      valueHP: 0,
      valueArmor: 0,
      valuePropUp: 0,
      valueAvoid: 0,
      valueCritical: 0,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['userByEmail'])
  },
  props: ['socket'],
  methods: {
    ...mapActions(['getUserByEmail']),
    hide () {
      this.visible = false
    },
    onChange (type) {
      if (this.technicalPoint > 0) {
        switch (type) {
          case 'martialArt':
            this.valueMartialArt += 1
            break
          case 'avoid':
            this.valueAvoid += 1
            break
          case 'hp':
            this.valueHP += 1
            break
          case 'propUp':
            this.valuePropUp += 1
            break
          case 'critical':
            this.valueCritical += 1
            break
          case 'armor':
            this.valueArmor += 1
            break
          default:
            break
        }
        this.technicalPoint -= 1
      } else {
        this.$message.error('Hết điểm kỹ thuật rồi 😭😭, cố gắng học để có điểm kỹ thuật nhé! 💪💪')
      }
    },
    setData () {
      this.technicalPoint = this.user.profile.technicalPoint.index
      this.valueMartialArt = this.user.profile.technicalPoint.martialArt
      this.valueHP = this.user.profile.technicalPoint.hp
      this.valueArmor = this.user.profile.technicalPoint.armor
      this.valueAvoid = this.user.profile.technicalPoint.avoid
      this.valueCritical = this.user.profile.technicalPoint.critical
      this.valuePropUp = this.user.profile.technicalPoint.propUp
    },
    saveTechnicalPoint () {
      this.socket.emit('clientUpdateProfile', {
        token: this.user.token,
        profile: {
          ...this.user.profile,
          technicalPoint: {
            index: this.technicalPoint,
            martialArt: this.valueMartialArt,
            avoid: this.valueAvoid,
            propUp: this.valuePropUp,
            critical: this.valueCritical,
            hp: this.hp,
            armor: this.valueArmor
          }
        }
      })
    },
    connectSocket () {
      this.serverUpdateProfile()
    },
    serverUpdateProfile () {
      this.socket.on('serverUpdateProfile', async (result) => {
        if (result.code === 200) {
          await this.getUserByEmail({
            email: this.user.email
          })
          setTimeout(() => {
            localStorage.setItem('user', JSON.stringify({
              ...this.user,
              ...this.userByEmail
            }))
            this.user = JSON.parse(localStorage.getItem('user'))
            this.setData()
          }, 0)
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
      this.setData()
    }
  },
  watch: {
    user: {

    }
  }
}
</script>

<style lang="scss" scoped>
  .technical-point {
    padding: 0;
    margin: 0;
    height: 20px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-size: 16px;
    font-weight: 600;
    text-decoration: underline;
    color: #007ADD;
    &:hover {
      color: #1890ff;
    }
  }
</style>
