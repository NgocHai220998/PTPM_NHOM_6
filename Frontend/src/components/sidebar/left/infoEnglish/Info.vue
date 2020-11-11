<template>
  <section class="info">
    <div class="info-container">
      <div class="avatar">
        <img class="index background" src="https://ngochai220998.github.io/mywebsite/Attack%20(1).png" />
        <div class="avatar-level background">
          <div>
            <span title="Cấp độ">146</span>
          </div>
        </div>
        <div class="avatar-top background">
          <div>
            <span title="Thứ hạng">2</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-name">
          <div class="background">
            <span title="Tên nhân vật">NgocHai</span>
          </div>
        </div>
        <div class="right-money">
          <div class="background">
            <span title="Tiền đô">2022200 $</span>
            <a-icon @click="clickAchievement" class="achievement" title="Thành tựu" type="bg-colors"/>
          </div>
        </div>
        <div class="right-point">
          <div class="background">
            <span title="Kim cương"><a-icon type="radar-chart" /> 1998 Điểm</span>
          </div>
        </div>
        <!-- <div class="right-hp"></div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoComponent',
  data () {
    return {
    }
  },
  methods: {
    clickAchievement () {
      this.$message.success('clicked Achievement')
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .info {
    &-container {
      position: relative;
      margin: 15px 0 0 15px;
      .avatar {
        position: absolute;
        // left: 15px;
        // top: 15px;
        z-index: 2;
        .index {
          width: 100px;
          border-radius: 9999px;
          border: 3px solid green;
          cursor: pointer;
          max-height: 100px;
        }
        &-level, &-top {
          position: absolute;
          width: 40px;
          border-radius: 9999px;
          border: 3px solid green;
          div {
            text-align: center;
            cursor: pointer;
            span {
              color: white;
            }
          }
        }
        &-level {
          top: 0;
        }
        &-top {
          bottom: -12px;
          left: 25px;
        }
      }
      .right {
        position: relative;
        height: 90px;
        border-radius: 100px 50px 50px 100px;
        z-index: 1;
        top: 5px;
        margin-left: 10px;
        &-name, &-money, &-point {
          // border-radius: 50px;
          div {
            margin-left: 20px;
            height: 30px;
            line-height: 30px;
            span {
              font-weight: bold;
              color: white;
              padding-left: 80px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        &-name {
          div {
            border-radius: 0 10px 0 0;
            // border-bottom: 2px solid green;
            padding-left: 5px;
          }
        }
        &-point {
          div {
            // border-top: 2px solid green;
            border-radius: 0 0 10px 0;
            span {
              max-width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 5px;
            }
          }
        }
        &-money {
          position: relative;
          span {
            display: inline-block;
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 5px;
          }
          .achievement {
            position: absolute;
            color: white;
            top: 0px;
            right: 10px;
            font-size: 24px;
            &:hover {
              cursor: pointer;
              opacity: 0.65;
            }
          }
        }
      }
    }
  }
</style>
