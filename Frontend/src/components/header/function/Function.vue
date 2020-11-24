<template>
  <section class="function">
    <Rank />
    <GotoLearn />
    <Position />
    <Recruit />
    <Courses />
    <div style="color: white" class="rooms">
      <router-link :to="{ name: 'RoomsScreen' }">
        <div>Phòng</div>
        <div>Hẹn</div>
        <div>Đấu</div>
      </router-link>
    </div>
  </section>
</template>

<script>

import Rank from './Rank'
import GotoLearn from './GotoLearn'
import Position from './Position'
import Recruit from './Recruit'
import Courses from './Courses'

export default {
  name: 'FunctionHeader',
  data () {
    return {
    }
  },
  components: {
    Rank,
    GotoLearn,
    Position,
    Recruit,
    Courses
  }
}
</script>

<style lang="scss" scoped>
  .function {
    display: flex;
    flex-wrap: wrap;
    .rooms {
      text-align: center;
      background-color: rgba(255, 255, 255, 0.85);
      padding: 30px 10px;
      border-radius: 5px;
      text-transform: uppercase;
      font-weight: 700;
      &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 1px green, 1px 1px 5px green, 1px 1px 25px red;
      }
    }
  }
</style>
