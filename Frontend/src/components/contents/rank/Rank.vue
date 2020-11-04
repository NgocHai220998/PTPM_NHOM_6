<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="rank-page">
    <Left :socket="socket" class="left"/>
    <Right :socket="socket" class="right" />
  </section>
</template>
<script>
// import { jsonHeader } from '@/utils/fetchTool'
// import { API } from '@/constants/api'
// const key = 'updatable'
import Left from './Left'
import Right from './Right'

export default {
  name: 'RankComponent',
  data () {
    return {
      isHiden: false
    }
  },
  props: ['socket'],
  components: {
    Left,
    Right
  }
}
</script>

<style lang="scss" scoped>
  .rank-page {
    display: flex;
    .left {
      width: 250px;
      min-width: 250px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.35);
    }
    .right {
      flex-grow: 1;
      height: 100%;
      background-color: gray;
      margin-left: 5px;
    }
  }
  .disabledbutton {
    pointer-events: none;
    opacity: 0.65;
  }
</style>
