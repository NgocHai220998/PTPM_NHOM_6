<template>
  <section class="gotoLearn background">
    <router-link :to="{ name: 'GotoLearnScreen' }">
      <div class="gotoLearn-index">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img height="100" width="100" src="/static/images/attack.png" alt="null">
      </div>
    </router-link>
    <div class="text">
      <span>Đi Học</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'GotoLearnHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .gotoLearn {
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
        font-size: 24px;
        font-weight: bold;
        color: white;
      }
      text-align: center;
      width: 100%;
      top: -10px;
    }
  }
</style>
