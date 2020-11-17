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
          <span>{{ word.explain }}</span>
        </div>
        <div @click="run(false)" class="left background"><a-icon type="double-left" /></div>
        <div @click="run(true)" class="right background"><a-icon type="double-right" /></div>
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
            <div v-for="(wordAnswer, index) in getRandomAnswerChoice()" :key="index" @click="handleChoiceAnswer(wordAnswer)" class="item background">
              <span>{{ wordAnswer.vocabulary }}</span>
            </div>
          </div>
        </div>
        <!-- Answer by arranging the words in the sentence -->
        <div v-show="isChoiceChar" class="choice-char">
          <a-input-search @search="handleAnswerInput" @pressEnter="handleAnswerInput" v-model="answerInput" placeholder="Nhập đáp án ở đây" size="large">
            <a-button class="background" slot="enterButton"><a-icon type="enter" /></a-button>
          </a-input-search>
          <div class="arr-char">
            <div v-for="(char, index) in currentAnswer" :key="index" @click="handleChar(char)" class="char background">
              <span>{{ char }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="group-button">
        <ButtonAdd :word="word" @addDone="addDone"/>
        <ButtonEdit :word="word" @editDone="editDone"/>
        <div class="delete">
          <a-popconfirm
            title="Bạn chắc chắn muốn xóa chứ？"
            okText="Xóa luôn"
            cancelText="Thôi"
            @confirm="confirmDelete"
          >
            <a-button class="btn" type="danger"><a-icon type="delete" />Xóa</a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import { API } from '@/constants/api'
import { jsonHeader } from '@/utils/fetchTool'
import { mapGetters, mapActions } from 'vuex'
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
      isRandom: false,
      isAuto: false,
      word: {
        vocabulary: 'A đại ca ơi!',
        explain: 'What'
      },
      interval: null,
      index: 0,
      isNext: true,
      currentAnswer: 'hello',
      listAnswer: [{
        vocabulary: 'Tiếng Anh'
      }, {
        vocabulary: 'Tiếng Trung'
      }, {
        vocabulary: 'Tiếng Nhật'
      }, {
        vocabulary: 'Tiếng Ý'
      }]
    }
  },
  computed: {
    ...mapGetters(['words'])
  },
  components: {
    ButtonAdd,
    ButtonEdit
  },
  methods: {
    ...mapActions(['getWords']),
    handleAnswerInput () {
      if (this.answerInput !== '') {
        if (!this.checkAnswer()) {
          this.openNotificationWithIcon('error', 'Sai sai rồi :((')
        }
      } else {
        this.$message.error('Đáp án không được bỏ trống')
      }
    },
    handleChoiceAnswer (choiceAnswer) {
      this.answerInput = choiceAnswer.vocabulary
      if (this.answerInput !== '') {
        if (!this.checkAnswer()) {
          this.openNotificationWithIcon('error', `Note: ${choiceAnswer.vocabulary} : ${choiceAnswer.explain}`)
        } else {
          this.openNotificationWithIcon('success', `Note: ${choiceAnswer.vocabulary} : ${choiceAnswer.explain}`)
        }
      }
    },
    handleChar (char) {
      this.answerInput += char
    },
    confirmDelete () {
      fetch(`${API.DELETE_WORD}/${this.word._id}`, {
        headers: jsonHeader.headers,
        method: 'delete'
      }).then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(res.data.message)
            this.deleteDone()
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    run (isNext) {
      if (this.isRandom) { // isRandom = true
        this.index = Math.floor(Math.random() * this.words.length)
      } else { // isRandom = false
        if (isNext) { // next
          if (this.index < this.words.length - 1) {
            this.index++
            this.currentAnswer = this.getRandomArray(this.word.vocabulary)
          } else {
            this.isNext = false
            this.index = Math.floor(Math.random() * this.words.length)
          }
        } else { // back
          if (this.index > 0) {
            this.index--
            this.currentAnswer = this.getRandomArray(this.word.vocabulary)
          } else {
            this.isNext = true
            this.index = Math.floor(Math.random() * this.words.length)
          }
        }
      }
      if (this.words.length > 0) { // words !== []
        this.word = this.words[this.index]
        this.currentAnswer = this.getRandomArray(this.word.vocabulary)
      } else {
        this.word = {
          vocabulary: 'A đại ca ơi!',
          explain: 'What'
        }
      }
      this.answerInput = ''
    },
    checkAnswer () {
      if (this.answerInput.toUpperCase() === this.word.vocabulary.toUpperCase()) {
        this.run(true)
        return true
      }
      return false
    },
    editDone () {
      this.getWords({
        email: this.user.email
      })
      this.run()
    },
    addDone () {
      this.getWords({
        email: this.user.email
      })
      this.run()
    },
    deleteDone () {
      this.getWords({
        email: this.user.email
      })
      this.run()
    },
    getRandomArray (arr) {
      let n = arr.split('').length
      let result = new Array(arr.split('').length)
      let len = arr.split('').length
      let taken = new Array(len)
      if (n > len) {
        throw new RangeError('getRandom: more elements taken than available')
      }
      while (n--) {
        let x = Math.floor(Math.random() * len)
        result[n] = arr.split('')[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
      }
      return result
    },
    getRandomAnswerChoice () {
      if (this.words.length > 0) {
        this.listAnswer[0] = this.word
        this.listAnswer[1] = this.words[Math.floor(Math.random() * this.words.length)]
        this.listAnswer[2] = this.words[Math.floor(Math.random() * this.words.length)]
        this.listAnswer[3] = this.words[Math.floor(Math.random() * this.words.length)]
        let n = this.listAnswer.length
        let result = new Array(this.listAnswer.length)
        let len = this.listAnswer.length
        let taken = new Array(len)
        if (n > len) {
          throw new RangeError('getRandom: more elements taken than available')
        }
        while (n--) {
          let x = Math.floor(Math.random() * len)
          result[n] = this.listAnswer[x in taken ? taken[x] : x]
          taken[x] = --len in taken ? taken[len] : len
        }
        return result
      }
    },
    openNotificationWithIcon (type, message) {
      this.$notification[type]({
        message: 'Game Language',
        description: message,
        duration: 2
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getWords({
      email: this.user.email
    })
    let dataHome = JSON.parse(localStorage.getItem('dataHome'))
    console.log(dataHome)
    this.isAuto = dataHome.isAuto
    this.index = dataHome.index
    this.isRandom = dataHome.isRandom
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
    },
    answerInput: function () {
      this.checkAnswer()
    }
  },
  beforeDestroy () {
    localStorage.setItem('dataHome', JSON.stringify({
      isAuto: this.isAuto,
      isRandom: this.isRandom,
      index: this.index
    }))
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
