<template>
  <section class="left">
    <ButtonAdd @addDone="$emit('addDone')" :example="example" class="add" />
    <ButtonEdit @editDone="$emit('editDone')" :example="example" class="edit" />
    <div class="delete">
      <a-popconfirm
        title="Bạn chắc chắn muốn xóa chứ？"
        okText="Xóa luôn"
        cancelText="Thôi"
        @confirm="confirmDelete"
      >
        <a-button class="btn" type="danger"><a-icon type="delete" />Xóa</a-button>
      </a-popconfirm>
    </div>
  </section>
</template>

<script>

import { API } from '@/constants/api'
import { jsonHeader } from '@/utils/fetchTool'
import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'

export default {
  name: 'FooterLeft',
  data () {
    return {
    }
  },
  props: ['example'],
  components: {
    ButtonAdd,
    ButtonEdit
  },
  methods: {
    confirmDelete () {
      fetch(`${API.DELETE_EXAMPLE}/${this.example._id}`, {
        headers: jsonHeader.headers,
        method: 'delete'
      }).then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(res.data.message)
            this.$emit('deleteDone')
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
