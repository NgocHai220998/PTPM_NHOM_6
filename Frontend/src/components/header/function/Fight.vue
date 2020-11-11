<template>
  <section class="Fight background">
    <router-link :to="{ name: 'FightScreen' }">
      <div class="fight-index effect-mission">
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <span class="effect"></span>
        <img height="100" width="100" src="https://ngochai220998.github.io/mywebsite/Attack%20(1).png" alt="null">
      </div>
    </router-link>
  </section>
</template>

<script>

export default {
  name: 'FightHeader',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .Fight {
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
