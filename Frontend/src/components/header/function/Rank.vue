<template>
  <section class="Rank background">
    <router-link :to="{ name: 'RankScreen' }">
      <div class="rank-index">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img style="margin-left: 9px" height="100" width="80" src="/static/images/rank.png" alt="null">
      </div>
    </router-link>
    <div class="text">
      <span>Võ Đài</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'RankHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .Rank {
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
