<template>
  <section class="sidebar-right-top-container">
    <Language />
    <a-button type="danger"><a-icon type="logout" />Đăng xuất</a-button>
  </section>
</template>

<script>

import Language from './Language'

export default {
  name: 'Top',
  data () {
    return {
    }
  },
  components: {
    Language
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-right-top-container {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
