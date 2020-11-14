<template>
  <section class="footer-left-add">
    <a-button @click="showModal" class="btn-addExample background btn" type="primary"><a-icon type="plus" />
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      Thêm
    </a-button>
    <a-modal
      title="Thêm từ mới"
      :visible="visible"
      @ok="handleAdd"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :okText="'Thêm'"
      :cancelText="'Thôi'"
    >
      <a-form
        :form="form"
        layout="vertical"
        @submit="handleAdd"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Câu mới:">
              <a-input
                v-decorator="[
                  'example',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập câu mới' }],
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
import { postMethod, jsonHeader } from '@/utils/fetchTool'

export default {
  name: 'AddFooterLeft',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      placement: 'top',
      confirmLoading: false,
      user: null
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleAdd (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.confirmLoading = true
          fetch(API.CREATE_EXAMPLE, {
            headers: jsonHeader.headers,
            method: postMethod.method,
            body: JSON.stringify({
              token: this.user.token,
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
                this.$emit('addDone')
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
  }
}
</script>

<style lang="scss" scoped>
  .footer-left-add {
    .btn {
      width: 92px;
      max-width: 92px;
      min-width: 92px;
    }
  }
</style>
