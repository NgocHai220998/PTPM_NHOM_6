<template>
  <section class="right">
    <div class="back-next">
      <a-button-group>
        <a-button title="Câu tiếp theo" type="primary"> <a-icon type="left" /></a-button>
        <a-button title="Câu trước đó" type="primary"><a-icon type="right" /> </a-button>
      </a-button-group>
    </div>
    <div class="random">
      <a-button title="Ngẫu nhiên" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : 'danger'" class="btn">Ngẫu nhiên</a-button>
    </div>
    <div class="auto">
      <a-button title="Tự động" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : 'danger'" class="btn">Tự động</a-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FooterRight',
  data () {
    return {
      isRandom: false,
      isAuto: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .right {
    text-align: center;
    .random, .auto {
      padding-top: 3px;
      .btn {
        width: 92px;
        max-width: 92px;
        min-width: 92px;
        max-width: 80px;
      }
    }
  }
</style>
