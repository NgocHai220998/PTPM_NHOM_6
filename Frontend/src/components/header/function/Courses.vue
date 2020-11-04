<template>
  <section class="courses background">
    <router-link :to="{ name: 'CoursesScreen' }">
      <div class="courses-index">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img style="margin-left: -15px" height="110" width="110" src="/static/images/ninja.png" alt="null">
      </div>
    </router-link>
    <div class="text">
      <span>Thư Viện</span>
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
  .courses {
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
