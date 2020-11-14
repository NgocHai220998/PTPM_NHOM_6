<template>
  <section class="voca-container">
    <div style="display: flex; justify-content: space-between;">
      <ButtonAdd />
      <ButtonEdit />
      <div>
        <a-popconfirm
          title="Bạn chắc chắn muốn xóa chứ？"
          okText="Xóa luôn"
          cancelText="Thôi"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        >
          <a-button type="danger"><a-icon type="delete" />Xóa</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="content">
      <div class="text-voca">
        <span v-if="badWord.badWord !== ''">Hello</span>
        <span v-else>Chúng ta bắt đầu chứ? </span>
      </div>
      <div class="text-spell">
        <span v-if="badWord.badWord !== ''">/hə'lou/</span>
        <span v-else>Are you ready?</span>
      </div>
    </div>
    <div class="bottom">
      <a-button-group style="display: flex;">
        <a-button type="primary"> <a-icon type="left" /></a-button>
        <a-button type="primary"><a-icon type="right" /></a-button>
      </a-button-group>
      <a-button class="btn" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : 'danger'">Ngẫu nhiên</a-button>
      <a-button class="btn" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : 'danger'">Tự động</a-button>
    </div>
  </section>
</template>

<script>

import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'voca',
  data () {
    return {
      isRandom: false,
      isAuto: false,
      badWord: {
        badWord: ''
      },
      user: null,
      index: 0,
      interval: null,
      isNext: true
    }
  },
  components: {
    ButtonAdd,
    ButtonEdit
  },
  computed: {
    ...mapGetters(['badWords'])
  },
  methods: {
    ...mapActions(['getBadWords']),
    confirmDelete () {
      this.$message.success('Okie')
    },
    cancelDelete () {
      this.$message.success('Cancel')
    },
    run (isNext) {
      if (this.isRandom) {
        this.index = Math.floor(Math.random() * this.examples.length)
      } else {
        if (isNext) {
          if (this.index < this.examples.length - 1) {
            this.index++
          } else {
            this.isNext = false
          }
        } else {
          if (this.index > 0) {
            this.index--
          } else {
            this.isNext = true
          }
        }
      }
      if (this.examples.length > 0) {
        this.example = this.examples[this.index]
      } else {
        this.example = {
          example: ''
        }
      }
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    // this.getBadWords({
    //   email: this.user.email
    // })
  },
  watch: {
    isAuto: function () {
      if (this.isAuto) {
        this.interval = setInterval(() => {
          this.run(this.isNext)
        }, 100)
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .voca-container {
    position: relative;
    .content {
      position: absolute;
      top: 50%;
      right: 50%;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      transform: translate(50%, -50%);
      .text-voca {
        span {
          font-size: 40px;
          color: white;
        }
      }
      .text-spell {
        span {
          font-size: 20px;
          color: white;
        }
      }
    }
    .bottom {
      display: flex;
      position: absolute;
      bottom: 0px;
      .btn {
        max-width: 80px;
        margin-left: 5px;
      }
    }
  }
</style>
