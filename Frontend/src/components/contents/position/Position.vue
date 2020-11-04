<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="position-page">
    <div class="left">
      <div class="container">
        <article v-for="(figure, i) in boxFigures" :key="i" class="item" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)">
          <img v-show="figure.kind !== ''" v-on:dragstart="drag($event)" :class="figure.kind" draggable="true" width="80"
          :src="figure.srcImage" alt="main">
          <div class="index background">{{ figure.index }}</div>
        </article>
      </div>
    </div>
    <div class="center">
      <div class="save">
        <a-button @click="hadleSave" class="background" style="width: 100%" type="primary">Lưu</a-button>
      </div>
      <div class="back">
        <router-link :to="{ name: 'HomeScreen' }">
          <a-button style="width: 100%" type="danger">Quay lại</a-button>
        </router-link>
      </div>
    </div>
    <div class="right">
      <div class="container">
        <div v-for="(figure, id) in figures" :key="id" class="item" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)">
          <img v-show="figure.kind !== ''" v-on:dragstart="drag($event)" :class="figure.kind" draggable="true" width="80"
          :src="figure.srcImage" alt="main">
          <div class="index background">{{ figure.index }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { jsonHeader } from '@/utils/fetchTool'
import { API } from '@/constants/api'
import dataPosition from './dataPosition'
const key = 'updatable'
export default {
  name: 'PositionComponent',
  data () {
    return {
      figures: dataPosition.figures,
      currentDrag: 0,
      boxFigures: dataPosition.boxFigures,
      isHiden: false, // disable box while loading,
      user: null
    }
  },
  methods: {
    hadleSave () {
      this.$message.loading({ content: 'Yêu cầu đang được xử lý...', key })
      this.isHiden = true
      const data = this.updatePosition(this.figures)
      fetch(API.UPDATE_POSITION, {
        headers: jsonHeader.headers,
        method: 'put',
        body: JSON.stringify({
          token: this.user.token,
          main: {
            position: data.main.position,
            kind: data.main.kind
          },
          pets: data.pets
        })
      }).then((response) => response.json())
        .then((res) => {
          this.isHiden = false
          if (res.code === 200) {
            this.$message.success({ content: 'Update thành công :3', key, duration: 2 })
            localStorage.setItem('user', JSON.stringify({
              ...this.user,
              main: res.data.main,
              pets: res.data.pets
            }))
            this.user = JSON.parse(localStorage.getItem('user'))
          } else {
            this.$message.error({ content: 'Update không thành công :(', key, duration: 2 })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    allowDrop (event) {
      event.preventDefault()
    },
    drag (event) {
      this.currentDrag = event.target.className
      event.dataTransfer.setData('kind', this.currentDrag)
    },
    drop (event) {
      event.preventDefault()
      const data = event.dataTransfer.getData('kind')
      if ((data === 'shoot' || data === 'attack' || data === 'ninja') && event.target.tagName === 'ARTICLE') {
        this.$message.error('Nhân vật chính không thể rời trận!')
      } else {
        this.changePosition(parseInt(event.target.innerText))
      }
    },
    changePosition (position) {
      if (!position) {
        this.$message.error('Chỗ đã có nhân vật khác đứng rồi!')
      } else if (position < 0) { // position change to box
        let index1 = -1
        let index2 = -1
        for (let i = 0; i < this.figures.length; ++i) {
          if (this.figures[i].kind === this.currentDrag) {
            index1 = i
            break
          }
        }
        for (let i = 0; i < this.boxFigures.length; i++) {
          if (this.currentDrag === this.boxFigures[i].kind) {
            index2 = i
            break
          }
        }
        if (index1 === -1) { // box change to box (move box -> box)
          for (let i = 0; i < this.boxFigures.length; i++) {
            if (position === this.boxFigures[i].index) {
              index1 = i
              break
            }
          }
          const tempKind = this.boxFigures[index1].kind
          const tempSrcImage = this.boxFigures[index1].srcImage
          this.boxFigures[index1].kind = this.boxFigures[index2].kind
          this.boxFigures[index1].srcImage = this.boxFigures[index2].srcImage
          this.boxFigures[index2].kind = tempKind
          this.boxFigures[index2].srcImage = tempSrcImage
        } else { // position change to box (move position -> box)
          for (let i = 0; i < this.boxFigures.length; i++) {
            if (position === this.boxFigures[i].index) {
              index2 = i
              break
            }
          }
          const tempKind = this.figures[index1].kind
          const tempSrcImage = this.figures[index1].srcImage
          this.figures[index1].kind = this.boxFigures[index2].kind
          this.figures[index1].srcImage = this.boxFigures[index2].srcImage
          this.boxFigures[index2].kind = tempKind
          this.boxFigures[index2].srcImage = tempSrcImage
        }
      } else { // position change to position
        let index1 = -1
        let index2 = -1
        for (let i = 0; i < this.figures.length; ++i) {
          if (this.figures[i].kind === this.currentDrag) {
            index1 = i
          } else if (this.figures[i].index === position) {
            index2 = i
          }
        }
        if (index1 === -1) { // box change to position (move box -> position)
          for (let i = 0; i < this.boxFigures.length; i++) {
            if (this.currentDrag === this.boxFigures[i].kind) {
              index1 = i
              break
            }
          }
          if (this.figures[index2].kind !== 'main') {
            const tempKind = this.boxFigures[index1].kind
            const tempSrcImage = this.boxFigures[index1].srcImage
            this.boxFigures[index1].kind = this.figures[index2].kind
            this.boxFigures[index1].srcImage = this.figures[index2].srcImage
            this.figures[index2].kind = tempKind
            this.figures[index2].srcImage = tempSrcImage
          } else {
            this.$message.error('Nhân vật chính không thể rời trận!')
          }
        } else { // position change to position (move position -> position)
          const tempKind = this.figures[index1].kind
          const tempSrcImage = this.figures[index1].srcImage
          this.figures[index1].kind = this.figures[index2].kind
          this.figures[index1].srcImage = this.figures[index2].srcImage
          this.figures[index2].kind = tempKind
          this.figures[index2].srcImage = tempSrcImage
        }
      }
    },
    loadData () {
      this.figures = [{
        kind: '',
        srcImage: '',
        position: 4,
        index: 4
      }, {
        kind: '',
        srcImage: '',
        position: 1,
        index: 1
      }, {
        kind: '',
        position: 5,
        index: 5
      }, {
        kind: '',
        srcImage: '',
        position: 2,
        index: 2
      }, {
        kind: '',
        srcImage: '',
        position: 6,
        index: 6
      }, {
        kind: '',
        srcImage: '',
        position: 3,
        index: 3
      }]
      this.boxFigures = [{
        kind: '',
        srcImage: '',
        position: -1,
        index: -1
      }, {
        kind: '',
        srcImage: '',
        position: -2,
        index: -2
      }, {
        kind: '',
        srcImage: '',
        position: -3,
        index: -3
      }]
    },
    getPosition (position, main, pets) {
      // get figures
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
      // box
      for (let i = 0; i < this.boxFigures.length; ++i) {
        for (let j = 0; j < pets.length; ++j) {
          if (this.boxFigures[i].position === pets[j].position) {
            this.boxFigures[i] = {
              ...this.boxFigures[i],
              ...pets[j]
            }
          }
        }
      }
      this.figures = position
    },
    updatePosition (newPosition) {
      let main = null
      let pets = []
      for (let i = 0; i < newPosition.length; ++i) {
        if (newPosition[i].kind === 'shoot' || newPosition[i].kind === 'ninja' || newPosition[i].kind === 'attack') {
          main = newPosition[i]
        } else if (newPosition[i].kind !== '') {
          pets.push(newPosition[i])
        }
      }
      for (let i = 0; i < this.boxFigures.length; ++i) {
        console.log(this.boxFigures[i])
        if (this.boxFigures[i].kind !== '') {
          pets.push(this.boxFigures[i])
        }
      }
      return {
        main: main,
        pets: pets
      }
    }
  },
  beforeMount () {
    this.loadData()
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getPosition(this.figures, this.user.main, this.user.pets)
  }
}
</script>

<style lang="scss" scoped>
  .position-page {
    display: flex;
    .left {
      width: 30%;
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        .item {
          position: relative;
          padding: 3px;
          height: 100%;
          border-radius: 10px;
          border: 2px solid green;
          text-align: center;
          max-width: 160px;
          margin: 1px 40px;
          background-color: rgba(0, 0, 0, 0.35);
          .shoot, .zombie, .robot, .ninja, .attack {
            text-align: center;
            margin: 0 auto;
            max-width: 120px;
            cursor: pointer;
            max-height: 100px;
          }
          .index {
            position: absolute;
            top: -2px;
            left: -2px;
            width: 25px;
            text-align: center;
            border-radius: 10px 2px;
            border: 1px solid green;
            color: white;
          }
        }
      }
    }
    .center {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      width: 50%;
      margin: 0 auto;
      .container {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        justify-content: center;
        .item {
          position: relative;
          border-radius: 10px;
          max-width: 160px;
          width: 50%;
          margin: 2px 5px;
          background-color: rgba(187, 50, 50, 0.5);
          border: 2px solid green;
          max-height: 33.3333%;
          min-height: 33.3333%;
          text-align: center;
          .shoot, .zombie, .robot, .ninja, .attack {
            text-align: center;
            margin: 0 auto;
            max-width: 120px;
            cursor: pointer;
          }
          .index {
            position: absolute;
            top: -2px;
            left: -2px;
            width: 25px;
            text-align: center;
            border-radius: 10px 2px;
            border: 1px solid green;
            color: white;
          }
        }
      }
    }
  }

  .disabledbutton {
    pointer-events: none;
    opacity: 0.65;
  }
</style>
