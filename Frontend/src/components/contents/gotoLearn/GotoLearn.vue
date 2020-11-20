<template>
  <section class="gotolearn-page">
    <div class="primary-school">
      <a-steps>
        <a-step style="color: white" title="Tiểu Học">
        </a-step>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <div v-for="(figure, i) in data.primarySchool" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <img @click="showModal(figure)" width="80" :src="figure.srcImage" alt="">
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Vào học</b>
        </div>
      </div>
    </div>
    <div class="high-school">
      <a-steps>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <div v-for="(figure, i) in data.highSchool" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <img @click="showModal(figure)" width="80" :src="figure.srcImage" alt="">
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Vào học</b>
        </div>
      </div>
    </div>
    <div class="university">
      <a-steps>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <div v-for="(figure, i) in data.university" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <img @click="showModal(figure)" width="80" :src="figure.srcImage" alt="">
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Vào học</b>
        </div>
      </div>
    </div>
    <a-modal
      title="Bạn chắc chắn muốn đấm chứ?"
      :visible="visible"
      @ok="toFight"
      @cancel="hideModal"
      cancelText="Thôi tha cho nó"
      okText="Đấm luôn"
    >
      <div v-if="clickedFigure" class="modal-container">
        <div class="left">
          <img height="200" :src="clickedFigure.srcImage" alt="">
        </div>
        <div class="right">
          <div class="item">
            <b>Tên:</b> <span>{{ clickedFigure.userName }}</span>
          </div>
          <div class="item">
            <b>Số lần bị cướp:</b> <span>{{ `${3 - clickedFigure.max}/3` }}</span>
          </div>
        </div>
      </div>
    </a-modal>
    <div class="bottom">
      <div class="primary"></div>
      <div class="high"></div>
      <div class="university"></div>
      <div class="action"></div>
    </div>
  </section>
</template>
<script>
// import { jsonHeader } from '@/utils/fetchTool'
// import { API } from '@/constants/api'

export default {
  name: 'RankComponent',
  data () {
    return {
      data: {
        primarySchool: [{
          userName: 'Hainn',
          email: 'ngochai220998@gmail.com',
          srcImage: '/static/images/attack.png',
          percentCompleted: 0,
          run: function () {
            setInterval(() => {
              this.percentCompleted += 1
              if (this.percentCompleted === 90) {
                this.percentCompleted = 0
              }
            }, 2000)
          },
          exp: 10,
          money: 10,
          max: 3
        }, {
          userName: 'NgocHai',
          email: 'Hai@gmail.com',
          srcImage: '/static/images/shoot.png',
          percentCompleted: 30,
          run: function () {
            setInterval(() => {
              this.percentCompleted += 1
              if (this.percentCompleted === 90) {
                this.percentCompleted = 0
              }
            }, 2000)
          },
          exp: 10,
          money: 10,
          max: 3
        }],
        highSchool: [{
          userName: 'Hainn1',
          email: 'ngochai220998@gmail.com',
          srcImage: '/static/images/zombie.png',
          percentCompleted: 20,
          run: function () {
            setInterval(() => {
              this.percentCompleted += 1
              if (this.percentCompleted === 90) {
                this.percentCompleted = 0
              }
            }, 2000)
          },
          exp: 10,
          money: 10,
          max: 3
        }],
        university: [{
          userName: 'Hainn2',
          email: 'ngochai220998@gmail.com',
          srcImage: '/static/images/robot.png',
          percentCompleted: 45,
          run: function () {
            setInterval(() => {
              this.percentCompleted += 1
              if (this.percentCompleted === 90) {
                this.percentCompleted = 0
              }
            }, 2000)
          },
          exp: 10,
          money: 10,
          max: 3
        }]
      },
      visible: false,
      clickedFigure: null
    }
  },
  props: ['socket'],
  methods: {
    run () {
      console.log('okie')
      for (let i = 0; i < this.data.primarySchool.length; ++i) {
        console.log(1)
        this.data.primarySchool[i].run()
      }
      for (let i = 0; i < this.data.highSchool.length; ++i) {
        this.data.highSchool[i].run()
      }
      for (let i = 0; i < this.data.university.length; ++i) {
        this.data.university[i].run()
      }
    },
    showModal (figure) {
      this.clickedFigure = figure
      console.log(this.clickedFigure)
      this.visible = true
    },
    hideModal () {
      this.visible = false
    },
    toFight () {
      this.$message.success('Okie')
    }
  },
  beforeMount () {
    this.run()
  }
}
</script>

<style lang="scss" scoped>
  .gotolearn-page {
    padding: 10px;
    position: relative;
    .primary-school, .high-school, .university {
      margin: 0 15px;
      margin-bottom: 60px;
      .figure {
        position: absolute;
        display: inline-block;
        img {
          height: 80px;
          width: 80px;
          border-radius: 999px;
          &:hover {
            cursor: pointer;
            box-shadow: 5px 5px 5px red, 5px 5px 25px red, 5px 5px 50px red, 5px 5px 250px red;
          }
        }
      }
      .finish {
        position: absolute;
        right: 0;
        .container {
          position: absolute;
          width: 80px;
          height: 80px;
          top: -20px;
          left: -90px;
          border-radius: 999px;
          text-align: center;
          b {
            color: white;
            line-height: 80px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .primary, .high, .university, .action {
        width: 22%;
        background-color: gray;
      }
    }
  }
  .modal-container {
    display: flex;
  }
</style>
