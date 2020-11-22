<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="fight-page">
    <div class="left">
      <div class="container">
        <div v-for="(figure, i) in mainLeft" :key="i" class="item">
          <div v-show="figure.kind !== ''" :class="'index ' + figure.kind">
            <div v-show="dataShow.left.text !== '' && dataShow.left.kind === figure.kind" class="show-status">{{ dataShow.left.text }}</div>
            <div v-show="dataShow.left.textHpDeducted !== '' && dataShow.left.kindReverse === figure.kind" class="hp-deducted">- {{ dataShow.left.textHpDeducted }}</div>
            <div class="user-name">
              <span>{{ figure.userName }}</span>
            </div>
            <!-- <div class="hp"></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="container">
        <div v-for="(figure, i) in mainRight" :key="i" class="item">
          <div v-show="figure.kind !== ''" :class="'index ' + figure.kind">
            <div v-show="dataShow.right.text !== '' && dataShow.right.kind === figure.kind" class="show-status">{{ dataShow.right.text }}</div>
            <div v-show="dataShow.right.textHpDeducted !== '' && dataShow.right.kindReverse === figure.kind" class="hp-deducted">- {{ dataShow.right.textHpDeducted }}</div>
            <div class="user-name">
              <span>{{ figure.userName }}</span>
            </div>
            <!-- <div class="hp"></div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import dataMainLeft from './dataMain'
