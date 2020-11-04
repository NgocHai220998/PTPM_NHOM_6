<template>
  <section class="sidebar-addEnglish">
    <a-button @click="showDrawer" class="btn-addEnglish background" type="primary"><a-icon type="plus" />
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      Thêm
    </a-button>
    <a-drawer
      title="Thêm Kanji"
      :width="500"
      @close="onClose"
      :visible="visible"
      :placement="placement"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form
        :form="form"
        layout="vertical"
        @submit="handleAdd"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Từ mới:">
              <a-input
                v-decorator="[
                  'badWord',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập từ mới' }],
                  },
                ]"
                placeholder="Xin vui lòng nhập từ mới"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Giải thích:">
              <a-input
                v-decorator="[
                  'explain'
                ]"
                placeholder="Xin vui lòng nhập giải thích"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-spin :spinning="loading" :delay="0" class="spin-button">
          <a-button type="danger" :style="{ marginRight: '8px' }" @click="onClose">
            <a-icon type="rollback" />Thôi
          </a-button>
          <a-button class="background" @click="handleAdd" type="primary"><a-icon type="plus" />Thêm</a-button>
        </a-spin>
        >
      </div>
    </a-drawer>
  </section>
</template>

<script>

import { API } from '@/constants/api'
import { postMethod, jsonHeader } from '@/utils/fetchTool'
export default {
  name: 'addEnglish',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      placement: 'right',
      user: null
    }
  },
  props: ['badWord'],
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    handleAdd (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.loading = true
          fetch(API.CREATE_BADWORD, {
            headers: jsonHeader.headers,
            method: postMethod.method,
            body: JSON.stringify({
              token: this.user.token,
              data: {
                badWord: values.badWord,
                explain: values.explain
              }
            })
          }).then((response) => response.json())
            .then((res) => {
              this.visible = false
              this.loading = false
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
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
</style>
