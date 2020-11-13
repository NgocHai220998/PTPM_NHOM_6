<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="position-page">
    <div class="left">
      <div class="container">
        <article v-for="(figure, i) in boxFigures" :key="i" class="item" name="box_main" id="box_main" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)">
          <img v-show="figure.className !== ''" v-on:dragstart="drag($event)" :class="figure.className" draggable="true" width="80"
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
          <img v-show="figure.className !== ''" v-on:dragstart="drag($event)" :class="figure.className" draggable="true" width="80"
          :src="figure.srcImage" alt="main">
          <div class="index background">{{ figure.index }}</div>
        </div>
        <!-- <div class="item" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)">
          <div class="index background">1</div>
        </div> -->
      </div>
    </div>
  </section>
</template>
<script>
const key = 'updatable'
export default {
  name: 'PositionComponent',
  data () {
    return {
      figures: [{
        className: '',
        srcImage: '',
        position: 4,
        index: 4
      }, {
        className: '',
        srcImage: '',
        position: 1,
        index: 1
      }, {
        className: '',
        srcImage: '',
        position: 5,
        index: 5
      }, {
        className: 'main',
        srcImage: '/static/images/attack.png',
        position: 2,
        index: 2
      }, {
        className: 'pet_1',
        srcImage: '/static/images/zombie.png',
        position: 6,
        index: 6
      }, {
        className: '',
        srcImage: '',
        position: 3,
        index: 3
      }],
      currentDrag: 0,
      boxFigures: [{
        className: 'pet_2',
        srcImage: '/static/images/robot.png',
        position: -1,
        index: -1
      }, {
        className: '',
        srcImage: '',
        position: -2,
        index: -2
      }, {
        className: '',
        srcImage: '',
        position: -3,
        index: -3
      }],
      isHiden: false // disable box while loading
    }
  },
  methods: {
    hadleSave () {
      this.$message.loading({ content: 'Yêu cầu đang được xử lý...', key })
      this.isHiden = true
      setTimeout(() => {
        this.$message.success({ content: 'Xử lý thành công :3', key, duration: 2 })
        this.isHiden = false
      }, 3000)
    },
    allowDrop (event) {
      event.preventDefault()
    },
    drag (event) {
      this.currentDrag = event.target.className
      event.dataTransfer.setData('className', this.currentDrag)
    },
    drop (event) {
      event.preventDefault()
      const data = event.dataTransfer.getData('className')
      if (data === 'main' && event.target.tagName === 'ARTICLE') {
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
          if (this.figures[i].className === this.currentDrag) {
            index1 = i
            break
          }
        }
        for (let i = 0; i < this.boxFigures.length; i++) {
          if (this.currentDrag === this.boxFigures[i].className) {
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
          const tempClassName = this.boxFigures[index1].className
          const tempSrcImage = this.boxFigures[index1].srcImage
          this.boxFigures[index1].className = this.boxFigures[index2].className
          this.boxFigures[index1].srcImage = this.boxFigures[index2].srcImage
          this.boxFigures[index2].className = tempClassName
          this.boxFigures[index2].srcImage = tempSrcImage
        } else { // position change to box (move position -> box)
          for (let i = 0; i < this.boxFigures.length; i++) {
            if (position === this.boxFigures[i].index) {
              index2 = i
              break
            }
          }
          const tempClassName = this.figures[index1].className
          const tempSrcImage = this.figures[index1].srcImage
          this.figures[index1].className = this.boxFigures[index2].className
          this.figures[index1].srcImage = this.boxFigures[index2].srcImage
          this.boxFigures[index2].className = tempClassName
          this.boxFigures[index2].srcImage = tempSrcImage
        }
      } else { // position change to position
        let index1 = -1
        let index2 = -1
        console.log(this.figures)
        console.log(this.currentDrag)
        for (let i = 0; i < this.figures.length; ++i) {
          if (this.figures[i].className === this.currentDrag) {
            index1 = i
          } else if (this.figures[i].index === position) {
            index2 = i
          }
        }
        if (index1 === -1) { // box change to position (move box -> position)
          for (let i = 0; i < this.boxFigures.length; i++) {
            if (this.currentDrag === this.boxFigures[i].className) {
              index1 = i
              break
            }
          }
          if (this.figures[index2].className !== 'main') {
            const tempClassName = this.boxFigures[index1].className
            const tempSrcImage = this.boxFigures[index1].srcImage
            this.boxFigures[index1].className = this.figures[index2].className
            this.boxFigures[index1].srcImage = this.figures[index2].srcImage
            this.figures[index2].className = tempClassName
            this.figures[index2].srcImage = tempSrcImage
          } else {
            this.$message.error('Nhân vật chính không thể rời trận!')
          }
        } else { // position change to position (move position -> position)
          const tempClassName = this.figures[index1].className
          const tempSrcImage = this.figures[index1].srcImage
          this.figures[index1].className = this.figures[index2].className
          this.figures[index1].srcImage = this.figures[index2].srcImage
          this.figures[index2].className = tempClassName
          this.figures[index2].srcImage = tempSrcImage
        }
      }
    },
    loadData () {
      this.$message.loading({ content: 'Vui lòng đợi, chúng tôi đang tải dữ liệu cho bạn...', key })
      this.isHiden = true
      setTimeout(() => {
        this.$message.success({ content: 'Xong :3', key, duration: 2 })
        this.isHiden = false
      }, 3000)
    }
  },
  beforeMount () {
    this.loadData()
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
          .main, .pet_1, .pet_2 {
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
          .main, .pet_1, .pet_2 {
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
</style>
