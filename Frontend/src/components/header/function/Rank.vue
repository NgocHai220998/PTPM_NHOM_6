<template>
  <section class="Rank background">
    <router-link :to="{ name: 'RankScreen' }">
      <div class="rank-index effect-mission">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img height="100" width="100" src="/static/images/shoot.png" alt="null">
      </div>
    </router-link>
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
    width: 100px;
    height: 100px;
    margin: 10px 20px;
    border-radius: 9999px;
    .effect-mission {
      height: 100%;
      width: 100%;
      border-radius: 9999px;
    }
  }
</style>
