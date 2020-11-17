<template>
  <section class="footer-left-edit">
    <a-button @click="showModal" class="btn-addExample background-edit btn" type="primary"><a-icon type="form" />
      Sửa
    </a-button>
    <a-modal
      title="Thêm từ mới"
      :visible="visible"
      @ok="handleEdit"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :okText="'Sửa luôn'"
      :cancelText="'Thôi'"
    >
      <a-form
        :form="form"
        layout="vertical"
        @submit="handleEdit"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Câu mới:">
              <a-input
                v-decorator="[
                  'example',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập câu mới' }],
                    initialValue: this.currentExample.example
                  },
                ]"
                placeholder="Xin vui lòng nhập câu mới"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Giải thích:">
              <a-input
                v-decorator="[
                  'explain',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập Giải thích' }],
                    initialValue: this.currentExample.explain
                  },
                ]"
                placeholder="Xin vui lòng nhập giải thích"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </section>
</template>

<script>

import { API } from '@/constants/api'
import { jsonHeader } from '@/utils/fetchTool'

export default {
  name: 'EditFooterLeft',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      placement: 'top',
      confirmLoading: false,
      user: null,
      currentExample: {
        example: '',
        explain: ''
      }
    }
  },
  props: ['example'],
  methods: {
    showModal () {
      this.visible = true
    },
    handleEdit (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.confirmLoading = true
          fetch(`${API.UPDATE_EXAMPLE}/${this.example._id}`, {
            headers: jsonHeader.headers,
            method: 'put',
            body: JSON.stringify({
              data: {
                example: values.example,
                explain: values.explain
              }
            })
          }).then((response) => response.json())
            .then((res) => {
              this.visible = false
              this.confirmLoading = false
              if (res.code === 200) {
                this.$message.success(res.data.message)
                this.$emit('editDone')
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    handleCancel (e) {
      this.$message.warning('handle cancel')
      this.visible = false
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  watch: {
    example: function () {
      this.currentExample = this.example
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-left-edit {
    .btn {
      width: 92px;
      max-width: 92px;
      min-width: 92px;
    }
  }
</style>
