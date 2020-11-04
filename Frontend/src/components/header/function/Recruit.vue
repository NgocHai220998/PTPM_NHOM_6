<template>
  <section class="recruit background">
    <router-link :to="{ name: 'RecruitScreen' }">
      <div class="recruit-index">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img style="margin-left: 0px" height="115" width="120" src="/static/images/attack.png" alt="null">
      </div>
    </router-link>
    <div class="text">
      <span>Đồng Đội</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'recruitHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .recruit {
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
