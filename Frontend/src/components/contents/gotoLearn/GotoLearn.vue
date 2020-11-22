<template>
  <section class="gotolearn-page">
    <div v-if="gotoLearn" class="primary-school">
      <a-steps>
        <a-step>
        </a-step>
        <a-step>
        </a-step>
        <div v-for="(figure, i) in gotoLearn.primarySchool" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <a-tooltip>
            <template slot="title">
              {{ figure.main.userName }}
            </template>
            <img @click="showModal(figure, 'primary')" width="80" :src="figure.main.srcImage" alt="">
          </a-tooltip>
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Tiểu học</b>
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
        <div v-for="(figure, i) in gotoLearn.highSchool" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <a-tooltip>
            <template slot="title">
              {{ figure.main.userName }}
            </template>
            <img @click="showModal(figure, 'high')" width="80" :src="figure.main.srcImage" alt="">
          </a-tooltip>
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Trung học</b>
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
        <a-step>
        </a-step>
        <div v-for="(figure, i) in gotoLearn.university" :key="i" :style="{ left: figure.percentCompleted + '%'}" class="figure">
          <a-tooltip>
            <template slot="title">
              {{ figure.main.userName }}
            </template>
            <img @click="showModal(figure, 'university')" width="80" :src="figure.main.srcImage" alt="">
          </a-tooltip>
        </div>
      </a-steps>
      <div class="finish">
        <div class="container background effect-mission">
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <span class="effect"></span>
          <b>Đại học</b>
        </div>
      </div>
    </div>
    <a-modal
      title="Bạn chắc chắn muốn cướp chứ?"
      :visible="visible"
      @ok="toFight"
      @cancel="hideModal"
      cancelText="Thôi tha cho nó"
      okText="Cướp luôn"
    >
      <div v-if="clickedFigure" class="modal-container">
        <div class="left">
          <img height="200" :src="clickedFigure.main.srcImage" alt="">
        </div>
        <div class="right">
          <div class="item">
            <b>Tên:</b> <span>{{ clickedFigure.main.userName }}</span>
          </div>
          <div class="item">
            <b>Số lần bị cướp:</b> <span>{{ `${3 - clickedFigure.max}/3` }}</span>
          </div>
          <div class="item">
            <b>Tấn công:</b> <span>{{ clickedFigure.main.martialArt }}</span>
          </div>
          <div class="item">
            <b>Giáp:</b> <span>{{ clickedFigure.main.armor }}</span>
          </div>
          <div class="item">
            <b>Máu:</b> <span>{{ clickedFigure.main.hp }}</span>
          </div>
          <div class="item">
            <b>Cướp thành công nhận:</b>
            <p><b>Kinh nghiệm:</b><span style="color: green"> +{{ `${parseInt((clickedFigure.exp * 20)/100)}` }}</span></p>
            <p><b>Tiền yên:</b><span style="color: green"> +{{ `${parseInt((clickedFigure.money * 20)/100)}` }}</span></p>
            <p><b>Danh vọng:</b><span style="color: green"> +{{ `${parseInt((clickedFigure.famePoint * 20)/100)}` }}</span></p>
          </div>
        </div>
      </div>
    </a-modal>
    <div v-if="user" class="bottom">
      <div :class="isChoicePrimary ? 'bottom-primary choice-gotoschool' : 'bottom-primary'">
        <h3>Tiểu học</h3>
        <a-popover title="Tiểu học" trigger="click" v-model="visiblePrimary">
          <div slot="content" class="content">
            <div class="item"><b>Kinh nghiệm:</b><span style="color: green;"> +{{ user.profile.level * 5 }}</span></div>
            <div class="item"><b>Tiến yên(円):</b><span style="color: green;"> +{{ user.profile.level * 5 }}</span></div>
            <div class="item"><b>Danh vọng:</b><span style="color: green;"> +{{ user.profile.level * 1 }}</span></div>
            <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
            <div class="item"><b>Mẹo:</b><span style="color: red;"> Bạn có biết đi học cùng nhau, sẽ giảm đáng kể thời gian không?</span></div>
          </div>
          <a-button style="width: 100%" type="primary"><a-icon type="question-circle" />Thông tin</a-button>
        </a-popover>
      </div>
      <div :class="isChoiceHigh ? 'bottom-high choice-gotoschool' : 'bottom-high'">
        <h3>Trung học</h3>
        <a-popover title="Trung học" trigger="click" v-model="visibleHigh">
          <div slot="content" class="content">
            <div class="item"><b>Kinh nghiệm:</b><span style="color: green;"> +{{ user.profile.level * 10 }}</span></div>
            <div class="item"><b>Tiến yên(円):</b><span style="color: green;"> +{{ user.profile.level * 10 }}</span></div>
            <div class="item"><b>Danh vọng:</b><span style="color: green;"> +{{ user.profile.level * 2 }}</span></div>
            <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
            <div class="item"><b>Giáp:</b><span style="color: red;"> +1</span></div>
            <div class="item"><b>Mẹo:</b><span style="color: red;"> Bạn có biết đi học cùng nhau, sẽ giảm đáng kể thời gian không?</span></div>
          </div>
          <a-button style="width: 100%" type="primary"><a-icon type="question-circle" />Thông tin</a-button>
        </a-popover>
      </div>
      <div :class="isChoiceUniversity ? 'bottom-university choice-gotoschool' : 'bottom-university'">
        <h3>Đại học</h3>
        <a-popover title="Đại học" trigger="click" v-model="visibleUniversity">
          <div slot="content" class="content">
            <div class="item"><b>Kinh nghiệm:</b><span style="color: green;"> +{{ user.profile.level * 15 }}</span></div>
            <div class="item"><b>Tiến yên(円):</b><span style="color: green;"> +{{ user.profile.level * 15 }}</span></div>
            <div class="item"><b>Danh vọng:</b><span style="color: green;"> +{{ user.profile.level * 3 }}</span></div>
            <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
            <div class="item"><b>Giáp:</b><span style="color: red;"> +1</span></div>
            <div class="item"><b>Tấn công:</b><span style="color: red;"> +1</span></div>
            <div class="item"><b>Mẹo:</b><span style="color: red;"> Bạn có biết đi học cùng nhau, sẽ giảm đáng kể thời gian không?</span></div>
          </div>
          <a-button style="width: 100%" type="primary"><a-icon type="question-circle" />Thông tin</a-button>
        </a-popover>
      </div>
      <div class="bottom-action">
        <a-popconfirm
          title="Bạn muốn đi học luôn chứ?, hãy cẩn thận kẻ xấu 👳"
          @confirm="handleGotoSchool"
          okText="Đi luôn"
          cancelText="Thôi tý đi!"
          style="height: 100%"
        >
          <a-button style="width: 100%;" type="danger">Đi học {{ `${3 - user.profile.otherInformation.maxGotoLearn}/3` }}</a-button>
        </a-popconfirm>
      </div>
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
      visiblePrimary: false,
      visibleHigh: false,
      visibleUniversity: false,
      isChoicePrimary: false,
      isChoiceHigh: false,
      isChoiceUniversity: false,
      setIntervalChoice: null,
      setIntervalTime: 50,
      user: null,
      gotoLearn: {
        primarySchool: [],
        highSchool: [],
        university: []
      },
      visible: false,
      clickedFigure: null,
      gotoLearnType: 'primary'
    }
  },
  props: ['socket'],
  methods: {
    showModal (figure, gotoLearnType) {
      this.clickedFigure = figure
      this.gotoLearnType = gotoLearnType
      this.visible = true
    },
    hideModal () {
      this.visible = false
    },
    toFight () {
      if (this.clickedFigure.max < 1) {
        this.$message.warning('Đối phương đã bị cướp quá nhiều rồi, tha cho nó đi!')
        return
      } else if (this.user.email === this.clickedFigure.email) {
        this.$message.warning('Sao lại cướp của mình thế, không được nhé!')
        return
      }
      localStorage.setItem('robGotoLearnData', JSON.stringify({
        exp: this.clickedFigure.exp,
        money: this.clickedFigure.money,
        famePoint: this.clickedFigure.famePoint,
        gotoLearnType: this.gotoLearnType
      }))
      this.$router.push({
        name: 'FightScreen',
        params: {
          type: 'rob',
          email: this.user.email,
          emailReverse: this.clickedFigure.email
        }
      })
    },
    handleGotoSchool () {
      if (this.user.profile.level < 1) {
        this.$message.warning('Bạn phải đạt cấp 3 để đi học')
        return
      } else if (this.user.profile.otherInformation.maxGotoLearn < 1) {
        this.$message.warning('Hôm nay đi học đủ 3 buổi rồi!')
        return
      } else if (this.user.profile.otherInformation.isGotoLearn) {
        this.$message.warning('Bạn đang đi học mà ???')
        return
      }
      this.setIntervalChoice = setInterval(() => {
        let number = Math.floor(Math.random() * 10)
        switch (number) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            this.isChoicePrimary = true
            this.isChoiceHigh = false
            this.isChoiceUniversity = false
            break
          case 5:
          case 6:
          case 7:
          case 8:
            this.isChoicePrimary = false
            this.isChoiceHigh = true
            this.isChoiceUniversity = false
            break
          case 9:
            this.isChoicePrimary = false
            this.isChoiceHigh = false
            this.isChoiceUniversity = true
            break
          default:
            break
        }
        this.setIntervalTime += 50
        if (this.setIntervalTime === 3000) {
          this.setIntervalTime = 50
          clearInterval(this.setIntervalChoice)
          if (this.isChoicePrimary) {
            this.socket.emit('clientCreateGotoLearn', {
              token: this.user.token,
              type: 'primary',
              gotoLearn: {
                email: this.user.email,
                main: {
                  userName: this.user.main.userName,
                  martialArt: this.user.main.martialArt,
                  hp: this.user.main.hp,
                  armor: this.user.main.armor,
                  srcImage: this.user.main.srcImage
                },
                percentCompleted: 3,
                exp: this.user.profile.level * 5,
                money: this.user.profile.level * 5,
                famePoint: this.user.profile.level * 1,
                hpPoint: 5,
                max: 3
              }
            })
            this.$success({
              title: 'Chúc mừng bạn trúng tuyển tiểu học 😂',
              okText: 'Hơi đen',
              content: (
                <div>
                  <p>Sau khi kết thúc quá trình học bạn nhận được:</p>
                  <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
                  <p>Và phần thưởng tương ứng.</p>
                </div>
              )
            })
          } else if (this.isChoiceHigh) {
            this.socket.emit('clientCreateGotoLearn', {
              token: this.user.token,
              type: 'high',
              gotoLearn: {
                email: this.user.email,
                main: {
                  userName: this.user.main.userName,
                  martialArt: this.user.main.martialArt,
                  hp: this.user.main.hp,
                  armor: this.user.main.armor,
                  srcImage: this.user.main.srcImage
                },
                percentCompleted: 3,
                exp: this.user.profile.level * 10,
                money: this.user.profile.level * 10,
                famePoint: this.user.profile.level * 2,
                hpPoint: 5,
                armorPoint: 1,
                max: 3
              }
            })
            this.$success({
              title: 'Chúc mừng bạn trúng tuyển trung học 👮',
              okText: 'Tốt',
              content: (
                <div>
                  <p>Sau khi kết thúc quá trình học bạn nhận được:</p>
                  <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
                  <div class="item"><b>Giáp:</b><span style="color: red;"> +1</span></div>
                  <p>Và phần thưởng tương ứng.</p>
                </div>
              )
            })
          } else if (this.isChoiceUniversity) {
            this.socket.emit('clientCreateGotoLearn', {
              token: this.user.token,
              type: 'university',
              gotoLearn: {
                email: this.user.email,
                main: {
                  userName: this.user.main.userName,
                  martialArt: this.user.main.martialArt,
                  hp: this.user.main.hp,
                  armor: this.user.main.armor,
                  srcImage: this.user.main.srcImage
                },
                percentCompleted: 3,
                exp: this.user.profile.level * 15,
                money: this.user.profile.level * 15,
                famePoint: this.user.profile.level * 3,
                martialArtPoint: 1,
                hpPoint: 5,
                armorPoint: 1,
                max: 3
              }
            })
            this.$success({
              title: 'Chúc mừng bạn trúng tuyển đại học 👋👋',
              okText: 'Tuyệt vời',
              content: (
                <div>
                  <p>Sau khi kết thúc quá trình học bạn nhận được:</p>
                  <div class="item"><b>Máu:</b><span style="color: red;"> +5</span></div>
                  <div class="item"><b>Giáp:</b><span style="color: red;"> +1</span></div>
                  <div class="item"><b>Tấn công:</b><span style="color: red;"> +1</span></div>
                  <p>Và phần thưởng tương ứng.</p>
                </div>
              )
            })
          }
        }
      }, this.setIntervalTime)
    },
    connectSocket () {
      this.socket.on('serverUpdateGotoLearn', (data) => {
        if (data.code === 200) {
          this.gotoLearn = data.gotoLearn
          this.loading = false
        } else {
          this.$message.error('Ui có biến rồi đại ca ơi (Đi học lỗi)')
        }
      })
      this.serverUpdateProfile()
    },
    serverUpdateProfile () {
      this.socket.on('serverUpdateProfile', async (data) => {
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
          this.$message.error('Lỗi rồi đại ca ơi!')
        }
      })
    },
    clientRequestUpdateGotoLearn () {
      this.socket.emit('clientRequestUpdateGotoLearn', {
        email: this.user.email
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {
      this.clientRequestUpdateGotoLearn()
      this.connectSocket()
    }
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
        .user-name {
          position: absolute;
          background-color: gray;
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
      position: absolute;
      bottom: 5%;
      width: 100%;
      &-primary, &-university, &-high, &-action {
        width: 22%;
        background-color: rgba(0, 0, 0, 0.65);
        border-radius: 5px;
        h3 {
          text-align: center;
          color: white;
        }
      }
    }
  }
  .modal-container {
    display: flex;
  }
  .choice-gotoschool {
    box-shadow: 5px 5px 5px green, 5px 5px 25px green, 5px 5px 50px green;
  }
</style>
