<template>
  <section class="position background">
    <router-link :to="{ name: 'PositionScreen' }">
      <div class="position-index">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img style="margin-left: 0px" height="115" width="120" src="/static/images/shoot.png" alt="null">
      </div>
    </router-link>
    <div class="text">
      <span>Trận hình</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'PositionHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .position {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px 20px;
    border-radius: 9999px;
    .effect-mission {
      height: 100%;
      width: 100%;
      border-radius: 9999px;
    }
    .text {
      position: absolute;
      span {
        font-size: 22px;
        font-weight: bold;
        color: white;
      }
      text-align: center;
      width: 100%;
      top: -10px;
    }
  }
</style>
