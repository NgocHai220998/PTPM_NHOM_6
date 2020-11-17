<template>
  <footer class="footer-example">
    <Left @deleteDone="deleteDone" @editDone="editDone" @addDone="addDone" :example="example" class="footer-example-left" />
    <section class="center">
      <div v-if="example.example !== ''">
          <div class="text-example">
              <span class="btn">{{ example.example }}</span>
          </div>
          <div class="text-mean">
              <span class="btn" v-show="isHidenMean">{{ example.explain }}</span>
              <a-button @click="isHidenMean = !isHidenMean" class="btn-hiden">
                  {{ isHidenMean ? 'Ẩn' : 'Hiện Nghĩa' }}
              </a-button>
          </div>
      </div>
      <div v-else class="commingsoon">
          <span>Bạn đã sẵn sàng chưa?</span>
      </div>
    </section>
    <section class="right">
      <div class="back-next">
          <a-button-group>
            <a-button @click="run(false)" title="Câu tiếp theo" type="primary"> <a-icon type="left" /></a-button>
            <a-button @click="run(true)" title="Câu trước đó" type="primary"><a-icon type="right" /></a-button>
          </a-button-group>
        </div>
        <div class="random">
          <a-button title="Ngẫu nhiên" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : 'danger'" class="btn">Ngẫu nhiên</a-button>
        </div>
        <div class="auto">
          <a-button title="Tự động" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : 'danger'" class="btn">Tự động</a-button>
        </div>
      </section>
  </footer>
</template>

<script>

import Left from './Left'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ExampleComponent',
  data () {
    return {
      isRandom: false,
      isHidenMean: true,
      example: {
        example: ''
      },
      user: null,
      isAuto: false,
      index: 0,
      interval: null,
      isNext: true
    }
  },
  computed: {
    ...mapGetters(['examples'])
  },
  methods: {
    ...mapActions(['getExamples']),
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
    },
    addDone () {
      this.getExamples({
        email: this.user.email
      })
      this.run()
    },
    editDone () {
      this.getExamples({
        email: this.user.email
      })
      this.run()
    },
    deleteDone () {
      this.getExamples({
        email: this.user.email
      })
      this.run()
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getExamples({
      email: this.user.email
    })
  },
  components: {
    Left
  },
  watch: {
    isAuto: function () {
      if (this.isAuto) {
        this.interval = setInterval(() => {
          this.run(this.isNext)
        }, 500)
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .footer-example {
        display: flex;
        justify-content: space-between;
        &-left {
          width: 150px;
        }
        .center {
          width: 100%;
          text-align: center;
          .text-example {
            span {
              font-size: 22px;
              font-weight: bold;
              color: white;
              display: inline-block;
              max-width: 550px;
            }
          }
          .text-mean {
            position: relative;
            span {
              font-size: 18px;
              color: white;
              display: inline-block;
              max-width: 550px;
            }
            .btn-hiden {
              top: 5px;
              height: 20px;
              position: absolute;
              right: 0;
            }
          }
          .commingsoon {
            span {
              font-size: 35px;
              color: white;
            }
          }
        }
        .right {
          width: 150px;
          text-align: center;
          .random, .auto {
            padding-top: 3px;
            .btn {
              width: 92px;
              max-width: 92px;
              min-width: 92px;
              max-width: 80px;
            }
          }
        }
    }
</style>
