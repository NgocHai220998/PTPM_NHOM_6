<template>
  <section class="home-index">
    <div class="left">
      <div class="random">
        <a-button title="Ngẫu nhiên" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : 'danger'" class="btn">Ngẫu nhiên</a-button>
      </div>
      <div class="auto">
        <a-button title="Tự động" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : 'danger'" class="btn">Tự động</a-button>
      </div>
    </div>
    <div class="center">
      <div class="top">
        <a-button-group>
          <a-button
          :class="isInput ? 'background' : ''"
          @click="isInput = true; isChoice = false; isChoiceChar = false"
          >
            Gõ phím
          </a-button>
          <a-button
          :class="isChoice ? 'background' : ''"
          @click="isInput = false; isChoice = true; isChoiceChar = false"
          >
            Chọn đáp án
          </a-button>
          <a-button
          :class="isChoiceChar ? 'background' : ''"
          @click="isInput = false; isChoice = false; isChoiceChar = true"
          >
            Sắp xếp chữ
          </a-button>
        </a-button-group>
      </div>
      <div class="text-question">
        <div class="text">
          <span>{{ currentWord }}</span>
        </div>
        <div @click="handleClickLeftRight" class="left background"><a-icon type="double-left" /></div>
        <div @click="handleClickLeftRight" class="right background"><a-icon type="double-right" /></div>
      </div>
      <div class="bot">
        <!-- Answer by entering the answer -->
        <div v-show="isInput" class="input-text">
          <a-input-search @search="handleAnswerInput" @pressEnter="handleAnswerInput" v-model="answerInput" placeholder="Nhập đáp án ở đây" size="large">
            <a-button class="background" slot="enterButton"><a-icon type="enter" /></a-button>
          </a-input-search>
        </div>
        <!-- Answer by choosing multiple choice answers -->
        <div v-show="isChoice" class="choice-answer">
          <div class="container">
            <div @click="handleChoice" class="item background">
              <span>Tiếng Nhật</span>
            </div>
            <div @click="handleChoice" class="item background">
              <span>Tiếng Anh</span>
            </div>
            <div @click="handleChoice" class="item background">
              <span>Tiếng Đức</span>
            </div>
            <div @click="handleChoice" class="item background">
              <span>Tiếng Chó</span>
            </div>
          </div>
        </div>
        <!-- Answer by arranging the words in the sentence -->
        <div v-show="isChoiceChar" class="choice-char">
          <a-input-search @search="handleAnswerInput" @pressEnter="handleAnswerInput" v-model="answerInput" placeholder="Nhập đáp án ở đây" size="large">
            <a-button class="background" slot="enterButton"><a-icon type="enter" /></a-button>
          </a-input-search>
          <div class="arr-char">
            <div @click="handleChar" class="char background">
              <span>に</span>
            </div>
            <div @click="handleChar" class="char background">
              <span>ほ</span>
            </div>
            <div @click="handleChar" class="char background">
              <span>ん</span>
            </div>
            <div @click="handleChar" class="char background">
              <span>ご</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="group-button">
        <ButtonAdd />
        <ButtonEdit />
        <div class="delete">
          <a-popconfirm
            title="Bạn chắc chắn muốn xóa chứ？"
            okText="Xóa luôn"
            cancelText="Thôi"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
          >
            <a-button class="btn" type="danger"><a-icon type="delete" />Xóa</a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'

export default {
  name: '',
  data () {
    return {
      answerInput: '',
      isInput: false,
      isChoice: false,
      isChoiceChar: true,
      currentWord: '日本語',
      isRandom: false,
      isAuto: false
    }
  },
  components: {
    ButtonAdd,
    ButtonEdit
  },
  methods: {
    handleAnswerInput () {
      if (this.answerInput !== '') {
        this.$message.success('Input Answer')
        this.answerInput = ''
      } else {
        this.$message.error('Đáp án không được bỏ trống')
      }
    },
    handleChoice () {
      this.$message.success('Choice Answer')
    },
    handleChar () {
      this.$message.success('Choice Char Answer')
    },
    confirmDelete () {
      this.$message.success('Comfirm Delete')
    },
    cancelDelete () {
      this.$message.success('Cancel Delete')
    },
    handleClickLeftRight () {
      this.$message.success('Click left right text question')
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-index {
    color: white;
    display: flex;
    .left {
      width: 20%;
      padding-top: 30px;
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
    .center {
      padding: 20px 5px 10px 5px;
      text-align: center;
      width: 60%;
      .text-question {
        position: relative;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        border: 1px solid green;
        padding: 15px;
        .text {
          span {
            font-size: 34px;
          }
        }
        .left, .right {
          padding: 0px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          cursor: pointer;
          width: 35px;
          height: 100%;
          background-color: gray;
        }
        .left {
          top: 0;
          left: 0;
          border-radius: 10px 1px 1px 10px;
        }
        .right {
          top: 0;
          right: 0;
          border-radius: 1px 10px 10px 1px;
        }
      }
      .bot {
        padding: 20px 10px 10px 10px;
        .choice-answer {
          .container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
              padding: 10px;
              margin: 10px;
              width: 40%;
              border: 1px solid green;
              border-radius: 10px;
              cursor: pointer;
            }
          }
        }
        .choice-char {
          .arr-char {
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .char {
              padding: 5px 15px;
              border: 1px solid green;
              margin-left: 5px;
              border-radius: 5px;
              cursor: pointer;
              span {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
    .right {
      width: 20%;
      padding-top: 30px;
      .group-button {
        text-align: center;
        .delete {
          margin: 0 auto;
          width: 92px;
          max-width: 92px;
          min-width: 92px;
          .btn {
            width: 100%;
          }
        }
      }
    }
  }
  .background {
    color: white;
  }
</style>
