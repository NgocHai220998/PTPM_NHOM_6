<template>
  <section class="info">
    <div class="info-container">
      <div class="avatar">
        <img class="index" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div class="avatar-level">
          <div>
            <span>146</span>
          </div>
        </div>
        <div class="avatar-top">
          <div>
            <span>2</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-name">
          <div>
            <span>NgocHai</span>
          </div>
        </div>
        <div class="right-point">
          <div>
            <span>Điểm: 1998</span>
          </div>
        </div>
        <div class="right-achievement">
          <div>
            <span><a-icon type="idcard" /> Thành tựu</span>
          </div>
        </div>
        <!-- <div class="right-hp"></div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoComponent'
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
          background-color: gray;
          border-radius: 9999px;
          border: 3px solid green;
          cursor: pointer;
        }
        &-level, &-top {
          position: absolute;
          width: 40px;
          border-radius: 9999px;
          background-color: gray;
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
        &-name, &-point, &-achievement {
          // border-radius: 50px;
          div {
            background-color: #CC6600;
            margin-left: 35px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            background-color: #1a82f7;
            background: -moz-linear-gradient(bottom, #FF6633 30%, #330000 70%);
            background: -o-linear-gradient(bottom, #FF6633 30%, #330000 70%);
            background: -ms-linear-gradient(bottom, #FF6633 30%, #330000 70%);
            background: -webkit-gradient(linear,left bottom,left top,color-stop(0.3, #FF6633),color-stop(0.7, #330000));
            span {
              font-weight: bold;
              color: white;
              padding-left: 80px;
            }
            &:hover {
              opacity: 0.65;
            }
          }
        }
        &-name {
          div {
            border-radius: 0 10px 0 0;
            // border-bottom: 2px solid green;
          }
        }
        &-achievement {
          div {
            // border-top: 2px solid green;
            border-radius: 0 0 10px 0;
          }
        }
      }
    }
  }
</style>