import dataMainRight from './dataMainReverse'
import { API } from '@/constants/api'
import { getMethod, jsonHeader } from '@/utils/fetchTool'
import pos from './position'
import dataS from './dataStatus'
const key = 'updatable'
export default {
  name: 'FightComponent',
  data () {
    return {
      isHiden: false,
      turn: 0,
      mainLeft: [], // trận hình của mình
      mainRight: [], // trận hình đối phương
      figureLeft: dataMainLeft, // vị trí đứng của bên mình
      figureRight: dataMainRight, // vị trí đứng của bên đối phương
      stackLeft: [], // mảng nhét các tướng bên mình
      stackRight: [], // mảng nhét các tướng đối phương
      stackResult: [], // mảng kết quả mỗi lượt đánh
      setIntervalGame: null, // vòng đời game
      isWin: false, // Xem mình win hay không
      stackStatus: [], // Mảng để nhét các hiệu hứng né tránh, chống đỡ, bạo kích
      user: null,
      dataShow: dataS, // Dữ liệu chứa các trường hiện hiệu ứng trong game
      visible: true,
      dataLeft: null,
      dataRight: null
    }
  },
  props: ['socket'],
  methods: {
    setFigure () {
      for (let i = 0; i < this.figureLeft.length; ++i) {
        for (let j = 0; j < this.mainLeft.length; ++j) {
          if (this.mainLeft[j].kind !== '' && this.mainLeft[j].kind === this.figureLeft[i].name) {
            this.mainLeft[j] = {
              ...this.mainLeft[j],
              ...this.figureLeft[i]
            }
            this.mainLeft[j].run()
          }
        }
      }
      this.setStackLeft()
    }, // khởi tạo trân hình bên mình ( bao gồm các hoạt ảnh , ảnh nền, hiệu ứng hoạt hình)
    setStackLeft () {
      for (let i = 1; i < 7; ++i) {
        for (let j = 0; j < this.mainLeft.length; ++j) {
          if (this.mainLeft[j].kind !== '' && this.mainLeft[j].position === i) {
            this.stackLeft.push(this.mainLeft[j])
          }
        }
      }
    }, // tạo một mảng gồm các nhân vật bên trái
    setFigureRight () {
      for (let i = 0; i < this.figureRight.length; ++i) {
        for (let j = 0; j < this.mainRight.length; ++j) {
          if (this.mainRight[j].kind !== '' && this.mainRight[j].kind === this.figureRight[i].name) {
            this.mainRight[j] = {
              ...this.mainRight[j],
              ...this.figureRight[i]
            }
            this.mainRight[j].run()
          }
        }
      }
      this.setStackRight()
    }, // khởi tạo trận hình đối phương ( bao gồm các hoạt ảnh , ảnh nền, hiệu ứng hoạt hình)
    setStackRight () {
      for (let i = 1; i < 7; ++i) {
        for (let j = 0; j < this.mainRight.length; ++j) {
          if (this.mainRight[j].kind !== '' && this.mainRight[j].position === i) {
            this.stackRight.push(this.mainRight[j])
          }
        }
      }
    }, // tạo một mảng gồm các nhân vật bên phải
    getResult () {
      let isRun = true
      let dame = 20
      while (isRun) {
        // left
        if (this.stackLeft[0] && this.stackLeft[0].hp > 0) {
          if (this.stackLeft[0].position === 1 || this.stackLeft[0].position === 4) {
            const tempArr = [1, 0, 3, 2, 5, 4] // Thứ tự đánh của vị trí 1 và 2
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[0].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[0].position === 2 || this.stackLeft[0].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[0].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[0].position === 3 || this.stackLeft[0].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[0].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[0].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
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
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[0].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[0].position === 2 || this.stackRight[0].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[0].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[0].position === 3 || this.stackRight[0].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[0].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[0].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
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
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[1].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[1].position === 2 || this.stackLeft[1].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[1].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[1].position === 3 || this.stackLeft[1].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[1].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[1].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
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
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[1].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[1].position === 2 || this.stackRight[1].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[1].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[1].position === 3 || this.stackRight[1].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[1].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[1].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
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
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[2].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[2].position === 2 || this.stackLeft[2].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[2].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackLeft[2].position === 3 || this.stackLeft[2].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainRight[tempArr[i]].kind !== '' && this.mainRight[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainLeft[this.stackLeft[2].index], this.mainRight[tempArr[i]])
                this.mainRight[tempArr[i]].hp = this.mainRight[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackLeft[2].index,
                  idle: this.mainRight[tempArr[i]].index,
                  position: 'left',
                  hp: this.mainRight[tempArr[i]].hp,
                  hpDeducted: dame
                })
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
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[2].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[2].position === 2 || this.stackRight[2].position === 5) {
            const tempArr = [3, 2, 1, 0, 5, 4] // Thứ tự đánh của vị trí 3 và 4
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[2].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          } else if (this.stackRight[2].position === 3 || this.stackRight[2].position === 6) {
            const tempArr = [5, 4, 3, 2, 1, 0] // Thứ tự đánh của vị trí 5 và 6
            for (let i = 0; i < tempArr.length; i++) { // Thứ tự đánh của vị trí 1 và 2
              if (this.mainLeft[tempArr[i]].kind !== '' && this.mainLeft[tempArr[i]].hp > 0) {
                dame = this.getDame(this.mainRight[this.stackRight[2].index], this.mainLeft[tempArr[i]])
                this.mainLeft[tempArr[i]].hp = this.mainLeft[tempArr[i]].hp - dame
                this.stackResult.push({
                  attack: this.stackRight[2].index,
                  idle: this.mainLeft[tempArr[i]].index,
                  position: 'right',
                  hp: this.mainLeft[tempArr[i]].hp,
                  hpDeducted: dame
                })
                break
              }
            }
          }
        }
        isRun = false
        for (let i = 0; i < this.mainLeft.length; ++i) {
          if (this.mainLeft[i].kind !== '' && this.mainLeft[i].hp > 0) {
            isRun = true
          }
        }
        if (!isRun) {
          this.isWin = false
          break
        }
        isRun = false
        for (let i = 0; i < this.mainRight.length; ++i) {
          if (this.mainRight[i].kind !== '' && this.mainRight[i].hp > 0) {
            isRun = true
          }
        }
        if (!isRun) {
          this.isWin = true
          break
        }
        // break
      }
      // console.log(this.stackResult)
    }, // Lấy các lượt đánh của nhân vật
    runFigure () {
      this.getResult()
      this.setIntervalGame = setInterval(() => {
        if (this.stackResult[this.turn].position === 'left') {
          if (this.stackResult[this.turn].hp <= 0) {
            this.mainRight[this.stackResult[this.turn].idle].currentStatus.x = this.mainRight[this.stackResult[this.turn].idle].dead.x
            this.mainRight[this.stackResult[this.turn].idle].currentStatus.y = this.mainRight[this.stackResult[this.turn].idle].dead.y
            this.mainRight[this.stackResult[this.turn].idle].stop('dead')
          }
          this.showStatus(this.mainLeft[this.stackResult[this.turn].attack].kind, this.stackStatus[this.turn], this.mainRight[this.stackResult[this.turn].idle].kind)
          this.mainLeft[this.stackResult[this.turn].attack].currentStatus.x = this.mainLeft[this.stackResult[this.turn].attack].skill.x
          this.mainLeft[this.stackResult[this.turn].attack].currentStatus.y = this.mainLeft[this.stackResult[this.turn].attack].skill.y
          this.mainLeft[this.stackResult[this.turn].attack].stop('life')
          // if (this.turn === this.stackResult.length - 1) {
          //   this.mainLeft[this.stackResult[this.turn].attack].clear()
          // }
          this.dataShow.right.showHpDeducted(this.stackResult[this.turn].hpDeducted + '', this.mainRight[this.stackResult[this.turn].idle].kind)
        } else if (this.stackResult[this.turn].position === 'right') {
          if (this.stackResult[this.turn].hp <= 0) {
            this.mainLeft[this.stackResult[this.turn].idle].currentStatus.x = this.mainLeft[this.stackResult[this.turn].idle].dead.x
            this.mainLeft[this.stackResult[this.turn].idle].currentStatus.y = this.mainLeft[this.stackResult[this.turn].idle].dead.y
            this.mainLeft[this.stackResult[this.turn].idle].stop('dead')
          }
          this.showStatus(this.mainRight[this.stackResult[this.turn].attack].kind, this.stackStatus[this.turn], this.mainLeft[this.stackResult[this.turn].idle].kind)
          this.mainRight[this.stackResult[this.turn].attack].currentStatus.x = this.mainRight[this.stackResult[this.turn].attack].skill.x
          this.mainRight[this.stackResult[this.turn].attack].currentStatus.y = this.mainRight[this.stackResult[this.turn].attack].skill.y
          this.mainRight[this.stackResult[this.turn].attack].stop('life')
          this.dataShow.left.showHpDeducted(this.stackResult[this.turn].hpDeducted + '', this.mainLeft[this.stackResult[this.turn].idle].kind)
          // if (this.turn === this.stackResult.length - 1) {
          //   this.mainRight[this.stackResult[this.turn].attack].clear()
          // }
        }
        this.turn += 1
        if (this.turn === this.stackResult.length) {
          clearInterval(this.setIntervalGame)
          if (this.isWin) {
            this.win()
          } else {
            this.lose()
          }
        }
      }, 2000)
    }, // chạy hoạt ảnh trận đấu
    async loadData () {
      try {
        this.dataLeft = await fetch(`${API.GET_USER_BY_EMAIL}/${this.$router.history.current.params.email}`, {
          headers: jsonHeader.headers,
          method: getMethod.method
        }).then(res => res.json())
        this.dataRight = await fetch(`${API.GET_USER_BY_EMAIL}/${this.$router.history.current.params.emailReverse}`, {
          headers: jsonHeader.headers,
          method: getMethod.method
        }).then(res => res.json())
        this.dataLeft.data.user = this.addTechnicalPoint(this.dataLeft.data.user)
        this.dataRight.data.user = this.addTechnicalPoint(this.dataRight.data.user)
        this.mainLeft = this.setPosition(pos.left, this.dataLeft.data.user.main, this.dataLeft.data.user.pets)
        this.mainRight = this.setPosition(pos.right, this.dataRight.data.user.main, this.dataRight.data.user.pets)
      } catch (error) {
        console.log(error)
      }
    }, // Lấy dữ liệu của 2 người dùng
    addTechnicalPoint (user) { // Thêm chỉ số technical cho main
      user.main.martialArt += (user.profile.technicalPoint.martialArt * 10)
      user.main.avoid += (user.profile.technicalPoint.avoid * 1)
      user.main.propUp += (user.profile.technicalPoint.propUp * 1)
      user.main.critical += (user.profile.technicalPoint.critical * 1)
      user.main.hp += (user.profile.technicalPoint.hp * 20)
      user.main.armor += (user.profile.technicalPoint.armor * 10)
      return user
    },
    setPosition (position, main, pets) {
      for (let i = 0; i < position.length; ++i) {
        if (position[i].position === main.position && position[i].kind === '') {
          position[i] = {
            ...position[i],
            ...main
          }
          break
        }
      }
      for (let i = 0; i < position.length; ++i) {
        for (let j = 0; j < pets.length; ++j) {
          if (position[i].position === pets[j].position && position[i].kind === '') {
            position[i] = {
              ...position[i],
              ...pets[j]
            }
          }
        }
      }
      return position
    }, // đẩy nhân vật vào vị trí tương ứng
    getDame (figure, figureReverse) {
      // Dame figure
      let status = {}
      let dame = parseInt(figure.martialArt * (1.75)) - parseInt(figureReverse.armor * (1.333))
      let random = Math.floor(Math.random() * 100)
      if (random < (figure.critical)) {
        dame = parseInt(dame * (1.8))
        if (figure.isMe) {
          status.left = {
            text: 'bao_kich'
          }
        } else {
          status.right = {
            text: 'bao_kich'
          }
        }
      }
      // Figure Reverse
      random = Math.floor(Math.random() * 100)
      // console.log(figureReverse.propUp)
      if (random < figureReverse.propUp) { // chong do
        dame -= parseInt(dame * (0.7))
        if (figure.isMe) {
          status.left = {
            text: 'chong_do'
          }
        } else {
          status.right = {
            text: 'chong_do'
          }
        }
      } else if (random > figureReverse.propUp && random < (figureReverse.propUp + figureReverse.avoid)) { // Ne tranh
        dame = 0
        if (figure.isMe) {
          status.left = {
            text: 'ne_tranh'
          }
        } else {
          status.right = {
            text: 'ne_tranh'
          }
        }
      }
      this.stackStatus.push(status)
      return dame
    }, // lấy dame gây ra của nhân vật lên nhân vật đối diện
    showStatus (kind, status, kindReverse) {
      if (status.right) {
        switch (status.right.text) {
          case 'bao_kich':
            this.dataShow.right.showStatus(kind, 'Bạo kích')
            break
          case 'chong_do':
            this.dataShow.left.showStatus(kindReverse, 'Chống đỡ')
            break
          case 'ne_tranh':
            this.dataShow.left.showStatus(kindReverse, 'Né tránh')
            break
          default:
        }
      }
      if (status.left) {
        switch (status.left.text) {
          case 'bao_kich':
            this.dataShow.left.showStatus(kind, 'Bạo kích')
            break
          case 'chong_do':
            this.dataShow.right.showStatus(kindReverse, 'Chống đỡ')
            break
          case 'ne_tranh':
            this.dataShow.right.showStatus(kindReverse, 'Né tránh')
            break
          default:
        }
      }
    }, // hiện các trạng thai bạo kích, né, đỡ tương ứng
    win () {
      this.$success({
        title: 'Chiến thắng',
        content: (
          <div>
            <p>Mạnh thế ai chịu nổi hả Đại ca!</p>
          </div>
        ),
        onOk: () => {
          this.$router.push({ name: 'HomeScreen' })
        }
      })
    },
    lose () {
      this.$error({
        title: 'Thất bại',
        content: (
          <div>
            <p>Cố găng chăm chỉ học tập để mạnh hơn nhé! 😂😂</p>
          </div>
        ),
        onOk: () => {
          this.$router.push({ name: 'HomeScreen' })
        }
      })
    },
    updateRank () {
      if (this.isWin && (this.dataLeft.data.user.profile.rank > this.dataRight.data.user.profile.rank)) {
        this.socket.emit('clientFightWin', {
          type: this.$router.history.current.params.type,
          token: this.user.token,
          email: {
            rank: this.dataLeft.data.user.profile.rank,
            email: this.dataLeft.data.user.email,
            userName: this.dataLeft.data.user.main.userName
          },
          emailReverse: {
            rank: this.dataRight.data.user.profile.rank,
            email: this.dataRight.data.user.email,
            userName: this.dataRight.data.user.main.userName
          }
        })
      }
    }, // Cập nhật kết quả trận đấu =))
    robGotoLearnResult () {
      let robGotoLearnData = JSON.parse(localStorage.getItem('robGotoLearnData'))
      if (robGotoLearnData) {
        this.socket.emit('clientSendRobGotoLearnResult', {
          token: this.user.token,
          isWin: this.isWin,
          robGotoLearnData: robGotoLearnData,
          emailReverse: this.$router.history.current.params.emailReverse,
          type: 'rob'
        })
      }
    }
  },
  async mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.isHiden = true
    this.$message.loading({ content: 'Vui lòng đợi, chúng tôi đang tải trận đấu...', key })
    await this.loadData()
    this.$message.success({ content: 'Xong :3', key, duration: 2 })
    this.isHiden = false
    this.setFigure()
    this.setFigureRight()
    this.runFigure()
    setTimeout(() => {
      if (this.$router.history.current.params.type === 'rank') {
        this.updateRank()
      } else if (this.$router.history.current.params.type === 'rob') {
        this.robGotoLearnResult()
      }
    }, 2000)
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
          position: relative;
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
            .user-name {
              width: 100%;
              position: absolute;
              margin: 0 auto;
              left: -10px;
              top: 0px;
              text-align: center;
              span {
                color: white;
                font-weight: bold;
              }
            }
            .hp {
              position: absolute;
              height: 5px;
              background-color: red;
              width: 40%;
              margin: 0 auto;
              border-radius: 5px;
              border: 1px solid green;
            }
          }
          .show-status {
            position: absolute;
            width: 50%;
            height: 30px;
            background-color: rgba(245, 169, 169, 0.65);
            top: -10px;
            right: 0px;
            border-radius: 10px;
            color: black;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 20px;
          }
          .hp-deducted {
            position: absolute;
            top: 25px;
            right: 20px;
            border-radius: 10px;
            color: red;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 20px;
            animation: hpDeducAnimate .2s linear forwards;
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
            width: 90px;
            height: 78px;
            margin: 0 auto;
            .user-name {
              width: 100%;
              position: absolute;
              margin: 0 auto;
              left: 0px;
              top: -20px;
              text-align: center;
              span {
                color: white;
                font-weight: bold;
              }
            }
          }
          .show-status {
            position: absolute;
            width: 50%;
            height: 30px;
            background-color: rgba(245, 169, 169, 0.65);
            top: -25px;
            left: 20px;
            border-radius: 10px;
            color: black;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 20px;
          }
          .hp-deducted {
            position: absolute;
            top: -5px;
            left: 25px;
            border-radius: 10px;
            color: red;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 20px;
            animation: hpDeducAnimate .2s linear forwards;
          }
        }
      }
    }
  }
  @keyframes hpDeducAnimate {
    0% {
      color: red;
      opacity: 0.1;
    }
    80% {
      top: 15px;
      color: red;
      opacity: 1;
    }
    100% {
      top: 15px;
      color: red;
    }
  }
  .disabledbutton {
    pointer-events: none;
    opacity: 0.65;
  }
</style>
