<template>
  <section class="left">
    <ButtonAdd class="add" />
    <ButtonEdit class="edit" />
    <div class="delete">
      <a-popconfirm
        title="Bạn chắc chắn muốn xóa chứ？"
        okText="Xóa luôn"
        cancelText="Thôi"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      >
        <a-button class="btn" type="danger"><a-icon type="delete" />Xóa</a-button>
      </a-popconfirm>
    </div>
  </section>
</template>

<script>

import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'

export default {
  name: 'FooterLeft',
  data () {
    return {
    }
  },
  components: {
    ButtonAdd,
    ButtonEdit
  },
  methods: {
    confirmDelete () {
      this.$message.success('Delete')
    },
    cancelDelete () {
      this.$message.warning('cancel Delete')
    }
  }
}
</script>

<style lang="scss" scoped>
  .left {
    text-align: center;
    .edit, .add {
      padding-bottom: 3px;
    }
    .delete {
      .btn {
        width: 92px;
        max-width: 92px;
        min-width: 92px;
        max-width: 80px;
      }
    }
  }
</style>
