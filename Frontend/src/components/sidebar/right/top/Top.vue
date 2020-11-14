<template>
  <section class="sidebar-right-top-container">
    <Language />
    <div>
      <a-popconfirm
        title="Bạn chắc chắn muốn đăng xuất chứ？"
        okText="Muốn"
        cancelText="Thôi"
        @confirm="confirmLogout"
      >
        <a-button type="danger"><a-icon type="logout" />Đăng xuất</a-button>
      </a-popconfirm>
    </div>
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
  },
  methods: {
    confirmLogout () {
      localStorage.removeItem('user')
      window.location.reload()
    }
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
