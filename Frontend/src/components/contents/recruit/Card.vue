<template>
  <section class="recruit-card">
    <a-card hoverable style="width: 240px; background-color: rgba(255, 255, 255, 0.8)">
      <img
        alt="figure"
        :src="figure.srcImage"
        slot="cover"
        class="img"
      />
      <a-card-meta :title="figure.userName">
        <template slot="description">
          <div class="description">
            <span>{{ figure.description }}</span>
          </div>
          <a-popconfirm
            :title="`Bạn chắc chắn muốn chiêu mộ ${figure.userName} làm đồng đội chứ?`"
            @confirm="handleRecruit"
            okText="Chiêu mộ luôn"
            cancelText="Thôi"
          >
            <a-button style="width: 100%;" size="small" class="background" type="primary">Thuyết phục</a-button>
          </a-popconfirm>
          <a-popover :title="figure.userName" trigger="click" v-model="visible">
            <div slot="content" class="info">
              <div v-for="(value, name, index) in figure" :key="index">
                <span style="font-size: 16px" v-if="name === 'kind'"><b>Hệ:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'martialArt'"><b>Võ lực:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'avoid'"><b>Né tránh:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'propUp'"><b>Chống đỡ:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'critical'"><b>Chí mạng:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'armor'"><b>Giáp:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'hp'"><b>Máu:</b> {{ value }}</span>
              </div>
              <div class="condition">
                <h3>Điều kiện: 🔓🔓</h3>
                <p class="level">Cấp đạt: {{ figure.condition.level }}</p>
                <p class="level">Tiền yên: {{ figure.condition.money }}</p>
                <p class="level">Danh vọng: {{ figure.condition.famePoint }}</p>
                <p class="level">Kim cương: {{ figure.condition.diamond }}</p>
              </div>
            </div>
            <a-button style="width: 100%;" size="small" type="primary"><a-icon type="question-circle" /></a-button>
          </a-popover>
        </template>
      </a-card-meta>
    </a-card>
  </section>
</template>
<script>
// import { jsonHeader } from '@/utils/fetchTool'
// import { API } from '@/constants/api'

export default {
  name: 'Card',
  data () {
    return {
      visible: false,
      user: null
    }
  },
  props: ['socket', 'figure'],
  methods: {
    handleRecruit () {
      if (this.user.profile.level < this.figure.condition.level) {
        this.$message.error('Cấp không đủ!')
      } else if (this.user.profile.money < this.figure.condition.money) {
        this.$message.error('Tiền không đủ đại ca ơi!')
      } else if (this.user.profile.diamond < this.figure.condition.diamond) {
        this.$message.error('Kim cương thiếu òi...')
      } else if (this.user.profile.famePoint < this.figure.condition.famePoint) {
        this.$message.error('Danh vọng không đủ!')
      } else {
        this.buy()
      }
    },
    buy () {
      let isBuy = true
      if (this.user.pets) {
        for (let i = 0; i < this.user.pets.length; ++i) {
          if (this.user.pets[i].kind === this.figure.kind) {
            isBuy = false
          }
        }
        if (isBuy) {
          this.socket.emit('clientBuyFigure', {
            token: this.user.token,
            pet: {
              userName: this.figure.userName,
              kind: this.figure.kind,
              martialArt: this.figure.martialArt,
              avoid: this.figure.avoid,
              propUp: this.figure.propUp,
              critical: this.figure.critical,
              hp: this.figure.hp,
              position: this.figure.position,
              srcImage: this.figure.srcImage,
              armor: this.figure.armor
            },
            condition: {
              ...this.figure.condition
            }
          })
        } else {
          this.$message.warning('Bạn đã sở hữu nhân vật này rồi!')
        }
      }
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
.recruit-card {
  .img {
    max-height: 200px;
  }
  .description {
    margin-bottom: 5px;
    span {
      font-size: 14px;
      color: black;
    }
  }
  max-height: 380px;
  margin: auto 0;
}
</style>
