<template>
  <section class="fight-page">
    <div class="left">
      <div class="container">
        <div v-for="(figure, i) in mainLeft" :key="i" class="item">
          <span style="color: white">{{ figure.position }}</span>
          <div v-show="figure.className !== ''" :class="'index ' + figure.className">
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="container">
        <div v-for="(figure, i) in mainRight" :key="i" class="item">
          <span style="color: white">{{ figure.position }}</span>
          <div v-show="figure.className !== ''" :class="'index ' + figure.className"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import dataMainLeft from '@/constants/dataMain'
import dataMainRight from '@/constants/dataMainReverse'

export default {
  name: 'FightComponent',
  data () {
    return {
      turn: 0,
      mainLeft: [{
        className: 'robot',
        srcImage: '',
        position: 4,
        index: 0,
        hp: 100
      }, {
        className: 'attack',
        srcImage: '',
        position: 1,
        index: 1,
        hp: 100
      }, {
        className: '',
        srcImage: '',
        position: 5,
        index: 2,
        hp: 100
      }, {
        className: '',
        srcImage: '',
        position: 2,
        index: 3,
        hp: 100
      }, {
        className: 'ninja',
        srcImage: '',
        position: 6,
        index: 4,
        hp: 100
      }, {
        className: '',
        srcImage: '',
        position: 3,
        index: 5,
        hp: 100
      }],
      mainRight: [{
        className: '',
        srcImage: '',
        position: 4,
        index: 0,
        hp: 100
      }, {
        className: 'shoot',
        srcImage: '/static/images/shoot.png',
        position: 1,
        index: 1,
        hp: 100
      }, {
        className: 'attack',
        srcImage: '/static/images/attack.png',
        position: 5,
        index: 2,
        hp: 100
      }, {
        className: 'zombie',
        srcImage: '',
        position: 2,
        index: 3,
        hp: 100
      }, {
        className: '',
        srcImage: '',
        position: 6,
        index: 4,
        hp: 100
      }, {
        className: '',
        srcImage: '',
        position: 3,
        index: 5,
        hp: 100
      }],
      figureLeft: dataMainLeft,
      figureRight: dataMainRight,
      stackLeft: [],
      stackRight: [],
      stackResult: [],
      setIntervalGame: null,
      isWin: false
    }
  },
  methods: {
    initData () {
    },
    setFigure () {
      for (let i = 0; i < this.figureLeft.length; ++i) {
        for (let j = 0; j < this.mainLeft.length; ++j) {
          if (this.mainLeft[j].className !== '' && this.mainLeft[j].className === this.figureLeft[i].name) {
            this.mainLeft[j] = {
              ...this.mainLeft[j],
              ...this.figureLeft[i]
            }
            this.mainLeft[j].run()
          }
        }
      }
      this.setStackLeft()
    },
    setStackLeft () {
      for (let i = 1; i < 7; ++i) {
        for (let j = 0; j < this.mainLeft.length; ++j) {
          if (this.mainLeft[j].className !== '' && this.mainLeft[j].position === i) {
            this.stackLeft.push(this.mainLeft[j])
          }
        }
      }
    },
    setFigureRight () {
      for (let i = 0; i < this.figureRight.length; ++i) {
        for (let j = 0; j < this.mainRight.length; ++j) {
          if (this.mainRight[j].className !== '' && this.mainRight[j].className === this.figureRight[i].name) {
            this.mainRight[j] = {
              ...this.mainRight[j],
              ...this.figureRight[i]
            }
            this.mainRight[j].run()
          }
        }
      }
      this.setStackRight()
    },
    setStackRight () {
      for (let i = 1; i < 7; ++i) {
        for (let j = 0; j < this.mainRight.length; ++j) {
          if (this.mainRight[j].className !== '' && this.mainRight[j].position === i) {
            this.stackRight.push(this.mainRight[j])
          }
        }
      }
      setTimeout(() => {
        this.getResult()
        this.setIntervalGame = setInterval(() => {
          if (this.stackResult[this.turn].position === 'left') {
            this.mainLeft[this.stackResult[this.turn].attack].currentStatus.x = this.mainLeft[this.stackResult[this.turn].attack].skill.x
            this.mainLeft[this.stackResult[this.turn].attack].currentStatus.y = this.mainLeft[this.stackResult[this.turn].attack].skill.y
            this.mainLeft[this.stackResult[this.turn].attack].stop()
          } else if (this.stackResult[this.turn].position === 'right') {
            this.mainRight[this.stackResult[this.turn].attack].currentStatus.x = this.mainRight[this.stackResult[this.turn].attack].skill.x
            this.mainRight[this.stackResult[this.turn].attack].currentStatus.y = this.mainRight[this.stackResult[this.turn].attack].skill.y
            this.mainRight[this.stackResult[this.turn].attack].stop()
          }
          this.turn += 1
          if (this.turn === this.stackResult.length) {
            clearInterval(this.setIntervalGame)
            if (this.isWin) {
              this.$message.success('Win =))')
            } else {
              this.$message.error('Lose =))')
            }
          }
        }, 1000)
      }, 1000)
    },
    getResult () {
      let isRun = true
      let dame = 20
      while (isRun) {
        // left
        console.log(this.stackLeft)
        if (this.stackLeft[0] && this.stackLeft[0].hp > 0) {
          if (this.stackLeft[0].position === 1 || this.stackLeft[0].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[0].position === 2 || this.stackLeft[0].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[0].position === 3 || this.stackLeft[0].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        // right
        if (this.stackRight[0] && this.stackRight[0].hp > 0) {
          if (this.stackRight[0].position === 1 || this.stackRight[0].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[0].position === 2 || this.stackRight[0].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[0].position === 3 || this.stackRight[0].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        // left
        if (this.stackLeft[1] && this.stackLeft[1].hp > 0) {
          if (this.stackLeft[1].position === 1 || this.stackLeft[1].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[1].position === 2 || this.stackLeft[1].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[1].position === 3 || this.stackLeft[1].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        // right
        if (this.stackRight[1] && this.stackRight[1].hp > 0) {
          if (this.stackRight[1].position === 1 || this.stackRight[1].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[1].position === 2 || this.stackRight[1].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[1].position === 3 || this.stackRight[1].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        // left
        if (this.stackLeft[2] && this.stackLeft[2].hp > 0) {
          if (this.stackLeft[2].position === 1 || this.stackLeft[2].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[2].position === 2 || this.stackLeft[2].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackLeft[2].position === 3 || this.stackLeft[2].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].className !== '' && this.mainRight[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left'
                })
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        // right
        if (this.stackRight[2] && this.stackRight[2].hp > 0) {
          if (this.stackRight[2].position === 1 || this.stackRight[2].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[2].position === 2 || this.stackRight[2].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          } else if (this.stackRight[2].position === 3 || this.stackRight[2].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].className !== '' && this.mainLeft[tempArr[i]].hp >= 0) {
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right'
                })
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                break
              }
            }
          }
        }
        isRun = false
        for (let i = 0; i < this.mainLeft.length; ++i) {
          if (this.mainLeft[i].className !== '' && this.mainLeft[i].hp > 0) {
            isRun = true
          }
        }
        if (!isRun) {
          this.isWin = false
          break
        }
        isRun = false
        for (let i = 0; i < this.mainRight.length; ++i) {
          if (this.mainRight[i].className !== '' && this.mainRight[i].hp > 0) {
            isRun = true
          }
        }
        if (!isRun) {
          this.isWin = true
          break
        }
        // break
      }
      console.log(this.stackResult)
    }
  },
  mounted () {
    this.setFigure()
    this.setFigureRight()
  },
  beforeDestroy () {
    window.location.reload()
  }
}
</script>

<style lang="scss" scoped>
  .fight-page {
    display: flex;
    justify-content: space-between;
    .left, .right {
      width: 100%;
      .container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        .item {
          text-align: center;
          width: 46%;
          height: 30%;
          // background-color: gray;
          margin: 1px;
        }
      }
    }
    .left {
      .container {
        .item {
          padding-top: 20px;
          .index {
            background-image: url('/static/images/main.png');
            background-repeat: no-repeat;
            // background-position: 10000px;
            width: 90px;
            margin: 0 auto;
            height: 78px;
          }
        }
      }
    }
    .right {
      .container {
        flex-direction: row-reverse;
        .item {
          .index {
            background-image: url('/static/images/main_reverse.png');
            background-repeat: no-repeat;
            // background-position: 10000px;
            width: 90px;
            height: 78px;
          }
        }
      }
    }
    .is-dame {
      box-shadow: 1px 1px 50px 1px red;
      border-radius: 999px;
    }
  }
</style>
